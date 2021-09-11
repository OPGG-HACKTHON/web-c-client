/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import _ from 'lodash';
import axios from '@/common/helper/axios';
import {
  ChampData, SpellKey, ServerData, SpellData,
} from '../type';

const gameDataManager = {
  async getChampsInitData(matchTeamCode: string): Promise<ChampData[]> {
    try {
      const { data } = await axios.get(`/v1/match/data/matchTeamCode/${matchTeamCode}`);
      const serverChampsData: ServerData[] = data.data;
      const champsData = gameDataManager.createChampsData(serverChampsData);
      return champsData;
    } catch (err) {
      throw err;
    }
  },

  createChampsData(champsServerData: ServerData[]): ChampData[] {
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

  buyItems(purchaserData: ChampData, items: string[]) {
    const preItemsPurchased = purchaserData.itemsPurchased ?? [];
    const initItemMap = { itemsPurchased: [...preItemsPurchased], itemsNotPurchased: [] };
    const itemMap = purchaserData.frequentItems.reduce((acc, itemData) => {
      if (items.includes(itemData.name)) acc.itemsPurchased.push(itemData);
      else acc.itemsNotPurchased.push(itemData);
      return acc;
    }, initItemMap);

    const { itemsPurchased, itemsNotPurchased } = itemMap;
    purchaserData.originalFrequentItems = purchaserData.originalFrequentItems || purchaserData.frequentItems;
    purchaserData.frequentItems = _.sortBy(
      itemsNotPurchased,
      (item) => purchaserData.originalFrequentItems.findIndex((i) => i.name === item.name),
    );
    purchaserData.itemsPurchased = [...itemsPurchased];
  },

  cancelItem(purchaserData: ChampData, itemName: string) {
    const initItemMap = { itemsPurchased: [], itemToCancel: null };

    const itemMap = purchaserData.itemsPurchased.reduce((acc, itemData) => {
      if (itemName === itemData.name) acc.itemToCancel = itemData;
      else acc.itemsPurchased.push(itemData);
      return acc;
    }, initItemMap);

    const { itemsPurchased, itemToCancel } = itemMap;
    purchaserData.itemsPurchased = [...itemsPurchased];
    purchaserData.originalFrequentItems = purchaserData.originalFrequentItems || purchaserData.frequentItems;
    purchaserData.frequentItems = _.sortBy(
      [...purchaserData.frequentItems, itemToCancel],
      (item) => purchaserData.originalFrequentItems.findIndex((i) => i.name === item.name),
    );
  },

  useSpell(userData: ChampData, spellType: SpellKey, second: number) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: second, isOn: false };
  },

  resetSpell(userData: ChampData, spellType: SpellKey) {
    const spellData = userData.spells[spellType] as SpellData;
    const { src } = spellData;
    userData.spells[spellType] = {
      src, spellType, time: null, isOn: true,
    };
  },

  updateSpellTime(userData: ChampData, spellType: SpellKey, changedTime: number) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: changedTime, isOn: false };
  },

  updateUltLevel(userData: ChampData, level: number) {
    const ultData = userData.spells.R;
    if (ultData.level === 0) userData.spells.R = { ...ultData, isOn: true, level };
    else userData.spells.R = { ...ultData, level };
  },

  countTime(userData: ChampData) {
    Object.keys(userData.spells).forEach((spellKey: SpellKey) => {
      const spellTime = userData.spells[spellKey].time;
      if (spellTime === 0) userData.spells[spellKey].time = null;
      else if (spellTime) userData.spells[spellKey].time -= 1;
    });
  },
};

export default gameDataManager;
