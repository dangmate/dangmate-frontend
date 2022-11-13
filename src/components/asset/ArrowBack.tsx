import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
const S = {
  Container: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  Arrow: styled.div`
    width: 100%;
    height: ${getVwValue('64')};
  `,
  ImgWrap: styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    padding: ${getVwValue('0 28')};
    vertical-align: center;
    cursor: pointer;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${getVwValue('10')};
      height: ${getVwValue('20')};
      object-fit: contain;
    }
  `
};

interface IProps {
  onClick: () => void;
}

const ArrowBack = (props: IProps) => {
  return (
    <S.Arrow>
      <S.ImgWrap onClick={props.onClick}>
        <img src='/images/back_arrow.png' alt='arrow' />
      </S.ImgWrap>
    </S.Arrow>
  );
};

export default ArrowBack;
