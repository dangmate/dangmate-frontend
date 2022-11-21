import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';
import ImageControl from '../../asset/ImageControl';
import React from 'react';
import { Label_L2 } from '../../../styles/style.font';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${getVwValue('40 0 54')};
  `,
  Like: styled.div`
    display: flex;
    align-items: center;
  `,
  Count: styled.div`
    margin-top: ${getVwValue('10')};
    ${Label_L2}
  `,
  LikeWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('44')};
    height: ${getVwValue('44')};
    background: ${Common.colors.primary_light};
    border-radius: ${getVwValue('12')};
  `
};

interface IProps {
  relatedCount: number;
}
const CommentState = (props: IProps) => {
  return (
    <S.Container>
      <S.LikeWrap>
        <ImageControl
          width='22'
          // height='20'
          src={'/svg/like_true.svg'}
          alt={'profile'}
        ></ImageControl>
      </S.LikeWrap>
      <S.Count>
        {props.relatedCount
          ? `${props.relatedCount}마리 댕댕이들 대화 중`
          : '댕댕이한테 말을 걸어보세요!'}
      </S.Count>
    </S.Container>
  );
};

export default CommentState;
