import ImageControl from '../../asset/ImageControl';
import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
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
  `
};

const CommentAction = () => {
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
      <S.Count>3</S.Count>
    </S.Comment>
  );
};

export default CommentAction;
