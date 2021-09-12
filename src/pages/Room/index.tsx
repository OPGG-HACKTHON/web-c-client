import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import axios from '@/common/helper/axios';
import useInterval from '@/common/hooks/useInterval';
import ToastMessage from '@/common/components/ToastMessage';
import RoomHeader from './components/RoomHeader';
import ShareButton from './components/ShareButton';
import SummonerContainer from './components/SummonerContainer';

import './index.scss';

import MainImg from '@/common/images/MainImg.png';

const Room = () => {
  const [showShare, setShowShare] = useState<boolean>(false);
  const messageTimer = useRef(null);
  const urlRef = useRef();

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
          <span>아직 게임이 시작되지 않았어요.</span>
          <span>링크 공유를 통해 팀원들을 초대해보세요!</span>
        </div>
        <div className="room-bottom">
          <input ref={urlRef} value="https://swoomi.me/" readOnly />
          {showShare && (
            <ToastMessage content="링크가 복사되었습니다." time={1500} />
          )}
          <ShareButton handleClickShare={handleClickShare} />
        </div>
      </div>
    </div>
  );
};

export default Room;
