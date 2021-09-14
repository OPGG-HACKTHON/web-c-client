import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import './index.scss';

import axios from 'axios';
import MainImg from '@/common/images/MainImg.png';

const setScreenSize = ({ match }: RouteComponentProps) => {
  const { summonerName } = match.params;
  const [QRUrl, setQRUrl] = React.useState('');

  const getQR = async () => {
    const { data } = await axios.get(`https://backend.swoomi.me/v1/qr/${summonerName}`);
    setQRUrl(data.data.qrUrl);
  };
  React.useEffect(() => {
    getQR();
  });

  return (
    <div className="pageWrapper">
      <div className="shareWrapper">
        <div className="qrWrapper">
          <p>MOBILE</p>
          <img src={QRUrl} alt="qr코드" className="qr" />
          <span>QR코드를 스캔하여<br />
            모바일로 접속 할 수 있습니다.
          </span>
        </div>
        <div className="pcWrapper">
          <p>WEB</p>
          <img src={MainImg} alt="메인 이미지" className="main-image" />
          <button>PC로 보기</button>
        </div>
      </div>
    </div>
  );
};

export default setScreenSize;
