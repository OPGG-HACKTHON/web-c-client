import React from 'react';
import { IoMdClose } from 'react-icons/io';

import './SearchBar.scss';

const SearchBar = ({
  value, setValue, setIsFocusInput, loading,
}) => {
  const deleteText = () => {
    setValue('');
    const searchElem = document.querySelector('#searchBar') as HTMLElement;
    searchElem.focus();
  };

  return (
    <div className="Search-Bar">
      <input
        autoFocus
        placeholder="닉네임을 입력해주세요"
        spellCheck="false"
        id="searchBar"
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
        onFocus={(e) => {
          setIsFocusInput(true);
          e.preventDefault();
        }}
        onBlur={() => setIsFocusInput(false)}
      />
      {loading ? 'loading' : <IoMdClose onClick={deleteText} />}
    </div>
  );
};

export default SearchBar;
