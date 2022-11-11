import React from 'react';
import styled from '@emotion/styled';
import { Common } from '../../../styles/common';

const S = {
  Time: styled.span`
    color: ${Common.colors.grey_body};
  `
};

const PostTime = () => {
  return <S.Time>4분 전</S.Time>;
};

export default PostTime;
