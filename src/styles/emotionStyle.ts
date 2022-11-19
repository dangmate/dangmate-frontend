import styled from '@emotion/styled';
import { getVwValue } from './styleUtil';
import { Label_L2, Label_L3, Title_T1 } from './style.font';
import { Common } from './common';

export const C = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: ${getVwValue('550')};
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${getVwValue('0 20')};
  `,

  Title: styled.div`
    padding: ${getVwValue('10 0 68')};
    color: ${Common.colors.grey_headline};
    ${Title_T1}
  `,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
  `,
  Button: styled.div`
    width: 100%;
    margin-top: ${getVwValue('20')};
  `
};
