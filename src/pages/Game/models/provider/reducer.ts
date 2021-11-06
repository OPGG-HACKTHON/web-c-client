/* eslint-disable no-param-reassign */
import React from 'react';
import i18n from '@/global/languages/i18n';
import { getSpellNameByLanguage, getChampionNameByLanguage } from '@/common/datas/championLaneData';

import { speechTextFunc } from '@/common/hooks/useSpeechText';
import gameDataManager from '../managers/gameDataManager';

import {
  ChampData, SocketSpellData, SpellKey,
} from '../type';
import exampleData from './example';
import { dragonData } from './dragonData';

enum Action {
  LOADING,
  ERROR,
  SUCCESS,
  RENDER,
  UPDATE,
  COUNT,
  ULTLEVEL,
  ITEM,
  SEND,
}

export interface FetchState {
  champsData: ChampData[] | null,
  loading: boolean,
  error: Error | null,
}

interface IAction {
  type: Action,
  champsData?: ChampData[],
  error?: Error,
  data?: SocketSpellData,
  summonerName?: string,
  spellKey?: SpellKey,
  level?: number
  items?: string[]
  method?: string
  timer?: NodeJS.Timer
  timerList?: string[]
  stomp?: React.MutableRefObject<any>
  newUser?: string
  matchTeamCode?: string
}

export const initState: FetchState = {
  champsData: exampleData,
  loading: false,
  error: null,
};

const getChampAndSpellNameByLanguage = (champData, spellKey) => {
  const champName = getChampionNameByLanguage(champData.champName);
  const spellName = getSpellNameByLanguage(champData.spells[spellKey].name, spellKey);
  return { champName, spellName };
};

const setFecthState = (champsData: ChampData[], loading: boolean, error: Error): FetchState => {
  return { champsData, loading, error };
};

export function reducer(state: FetchState, action: IAction) {
  switch (action.type) {
    case Action.LOADING:
      return setFecthState(state.champsData, true, null);

    case Action.ERROR: {
      console.log(action.error);
      return setFecthState(state.champsData, false, action.error);
    }

    case Action.SUCCESS: {
      return setFecthState(action.champsData, false, null);
    }

    case Action.RENDER: {
      const newChampsData = [...state.champsData];
      return setFecthState(newChampsData, false, null);
    }

    case Action.ITEM: {
      const newChampsData = [...state.champsData];
      const { summonerName, items, method } = action;
      const userData = newChampsData.filter(
        (data) => data.summonerName === summonerName,
      )[0];

      if (method === 'BUY') {
        gameDataManager.buyItems(userData, items);
      }
      if (method === 'DELETE') {
        gameDataManager.cancelItem(userData, items[0]);
      }

      newChampsData.forEach((champData) => {
        if (champData.summonerName === action.summonerName) {
          champData = userData;
        }
      });

      return setFecthState(newChampsData, false, null);
    }

    case Action.COUNT: {
      const { summonerName, spellKey } = action;
      const newChampsData = [...state.champsData];
      newChampsData.forEach(async (champData) => {
        if (champData.summonerName === summonerName) {
          const { time } = champData.spells[spellKey];
          if (time === 11) {
            const { champName, spellName } = getChampAndSpellNameByLanguage(champData, spellKey);
            const text = `${champName} ${spellName}`;
            const secondText = i18n.t('speech.tenSecondsLeft');
            speechTextFunc(text, secondText);
          }
          if (time === 1) {
            champData.spells[spellKey].time = 0;
            champData.spells[spellKey].isOn = true;

            const { champName, spellName } = getChampAndSpellNameByLanguage(champData, spellKey);
            const text = `${champName}`;
            const secondText = `${spellName} ${i18n.t('speech.on')}`;
            speechTextFunc(text, secondText);
          }
          if (!time || time < 0) {
            clearInterval(action.timer);
            const idx = action.timerList.indexOf(summonerName + spellKey);
            action.timerList.splice(idx, 1);
            champData.spells[spellKey].time = null;
          } else champData.spells[spellKey].time -= 1;
        }
      });
      return setFecthState(newChampsData, false, null);
    }

    case Action.ULTLEVEL: {
      const { summonerName, level } = action;
      const newChampsData = [...state.champsData];
      newChampsData.forEach((champData) => {
        if (champData.summonerName === summonerName) {
          champData.spells.R.level = level;
        }
      });
      return setFecthState(newChampsData, false, null);
    }

    case Action.UPDATE: {
      const newChampsData = [...state.champsData];
      const {
        summonerName, ultTime, dspellTime, fspellTime,
      } = action.data;
      newChampsData.forEach((champData) => {
        if (champData.summonerName === summonerName) {
          champData.spells.D.time = dspellTime;
          champData.spells.F.time = fspellTime;
          champData.spells.R.time = ultTime;
        }
      });
      return setFecthState(newChampsData, false, null);
    }

    case Action.SEND: {
      const { stomp, newUser, matchTeamCode } = action;
      const socketData = {
        initData: { data: state.champsData, newUser, dragonCnt: dragonData.dragonCnt },
      };

      stomp.current.send(
        `/pub/comm/initData/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );
      return setFecthState(state.champsData, false, null);
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const createDispatcher = (dispatch: React.Dispatch<IAction>) => {
  return {
    loading() {
      dispatch({ type: Action.LOADING });
    },

    success(champsData: ChampData[]) {
      dispatch({ type: Action.SUCCESS, champsData });
    },

    render() {
      dispatch({ type: Action.RENDER });
    },

    update(data: SocketSpellData) {
      dispatch({ type: Action.UPDATE, data });
    },

    count(summonerName: string, spellKey: SpellKey, timer: NodeJS.Timer, timerList: string[]) {
      dispatch({
        type: Action.COUNT, summonerName, spellKey, timer, timerList,
      });
    },

    updateUltLevel(summonerName: string, level: number) {
      dispatch({ type: Action.ULTLEVEL, summonerName, level });
    },

    updateItem(summonerName: string, items: string[], method: string) {
      dispatch({
        type: Action.ITEM, summonerName, items, method,
      });
    },

    error(error: Error) {
      dispatch({ type: Action.ERROR, error });
    },

    send(stomp: React.MutableRefObject<any>, newUser: string, matchTeamCode: string) {
      dispatch({
        type: Action.SEND, stomp, newUser, matchTeamCode,
      });
    },
  };
};
