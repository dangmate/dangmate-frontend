import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import ImageControl from '../asset/ImageControl';
import { Common } from '../../styles/common';

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

const OnBoarding = (props: { isShow: boolean }) => {
  return (
    <S.Container isShow={props.isShow}>
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
          fit={'cover'}
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

export default OnBoarding;
