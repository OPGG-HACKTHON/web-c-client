import React from 'react';

import dragon from '@/common/images/dragon.png';
import downArrow from '@/common/images/downArrow.png';
import upArrow from '@/common/images/upArrow.png';

import './DragonBar.scss';

function DragonBar() {
  return (
    <div className="dragonContainer">
      <div className="dragonBar">
        <span className="notice-container">
          <img src={dragon} alt="바람용" className="dragonImg" />
          <p>
            적팀이 바람용을
          </p>
          <div className="countBox">
            0
          </div>
          <p>
            번 먹었어요.
          </p>
        </span>
        <div className="control-contianer">
          <div className="arrowBox">
            <img src={upArrow} alt="바람용 횟수 화살표" />
          </div>
          <div className="arrowBox">
            <img src={downArrow} alt="바람용 횟수 화살표" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default DragonBar;
