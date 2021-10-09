import React from 'react';
import { IoMdClose } from 'react-icons/io';

import './index.scss';

interface INoticeProps {
  content: string;
}

function Notice({ content }: INoticeProps) {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  return (
    <div className="Notice">
      <span>{content}</span>
      <IoMdClose onClick={() => setVisible(false)} />
    </div>
  );
}

export default Notice;
