import React, { useState } from 'react';
import ImageControl from '../../asset/ImageControl';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';

const S = {
  Like: styled.div`
    display: flex;
    align-items: center;
  `,
  Count: styled.div`
    margin-left: ${getVwValue('5')};
  `,
  LikeWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('24')};
    height: ${getVwValue('24')};
  `
};
const LikeAction = () => {
  const [like, setLike] = useState<boolean>(false);

  return (
    <S.Like>
      <S.LikeWrap>
        {like ? (
          <ImageControl
            width='24'
            // height='24'
            src={'/svg/like_true.svg'}
            alt={'profile'}
          ></ImageControl>
        ) : (
          <ImageControl
            width='18'
            height='16'
            src={'/svg/like.svg'}
            alt={'profile'}
          ></ImageControl>
        )}
      </S.LikeWrap>
      <S.Count onClick={() => setLike(!like)}>5</S.Count>
    </S.Like>
  );
};
export default LikeAction;
