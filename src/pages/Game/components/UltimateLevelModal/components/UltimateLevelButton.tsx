import React from 'react';

import './UltimateLevelButton.scss';

interface UltimateLevelButtonProps {
  currentLevel?: number;
  level: number;
  handleClick: Function;
}

const UltimateLevelButton = ({
  currentLevel,
  level,
  handleClick,
}: UltimateLevelButtonProps) => {
  return (
    <button
      className={`UltimateLevelButton ${
        currentLevel === level && 'current-level'
      }`}
      onClick={() => handleClick()}
    >
      {level}
    </button>
  );
};

export default UltimateLevelButton;
