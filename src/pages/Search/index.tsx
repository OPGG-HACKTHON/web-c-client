import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '@/common/helper/axios';

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
    <div>
      <div>Search page!</div>
      <input value={searchValue} onChange={(e) => setValue(e.target.value)} />
      <button onClick={onClickSearchBtn}>검색</button>
    </div>
  );
};

export default Search;
