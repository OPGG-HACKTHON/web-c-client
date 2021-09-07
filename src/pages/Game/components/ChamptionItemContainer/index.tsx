import React from 'react';

import searchIcon from '@/common/images/icon-search-purple.png';

import { ChampData } from '../../models/type';
import useGameData from '../../hooks/useGameData';

import Item from './components/Item';

import './index.scss';

interface ChampionComponentProps {
  champData: ChampData;
}

const ChamptionItemContainer = ({
  champData,
}: ChampionComponentProps) => {
  const {
    buyItems, cancelItem,
    setItemSelectingSummonerName,
  } = useGameData();
  const { summonerName, itemsPurchased = [], frequentItems = [] } = champData;

  return (
    <div className="ChamptionItemContainer">
      <div className="left-container">
        <div className="item-container">
          {
            itemsPurchased?.map((itemData) => (
              <Item
                key={itemData.name}
                itemData={itemData}
                onClick={() => cancelItem(summonerName, itemData.name)}
              />
            ))
          }
        </div>
        <div className="item-container">
          {
            frequentItems?.map((itemData) => {
              const isPurchased = itemsPurchased?.find((item) => item.name === itemData.name);

              return (
                <Item
                  key={itemData.name}
                  itemData={itemData}
                  onClick={() => buyItems(summonerName, [itemData.name])}
                  disabled={!isPurchased}
                />
              );
            })
          }
        </div>
      </div>
      <button
        className="search-btn"
        onClick={() => setItemSelectingSummonerName(summonerName)}
      >
        <img src={searchIcon} alt="검색 아이콘" />
      </button>
    </div>
  );
};

export default ChamptionItemContainer;
