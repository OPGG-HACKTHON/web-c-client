import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import MessageInGame from "@/common/components/MessageInGame";

import TopBar from "./components/Topbar.tsx";
import addToClipboard from "@/common/utils/addToClipboard";
import "./PrivateLayout.scss";

const PrivateLayout = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);
  const messageTimer = useRef(null);
  const summonerName = window.localStorage.summonerName;
  const { t } = useTranslation();

  const onClickShareBtn = () => {
    setShowMessage(true);
    addToClipboard(`https://swoomi.me/share/${summonerName}`);

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowMessage(false);
      messageTimer.current = null;
    }, 1800);
  };

  return (
    <div className='PrivateLayout'>
      <TopBar onClickShareBtn={onClickShareBtn} />
      <div id='app-body'>
        {showMessage && <MessageInGame content={t("room.linkCopied")} />}
        <div id='app-body-content'>{children}</div>
      </div>
    </div>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayout;
