import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/common/images/logo.png';

import './MiddleBox.scss';

const MiddleBox = () => {
  const { t } = useTranslation();

  const [currentWidth, setCurrentWidth] = React.useState(700);
  React.useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setCurrentWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="MiddleBox">
      <img src={logo} alt="스우미 로고" className="logo-image" />
      {currentWidth > 720 ? <span dangerouslySetInnerHTML={{ __html: t('mainValueHTMLWeb') }} /> : <span dangerouslySetInnerHTML={{ __html: t('mainValueHTML') }} />}
    </div>
  );
};

export default MiddleBox;
