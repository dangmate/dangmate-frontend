import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import ImageControl from '../asset/ImageControl';
import { Common } from '../../styles/common';
import { useLocation } from 'react-router-dom';
import { isMobile } from '../../hooks/useMobile';

const S = {
  Container: styled.div<{ isShow: boolean }>`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: ${Common.colors.primary};
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    visibility: ${(props) => (props.isShow ? 'visible' : 'hidden')};
    transition: opacity 0.1s ease-out, visibility 0.1s ease-out;
    z-index: 10000;
  `,
  ImageWrap: styled.div`
    position: fixed;
    bottom: ${getVwValue('117')};
    display: block;
  `,
  SvgWrap: styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${getVwValue('126')};
  `
};

const Splash = () => {
  const location = useLocation();
  const [isShow, setShow] = useState<boolean>(true);

  const setSplashState = () => {
    if (location.pathname === '/' && isMobile()) {
      setTimeout(() => setShow(false), 2000);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    setSplashState();
  }, []);

  return (
    <S.Container isShow={isShow}>
      <S.SvgWrap>
        <ImageControl
          width='108'
          height='88'
          src={'/images/logo.svg'}
          alt={'splash'}
          fit={'cover'}
        />
      </S.SvgWrap>
      <S.ImageWrap>
        <ImageControl
          width='360'
          height='200'
          src={'/images/splash.png'}
          alt={'splash'}
          // fit={'cover'}
        />
      </S.ImageWrap>
      {/*<ImageControl*/}
      {/*  width='360'*/}
      {/*  height='800'*/}
      {/*  src={'/images/splash.jpg'}*/}
      {/*  alt={'profile'}*/}
      {/*  fit={'cover'}*/}
      {/*/>*/}
    </S.Container>
  );
};

export default Splash;
