import React from 'react';
import './TimeButton.scss';

const TimeButton = ({ time, handleClick }) => {
  return (
    <button className="TimeButton" onClick={handleClick}>
      {time}s
    </button>
  );
};

export default TimeButton;
