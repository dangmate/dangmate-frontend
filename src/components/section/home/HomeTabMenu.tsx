import styled from '@emotion/styled';
import { Common } from '../../../styles/common';
import { getVwValue } from '../../../styles/styleUtil';
import React, { useState } from 'react';
import { Button_Btn2 } from '../../../styles/style.font';

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
    padding: ${getVwValue('8 0')};
    text-align: center;
    color: ${(props) =>
      props.active
        ? Common.colors.primary_emphasis
        : Common.colors.grey_disabled};
    ${Button_Btn2}
    & > span {
      position: relative;
      &:after {
        position: absolute;
        bottom: ${getVwValue('-9')};
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        content: '';
        display: ${(props) => (props.active ? 'block' : 'none')};
        width: ${getVwValue('48')};
        height: ${getVwValue('2')};
        background-color: ${Common.colors.primary};
      }
    }
  `
};

interface IProps {
  fetchPosts: (props: string) => void;
}
const HomeTabMenu = (props: IProps) => {
  const [toggleState, setToggleState] = useState<number>(1);
  const fetchAllPosts = () => {
    setToggleState(1);
    props.fetchPosts('all');
  };
  const fetchMatePosts = () => {
    setToggleState(2);
    props.fetchPosts('산책 메이트');
  };
  const fetchStoryPosts = () => {
    setToggleState(3);
    props.fetchPosts('댕댕 이야기');
  };

  return (
    <S.Ul>
      <S.Li active={toggleState === 1} onClick={fetchAllPosts}>
        <span>모두 보기</span>
      </S.Li>
      <S.Li active={toggleState === 2} onClick={fetchMatePosts}>
        <span>산책 메이트</span>
      </S.Li>
      <S.Li active={toggleState === 3} onClick={fetchStoryPosts}>
        <span>댕댕 이야기</span>
      </S.Li>
    </S.Ul>
  );
};

export default HomeTabMenu;
