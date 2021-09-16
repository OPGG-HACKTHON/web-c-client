import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import setRealVh from '@/common/helper/setRealVh';
import axios from '@/common/helper/axios';
import useInterval from '@/common/hooks/useInterval';
import ToastMessage from '@/common/components/ToastMessage';
import mainImg from '@/common/images/mainImg.png';

import RoomHeader from './components/RoomHeader';
import ShareButton from './components/ShareButton';
import SummonerContainer from './components/SummonerContainer';

import './index.scss';

const Room = () => {
  const [showShare, setShowShare] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>('');
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

  const isGameStart = async () => {
    const { data } = await axios.get(`/v1/match/${summonerName}`);
    return data.data.matchStatus;
  };

  const redirectToGamePage = async () => {
    try {
      const isValidAction = await isGameStart();
      if (!isValidAction) return;
      const { data } = await axios.get(`/v1/match/status/${summonerName}`);
      const { matchTeamCode } = data.data;
      localStorage.setItem('summonerName', summonerName);
      window.location.href = `/game/${matchTeamCode}`;
    } catch (err) {
      console.log(err);
    }
  };

  const isValidUser = async () => {
    try {
      const { data } = await axios.get(`/v1/summoner/${summonerName}`);
      if (data) {
        const { data: img } = await axios.get(
          `v1/profileImgURL?summonerName=${summonerName}`,
        );
        setProfile(img.data);
      }
    } catch (err) {
      history.push('/');
    }
  };

  useLayoutEffect(() => {
    redirectToGamePage();
  }, []);

  useEffect(() => {
    isValidUser();
  }, []);

  const isMatchStarted = async () => {
    try {
      const { data } = await axios.get(`/v1/match/${summonerName}`);
      if (data.data.matchStatus) {
        const matchTeamCode = await getMatchTeamCode();
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      console.log('Match Not Started');
    }
  };

  useInterval(isMatchStarted, 5000);

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
    }, 1800);
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
        <SummonerContainer src={profile} summonerName={summonerName} />
        <div className="room-middle">
          <img src={mainImg} alt="메인 이미지" className="main-image" />
          <span>{t('room.gameNotStarted')}</span>
          <span>{t('room.inviteYourTeam')}</span>
        </div>
        <div className="room-bottom">
          <input
            ref={urlRef}
            value={encodeURI(`https://swoomi.me/share/${summonerName}`)}
            readOnly
          />
          {showShare && (
            <ToastMessage content={t('room.linkCopied')} time={1800} />
          )}
          <ShareButton handleClickShare={handleClickShare} />
        </div>
      </div>
    </div>
  );
};

export default Room;
