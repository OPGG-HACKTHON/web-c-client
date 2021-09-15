import React, { useState, useRef, useEffect } from 'react';

import './index.scss';

interface ToastMessageProps {
  content: string;
  time?: number;
  isInGame?: boolean;
}

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
    >
      {content}
    </div>
  ) : (
    <div className={`toast-message ${showShare}`}>{content}</div>
  );
};

export default ToastMessage;
