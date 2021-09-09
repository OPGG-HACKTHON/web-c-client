import React from 'react';

import './SearchBar.scss';

const SearchBar = ({ setValue, setIsFocusInput }) => {
  return (
    <div className="Search-Bar">
      <input
        autoFocus
        placeholder="닉네임을 입력해주세요"
        spellCheck="false"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocusInput(true)}
        onBlur={() => setIsFocusInput(false)}
      />;
    </div>
  );
};

export default SearchBar;
