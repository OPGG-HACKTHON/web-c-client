import { useEffect, useState, useCallback } from 'react';
import SpeechText from 'speak-tts';
import { useTranslation } from 'react-i18next';

export default () => {
  const { i18n } = useTranslation();
  const [speechText, setSpeechText] = useState(null);

  const initSpeechText = useCallback(() => {
    const speech = new SpeechText();
    speech.init({
      volume: 0.6,
      lang: i18n.language,
      rate: 1.2,
      pitch: 1,
      voice: 'Google 한국의',
    })
      .then((data) => {
        if (speech.hasBrowserSupport()) {
          console.log('Speech is ready', data);
          setSpeechText(speech);
        }
      })
      .catch((e) => {
        console.error('An error occured while initializing : ', e);
        setSpeechText(null);
      });
  }, [i18n]);

  useEffect(() => {
    if (!i18n) return;
    initSpeechText();
  }, [i18n]);

  return speechText;
};
