import React from 'react';

import logo from '@/common/images/logo.png';

import './MiddelBox.scss';

const MiddelBox = () => {
  return (
    <div className="Middle-Box">
      <img src={logo} alt="스우미 로고" className="logo-imgage" />
      <span>편리하게, 정확한 <strong>스펠체크</strong>로 티어를 상승 시켜보세요</span>
    </div>
  );
};

export default MiddelBox;
