import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
const S = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: #888;
    text-align: center;
  `,
  Logo: styled.div`
    padding-top: 30vw;
  `,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
  `,
  Button: styled.div`
    & > button {
      width: 100vw;
      height: 20vw;
    }
  `,
  Login: styled.div`
    padding: 5vw;
    & > span {
      cursor: pointer;
    }
  `
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Logo>
        <div>logo</div>
        <h3>멍메이트</h3>
      </S.Logo>
      <S.Bottom>
        <S.Button>
          <button onClick={() => navigate('/join')}>시작하기</button>
        </S.Button>
        <S.Login>
          이미 계정이 있나요? <span>로그인</span>
        </S.Login>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Landing;
