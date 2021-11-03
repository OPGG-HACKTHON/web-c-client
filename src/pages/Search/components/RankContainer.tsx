import React from 'react';

import Challenger from '@/common/images/rank/rank_challenger.png';
import Grandmaster from '@/common/images/rank/rank_grandmaster.png';
import Master from '@/common/images/rank/rank_master.png';
import Diamond from '@/common/images/rank/rank_diamond.png';
import Platinum from '@/common/images/rank/rank_platinum.png';
import Gold from '@/common/images/rank/rank_gold.png';
import RankItem from './RankItem';

import './RankContainer.scss';

const RankContainer = () => {
  const highRank = [null, Challenger, Grandmaster, Master, null];
  const lowRank = [null, Diamond, Platinum, Gold, null];

  return (
    <div className="RankContainer">
      <div className="rank-container rank-container-1">
        {highRank.map((rankImg, id) => <RankItem key={`rankImg-${id}`} rankImg={rankImg} line="1" />)}
      </div>
      <div className="rank-container rank-container-2">
        {lowRank.map((rankImg, id) => <RankItem key={`rankImg-${id}`} rankImg={rankImg} line="2" />)}
      </div>

    </div>
  );
};

export default RankContainer;
