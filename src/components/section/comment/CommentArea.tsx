import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import Comment from './Comment';
const S = {
  Container: styled.div`
    margin-bottom: ${getVwValue('3')};
  `,
  Reply: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `
};

const CommentArea = (props: {
  commentData: any[];
  postId: string | undefined;
}) => {
  return (
    <S.Container>
      {props.commentData.map((comment, index) => (
        <Comment key={index} data={comment} postId={props.postId} />
      ))}
    </S.Container>
  );
};

export default CommentArea;
