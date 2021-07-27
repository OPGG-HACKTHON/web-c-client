import { useEffect, useState } from 'react';

export default () => {
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(isClient ? window.innerWidth : undefined);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const resize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return width;
};
