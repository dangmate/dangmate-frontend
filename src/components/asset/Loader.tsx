import React from 'react';

import './Loader.css';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';

const S = {
  Loader: styled.div`
    margin: ${getVwValue('30 0 100')};
  `
};

const Loader = () => {
  return (
    <S.Loader>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </S.Loader>
  );
};

export default Loader;
