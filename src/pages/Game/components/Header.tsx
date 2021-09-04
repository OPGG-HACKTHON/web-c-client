import React from 'react';

import './Header.scss';

interface HeaderComponentProps {
  onClickInfoBtn?: () => void;
  onClickShareBtn?: () => void;
}

const Header = ({ onClickInfoBtn, onClickShareBtn }:HeaderComponentProps) => {
  return (
    <div className="Header">
      <img src="https://imgur.com/q06Mdx0.png" alt="스우미 로고" className="logo-imgage" />
      <img src="https://imgur.com/1y3WdrJ.png" alt="스우미 정보 버튼" className="info-image" onClick={() => onClickInfoBtn()} />
      <img src="https://imgur.com/Us2chF2.png" alt="링크 공유 버튼" className="share-image" onClick={() => onClickShareBtn()} />
    </div>
  );
};

export default Header;
