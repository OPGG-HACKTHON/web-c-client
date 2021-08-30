export type SpellKey = 'D' | 'F' | 'R';

export interface ChampData {
  champName: string,
  summonerName: string,
  src: string,
  frequentItems: ItemData[],
  itemsPurchased: ItemData[] | null,
  spells: {
    D : SpellData,
    F : SpellData,
    R : SpellData,
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
  summonerName : string,
  championName : string,
  championImgUrl : string,
  ultImgUrl : string,
  spellDImgUrl : string,
  spellFImgUrl : string,
  frequentItems : ItemData[]
}
