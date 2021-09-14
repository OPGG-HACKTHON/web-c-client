import React from 'react';
import { useTranslation } from 'react-i18next';

import './ShareButton.scss';

const ShareButton = ({ handleClickShare }) => {
  const { t } = useTranslation();

  return (
    <button onClick={handleClickShare} className="share-button">
      {t('room.share')}
    </button>
  );
};

export default ShareButton;
