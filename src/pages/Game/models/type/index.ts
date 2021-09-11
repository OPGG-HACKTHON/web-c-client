export type SpellKey = 'D' | 'F' | 'R';

export interface SocketSpellData {
  summonerName: string,
  changedSpell: SpellKey,
  ultTime: number,
  fspellTime: number,
  dspellTime: number,
  type: 'SPELL' | 'ITEM',
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
  onUseSpell: (summonerName: string, spellType: SpellKey)=> Promise<void>;
  resetSpell: (summonerName: string, spellType: SpellKey)=> Promise<void>;
  updateGameData: (gameData: ChampData[])=> Promise<void>;

  itemSelectingSummonerName: string | null,
  setItemSelectingSummonerName: Function,
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
  level?: number
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
}
