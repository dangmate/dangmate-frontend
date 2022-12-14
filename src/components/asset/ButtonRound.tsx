import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Common } from '../../styles/common';
import { Button_Btn1 } from '../../styles/style.font';

interface IProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: string;
  state?: 'enable' | 'disable';
  disabled: boolean;
  onClick?: () => void;
}

const Button = styled.button<IProps>`
  width: 100%;
  height: ${getVwValue('56')};
  background-color: ${Common.colors.primary};
  border: none;
  color: #fff;
  ${Button_Btn1}
  &:disabled {
    background-color: ${Common.colors.grey_disabled};
  }
`;

const ButtonRound = (props: IProps) => {
  return (
    <Button disabled={props.disabled} type={props.type} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default ButtonRound;
