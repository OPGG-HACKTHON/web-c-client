import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import logo from '@/common/images/logo.png';
import tutorial from '@/common/images/tutorial.png';

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
      <img src={tutorial} alt="튜토리얼" className="tutorial" onClick={() => window.location.href = `/game/examplePage${uuidv4()}`} />
    </div>
  );
};

export default MiddleBox;
