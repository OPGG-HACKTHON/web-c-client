import React from 'react';

import './SearchButton.scss';

const SearchButton = ({ onClick, isPossibleSearch }) => {
  return (
    <div className="Search-Button">
      { isPossibleSearch
        ? <button onClick={onClick} className="possible">검색하기</button>
        : <button onClick={onClick} className="impossible" disabled>검색하기</button> }
    </div>
  );
};

export default SearchButton;
