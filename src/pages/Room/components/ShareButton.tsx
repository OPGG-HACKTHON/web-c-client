import React from 'react';
import './ShareButton.scss';

const ShareButton = ({ handleClickShare }) => {
  return (
    <button onClick={handleClickShare} className="share-button">
      공유하기
    </button>
  );
};

export default ShareButton;
