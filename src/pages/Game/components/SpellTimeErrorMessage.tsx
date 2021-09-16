import React, { useState, useEffect, useRef } from 'react';
import MessageInGame from '@/common/components/MessageInGame';
import { useTranslation } from 'react-i18next';

const SpellTimeErrorMessage = ({ spellTimeError }) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const modalTimer = useRef(null);
  const { t } = useTranslation();

  const openMessage = () => {
    if (modalTimer.current) {
      clearTimeout(modalTimer.current);
    }

    modalTimer.current = setTimeout(() => {
      modalTimer.current = null;
      setShowMessage(false);
      spellTimeError.current = false;
    }, 1800);
  };

  useEffect(() => {
    setShowMessage(true);
    openMessage();
  }, [spellTimeError.current]);

  return (
    showMessage && <MessageInGame content={t('game.championItem.coolTime')} />
  );
};

export default SpellTimeErrorMessage;
