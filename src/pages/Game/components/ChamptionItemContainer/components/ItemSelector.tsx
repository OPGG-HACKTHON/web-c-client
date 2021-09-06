import React, { useState, useCallback, useEffect } from 'react';

import backIcon from '@/common/images/icon-back.png';
import searchIcon from '@/common/images/icon-search-white.png';

import useGameData from '../../../hooks/useGameData';

import Item from './Item';

import './ItemSelector.scss';

const ItemSelector = () => {
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
    // TODO: 모든 아이템으로 수정 필요
    const itemList = frequentItems.map((item) => {
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
    const itemList = searchableItemList.filter(({ nameForSearch, englishNameForSearch }) => {
      return nameForSearch.includes(value) || englishNameForSearch.includes(value);
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
          onChange={({ target: { value } }) => setSearchValue(value.trim())}
        />
        <img className="search-icon" src={searchIcon} alt="검색" />
      </div>
      { !!searchValue && (
        <div className="item-list-container">
          <h4 className="title">검색된 아이템</h4>
          { searchedItemList.length
            ? (
              <div className="item-list">
                { searchedItemList.map((itemData) => (
                  <Item
                    itemData={itemData}
                    disabled={!getIsSelectedItem(itemData.name)}
                    onClick={() => onClickItem(itemData)}
                  />
                ))}
              </div>
            )
            : (
              <div className="no-result-text">검색된 아이템이 없습니다.</div>
            )}
        </div>
      )}
      <div className="item-list-container">
        <h4 className="title">추천 아이템</h4>
        <div className="item-list">
          { frequentItems.map((itemData) => (
            <Item
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
            <h4 className="title">선택된 아이템</h4>
            <div className="item-list">
              { selectedItemList.map((itemData) => (
                <Item
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
        >선택완료
        </button>
      </div>
    </div>
  );
};

export default ItemSelector;
