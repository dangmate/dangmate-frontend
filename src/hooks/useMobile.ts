import { useEffect, useState } from 'react';

export const isMobile = () => {
  const UserAgent = navigator.userAgent;
  return (
    UserAgent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
    ) !== null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null
  );
};
export const useMobileCheck = () => {
  const [mobile, setMobile] = useState<boolean>();

  const mobileState = () => {
    const minWidth = 500;
    return window.innerWidth < minWidth || isMobile();
  };

  useEffect(() => {
    setMobile(mobileState);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [mobileState]);

  const resizeHandler = () => {
    setMobile(mobileState);
  };

  return mobile;
};
