import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import Comment from './Comment';
import CommentReply from './CommentReply';

const S = {
  Container: styled.div`
    margin-bottom: ${getVwValue('3')};
  `,
  Reply: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `
};

const CommentArea = () => {
  return (
    <S.Container>
      <Comment reply={true} />
      <S.Reply>
        <Comment reply={false} />
      </S.Reply>
      {/*<CommentReply />*/}
    </S.Container>
  );
};

export default CommentArea;
