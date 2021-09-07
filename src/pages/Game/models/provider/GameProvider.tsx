import React, {
  useReducer,
  ReactElement,
  useRef,
  useEffect,
  useState,
} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { reducer, createDispatcher, initState } from './reducer';
import GameContext from '../context/GameContext';
import gameDataManager from '../managers/gameDataManager';
import { ChampData, SocketSpellData, SpellKey } from '../type';
import exampleData from './example';

interface GameProviderProps {
  matchTeamCode: string;
  children: ReactElement;
}

function GameProvider({ matchTeamCode, children }: GameProviderProps) {
  const [dataState, dispatch] = useReducer(reducer, initState);
  const dispatcher = createDispatcher(dispatch);
  const spellTimer = useRef([]);
  const socket = useRef(null);
  const stomp = useRef(null);
  const [itemSelectingSummonerName, setItemSelectingSummonerName] = useState();

  const getChampsInitData = async () => {
    try {
      dispatcher.loading();
      const champsData = await gameDataManager.getChampsInitData(matchTeamCode);

      // const champsData: ChampData[] = await new Promise((res) => {
      //   setTimeout(() => res(exampleData), 500);
      // });

      dispatcher.success(champsData);
    } catch (err) {
      dispatcher.error(err);
    }
  };

  React.useEffect(() => {
    getChampsInitData();
  }, []);

  const getData = (summonerName: string): ChampData => {
    return dataState.champsData.filter(
      (data) => data.summonerName === summonerName,
    )[0];
  };

  const buyItems = async (summonerName: string, items: string[]) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, items };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error();

      const purchaserData = getData(summonerName);
      gameDataManager.buyItems(purchaserData, items);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const cancelItem = async (summonerName: string, itemName: string) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, itemName };
      // const { data } = await axios.post('url', body); 서버 API 정해지면 다시

      // if (!data.success) throw new Error();

      const purchaserData = getData(summonerName);
      gameDataManager.cancelItem(purchaserData, itemName);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const countSpellTime = (summonerName: string, spellKey: SpellKey) => {
    if (spellTimer.current.includes(summonerName + spellKey)) return;
    spellTimer.current.push(summonerName + spellKey);

    const timer = setInterval(() => {
      const champData = getData(summonerName);
      const spellData = champData.spells[spellKey];

      if (!spellData.time || spellData.time < 0) {
        clearInterval(timer);
        const idx = spellTimer.current.indexOf(summonerName + spellKey);

        spellTimer.current.splice(idx, 1);

        spellData.time = null;
        dispatcher.render();
        return;
      }
      spellData.time -= 1;
      dispatcher.render();
    }, 1000);
  };

  const onUseSpell = async (
    summonerName: string,
    spellType: SpellKey,
    timeGap: number = 0,
  ) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.get(`https://backend.swoomi.me/champion/calcedCooltimeInfo?summonerName=${summonerName}&ultLevel=1`);

      // if (!data.success) throw new Error();
      // console.log(data);
      // const { cooltimeD } = data.data;
      const second = 60;
      const userData = getData(summonerName);

      gameDataManager.useSpell(userData, spellType, second - timeGap);

      const socketData: SocketSpellData = {
        summonerName,
        dspellTime: userData.spells.D.time,
        fspellTime: userData.spells.F.time,
        ultTime: userData.spells.R.time,
        type: 'SPELL',
      };

      stomp.current.send(
        `/pub/comm/message/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      countSpellTime(summonerName, spellType);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const resetSpell = async (summonerName: string, spellType: SpellKey) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.resetSpell(userData, spellType);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const updateTimeUsed = async (
    summonerName: string,
    spellType: SpellKey,
    changedTime: number,
  ) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.updateSpellTime(userData, spellType, changedTime);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const updateUltLevel = async (summonerName: string, level: number) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.updateUltLevel(userData, level);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const providerValue = {
    gameData: dataState.champsData,
    loadingState: { loading: dataState.loading, error: dataState.error },
    buyItems,
    cancelItem,
    onUseSpell,
    resetSpell,
    updateTimeUsed,
    updateUltLevel,

    isItemSelectorVisible: !!itemSelectingSummonerName,
    itemSelectingSummonerName,
    setItemSelectingSummonerName,
  };

  const openSocket = () => {
    if (socket.current) return;
    try {
      socket.current = new SockJS('https://backend.swoomi.me/ws-swoomi');
      stomp.current = Stomp.over(socket.current);

      stomp.current.connect({}, () => {
        stomp.current.subscribe(`/sub/comm/room/${matchTeamCode}`, (msg) => {
          const data: SocketSpellData = JSON.parse(msg.body);
          dispatcher.update(data);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (socket.current) return;
    openSocket();
  }, []);

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
