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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const { data: nameData } = await axios.get(`/v1/summoner/${searchValue}`);
      const { summonerName } = nameData.data;
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
      console.log(err);
      setLoading(false);
      alert('없는 소환사');
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
    // return window.removeEventListener('resize', findHeight);
  }, []);

  return (
    <div className="Search-Page-Wrapper">
      <MainIcon />
      <MiddelBox />
      <SearchBar value={searchValue} setValue={setValue} setIsFocusInput={setIsFocusInput} loading={loading} />
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
