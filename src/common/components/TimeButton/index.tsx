import React from 'react';
import './TimeButton.scss';

const TimeButton = ({
  time,
  leftTime,
  summonerName,
  spellType,
  updateTimeUsed,
}) => {
  const handleClick = () => {
    updateTimeUsed(
      summonerName,
      spellType,
      leftTime + parseInt(time) >= 0 ? leftTime + parseInt(time) : 0,
    );
  };

  return (
    <button className="TimeButton" onClick={handleClick}>
      {time}s
    </button>
  );
};

export default TimeButton;
