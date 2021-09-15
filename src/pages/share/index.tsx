import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import './index.scss';

import axios from 'axios';
import MainImg from '@/common/images/MainImg.png';
import logo from '@/common/images/logo.png';

const setScreenSize = ({ match }: RouteComponentProps) => {
  const { summonerName } = match.params;
  const [QRUrl, setQRUrl] = React.useState('');
  const history = useHistory();

  const getQR = async () => {
    const { data } = await axios.get(`https://backend.swoomi.me/v1/qr/${summonerName}`);
    setQRUrl(data.data.qrUrl);
  };
  React.useEffect(() => {
    getQR();
  });

  return (
    <div className="pageWrapper">
      <div className="pcWrapper">
        <img src={MainImg} alt="메인 이미지" className="main-image" />
        <img src={logo} alt="logo" className="share_logo" />
        <button onClick={() => history.push(`/room/${summonerName}`)}>웹으로 보기</button>
      </div>
      <div className="qrWrapper">
        <p>모바일로 보기</p>
        <span>휴대폰으로 QR코드를 스캔해주세요!</span>
        <img src={QRUrl} alt="qr코드" className="qr" />
      </div>
    </div>
  );
};

export default setScreenSize;
