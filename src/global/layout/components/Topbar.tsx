import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import './Topbar.scss';

import logo from '@/common/images/logo.png';
// import info from '@/common/images/info.png';
import share from '@/common/images/share.png';

const { Option } = Select;

interface TopbarComponentProps {
  onClickInfoBtn?: ()=> void;
  onClickShareBtn?: ()=> void;
}

const Topbar = ({ onClickInfoBtn, onClickShareBtn }: TopbarComponentProps) => {
  const history = useHistory();
  const { i18n } = useTranslation();

  const onChangeLanguage = useCallback((value) => {
    i18n.changeLanguage(value);
  }, [i18n]);

  return (
    <div
      id="Topbar"
      className="Topbar"
    >
      <div className="topbar-container">
        <Select
          className="language-select"
          value={i18n.language}
          onChange={onChangeLanguage}
          size="small"
        >
          <Option value="ko-KR">한국어</Option>
          <Option value="en-US">English</Option>
        </Select>
        <img
          src={logo}
          alt="스우미 로고"
          className="logo-image"
          onClick={() => history.push('/')}
        />
        {/* <img
          src={info}
          alt="스우미 정보 버튼"
          className="info-image"
          onClick={() => onClickInfoBtn()}
        /> */}
        <img
          src={share}
          alt="링크 공유 버튼"
          className="share-image"
          onClick={() => onClickShareBtn()}
        />
      </div>
    </div>
  );
};

export default Topbar;
