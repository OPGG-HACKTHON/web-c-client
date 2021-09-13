import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '@/common/helper/axios';
import ToastMessage from '@/common/components/ToastMessage';
import MainIcon from './components/MainIcon';
import MiddelBox from './components/MiddleBox';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';

import './index.scss';

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
      console.log(summonerName);
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

  React.useEffect(() => {
    const findUser = (e) => {
      if (e.key === 'Enter' && !loading) {
        onClickSearchBtn();
      }
    };
    document.addEventListener('keydown', findUser);
    return () => document.removeEventListener('keydown', findUser);
  }, [searchValue, loading]);

  React.useEffect(() => {
    const findHeight = () => {
      const wrapperElem = document.querySelector('.Search-Page-Wrapper') as HTMLElement;
      wrapperElem.style.height = `${window.innerHeight}px`;
    };
    findHeight();
    window.addEventListener('resize', findHeight);
  }, []);

  return (
    <div className="Search-Page-Wrapper">
      <MainIcon />
      <MiddelBox />
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
    </div>
  );
};

export default Search;
