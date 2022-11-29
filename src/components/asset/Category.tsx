import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Common } from '../../styles/common';
import { Button_Btn3 } from '../../styles/style.font';

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
    display: flex;
    align-items: center;
    height: ${getVwValue('24')};
    padding: ${getVwValue('0 10')};
    border: 1px solid
      ${(props) =>
        props.active
          ? Common.colors.primary_light
          : Common.colors.primary_emphasis};
    border-radius: ${getVwValue('16')};
    background: ${(props) =>
      props.active ? Common.colors.primary_light : 'none'};
    & > span {
      display: block;
      color: ${Common.colors.primary_emphasis};
      ${Button_Btn3}
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
