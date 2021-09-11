import React from 'react';

import './UltimateLevelButton.scss';

interface UltimateLevelButtonProps {
  level: number;
  handleClick: Function;
}

const UltimateLevelButton = ({ level, handleClick }: UltimateLevelButtonProps) => {
  return (
    <button
      className="UltimateLevelButton"
      onClick={() => handleClick()}
    >
      {level}
    </button>
  );
};

export default UltimateLevelButton;
