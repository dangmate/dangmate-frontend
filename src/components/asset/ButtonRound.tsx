import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Common } from '../../styles/common';

interface IProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: string;
  state?: 'enable' | 'disable';
  disabled: boolean;
}

const Button = styled.button<IProps>`
  width: 100%;
  height: ${getVwValue('56')};
  background-color: ${Common.colors.primary};
  border: none;
  border-radius: ${getVwValue('6')};
  color: #fff;
  &:disabled {
    background-color: ${Common.colors.grey_disabled};
  }
`;

const ButtonRound = (props: IProps) => {
  return (
    <Button disabled={props.disabled} type={props.type}>
      {props.children}
    </Button>
  );
};

export default ButtonRound;
