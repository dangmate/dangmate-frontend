import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';

interface IProps {
  title: string;
}

const S = {
  Category: styled.div`
    padding: ${getVwValue('3 10')};
    border: 1px solid ${Common.colors.primary_emphasis};
    border-radius: ${getVwValue('16')};
    & > span {
      color: ${Common.colors.primary_emphasis};
    }
  `
};

const Category = (props: IProps) => {
  return (
    <S.Category>
      <span>{props.title}</span>
    </S.Category>
  );
};
export default Category;
