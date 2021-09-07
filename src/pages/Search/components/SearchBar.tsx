import React from 'react';

import './SearchBar.scss';

const SearchBar = ({ setValue }) => {
  return (
    <div className="Search-Bar">
      <input placeholder="닉네임을 입력해주세요" spellCheck="false" onChange={(e) => setValue(e.target.value)} />;
    </div>
  );
};

export default SearchBar;
