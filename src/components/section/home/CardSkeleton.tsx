import Skeleton from 'react-loading-skeleton';
import React from 'react';
import styled from '@emotion/styled';
import 'react-loading-skeleton/dist/skeleton.css';
import { getVwValue } from '../../../styles/styleUtil';

const S = {
  CardSkeleton: styled.div`
    width: 100%;
    height: 100%;
    padding: ${getVwValue('40 20 0')};
    z-index: 0;
    span {
      width: 100%;
    }
  `,
  Media: styled.span`
    display: block;
    width: 100%;
    height: 100%;
    margin-bottom: ${getVwValue('23')};
    border-radius: ${getVwValue('12')};
    overflow: hidden;
    span {
      display: block;
      height: ${getVwValue('180')};
    }
  `,
  Content: styled.div`
    margin: ${getVwValue('15 0 0')};
    border-radius: ${getVwValue('6')};
    span {
      display: block;
      height: ${getVwValue('22')};
    }
  `,
  Content2: styled.div`
    margin: ${getVwValue('15 0 0')};
    border-radius: ${getVwValue('6')};
    span {
      display: block;
      width: ${getVwValue('260')};
      height: ${getVwValue('22')};
    }
  `,
  Content3: styled.div`
    margin: ${getVwValue('15 0 0')};
    border-radius: ${getVwValue('6')};
    span {
      display: block;
      width: ${getVwValue('60')};
      height: ${getVwValue('22')};
    }
  `
};

interface IProps {
  cards: number;
}

const CardSkeleton = (props: IProps) => {
  return (
    <>
      {Array(props.cards)
        .fill(0)
        .map((_, i) => (
          <S.CardSkeleton key={i}>
            <S.Media>
              <Skeleton count={1} />
            </S.Media>
            <S.Content>
              <Skeleton count={1} />
            </S.Content>
            <S.Content2>
              <Skeleton count={1} />
            </S.Content2>
            <S.Content>
              <Skeleton count={1} />
            </S.Content>
            <S.Content3>
              <Skeleton count={1} />
            </S.Content3>
          </S.CardSkeleton>
        ))}
    </>
  );
};

export default CardSkeleton;
