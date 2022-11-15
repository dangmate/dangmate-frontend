import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';

const S = {
  Text: styled.div`
    margin-top: ${getVwValue('10')};
    color: ${Common.colors.grey_disabled};
    & > strong {
      color: ${Common.colors.grey_sub};
    }
  `
};
interface IProps {
  views: number;
}

const CountHits = (props: IProps) => {
  return (
    <S.Text>
      <strong>{props.views}</strong> 마리 댕댕이가 보고 갔어요
    </S.Text>
  );
};

export default CountHits;
