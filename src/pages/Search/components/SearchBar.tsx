import React from 'react';
import Breakpoints from '@/global/styles/breakPoints';

import { IoMdClose } from 'react-icons/io';

import './SearchBar.scss';
import Spinner from '@/common/components/spinner';

const SearchBar = ({
  value, setValue, setIsFocusInput, loading,
}) => {
  const deleteText = () => {
    setValue('');
    const searchElem = document.querySelector('#search-bar') as HTMLElement;
    searchElem.focus();
  };

  const isDesktop = window.innerWidth > Breakpoints.md;

  return (
    <div className="SearchBar">
      <input
        autoFocus={isDesktop}
        placeholder="닉네임을 입력해주세요"
        spellCheck="false"
        id="search-bar"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => {
          setIsFocusInput(true);
        }}
        onBlur={() => {
          setIsFocusInput(false);
        }}
        autoComplete="off"
      />
      {loading ? <Spinner /> : <IoMdClose onClick={deleteText} />}
    </div>
  );
};

export default SearchBar;
