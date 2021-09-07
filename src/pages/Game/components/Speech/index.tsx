import React, { useEffect, useCallback } from 'react';

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

const Speech = () => {
  const {
    gameData,
    onUseSpell,
  } = useGameData();

  const init = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    if (!SpeechRecognition || !SpeechGrammarList) {
      console.log('Web Speech Api Not supported.');
      return;
    }

    const grammarString = getGrammarString();

    const recognition = new SpeechRecognition();
    const recognitionList = new SpeechGrammarList();
    recognitionList.addFromString(grammarString, 1);
    recognition.grammars = recognitionList;

    recognition.lang = 'ko-KR';
    // recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 50;

    recognition.onresult = async (event) => {
      const resultList = Object.values(event.results[0]).map(({ transcript }) => transcript);
      console.log(resultList);
      const result = interpret(resultList);
      console.log(result);

      if (!result) {
        return;
      }

      // TODO: 서버에서 스펠 종류 데이터를 내려주면 분류에 추가
      const summoner = gameData.find(({ champName }) => champName === result.champion);
      let spellType;
      if (result.action === 'R') {
        spellType = 'R';
      } else if (result.action === '노플') {
        spellType = 'F';
      } else {
        spellType = 'D';
      }

      const isSpellOn = summoner.spells[spellType].isOn;
      if (!isSpellOn) {
        return;
      }

      onUseSpell(summoner.summonerName, spellType);
    };

    recognition.onend = function () {
      console.log('음성 인식 구간 분리.');
      recognition.start();
    };

    recognition.start();
  }, [gameData]);

  useEffect(() => {
    // init();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 24,
        height: 24,
        cursor: 'pointer',
      }}
      onClick={() => init()}
    />
  );
};

export default Speech;
