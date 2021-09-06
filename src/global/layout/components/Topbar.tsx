import React from 'react';

import './Topbar.scss';

import logo from '@/common/images/logo.png';
import info from '@/common/images/info.png';
import share from '@/common/images/share.png';

interface TopbarComponentProps {
  onClickInfoBtn?: ()=> void;
  onClickShareBtn?: ()=> void;
}

const Topbar = ({ onClickInfoBtn, onClickShareBtn }: TopbarComponentProps) => {
  return (
    <div
      id="Topbar"
      className="Topbar"
    >
      <img src={logo} alt="스우미 로고" className="logo-imgage" />
      <img src={info} alt="스우미 정보 버튼" className="info-image" onClick={() => onClickInfoBtn()} />
      <img src={share} alt="링크 공유 버튼" className="share-image" onClick={() => onClickShareBtn()} />
    </div>
  );
};

export default Topbar;
