import styled from '@emotion/styled';
import { Common } from '../../../styles/common';
import { getVwValue } from '../../../styles/styleUtil';
import React, { useState } from 'react';

interface tabType {
  active: boolean;
}

const S = {
  Ul: styled.ul`
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid ${Common.colors.line_medium};
  `,
  Li: styled.li<tabType>`
    width: 30%;
    padding: ${getVwValue('10 0')};
    text-align: center;
    font-size: ${getVwValue('14')};
    color: ${(props) =>
      props.active ? Common.colors.primary : Common.colors.grey_disabled};
    & > span {
      padding: ${getVwValue('0 0 8')};
      border-bottom: ${(props) =>
        props.active ? '2px solid ' + Common.colors.primary : 'none'}
  `,
  Span: styled.span``
};

const TabMenu = () => {
  const [toggleState, setToggleState] = useState<number>(1);

  return (
    <S.Ul>
      <S.Li active={toggleState === 1} onClick={() => setToggleState(1)}>
        <span>모두 보기</span>
      </S.Li>
      <S.Li active={toggleState === 2} onClick={() => setToggleState(2)}>
        <span>산책 메이트</span>
      </S.Li>
      <S.Li active={toggleState === 3} onClick={() => setToggleState(3)}>
        <span>댕댕 이야기</span>
      </S.Li>
    </S.Ul>
  );
};

export default TabMenu;
