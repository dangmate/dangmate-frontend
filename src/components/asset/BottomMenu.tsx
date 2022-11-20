import React from 'react';
import ImageControl from './ImageControl';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Common } from '../../styles/common';
import { Button_Btn2 } from '../../styles/style.font';

const S = {
  BottomMenu: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    height: ${getVwValue('56')};
    padding-left: ${getVwValue('20')};
    background: ${Common.colors.grey_white};
  `,
  Deem: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
  `,
  Text: styled.div`
    display: flex;
    margin-left: ${getVwValue('35')};
    ${Button_Btn2}
  `,
  ImageWrap: styled.div`
    width: ${getVwValue('20')};
    display: flex;
    justify-content: center;
  `
};

interface IProp {
  update?: () => void;
  delete?: () => void;
  deem?: () => void;
  updateText: string;
  deleteText: string;
}

const BottomMenu = (props: IProp) => {
  return (
    <>
      <S.BottomMenu>
        <S.Row onClick={props.update}>
          <S.ImageWrap>
            <ImageControl
              src={'/svg/update.svg'}
              width={'18'}
              height={'18'}
              alt={'update'}
            />
          </S.ImageWrap>
          <S.Text>{props.updateText}</S.Text>
        </S.Row>
        <S.Row onClick={props.delete}>
          <S.ImageWrap>
            <ImageControl
              src={'/svg/delete.svg'}
              width={'14'}
              height={'18'}
              alt={'delete'}
            />
          </S.ImageWrap>
          <S.Text>{props.deleteText}</S.Text>
        </S.Row>
      </S.BottomMenu>
      <S.Deem onClick={props.deem} />
    </>
  );
};

export default BottomMenu;
