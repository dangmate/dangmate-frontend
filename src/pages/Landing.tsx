import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { Body_B3, Title_T1 } from '../styles/style.font';
import { C } from '../styles/emotionStyle';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { guestState } from '../store/guest';

const S = {
  Wrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    padding: ${getVwValue('0 20')};
    text-align: center;
  `,
  Title: styled.div`
    padding-top: ${getVwValue('100')};
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
    width: 100%;
    height: ${getVwValue('282')};
    background: #f8f8f8;
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
  }, []);

  return (
    <S.Wrapper>
      <S.Title>
        <S.H2>댕댕이 동네친구 만들기 대작전!</S.H2>
      </S.Title>
      <S.ImageWrap></S.ImageWrap>
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
