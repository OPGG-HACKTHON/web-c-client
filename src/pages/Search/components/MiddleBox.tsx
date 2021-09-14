import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/common/images/logo.png';

import './MiddleBox.scss';

const MiddleBox = () => {
  const { t } = useTranslation();

  return (
    <div className="MiddleBox">
      <img src={logo} alt="스우미 로고" className="logo-imgage" />
      <span dangerouslySetInnerHTML={{ __html: t('mainValueHTML') }} />
    </div>
  );
};

export default MiddleBox;
