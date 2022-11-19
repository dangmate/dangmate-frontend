import ImageControl from '../../asset/ImageControl';
import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Button_Btn2 } from '../../../styles/style.font';
import { Common } from '../../../styles/common';
const S = {
  Comment: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${getVwValue('10')};
  `,
  CommentWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('24')};
    height: ${getVwValue('24')};
  `,
  Count: styled.div`
    margin-left: ${getVwValue('5')};
    color: ${Common.colors.grey_body};
    ${Button_Btn2}
  `
};
interface IProps {
  comment?: number;
}

const CommentAction = (props: IProps) => {
  return (
    <S.Comment>
      <S.CommentWrap>
        <ImageControl
          width='18'
          height='17'
          src={'/svg/comment.svg'}
          alt={'profile'}
        ></ImageControl>
      </S.CommentWrap>
      <S.Count>{props.comment}</S.Count>
    </S.Comment>
  );
};

export default CommentAction;
