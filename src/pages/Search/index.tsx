import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '@/common/helper/axios';
import ToastMessage from '@/common/components/ToastMessage';
import MainIcon from './components/MainIcon';
import MiddleBox from './components/MiddleBox';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';

import './index.scss';

const setScreenSize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const Search = () => {
  const history = useHistory();
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [searchValue, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState<boolean>(false);

  const messageTimer = useRef(null);
  const isPossibleSearch = searchValue !== '';

  const getMatchTeamCode = async (summonerName: string) => {
    try {
      const { data } = await axios.get(`/v1/match/status/${summonerName}`);
      const { matchTeamCode } = data.data;
      return matchTeamCode;
    } catch (err) {
      return null;
    }
  };

  const showMessage = () => {
    setShowShare(true);
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowShare(false);
      messageTimer.current = null;
    }, 1500);
  };

  const onClickSearchBtn = async () => {
    try {
      setLoading(true);
      const { data: nameData } = await axios.get(`/v1/summoner/${searchValue}`);
      const { summonerName } = nameData.data;
      localStorage.setItem('summonerName', summonerName);
      if (!nameData.success) throw new Error('not find');

      const { data } = await axios.get(`/v1/match/${summonerName}`);
      setLoading(false);
      if (data.data.matchStatus === false) {
        history.push(`/room/${summonerName}`);
      } else {
        const matchTeamCode = await getMatchTeamCode(summonerName);
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      setLoading(false);
      showMessage();
    }
  };

  useEffect(() => {
    setScreenSize();

    window.addEventListener('resize', setScreenSize);
    return () => window.removeEventListener('resize', setScreenSize);
  }, []);

  useEffect(() => {
    if (isFocusInput) {
      setTimeout(() => {
        const scrollElem = document.querySelector('.SearchPage');
        const scrollTop = scrollElem.scrollHeight - window.innerWidth + 64;
        window.scrollTo({ top: scrollTop });
      }, 200);
    }
  }, [isFocusInput]);

  useEffect(() => {
    const findUser = (e) => {
      if (e.key === 'Enter' && !loading) {
        onClickSearchBtn();
      }
    };
    document.addEventListener('keydown', findUser);
    return () => document.removeEventListener('keydown', findUser);
  }, [searchValue, loading]);

  return (
    <div className="SearchPage">
      <MainIcon />
      <MiddleBox />
      <SearchBar
        loading={loading}
        value={searchValue}
        setValue={setValue}
        setIsFocusInput={setIsFocusInput}
      />
      {showShare && (
        <ToastMessage content="닉네임을 확인해주세요." time={1500} />
      )}
      {isFocusInput || isPossibleSearch ? (
        <SearchButton
          onClick={onClickSearchBtn}
          isPossibleSearch={isPossibleSearch}
        />
      ) : null}
      <p className="version">v2109141352</p>
    </div>
  );
};

export default Search;
