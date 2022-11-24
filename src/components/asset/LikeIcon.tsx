import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Common } from '../../styles/common';
import ImageControl from './ImageControl';
import React from 'react';

const S = {
  LikeWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('44')};
    height: ${getVwValue('44')};
    background: ${Common.colors.primary_light};
    border-radius: ${getVwValue('12')};
  `
};

const LikeIcon = () => {
  return (
    <S.LikeWrap>
      <ImageControl
        width='22'
        // height='20'
        src={'/svg/like_true.svg'}
        alt={'profile'}
      ></ImageControl>
    </S.LikeWrap>
  );
};

export default LikeIcon;
