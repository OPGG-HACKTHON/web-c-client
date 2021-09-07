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
  const [searchValue, setValue] = useState<string>('');

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
      const { data } = await axios.get(`/v1/match/${searchValue}`);
      if (data.data.matchStatus === false) {
        alert('게임 시작 안함');
      } else {
        const matchTeamCode = await getMatchTeamCode();
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      alert('없는 소환사');
    }
  };

  return (
    <div className="Search-Page-Wrapper">
      <MainIcon />
      <MiddelBox />
      <SearchBar setValue={setValue} />
      <SearchButton onClick={onClickSearchBtn} />
    </div>
  );
};

export default Search;
