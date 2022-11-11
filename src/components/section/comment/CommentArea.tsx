import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import Comment from './Comment';

const S = {
  Container: styled.div`
    margin-bottom: ${getVwValue('3')};
  `
};

const CommentArea = () => {
  return (
    <S.Container>
      <Comment />
    </S.Container>
  );
};

export default CommentArea;
