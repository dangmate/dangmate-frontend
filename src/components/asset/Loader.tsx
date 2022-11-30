import React from 'react';

import './Loader.css';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';

const S = {
  Loader: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: ${getVwValue('0 0 100')};
  `
};

const Loader = () => {
  return (
    <S.Loader>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </S.Loader>
  );
};

export default Loader;
