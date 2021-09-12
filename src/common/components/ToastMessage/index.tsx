import React, { useState, useRef, useEffect } from 'react';

import './index.scss';

interface ToastMessageProps {
  content: string;
  time?: number;
}

const ToastMessage = ({ content, time }: ToastMessageProps) => {
  const messageTimer = useRef(null);
  const [showShare, setShowShare] = useState('message-on');

  if (messageTimer.current) clearTimeout(messageTimer.current);
  useEffect(() => {
    setTimeout(() => {
      messageTimer.current = null;
      setShowShare('message-off');
    }, time - 200);
  }, [content]);

  return (
    showShare && <div className={`toast-message ${showShare}`}>{content}</div>
  );
};

export default ToastMessage;
