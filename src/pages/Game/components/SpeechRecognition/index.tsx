import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useSpeechText from '@/common/hooks/useSpeechText';

import useGameData from '../../hooks/useGameData';
import { getGrammarString, interpret } from './data/grammer';

declare global {
  interface Window {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
  }
}

const LANGUAGE = 'ko-KR';

const SpeechRecognition = () => {
  const { gameData, onUseSpell } = useGameData();

  const speechText = useSpeechText();
  const { t } = useTranslation();

  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognitionWebApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarListWebApi = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    if (!SpeechRecognitionWebApi || !SpeechGrammarListWebApi) {
      console.log('Web Speech Api Not supported.');
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
      console.log(spellDict);
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
      let spellText;
      if (result.action === 'R') {
        spellType = 'R';
        spellText = t('ultimate');
      } else if (result.action === spellDict[result.champion][0]) {
        spellType = 'D';
        spellText = t(`spells.${result.action}`);
      } else if (result.action === spellDict[result.champion][1]) {
        spellType = 'F';
        spellText = t(`spells.${result.action}`);
      }

      if (!spellType) {
        return;
      }

      const isSpellOn = summoner.spells[spellType].isOn;
      if (!isSpellOn) {
        return;
      }

      onUseSpell(summoner.summonerName, spellType);
      speechText.speak({
        text: '음성 인식',
        queue: false,
        listeners: {
          onend: () => {
            setTimeout(
              () => speechText.speak({
                text: `${result.champion} ${spellText} 사용`,
                queue: false,
              }),
              300,
            );
          },
        },
      });
    };

    recognition.onend = () => {
      console.log('음성 인식 구간 분리');
      recognition.start();
    };

    recognition.start();
  }, [speechText, gameData]);

  // useEffect(() => {
  //   if (!speechText) return;
  //   initSpeechRecognition();
  // }, [speechText]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        cursor: 'pointer',
      }}
      onClick={() => initSpeechRecognition()}
    />
  );
};

export default SpeechRecognition;
