import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import { Common } from '../styles/common';

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
  Bottom: styled.div`
    padding-bottom: ${getVwValue('70')};
  `,
  Button: styled.div`
    width: 100%;
    & > button {
      width: 100%;
      height: ${getVwValue('56')};
      background-color: ${Common.colors.primary};
      border: none;
      border-radius: ${getVwValue('6')};
      color: #fff;
    }
  `,
  Login: styled.div`
    padding: 5vw;
    & > span {
      cursor: pointer;
    }
  `
};

const Login1 = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Title>
        <div>댕댕이 동네친구 만들기 대작전!</div>
        {/*<h3>멍메이트</h3>*/}
      </S.Title>
      <div>이미지</div>
      <S.Bottom>
        <S.Button>
          <button onClick={() => navigate('/join')}>시작하기</button>
        </S.Button>
        <S.Login>일단 구경할게요!</S.Login>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Login1;
