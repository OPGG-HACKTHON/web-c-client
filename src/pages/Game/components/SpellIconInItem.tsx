import React from 'react';

interface SpellIconInItemProps {
  spellType: string;
  src: string;
  level?: number;
  time: number;
}

const SpellIconInItem = ({
  spellType,
  src,
  level,
  time,
}: SpellIconInItemProps) => {
  return spellType === 'R' ? (
    <div className={`ultimate ${time && 'gray-filter'}`}>
      <div className="ultimate-level">Lv.{level}</div>
      <img src={src} alt="궁" />
    </div>
  ) : (
    <div className={`icon ${time && 'gray-filter'}`}>
      <img src={src} alt="스펠" />
    </div>
  );
};

export default SpellIconInItem;
