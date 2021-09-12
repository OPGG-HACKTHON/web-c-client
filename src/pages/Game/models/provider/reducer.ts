/* eslint-disable no-param-reassign */
import React from 'react';
import gameDataManager from '../managers/gameDataManager';
import {
  ChampData, SocketSpellData, SpellKey,
} from '../type';
import exampleData from './example';
import speak from '../managers/TTS';

enum Action {
  LOADING,
  ERROR,
  SUCCESS,
  RENDER,
  UPDATE,
  COUNT,
  ULTLEVEL,
  ITEM,
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
}

export const initState: FetchState = {
  champsData: exampleData,
  loading: false,
  error: null,
};

const setFecthState = (champsData: ChampData[], loading: boolean, error: Error): FetchState => {
  return { champsData, loading, error };
};

export function reducer(state: FetchState, action: IAction) {
  switch (action.type) {
    case Action.LOADING:
      return setFecthState(state.champsData, true, null);

    case Action.ERROR:
      return setFecthState(state.champsData, false, action.error);

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
      newChampsData.forEach((champData) => {
        if (champData.summonerName === summonerName) {
          const { time } = champData.spells[spellKey];
          if (time === 11) {
            const text = `${champData.champName} ${champData.spells[spellKey].name} 십초 전`;
            speak(text);
          }
          if (!time || time < 0) {
            champData.spells[spellKey].time = null;
            champData.spells[spellKey].isOn = true;
            const text = `${champData.champName} ${champData.spells[spellKey].name} 온`;
            speak(text);
            clearInterval(action.timer);
            const idx = action.timerList.indexOf(summonerName + spellKey);
            action.timerList.splice(idx, 1);
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
  };
};
