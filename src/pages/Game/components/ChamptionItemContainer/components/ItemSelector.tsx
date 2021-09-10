import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import backIcon from '@/common/images/icon-back-purple.png';
import searchIcon from '@/common/images/icon-search-purple.png';

import useGameData from '../../../hooks/useGameData';

import ITEM_LIST from './itemList';
import Item from './Item';

import './ItemSelector.scss';

const ItemSelector = () => {
  const { t } = useTranslation();
  const {
    gameData,
    buyItems,

    itemSelectingSummonerName,
    setItemSelectingSummonerName,
  } = useGameData();

  const [searchableItemList, setSearchableItemList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedItemList, setSearchedItemList] = useState([]);
  const [selectedItemList, setSelectedItemList] = useState([]);

  const champData = gameData.find((c) => c.summonerName === itemSelectingSummonerName);
  const { frequentItems } = champData;

  const getIsSelectedItem = useCallback((itemName) => {
    return selectedItemList.find((item) => item.name === itemName);
  }, [selectedItemList]);

  const onClickItem = useCallback((itemData) => {
    if (getIsSelectedItem(itemData.name)) {
      setSelectedItemList(selectedItemList.filter(({ name }) => name !== itemData.name));
      return;
    }
    setSelectedItemList([...selectedItemList, itemData]);
  }, [selectedItemList]);

  const onComplete = useCallback(() => {
    buyItems(champData.summonerName, selectedItemList.map(({ name }) => name));
    setItemSelectingSummonerName(null);
  }, [selectedItemList]);

  useEffect(() => {
    const itemList = ITEM_LIST.map((item) => {
      return {
        ...item,
        nameForSearch: item.name.replace(/\s/g, ''),
        englishNameForSearch: item.englishName.replace(/\s/g, ''),
      };
    });
    setSearchableItemList(itemList);
  }, [frequentItems]);

  useEffect(() => {
    const value = searchValue.replace(/\s/g, '');
    const itemList = searchableItemList.filter(({ nameForSearch, englishNameForSearch, colloq }) => {
      return nameForSearch.includes(value) || englishNameForSearch.includes(value) || colloq.includes(value);
    });
    setSearchedItemList(itemList);
  }, [searchableItemList, searchValue]);

  return (
    <div className="ItemSelector">
      <div className="top-container">
        <button className="back-btn" onClick={() => setItemSelectingSummonerName(null)}>
          <img src={backIcon} alt="닫기" />
        </button>
      </div>
      <div className="search-container">
        <input
          className="search-input"
          placeholder={t('ItemSelector.searchInputPlaceHolder')}
          onChange={({ target: { value } }) => setSearchValue(value.trim())}
        />
        <img className="search-icon" src={searchIcon} alt="검색" />
      </div>
      { !!searchValue && (
        <div className="item-list-container">
          <h4 className="title">{t('ItemSelector.searchedItem')}</h4>
          { searchedItemList.length
            ? (
              <div className="item-list">
                { searchedItemList.map((itemData) => (
                  <Item
                    key={itemData.name}
                    itemData={itemData}
                    disabled={!getIsSelectedItem(itemData.name)}
                    onClick={() => onClickItem(itemData)}
                  />
                ))}
              </div>
            )
            : (
              <div className="no-result-text">{t('ItemSelector.noSearchedItem')}</div>
            )}
        </div>
      )}
      <div className="item-list-container">
        <h4 className="title">{t('ItemSelector.frequentItem')}</h4>
        <div className="item-list">
          { frequentItems.map((itemData) => (
            <Item
              key={itemData.name}
              itemData={itemData}
              disabled={!getIsSelectedItem(itemData.name)}
              onClick={() => onClickItem(itemData)}
            />
          ))}
        </div>
      </div>
      <div className="bottom-container">
        { !!selectedItemList.length && (
          <div className="item-list-container">
            <h4 className="title">{t('ItemSelector.selectedItem')}</h4>
            <div className="item-list">
              { selectedItemList.map((itemData) => (
                <Item
                  key={itemData.name}
                  itemData={itemData}
                  disabled={!getIsSelectedItem(itemData.name)}
                  onClick={() => onClickItem(itemData)}
                />
              ))}
            </div>
          </div>
        )}
        <button
          className="complete-btn"
          disabled={!selectedItemList.length}
          onClick={() => onComplete()}
        >{t('ItemSelector.completeSelect')}
        </button>
      </div>
    </div>
  );
};

export default ItemSelector;
