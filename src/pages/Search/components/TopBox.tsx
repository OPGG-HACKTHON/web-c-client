import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import logo from '@/common/images/logo.png';
import TutorialButton from './TutorialButton';

import './TopBox.scss';

const { Option } = Select;

const TopBox = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = useCallback((value) => {
    i18n.changeLanguage(value);
  }, [i18n]);

  return (
    <div className="TopBox">
      <img src={logo} alt="스우미 로고" className="logo-image" />
      <div>
        <Select
          className="language-select"
          value={i18n.language}
          onChange={onChangeLanguage}
          size="small"
        >
          <Option value="ko-KR">한국어</Option>
          <Option value="en-US">English</Option>
        </Select>
        <TutorialButton />
      </div>
    </div>
  );
};

export default TopBox;
