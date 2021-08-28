/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import {
  ChampData, SpellKey, ServerData, SpellData,
} from '../type';

const gameDataManager = {
  async getChampsInitData():Promise<ChampData[]> {
    try {
      const { data }: { data :ServerData[] } = await axios.get('url');
      const champsData = gameDataManager.createChampsData(data);
      return champsData;
    } catch (err) {
      throw err;
    }
  },

  createChampsData(champsServerData:ServerData[]):ChampData[] {
    return champsServerData.map((data) => {
      return {
        champName: data.championName,
        summonerName: data.summonerName,
        src: data.championImgUrl,
        frequentItems: data.frequentItems,
        spells: {
          D: {
            spellType: 'D',
            src: data.spellDImgUrl,
            time: null,
            isOn: true,
          },
          F: {
            spellType: 'F',
            src: data.spellFImgUrl,
            time: null,
            isOn: true,
          },
          R: {
            spellType: 'R',
            src: data.ultImgUrl,
            time: null,
            isOn: false,
            level: 0,
          },
        },
        itemsPurchased: null,
      };
    });
  },

  buyItems(purchaserData : ChampData, items : string[]) {
    const preItemsPurchased = purchaserData.itemsPurchased ?? [];
    const initItemMap = { itemsPurchased: [...preItemsPurchased], itemsNotPurchased: [] };
    const itemMap = purchaserData.frequentItems.reduce((acc, itemData) => {
      if (items.includes(itemData.name)) acc.itemsPurchased.push(itemData);
      else acc.itemsNotPurchased.push(itemData);
      return acc;
    }, initItemMap);

    const { itemsPurchased, itemsNotPurchased } = itemMap;
    purchaserData.frequentItems = [...itemsNotPurchased];
    purchaserData.itemsPurchased = [...itemsPurchased];
  },

  cancleItem(purchaserData : ChampData, itemName : string) {
    const initItemMap = { itemsPurchased: [], itemToCancle: null };
    const itemMap = purchaserData.itemsPurchased.reduce((acc, itemData) => {
      if (itemName === itemData.name) acc.itemToCancle = itemData;
      else acc.itemsPurchased.push(itemData);
      return acc;
    }, initItemMap);

    const { itemsPurchased, itemToCancle } = itemMap;
    purchaserData.itemsPurchased = [...itemsPurchased];
    purchaserData.frequentItems = [...purchaserData.frequentItems, itemToCancle];
  },

  useSpell(userData : ChampData, spellType: SpellKey, second: number) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: second, isOn: false };
  },

  resetSpell(userData : ChampData, spellType: SpellKey) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: null, isOn: true };
  },

  updateSpellTime(userData : ChampData, spellType: SpellKey, changedTime: number) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: changedTime, isOn: false };
  },

  updateUltLevel(userData : ChampData, level: number) {
    const ultData = userData.spells.R;
    if (ultData.level === 0) userData.spells.R = { ...ultData, isOn: true, level };
    else userData.spells.R = { ...ultData, level };
  },
};

export default gameDataManager;