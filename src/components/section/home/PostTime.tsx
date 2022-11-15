import React from 'react';
import styled from '@emotion/styled';
import { Common } from '../../../styles/common';

const S = {
  Time: styled.span`
    color: ${Common.colors.grey_body};
  `
};

interface IProps {
  data: string;
}
const PostTime = (props: IProps) => {
  return <S.Time>{props.data}</S.Time>;
};

export default PostTime;
