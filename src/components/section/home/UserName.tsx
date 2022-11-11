import ImageControl from './ImageControl';
import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';

const S = {
  Nick: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.span`
    margin-left: ${getVwValue('5')};
  `
};

interface IProps {
  src: string;
  alt: string;
  name: string;
}

const UserName = (props: IProps) => {
  return (
    <S.Nick>
      <ImageControl width='18' height='18' src={props.src} alt={props.alt} />
      <S.Text>{props.name}</S.Text>
    </S.Nick>
  );
};

export default UserName;
