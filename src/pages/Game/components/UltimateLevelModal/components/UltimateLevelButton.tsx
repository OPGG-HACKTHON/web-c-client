import React, { useContext } from 'react';

import './UltimateLevelButton.scss';

interface UltimateLevelButton {
  level: number;
  handleClick: React.MouseEvent;
}

const UltimateLevelButton = ({ level, handleClick }) => {
  return (
    <button className="UltimateLevelButton" onClick={handleClick}>
      {level}
    </button>
  );
};

export default UltimateLevelButton;
