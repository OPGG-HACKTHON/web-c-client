import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import DownArrow from '@/common/images/downArrow.png';

import './TutorialButton.scss';

const TutorialButton = () => {
  const { t } = useTranslation();
  const onClick = () => {
    window.location.href = `/game/examplePage${uuidv4()}`;
  };
  return (
    <button className="TutorialButton" onClick={onClick}>
      <span>{t('search.tutorial')}</span>
      <img className="arrow"src={DownArrow} alt="화살표" />
    </button>
  );
};

export default TutorialButton;
