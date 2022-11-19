import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Body_B2 } from '../../../styles/style.font';

const S = {
  EmptyFeed: styled.div`
    padding: ${getVwValue('75 0 20')};
  `,
  Text: styled.div`
    text-align: center;
    ${Body_B2}
  `
};
const PostEmpty = () => {
  return (
    <S.EmptyFeed>
      <S.Text>댕댕이들에게 말을 걸어보세요!</S.Text>
    </S.EmptyFeed>
  );
};

export default PostEmpty;
