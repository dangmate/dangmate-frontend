import React from 'react';
import styled from '@emotion/styled';
import { Common } from '../../../styles/common';
import { Button_Btn2 } from '../../../styles/style.font';

const S = {
  Time: styled.div`
    color: ${Common.colors.grey_body};
    ${Button_Btn2}
  `
};

interface IProps {
  data: string;
}
const PostTime = (props: IProps) => {
  return <S.Time>{props.data}</S.Time>;
};

export default PostTime;
