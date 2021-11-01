export type SpellKey = 'D' | 'F' | 'R';

export interface SocketSpellData {
  summonerName: string,
  changedSpell: SpellKey,
  ultTime: number,
  fspellTime: number,
  dspellTime: number,
  type: 'SPELL' | 'ITEM' | 'ULT',
}

export interface SocketDragonData {
  matchTeamCode: string,
  dragonCount: number
}

export interface SocketItemData {
  summonerName: string,
  championName: string,
  itemNames: string[],
  type: 'SPELL' | 'ITEM' | 'ULT',
  method: 'DELETE' | 'BUY',
}

export interface SocketUltData {
  summonerName: string,
  type: 'ULT',
  ultLevel: number,
}

export interface SpellTimeData {
  summonerName: string,
  cooltimeR: number,
  cooltimeF: number,
  cooltimeD: number,
}

export interface ContextType {
  gameData: ChampData[];
  loadingState: {
    loading: boolean;
    error: Error;
  };
  buyItems: (summonerName: string, items: string[])=> Promise<void>;
  cancelItem: (summonerName: string, itemName: string)=> Promise<void>;
  onUseSpell: (summonerName: string, spellType: SpellKey, timeGap?: number)=> Promise<void>;
  resetSpell: (summonerName: string, spellType: SpellKey)=> Promise<void>;
  updateGameData: (gameData: ChampData[])=> Promise<void>;
  dragonCnt: number,
  updateDragonCnt: (cnt: number)=> void;
  itemSelectingSummonerName: string | null,
  setItemSelectingSummonerName: Function,
  spellTimeError: React.MutableRefObject<boolean>,
  setSpellTimeError: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChampData {
  champName: string,
  summonerName: string,
  src: string,
  originalFrequentItems?: ItemData[],
  frequentItems: ItemData[],
  itemsPurchased: ItemData[] | null,
  spells: {
    D: SpellData,
    F: SpellData,
    R: SpellData,
  },
}

export interface SpellData {
  spellType: SpellKey,
  src: string,
  isOn: boolean,
  time: null | number,
  level?: number,
  name?: string
}

export interface ItemData {
  name: string,
  skillAccel: number,
  englishName: string,
  src: string
}

export interface ServerData {
  summonerName: string,
  championName: string,
  championImgUrl: string,
  ultImgUrl: string,
  spellDImgUrl: string,
  spellFImgUrl: string,
  frequentItems: ItemData[]
  spellDName: string,
  spellFName: string
}
