import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '@/common/helper/axios';
import MainIcon from './components/MainIcon';
import MiddelBox from './components/MiddleBox';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';

import './index.scss';

const Search = () => {
  const history = useHistory();
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [searchValue, setValue] = useState<string>('');

  const isPossibleSearch = searchValue !== '';

  const getMatchTeamCode = async () => {
    try {
      const { data } = await axios.get(`/v1/match/status/${searchValue}`);
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
      const { data } = await axios.get(`/v1/match/${nameData.summonerName}`);

      if (data.data.matchStatus === false) {
        history.push(`/room/${searchValue}`);
      } else {
        const matchTeamCode = await getMatchTeamCode();
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      console.log(err);
      alert('없는 소환사');
    }
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
      <SearchBar setValue={setValue} setIsFocusInput={setIsFocusInput} />
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
