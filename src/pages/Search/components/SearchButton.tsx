import React from 'react';
import { useTranslation } from 'react-i18next';

import './SearchButton.scss';

const SearchButton = ({ onClick, isPossibleSearch }) => {
  const { t } = useTranslation();

  return (
    <div className="SearchButton">
      { isPossibleSearch
        ? <button onClick={onClick} className="possible">{t('search.doSearch')}</button>
        : <button onClick={onClick} className="impossible" disabled>{t('search.doSearch')}</button> }
    </div>
  );
};

export default SearchButton;
