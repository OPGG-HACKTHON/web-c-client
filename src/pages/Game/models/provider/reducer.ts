import React from 'react';
import { ChampData } from '../type';

enum Action {
  LOADING,
  ERROR,
  SUCCESS,
  RENDER,
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
}

export const initState:FetchState = {
  champsData: null,
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
      return setFecthState(state.champsData, false, action.error);

    case Action.SUCCESS:
      return setFecthState(action.champsData, false, null);

    case Action.RENDER: {
      const newChampsData = [...state.champsData];
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

    error(error:Error) {
      dispatch({ type: Action.ERROR, error });
    },
  };
};
