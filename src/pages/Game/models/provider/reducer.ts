/* eslint-disable no-param-reassign */
import React from 'react';
import { ChampData, SocketSpellData } from '../type';
import exampleData from './example';

enum Action {
  LOADING,
  ERROR,
  SUCCESS,
  RENDER,
  UPDATE,
}

export interface FetchState {
  champsData : ChampData[] | null,
  loading : boolean,
  error : Error | null,
}

interface IAction {
  type: Action,
  champsData? : ChampData[],
  error? : Error
  data? : SocketSpellData
}

export const initState:FetchState = {
  champsData: exampleData,
  loading: false,
  error: null,
};

const setFecthState = (champsData: ChampData[], loading : boolean, error : Error):FetchState => {
  return { champsData, loading, error };
};

export function reducer(state:FetchState, action:IAction) {
  switch (action.type) {
    case Action.LOADING:
      return setFecthState(state.champsData, true, null);

    case Action.ERROR:
      console.log(action.error);
      return setFecthState(state.champsData, false, action.error);

    case Action.SUCCESS:
      return setFecthState(action.champsData, false, null);

    case Action.RENDER: {
      const newChampsData = [...state.champsData];
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

    success(champsData:ChampData[]) {
      dispatch({ type: Action.SUCCESS, champsData });
    },

    render() {
      dispatch({ type: Action.RENDER });
    },

    update(data:SocketSpellData) {
      dispatch({ type: Action.UPDATE, data });
    },

    error(error:Error) {
      dispatch({ type: Action.ERROR, error });
    },
  };
};
