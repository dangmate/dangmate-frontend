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
  FeedHead: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Content: styled.div`
    margin: ${getVwValue('30 0 35')};
    span {
      border-radius: ${getVwValue('7')};
    }
  `,

  Column: styled.div`
    width: ${getVwValue('100')};
    span {
      border-radius: ${getVwValue('7')};
    }
  `,
  Row: styled.div`
    width: 100%;
    margin-bottom: ${getVwValue('8')};
    span {
      border-radius: ${getVwValue('7')};
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

            <S.FeedHead>
              <S.Column>
                <Skeleton count={1} />
              </S.Column>
              <S.Column>
                <Skeleton count={1} />
              </S.Column>
            </S.FeedHead>

            <S.Content>
              <S.Row>
                <Skeleton count={1} />
              </S.Row>
              <S.Row>
                <Skeleton count={1} />
              </S.Row>
            </S.Content>
          </S.CardSkeleton>
        ))}
    </>
  );
};

export default CardSkeleton;
