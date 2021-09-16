import { useEffect, useState, useCallback } from 'react';
import SpeechText from 'speak-tts';
import { useTranslation } from 'react-i18next';
import i18n from '@/global/languages/i18n';

const init = async (languageFromParent) => {
  const language = languageFromParent || i18n.language;
  let voice = language === 'ko-KR' ? 'Google 한국의' : 'Google US English';
  const rate = language === 'ko-KR' ? 1.2 : 1;

  const options = {
    volume: 0.7,
    lang: language,
    rate,
    pitch: 1,
    voice,
    listeners: {
      onvoiceschanged: (voices) => {
        voice = voices.find(v => v.name.includes('Google') && v.language === language)
        || voices.find(v => v.language === language)
        || voices[0];

        if (voice) {
          voice = voice.name;
        } else {
          voice = undefined;
        }
      },
    },
  };

  try {
    const speech = new SpeechText();
    await speech.init(options);
    if (speech.hasBrowserSupport()) {
      return speech;
    }
    throw new Error();
  } catch (err) {
    console.error('speak tts init first try err: ', err);
    console.log('speak tts second init try start');
  }

  try {
    const speech2 = new SpeechText();
    await speech2.init({ ...options, voice });
    if (speech2.hasBrowserSupport()) {
      return speech2;
    }
    throw new Error();
  } catch (err2) {
    console.error('speak tts init final try err: ', err2);
    throw err2;
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
          50,
        );
      },
    },
  });
};

export default () => {
  const { i18n: i18n2 } = useTranslation();
  const [speechText, setSpeechText] = useState(() => {});

  const initSpeechText = useCallback(async () => {
    const speech = await init(i18n2.language);
    setSpeechText(speech);
  }, [i18n2]);

  useEffect(() => {
    if (!i18n) return;
    initSpeechText();
  }, [i18n2]);

  return speechText;
};
