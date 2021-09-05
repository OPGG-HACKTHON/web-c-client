import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchValue, setValue] = useState<string>('');

  const onClickSearchBtn = () => {
    // const { data } = axios.get(`http://3.34.111.116:8070/v1/summoner/${searchValue}`);
    // const { summonerName, summonerId } = data.data;
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
