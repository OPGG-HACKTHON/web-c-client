import React from 'react';

import './SearchButton.scss';

const SearchButton = ({ onClick }) => {
  return (
    <div className="Search-Button">
      <button onClick={onClick}>검색하기</button>;
    </div>
  );
};

export default SearchButton;
