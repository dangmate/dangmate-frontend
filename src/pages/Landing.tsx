import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { Body_B2, Body_B3, Title_T1 } from '../styles/style.font';
import { C } from '../styles/emotionStyle';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { guestState } from '../store/guest';
import ImageControl from '../components/asset/ImageControl';
import { Common } from '../styles/common';

const S = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: ${getVwValue('0 20')};
    text-align: center;
  `,
  Title: styled.div`
    padding-top: ${getVwValue('70')};
  `,
  H2: styled.div`
    ${Title_T1}
  `,
  Bottom: styled.div`
    padding-bottom: ${getVwValue('70')};
  `,
  Button: styled.div`
    width: 100%;
  `,
  Login: styled.div`
    padding-bottom: ${getVwValue('52')};
    ${Body_B3}
    & > span {
      cursor: pointer;
    }
  `,
  ImageWrap: styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    margin-bottom: ${getVwValue('130')};
    flex: 1 1 0%;
  `,
  Text: styled.div`
    margin-top: ${getVwValue('8')};
    color: ${Common.colors.grey_headline};
    ${Body_B2};
  `
};
const Landing = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userState);
  const isGuest = useRecoilValue(guestState);

  useEffect(() => {
    if (!isGuest) {
      console.log(userData.fullName + '으로 로그인');
      navigate('/home');
    }
  }, [isGuest]);

  return (
    <S.Wrapper>
      <S.Title>
        <S.H2>댕댕이 동네친구 만들기</S.H2>
        <S.Text>우리 동네에는 어떤 댕댕이들이 살고 있을까요?</S.Text>
      </S.Title>
      <S.ImageWrap>
        <ImageControl
          width='277'
          height='282'
          src={'/images/landing_char.png'}
          alt={'char'}
        />
      </S.ImageWrap>
      <C.Bottom>
        <S.Login onClick={() => navigate('/home')}>일단 구경할게요!</S.Login>
        <S.Button onClick={() => navigate('/login')}>
          <ButtonRound disabled={false} type='button'>
            시작하기
          </ButtonRound>
        </S.Button>
      </C.Bottom>
    </S.Wrapper>
  );
};

export default Landing;
