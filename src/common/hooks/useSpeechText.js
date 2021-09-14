import { useEffect, useState, useCallback } from 'react';
import SpeechText from 'speak-tts';
import { useTranslation } from 'react-i18next';

const init = async (language = 'ko-KR') => {
  const speech = new SpeechText();
  try {
    const data = await speech.init({
      volume: 0.6,
      lang: language,
      rate: 1.2,
      pitch: 1,
      voice: 'Google 한국의',
    });

    if (speech.hasBrowserSupport()) {
      console.log('Speech is ready', data);
      return speech;
    }
    throw new Error();
  } catch (err) {
    console.error('An error occured while initializing : ', err);
    throw err;
  }
};

export const speechTextFunc = async (text, secondText) => {
  const speechText = await init();
  speechText.speak({
    text,
    queue: false,
    listeners: {
      onend: () => {
        if (!secondText) return;
        setTimeout(
          () => speechText.speak({
            text: secondText,
            queue: false,
          }),
          100,
        );
      },
    },
  });
};

export default () => {
  const { i18n } = useTranslation();
  const [speechText, setSpeechText] = useState(() => {});

  const initSpeechText = useCallback(async () => {
    const speech = await init(i18n.language);
    console.log('speech', speech);
    setSpeechText(speech);
  }, [i18n]);

  useEffect(() => {
    if (!i18n) return;
    initSpeechText();
  }, [i18n]);

  return speechText;
};
