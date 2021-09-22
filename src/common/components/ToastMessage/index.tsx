import React, { useState, useRef, useEffect } from 'react';

import './index.scss';

interface ToastMessageProps {
  content: string;
  time?: number;
  isInGame?: boolean;
}

// TODO: 왜 time 을 받는데 외부에서 별개로 설정해주어야 하나요?
const ToastMessage = ({ content, time, isInGame }: ToastMessageProps) => {
  const messageTimer = useRef(null);
  const [showShare, setShowShare] = useState('message-on');

  if (messageTimer.current) clearTimeout(messageTimer.current);
  useEffect(() => {
    setTimeout(() => {
      messageTimer.current = null;
      setShowShare('message-off');
    }, time - 200);
  }, [content]);

  return isInGame ? (
    <div
      className={`toast-message message-ingame ${
        showShare === 'message-on' ? 'message-on-ingame' : 'message-off-ingame'
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <div
      className={`toast-message ${showShare}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ToastMessage;
