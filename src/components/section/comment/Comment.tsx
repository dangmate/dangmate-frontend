import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../home/ImageControl';
import { Common } from '../../../styles/common';
import UserName from '../home/UserName';
import PostTime from '../home/PostTime';
import ButtonMore from '../../asset/ButtonMore';

const S = {
  Container: styled.div``,
  Head: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${getVwValue('15')};
  `,
  Column: styled.div`
    display: flex;
  `,
  TimeWrap: styled.div`
    margin-left: ${getVwValue('10')};
  `,
  Content: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `,
  Foot: styled.div`
    margin-top: ${getVwValue('15')};
  `,
  Write: styled.div``,
  TextBtn: styled.button`
    margin-left: ${getVwValue('15')};
    color: ${Common.colors.grey_sub};
    border-bottom: 1px solid ${Common.colors.grey_sub};
  `
};

const Comment = () => {
  return (
    <S.Container>
      <S.Head>
        <S.Column>
          <UserName
            src={'/images/profile.png'}
            alt={'profile'}
            name={'소심쟁이 제이'}
          ></UserName>
          <S.TimeWrap>
            <PostTime />
          </S.TimeWrap>
        </S.Column>

        <S.Column>
          <ButtonMore />
        </S.Column>
      </S.Head>

      <S.Content>
        <S.Column>
          OO동에 이사온지 얼마 되지 않아 아는 친구가 한 명도 없어요ㅜㅜ나이는
          25살 여자입니다! 같이 밥먹고 운동 다닐 동네 친구 구해요! 또래에 산책
          같이 마음 맞는 분 찾으면 좋겠어요!
        </S.Column>

        <S.Foot>
          <S.Column>
            <S.Write>
              <ImageControl
                width={'24'}
                height={'24'}
                src={'/images/write_fill.svg'}
                alt={'write'}
              />
            </S.Write>
            <S.TextBtn>답글 4</S.TextBtn>
          </S.Column>
        </S.Foot>
      </S.Content>
    </S.Container>
  );
};

export default Comment;
