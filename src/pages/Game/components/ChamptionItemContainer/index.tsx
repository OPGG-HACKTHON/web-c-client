import React from 'react';
import { useTranslation } from 'react-i18next';

import exclamationIconBackground from '@/common/images/icon-exclamation-background.png';
import exclamationIconContent from '@/common/images/icon-exclamation-content.svg';
import searchIcon from '@/common/images/icon-search-purple.png';

import useHorizontalScroll from '@/common/hooks/useHorizontalScroll';

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
  const { t } = useTranslation();
  const {
    buyItems, cancelItem,
    setItemSelectingSummonerName,
  } = useGameData();

  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const { summonerName, itemsPurchased = [], frequentItems = [] } = champData;

  return (
    <div className="ChamptionItemContainer">
      <div className="left-container">
        <div className="item-container" ref={scrollRef1}>
          {
            itemsPurchased?.length
              ? itemsPurchased?.map((itemData) => (
                <Item
                  key={itemData.name}
                  itemData={itemData}
                  onClick={() => cancelItem(summonerName, itemData.name)}
                />
              ))
              : (
                <h4 className="info-empty">
                  <img
                    className="icon-background"
                    src={exclamationIconBackground}
                    alt="느낌표 아이콘 배경"
                  />
                  <img
                    className="icon-content"
                    src={exclamationIconContent}
                    alt="느낌표 아이콘 컨텐츠"
                  />
                  {t('ChamptionItemContainer.nothingEquipped')}
                </h4>
              )
          }
        </div>
        <div className="item-container" ref={scrollRef2}>
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
