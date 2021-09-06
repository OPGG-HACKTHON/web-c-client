import React, { useEffect } from 'react';

import Champion from './Champion';

import './TopChampionBar.scss';

// TODO: Context 따라 수정
interface ChampionComponentProps {
  championId: number;
  onClick?: Function;
}

const TopChampionBar = ({
  onClick,
  championId,
}: ChampionComponentProps) => {
  useEffect(() => {
    //
  }, []);

  return (
    <div className="TopChampionBar">
      {[1, 2, 3, 4, 5].map(() => (
        <div
          className="container"
          onClick={(e) => onClick(e)}
        >
          <Champion championId={championId} />
        </div>
      ))}
    </div>
  );
};

export default TopChampionBar;
