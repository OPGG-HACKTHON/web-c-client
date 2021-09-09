import React from 'react';

interface SpellIconInItemProps {
  spellType: string;
  src: string;
  level?: number;
}

const SpellIconInItem = ({ spellType, src, level }: SpellIconInItemProps) => {
  return spellType === 'R' ? (
    <div className="ultimate">
      <div className="ultimate-level">Lv.{level}</div>
      <img src={src} />
    </div>
  ) : (
    <div className="icon">
      <img src={src} />
    </div>
  );
};

export default SpellIconInItem;
