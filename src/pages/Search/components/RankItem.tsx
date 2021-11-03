import React from 'react';

import './RankItem.scss';

interface RankItemProps {
  rankImg?: string;
  line: string;
}

const RankItem = ({ rankImg, line }: RankItemProps) => {
  return (
    <div className={`RankItem rank-line-${line} ${rankImg || 'rank-null'}`}>
      {rankImg && <img src={rankImg} alt="랭크 이미지" />}
    </div>

  );
};

export default RankItem;
