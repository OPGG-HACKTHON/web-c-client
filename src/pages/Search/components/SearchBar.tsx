import React from 'react';
import { IoMdClose } from 'react-icons/io';

import './SearchBar.scss';

const SearchBar = ({ value, setValue, setIsFocusInput }) => {
  const deleteText = () => {
    setValue('');
  };

  return (
    <div className="Search-Bar">
      <input
        autoFocus
        placeholder="닉네임을 입력해주세요"
        spellCheck="false"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocusInput(true)}
        onBlur={() => setIsFocusInput(false)}
      />
      <IoMdClose onClick={deleteText} />
    </div>
  );
};

export default SearchBar;
