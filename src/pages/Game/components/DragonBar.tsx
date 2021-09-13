import React from 'react';

import dragon from '@/common/images/dragon.png';
import downArrow from '@/common/images/downArrow.png';
import upArrow from '@/common/images/upArrow.png';

import './DragonBar.scss';
import useGameData from '../hooks/useGameData';

function DragonBar() {
  const { dragonCnt, updateDragonCnt } = useGameData();

  const isMaxCnt = dragonCnt === 4;
  const isMinCnt = dragonCnt === 0;

  const upDragonCnt = () => updateDragonCnt(dragonCnt + 1);

  const downDragonCnt = () => updateDragonCnt(dragonCnt - 1);

  return (
    <div className="dragonContainer" id="dragonContainer">
      <div className="dragonBar">
        <span className="notice-container">
          <img src={dragon} alt="바람용" className="dragonImg" />
          <p>
            적팀이 바람용을
          </p>
          <div className="countBox">
            {dragonCnt}
          </div>
          <p>
            번 먹었어요.
          </p>
        </span>
        <div className="control-contianer">
          <div className={isMaxCnt ? 'arrowBox disabled' : 'arrowBox'} onClick={upDragonCnt}>
            <img src={upArrow} alt="바람용 횟수 화살표" />
          </div>
          <div className={isMinCnt ? 'arrowBox disabled' : 'arrowBox'} onClick={downDragonCnt}>
            <img src={downArrow} alt="바람용 횟수 화살표" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default DragonBar;
