import React from 'react';
import { useHistory } from 'react-router-dom';

import './Topbar.scss';

import logo from '@/common/images/logo.png';
import info from '@/common/images/info.png';
import share from '@/common/images/share.png';

interface TopbarComponentProps {
  onClickInfoBtn?: ()=> void;
  onClickShareBtn?: ()=> void;
}

const Topbar = ({ onClickInfoBtn, onClickShareBtn }: TopbarComponentProps) => {
  const history = useHistory();

  return (
    <div
      id="Topbar"
      className="Topbar"
    >
      <img src={logo} alt="스우미 로고" className="logo-image" onClick={() => history.push('/')} />
      <div className="Topbar-PrivateLayout">
        <img src={info} alt="스우미 정보 버튼" className="info-image" onClick={() => onClickInfoBtn()} />
        <img src={share} alt="링크 공유 버튼" className="share-image" onClick={() => onClickShareBtn()} />
      </div>
    </div>
  );
};

export default Topbar;
