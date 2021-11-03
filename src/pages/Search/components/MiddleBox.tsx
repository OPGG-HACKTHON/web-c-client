import React from 'react';
import { useTranslation } from 'react-i18next';

import Breakpoints from '@/global/styles/breakPoints';

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
      {currentWidth > Breakpoints.md ? <span dangerouslySetInnerHTML={{ __html: t('mainValueHTMLWeb') }} /> : <span dangerouslySetInnerHTML={{ __html: t('mainValueHTML') }} />}

    </div>
  );
};

export default MiddleBox;
