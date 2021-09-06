import React from 'react';
import cs from 'classnames';

import './Item.scss';

import { ItemData } from '../../../models/type';

interface ItemProps {
  itemData: ItemData;
  onClick?: Function;
  disabled?: Boolean;
}

const Item = ({
  itemData,
  onClick = () => {},
  disabled,
}: ItemProps) => {
  const { name, src } = itemData;

  // TODO: IE css filter 적용 필요

  return (
    <div
      className={cs('Item', { disabled })}
      onClick={(e) => onClick(e)}
    >
      <img
        className="image"
        src={src}
        alt={name}
      />
    </div>
  );
};

export default Item;
