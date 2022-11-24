import styled from '@emotion/styled';
import { Common } from '../../../styles/common';
import { getVwValue } from '../../../styles/styleUtil';
import React, { useContext, useEffect, useState } from 'react';
import { Button_Btn2 } from '../../../styles/style.font';
import { FeedCategory } from '../../../context/FeedCategory';

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
        bottom: ${getVwValue('-10')};
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
  fetchPosts?: (props: string) => void;
}
const HomeTabMenu = (props: IProps) => {
  const categoryContext = useContext(FeedCategory);
  const [toggleState, setToggleState] = useState<number>(1);
  const fetchAllPosts = () => {
    setToggleState(1);
    categoryContext.setCategory('all');
    // props.fetchPosts('all');
  };
  const fetchMatePosts = () => {
    setToggleState(2);
    categoryContext.setCategory('산책 메이트');
    // props.fetchPosts('산책 메이트');
  };
  const fetchStoryPosts = () => {
    setToggleState(3);
    categoryContext.setCategory('댕댕 이야기');
    // props.fetchPosts('댕댕 이야기');
  };

  useEffect(() => {
    if (categoryContext.isCategory === 'all') setToggleState(1);
    else if (categoryContext.isCategory === '산책 메이트') setToggleState(2);
    else if (categoryContext.isCategory === '댕댕 이야기') setToggleState(3);
  }, []);

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
