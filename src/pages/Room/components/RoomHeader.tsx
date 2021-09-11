import React from 'react';
import { useHistory } from 'react-router-dom';

import './RoomHeader.scss';

import logo from '@/common/images/logo.png';
import back from '@/common/images/icon-back-purple.png';

const RoomHeader = () => {
  const history = useHistory();
  return (
    <div className="Topbar">
      <div className="room-topbar-container">
        <img
          src={back}
          alt="뒤로"
          className="back-image"
          onClick={() => history.push('/')}
        />
        <img
          src={logo}
          alt="스우미 로고"
          className="logo-image"
          onClick={() => history.push('/')}
        />
      </div>
    </div>
  );
};

export default RoomHeader;
