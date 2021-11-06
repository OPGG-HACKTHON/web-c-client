import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import Breakpoints from '@/global/styles/breakPoints';

import './SearchBar.scss';
import Spinner from '@/common/components/spinner';
import SearchIcon from './SearchIcon';

const SearchBar = ({
  value, setValue, setIsFocusInput, loading,
}) => {
  const { t } = useTranslation();

  const deleteText = () => {
    setValue('');
    const searchElem = document.querySelector('#search-bar') as HTMLElement;
    searchElem.focus();
  };

  // const isDesktop = window.innerWidth > Breakpoints.md;

  return (
    <div className="SearchBar">
      <SearchIcon />
      <input
        // autoFocus={isDesktop}
        placeholder={t('search.writeNickname')}
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
      {value && (loading ? <Spinner className="searchSpinner" /> : <IoMdClose onClick={deleteText} />)}
    </div>
  );
};

export default SearchBar;
