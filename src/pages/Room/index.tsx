import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import setRealVh from '@/common/helper/setRealVh';
import axios from '@/common/helper/axios';
import useInterval from '@/common/hooks/useInterval';
import ToastMessage from '@/common/components/ToastMessage';
import MainImg from '@/common/images/MainImg.png';

import RoomHeader from './components/RoomHeader';
import ShareButton from './components/ShareButton';
import SummonerContainer from './components/SummonerContainer';

import './index.scss';

const Room = () => {
  const [showShare, setShowShare] = useState<boolean>(false);
  const messageTimer = useRef(null);
  const urlRef = useRef();
  const { t } = useTranslation();

  const location = useLocation();
  const history = useHistory();

  const nameIndex = 1;
  const summonerName = location.pathname.split('/room/')[nameIndex];

  const getMatchTeamCode = async () => {
    try {
      const { data } = await axios.get(`/v1/match/status/${summonerName}`);
      const { matchTeamCode } = data.data;
      return matchTeamCode;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const isMatchStarted = async () => {
    try {
      const { data } = await axios.get(`/v1/match/${summonerName}`);
      if (data.data.matchStatus) {
        const matchTeamCode = await getMatchTeamCode();
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useInterval(isMatchStarted, 10000);

  const handleClickShare = (e) => {
    e.preventDefault();
    setShowShare(true);
    const urlElem = urlRef.current as HTMLInputElement;
    urlElem.select();
    document.execCommand('copy');

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowShare(false);
      messageTimer.current = null;
    }, 1500);
  };

  useEffect(() => {
    setRealVh();

    window.addEventListener('resize', setRealVh);
    return () => window.removeEventListener('resize', setRealVh);
  }, []);

  return (
    <div className="Room">
      <RoomHeader />
      <div className="room-container">
        <SummonerContainer
          src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4904.jpg?image=q_auto:best&v=1518361200"
          summonerName={summonerName}
        />
        <div className="room-middle">
          <img src={MainImg} alt="메인 이미지" className="main-image" />
          <span>{t('room.gameNotStarted')}</span>
          <span>{t('room.inviteYourTeam')}</span>
        </div>
        <div className="room-bottom">
          <input ref={urlRef} value="https://swoomi.me/" readOnly />
          {showShare && (
            <ToastMessage content={t('room.linkCopied')} time={1500} />
          )}
          <ShareButton handleClickShare={handleClickShare} />
        </div>
      </div>
    </div>
  );
};

export default Room;
