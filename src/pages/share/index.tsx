import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './index.scss';

import axios from 'axios';
import mainImg from '@/common/images/mainImg.png';
import logo from '@/common/images/logo.png';
import defaultQR from '@/common/images/defaultQR.png';

const setScreenSize = ({ match }: RouteComponentProps) => {
  const { summonerName } = match.params;
  const [QRUrl, setQRUrl] = React.useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const getQR = async () => {
    const { data } = await axios.get(
      `https://backend.swoomi.me/v1/qr/${summonerName}`,
    );
    setQRUrl(data.data.qrUrl);
  };
  React.useEffect(() => {
    getQR();
  });

  return (
    <div className="pageWrapper">
      <div className="pcWrapper">
        <img src={mainImg} alt="메인 이미지" className="main-image" />
        <img src={logo} alt="logo" className="share_logo" />
        <span className="main-value" dangerouslySetInnerHTML={{ __html: t('mainValueHTML') }} />
        <button onClick={() => history.push(`/room/${summonerName}`)}>
          {t('share.webView')}
        </button>
      </div>
      <div className="qrWrapper">
        <p>{t('share.mobileView')}</p>
        <span>{t('share.QRCode')}</span>
        {QRUrl ? (
          <img src={QRUrl} alt="qr코드" className="qr" />
        ) : (
          <img src={defaultQR} alt="qr코드" />
        )}
      </div>
    </div>
  );
};

export default setScreenSize;
