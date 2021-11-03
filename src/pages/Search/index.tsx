import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import { detect } from 'detect-browser';
import { useTranslation } from 'react-i18next';

import axios from '@/common/helper/axios';
import setRealVh from '@/common/helper/setRealVh';
import ToastMessage from '@/common/components/ToastMessage';
// import Notice from '@/common/components/Notice';

import rank375 from '@/common/images/rank375.png';
import rank500 from '@/common/images/rank500.png';
import rank720 from '@/common/images/rank720.png';
import rank1440 from '@/common/images/rank1440.png';

import MiddleBox from './components/MiddleBox';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';
import TopBox from './components/TopBox';
import RankContainer from './components/RankContainer';

import './index.scss';

const Search = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const messageTimer = useRef(null);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [searchValue, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [searchErrMsg, setSearchErrMsg] = useState<string>('');
  const [hasRiotError, setRiotError] = useState<boolean>(false);
  const [rankImg, setRankImg] = useState(rank375);
  const innerWidth = useRef(375);

  const browser = detect();
  const isSafari = browser.name === 'ios';
  const isPossibleSearch = searchValue !== '';
  const isSearchButtonVisible = !isSafari && (isFocusInput || isPossibleSearch);

  const onChangeLanguage = useCallback((value) => {
    i18n.changeLanguage(value);
  }, [i18n]);

  const getMatchTeamCode = async (summonerName: string) => {
    try {
      const { data } = await axios.get(`https://backend.swoomi.me/v1/match/get-match-team-code/${summonerName}`);
      const { matchTeamCode } = data.data;
      return matchTeamCode;
    } catch (err) {
      return null;
    }
  };

  const showMessage = (msg) => {
    setSearchErrMsg(msg);
    setShowShare(true);
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowShare(false);
      messageTimer.current = null;
    }, 1800);
  };

  const onClickSearchBtn = async () => {
    try {
      setLoading(true);
      const { data: nameData } = await axios.get(
        `https://backend.swoomi.me/v1/summoner/${String(searchValue).split('').join(' ')}`,
      );
      const { summonerName } = nameData.data;
      localStorage.setItem('summonerName', summonerName);
      if (!nameData.success) throw new Error('not find');

      const { data } = await axios.get(`https://backend.swoomi.me/v1/match/status/${summonerName}`);
      setLoading(false);
      axios.get(`https://backend.swoomi.me:9000/champion/visitor/user/${summonerName}`);
      if (data.data.matchStatus === false) {
        history.push(`/room/${summonerName}`);
      } else {
        const matchTeamCode = await getMatchTeamCode(summonerName);
        history.push(`/game/${matchTeamCode}`);
      }
    } catch (err) {
      setLoading(false);

      const serverType = err.response.config.url.split('/')[2];
      if (serverType === 'summoner')showMessage(t('search.checkNickname'));
      else showMessage(t('error.matchcodeErr'));
    }
  };

  const setCurrentRankImg = () => {
    const { innerWidth: currentWidth } = window;
    innerWidth.current = currentWidth;
    if (currentWidth < 500) setRankImg(rank375);
    else if (currentWidth < 720)setRankImg(rank500);
    else if (currentWidth < 1440)setRankImg(rank720);
    else setRankImg(rank1440);
  };

  const onResizeHandler = () => {
    setRealVh();
    setCurrentRankImg();
  };

  useEffect(() => {
    onResizeHandler();

    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);

  useEffect(() => {
    if (isFocusInput) {
      setTimeout(() => {
        const scrollElem = document.querySelector('.SearchPage');
        const scrollTop = scrollElem.scrollHeight - window.innerWidth + 64;
        window.scrollTo({ top: scrollTop });
      }, 200);
    }
  }, [isFocusInput]);

  useEffect(() => { /// 라이엇 에러
    // if (hasRiotError) return;
    // axios.get('/v1/common/ping').catch((err) => {
    //   console.log(err);
    //   if (err.response.status === 500) setRiotError(true);
    // });
  }, []);

  useEffect(() => {
    const findUser = (e) => {
      if (e.key === 'Enter' && !loading) {
        onClickSearchBtn();
      }
    };
    document.addEventListener('keydown', findUser);
    return () => document.removeEventListener('keydown', findUser);
  }, [searchValue, loading]);

  return (
    <div className="SearchPage">
      <TopBox innerWidth={innerWidth} />
      <MiddleBox />
      <SearchBar
        loading={loading}
        value={searchValue}
        setValue={setValue}
        setIsFocusInput={setIsFocusInput}
      />
      <img src={rankImg} alt="랭크 이미지" className="rankImg" />
      {/* <RankContainer /> */}
      {showShare && (
        <ToastMessage content={searchErrMsg} time={1800} />
      )}
      {isSearchButtonVisible && (
        <SearchButton
          onClick={onClickSearchBtn}
          isPossibleSearch={isPossibleSearch}
        />
      )}
      {/* <Notice content={t('error.tooManyUser')} /> */}
      <p className="version">v_211031_BETA_1</p>
    </div>
  );
};

export default Search;
