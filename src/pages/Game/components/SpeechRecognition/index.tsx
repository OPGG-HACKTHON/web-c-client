import React, { useState, useCallback } from 'react';
import i18n from '@/global/languages/i18n';

import { speechTextFunc } from '@/common/hooks/useSpeechText';
import { getChampionNameByLanguage, getSpellNameByLanguage } from '@/common/datas/championLaneData';

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

const SpeechRecognition = () => {
  const { gameData, onUseSpell } = useGameData();
  const [recog, setRecog] = useState<RecognitionInterface>();
  const [isStart, setIsStart] = useState(false);

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

      const spellText = getSpellNameByLanguage(summoner.spells[spellType].name, spellType);
      onUseSpell(summoner.summonerName, spellType);
      speechTextFunc(
        i18n.t('speech.speechRecognition'),
        `${getChampionNameByLanguage(result.champion)} ${spellText} ${i18n.t('speech.use')}`,
      );
    };

    recognition.onend = () => {
      console.log('음성 인식 구간 분리');
      recognition.start();
    };

    setRecog(recognition);
    recognition.start();
  }, [gameData]);

  const startRegog = useCallback(() => {
    setIsStart(true);
    if (recog) {
      recog.abort();
      recog.stop();
      return;
    }

    initSpeechRecognition();
  }, [gameData, recog]);

  if (!isStart) {
    return (
      <div
        className="SpeechRecognition"
        onClick={startRegog}
      >
        <img src={micOff} alt="마이크 꺼짐" />
      </div>
    );
  }

  return (
    <div
      className="SpeechRecognition"
      onClick={startRegog}
    >
      <img src={micOn} alt="마이크 켜짐" />
      <span className="material-icons">
        mic
      </span>
    </div>
  );
};

export default SpeechRecognition;
