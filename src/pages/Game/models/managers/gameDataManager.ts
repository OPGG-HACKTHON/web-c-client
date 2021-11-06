/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import _ from 'lodash';
import axios from '@/common/helper/axios';
import i18n from '@/global/languages/i18n';
import { guessLane } from '@/common/datas/championLaneData.js';

import {
  ChampData, SpellKey, ServerData, SpellData, ItemData,
} from '../type';
import ITEM_LIST from '../../components/ChamptionItemContainer/components/itemList';

const gameDataManager = {
  async getChampsInitData(matchTeamCode: string): Promise<ChampData[]> {
    try {
      const { data } = await axios.get(`https://backend.swoomi.me/v1/match/opponents/by-match-team-code/${matchTeamCode}`);
      const serverChampsData: ServerData[] = data.data;
      const laneSortedServerChampsData: ServerData[] = guessLane(serverChampsData);
      const champsData = gameDataManager.createChampsData(laneSortedServerChampsData);
      return champsData;
    } catch (err) {
      throw err;
    }
  },

  async isGameOver(summonerName: string, history: any) {
    if (!summonerName) history.push('/');
    const { data } = await axios.get(`https://backend.swoomi.me/v1/match/status/${summonerName}`);
    return !data.data.matchStatus;
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
            name: data.spellDName,
          },
          F: {
            spellType: 'F',
            src: data.spellFImgUrl,
            time: null,
            isOn: true,
            name: data.spellFName,
          },
          R: {
            spellType: 'R',
            src: data.ultImgUrl,
            time: null,
            isOn: false,
            level: 0,
            name: '궁',
          },
        },
        itemsPurchased: null,
      };
    });
  },

  getItemDataByRiot(itemName: string) {
    let itemData = {};
    ITEM_LIST.forEach((riotData) => {
      if (riotData.name === itemName) {
        itemData = {
          name: itemName,
          skillAccel: Number(riotData.skillAccel),
          englishName: riotData.englishName,
          src: riotData.src,
        };
      }
    });
    return itemData;
  },

  buyItems(purchaserData: ChampData, items: string[]) {
    const preItemsPurchased = purchaserData.itemsPurchased ?? [];
    const initItemMap = { itemsPurchased: [...preItemsPurchased], itemsNotPurchased: [] };

    const itemMap = purchaserData.frequentItems.reduce((acc, itemData) => {
      if (items.includes(itemData.name)) {
        acc.itemsPurchased.push(itemData);
        const idx = items.indexOf(itemData.name);
        items.splice(idx, 1);
      } else acc.itemsNotPurchased.push(itemData);
      return acc;
    }, initItemMap);

    const { itemsPurchased, itemsNotPurchased } = itemMap;
    if (items.length !== 0) {
      items.forEach((itemName) => {
        const isAleadyPurchased = purchaserData.itemsPurchased && purchaserData.itemsPurchased.filter((itemData) => itemData.name === itemName).length !== 0;
        if (isAleadyPurchased) return;
        const itemData = gameDataManager.getItemDataByRiot(itemName) as ItemData;
        itemsPurchased.push(itemData);
      });
    }

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
      (item) => item && purchaserData.originalFrequentItems.findIndex((i) => i.name === item.name),
    );
  },

  useSpell(userData: ChampData, spellType: SpellKey, second: number) {
    const spellData = userData.spells[spellType] as SpellData;
    userData.spells[spellType] = { ...spellData, time: second, isOn: false };
  },

  resetSpell(userData: ChampData, spellType: SpellKey) {
    const spellData = userData.spells[spellType] as SpellData;
    if (spellType === 'R') {
      const { src, level, name } = spellData;
      userData.spells[spellType] = {
        src, spellType, time: null, isOn: true, level, name,
      };
    } else {
      const { src, name } = spellData;
      userData.spells[spellType] = {
        src, spellType, time: null, isOn: true, name,
      };
    }
  },

  updateSpellTime(userData: ChampData, spellType: SpellKey, changedTime: number) {
    const spellData = userData.spells[spellType] as SpellData;
    if (!changedTime || changedTime < 0 || isNaN(changedTime)) changedTime = 0;
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
