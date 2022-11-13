import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';

interface IProps {
  title: string;
  active?: boolean;
  touch?: boolean;
  onClick?: () => void;
}

interface SProps {
  active?: boolean;
  touch?: boolean;
}
const S = {
  Category: styled.div<SProps>`
    padding: ${getVwValue('3 10')};
    border: 1px solid
      ${(props) =>
        props.active
          ? Common.colors.primary_light
          : Common.colors.primary_emphasis};
    border-radius: ${getVwValue('16')};
    background: ${(props) =>
      props.active ? Common.colors.primary_light : 'none'};
    & > span {
      color: ${Common.colors.primary_emphasis};
      font-size: ${getVwValue('13')};
    }
  `
};

const Category = (props: IProps) => {
  return (
    <S.Category active={props.active} onClick={props.onClick}>
      <span>{props.title}</span>
    </S.Category>
  );
};
export default Category;
