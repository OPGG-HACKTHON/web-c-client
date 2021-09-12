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
  const [showShare, setShowShare] = useState<boolean>(false);

  const messageTimer = useRef(null);
  const isPossibleSearch = searchValue !== '';

  const getMatchTeamCode = async (summonerName: string) => {
    try {
      const { data } = await axios.get(`/v1/match/status/${summonerName}`);
      const { matchTeamCode } = data.data;
      return matchTeamCode;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const onClickSearchBtn = async () => {
    try {
      const { data: nameData } = await axios.get(`/v1/summoner/${searchValue}`);
      const { summonerName } = nameData.data;
      if (!nameData.success) throw new Error('not find');

      const { data } = await axios.get(`/v1/match/${summonerName}`);
      if (data.data.matchStatus === false) {
        history.push(`/room/${summonerName}`);
      } else {
        const matchTeamCode = await getMatchTeamCode(summonerName);
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      console.log('되니');
      showMessage();
    }
  };

  const showMessage = () => {
    console.log('안된다');
    setShowShare(true);
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowShare(false);
      messageTimer.current = null;
    }, 1500);
  };

  React.useEffect(() => {
    const findUser = (e) => {
      if (e.key === 'Enter') onClickSearchBtn();
    };
    document.addEventListener('keydown', findUser);
    return () => document.removeEventListener('keydown', findUser);
  }, [searchValue]);

  return (
    <div className="Search-Page-Wrapper">
      <MainIcon />
      <MiddelBox />
      <SearchBar
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
