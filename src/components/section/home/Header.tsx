import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../../asset/ImageControl';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${getVwValue('25 20 20')};
  `,
  H2: styled.h2`
    font-size: ${getVwValue('20')};
  `
};

const Header = () => {
  return (
    <S.Container>
      <S.H2>공덕동 댕댕이들</S.H2>
      <ImageControl
        width='32'
        height='32'
        src={'/images/profile.png'}
        alt={'profile'}
      />
    </S.Container>
  );
};

export default Header;
