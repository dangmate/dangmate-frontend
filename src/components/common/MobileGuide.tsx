import React from 'react';
import styled from '@emotion/styled';

const S = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  `
};

const MobileGuide = () => {
  return (
    <S.Wrapper>
      <h2>모바일에 최적화된 서비스입니다.</h2>
    </S.Wrapper>
  );
};

export default MobileGuide;
