import React from 'react';

import ToastMessage from '../ToastMessage';

interface MessageInGameProps {
  content: string;
}

const MessageInGame = ({ content }: MessageInGameProps) => {
  return <ToastMessage content={content} time={1500} isInGame />;
};

export default MessageInGame;
