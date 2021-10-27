import React, { useState, useCallback, useEffect } from 'react';
import i18n from '@/global/languages/i18n';

import { speechTextFunc } from '@/common/hooks/useSpeechText';
import { getChampionNameByLanguage, getSpellNameByLanguage } from '@/common/datas/championLaneData';

import ToastMessage from '@/common/components/ToastMessage';

import micOff from '@/common/images/micOff.png';
import micOn from '@/common/images/micOn.png';

import useGameData from '../../hooks/useGameData';
import { getGrammarString, interpret } from './data/grammer';

import './index.scss';

declare global {
  interface Window {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
  }
}

interface RecognitionInterface {
  abort: Function;
  stop: Function;
}

const LANGUAGE = 'ko-KR';

let forceEnd = false;
let debounceTimer = null;
let show;

const SpeechRecognition = () => {
  const { gameData, onUseSpell } = useGameData();
  const [recog, setRecog] = useState<RecognitionInterface>();
  const [isSpeechOn, setIsSpeechOn] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // TODO: SummonaryInfoContainer.tsx 과 중복되는 코드 제거
  const findChampElemsPos = useCallback(() => {
    const topbarElem = document.querySelector('#Topbar') as HTMLElement;
    const summonaryInfoContainerElem = document.querySelector('#SummonaryInfoContainer') as HTMLElement;
    const dragonElem = document.querySelector('#dragonContainer') as HTMLElement;
    const defaultHeight = topbarElem.offsetHeight + summonaryInfoContainerElem.offsetHeight + dragonElem.offsetHeight;
    const champElems = document.querySelectorAll('.ChampionContainer');
    const champsScrollPos = Array.from(champElems).map((elem: HTMLElement) => elem.offsetTop - defaultHeight);
    return champsScrollPos;
  }, [gameData]);

  // TODO: SummonaryInfoContainer.tsx 과 중복되는 코드 제거
  const scrollToChampion = useCallback((order) => {
    const champsScrollPos = findChampElemsPos();
    window.scrollTo({ top: champsScrollPos[order] });
  }, [gameData]);

  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognitionWebApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarListWebApi = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    if (!SpeechRecognitionWebApi || !SpeechGrammarListWebApi) {
      alert('음성 인식이 지원되지 않는 환경입니다. 아이폰을 제외한 기기에서 Chrome 브라우저를 사용해 주세요.');
      return;
    }

    const grammarString = getGrammarString();

    const recognition = new SpeechRecognitionWebApi();
    const recognitionList = new SpeechGrammarListWebApi();
    recognitionList.addFromString(grammarString, 1);
    recognition.grammars = recognitionList;

    recognition.lang = LANGUAGE;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 50;

    recognition.onresult = async (event) => {
      const transcriptList = Object.values(event.results[0]).map(
        ({ transcript }) => transcript,
      );
      const championNameList = gameData.map((s) => s.champName);
      const spellDict = gameData.reduce((acc, cur) => {
        acc[cur.champName] = [
          cur.spells.D.name,
          cur.spells.F.name,
        ];
        return acc;
      }, {});
      console.log('transcript list', transcriptList);
      const result = interpret(transcriptList, championNameList, spellDict);
      console.log('result', result);

      if (!result) {
        return;
      }

      const summoner = gameData.find(
        ({ champName }) => champName === result.champion,
      );
      if (!summoner) {
        return;
      }

      // TODO: 서버에서 스펠 종류 데이터를 내려주면 분류에 추가
      let spellType;
      if (result.action === 'R') {
        spellType = 'R';
      } else if (result.action === spellDict[result.champion][0]) {
        spellType = 'D';
      } else if (result.action === spellDict[result.champion][1]) {
        spellType = 'F';
      }

      if (!spellType) {
        return;
      }

      const isSpellOn = summoner.spells[spellType].isOn;
      const isUltimateLevelZero = summoner.spells[spellType].level === 0;
      if (!isSpellOn && !isUltimateLevelZero) {
        return;
      }

      const order = gameData.findIndex((s) => s.summonerName === summoner.summonerName);
      scrollToChampion(order);
      const spellText = getSpellNameByLanguage(summoner.spells[spellType].name, spellType);
      onUseSpell(summoner.summonerName, spellType);
      speechTextFunc(
        i18n.t('speech.speechRecognition'),
        `${getChampionNameByLanguage(result.champion)} ${spellText} ${i18n.t('speech.use')}`,
      );
    };

    recognition.onend = () => {
      if (!isSpeechOn && forceEnd) {
        console.log('음성 인식 종료');
        return;
      }

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log('음성 인식 구간 분리');
        recognition.start();
        debounceTimer = null;
      }, 100);
    };

    setRecog(recognition);
    recognition.start();
    setIsSpeechOn(true);
  }, [isSpeechOn, gameData]);

  const startRegog = useCallback(() => {
    if (isSpeechOn) {
      setIsSpeechOn(false);
      forceEnd = true;
    } else {
      setIsSpeechOn(true);
      forceEnd = false;
    }

    if (isSpeechOn && recog) {
      setIsSpeechOn(false);
      forceEnd = true;
      setTimeout(() => recog.abort(), 1000);
      return;
    }
    if (debounceTimer) return;
    initSpeechRecognition();
  }, [isSpeechOn, gameData, recog]);

  useEffect(() => {
    if (!isSpeechOn) return;
    setIsInfoVisible(true);
    setTimeout(() => setIsInfoVisible(false), 5000);
  }, [isSpeechOn]);

  return (
    <div
      className="SpeechRecognition"
      onClick={startRegog}
    >
      {isSpeechOn ? (
        <img className="mic on" src={micOn} alt="마이크 켜짐" />
      ) : (
        <img className="mic off" src={micOff} alt="마이크 꺼짐" />
      )}
      {isInfoVisible && (
        <ToastMessage
          content={i18n.t('speech.infoHTML')}
          time={5000}
          isInGame
        />
      )}
    </div>
  );
};

export default SpeechRecognition;
