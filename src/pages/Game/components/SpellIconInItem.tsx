import React from 'react';

interface SpellIconInItemProps {
  spellType: string;
  handleClick: (e: React.MouseEvent)=> void;
  src: string;
  level?: number;
}

const SpellIconInItem = ({
  spellType,
  handleClick,
  src,
  level,
}: SpellIconInItemProps) => {
  return spellType === 'R' ? (
    <div className="ultimate" onClick={handleClick}>
      <div className="ultimate-level">Lv.{level}</div>
      <img src={src} />
    </div>
  ) : (
    <div className="icon" onClick={handleClick}>
      <img src={src} />
    </div>
  );
};

export default SpellIconInItem;
