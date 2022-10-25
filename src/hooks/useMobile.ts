import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useMobileCheck = () => {
  const [mobile, setMobile] = useState<boolean>();
  const mobileState = () => {
    const minWidth = 500;
    return window.innerWidth < minWidth || isMobile;
  };
  useEffect(() => {
    setMobile(mobileState);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });
  const resizeHandler = () => {
    setMobile(mobileState);
  };
  return mobile;
};
