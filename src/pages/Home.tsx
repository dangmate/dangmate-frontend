import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeHeader from '../components/section/home/HomeHeader';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import PostCard from '../components/section/home/PostCard';
import ImageControl from '../components/asset/ImageControl';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { Body_B2, Label_L3 } from '../styles/style.font';
import PostEmpty from '../components/section/home/PostEmpty';
import { FeedCategory } from '../context/FeedCategory';
import { Common } from '../styles/common';

const S = {
  Container: styled.div`
    position: relative;
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  WriteBtn: styled.div`
    position: fixed;
    bottom: ${getVwValue('92')};
    right: ${getVwValue('20')};
    width: auto;
    height: auto;
    border-radius: ${getVwValue('12')};
    box-shadow: 0 0 12px rgba(83, 55, 194, 0.5);
  `,
  NaviBar: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: ${getVwValue('68')};
    background: ${Common.colors.bg_light};
    border-bottom: 1px solid #e5e5ec;
    box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.15);
  `,

  Ul: styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    & > li {
      width: 30%;
      text-align: center;
    }
  `,
  SvgWrap: styled.div`
    width: 100%;
    height: ${getVwValue('20')};
    margin-bottom: ${getVwValue('8')};
  `,
  Text: styled.div`
    color: ${Common.colors.grey_disabled};
    ${Label_L3};
  `,
  TextHome: styled.div`
    color: ${Common.colors.primary};
    ${Label_L3};
  `
};

const Home = () => {
  const [feed, setFeed] = useState([]);
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const categoryContext = useContext(FeedCategory);

  const fetchPosts = async (category: string) => {
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    try {
      const response = await axiosRequest().post(
        '/api/posts?size=10&lastPostId=100',
        data
      );
      console.log(response.data);
      setFeed(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts(categoryContext.isCategory);
    console.log(categoryContext.isCategory);
  }, []);

  return (
    <>
      <S.Container>
        <HomeHeader />
        <HomeTabMenu fetchPosts={fetchPosts} />
        <S.FeedList>
          {feed ? (
            feed.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <PostCard data={item} />
                </React.Fragment>
              );
            })
          ) : (
            <PostEmpty />
          )}
        </S.FeedList>

        <S.WriteBtn onClick={() => navigate('/upload')}>
          <ImageControl
            width={'44'}
            height={'44'}
            src={'/svg/write_btn.svg'}
            alt={''}
          />
        </S.WriteBtn>
        <S.NaviBar>
          <S.Ul>
            <li>
              <S.SvgWrap>
                <svg
                  width='18'
                  height='16'
                  viewBox='0 0 18 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <mask id='path-1-inside-1_348_7964' fill='white'>
                    <path d='M9.61655 1.49849L9 2.1408L8.38346 1.4985C6.46563 -0.499481 3.35621 -0.499483 1.43838 1.4985C-0.42795 3.44282 -0.485295 6.57627 1.30854 8.5933L6.46223 14.3882C7.14681 15.158 8.07341 16 9 16C9.92659 16 10.8532 15.158 11.5377 14.3882L16.6915 8.59327C18.4853 6.57624 18.4279 3.4428 16.5616 1.49848C14.6438 -0.499495 11.5344 -0.499493 9.61655 1.49849Z' />
                  </mask>
                  <path
                    d='M9 2.1408L7.91786 3.17953L9 4.3069L10.0821 3.17953L9 2.1408ZM9.61655 1.49849L8.53441 0.459752V0.459753L9.61655 1.49849ZM8.38346 1.4985L9.46561 0.459767L8.38346 1.4985ZM1.30854 8.5933L2.4294 7.59646L1.30854 8.5933ZM6.46223 14.3882L5.34137 15.3851L6.46223 14.3882ZM11.5377 14.3882L12.6586 15.3851L11.5377 14.3882ZM16.6915 8.59327L17.8123 9.5901L16.6915 8.59327ZM16.5616 1.49848L15.4795 2.53721L16.5616 1.49848ZM1.43838 1.4985L2.52052 2.53723L1.43838 1.4985ZM9 16L8.99999 14.5L9 16ZM10.0821 3.17953L10.6987 2.53722L8.53441 0.459753L7.91786 1.10207L10.0821 3.17953ZM7.30132 2.53723L7.91786 3.17953L10.0821 1.10207L9.46561 0.459767L7.30132 2.53723ZM0.187676 9.59013L5.34137 15.3851L7.58309 13.3914L2.4294 7.59646L0.187676 9.59013ZM12.6586 15.3851L17.8123 9.5901L15.5706 7.59643L10.4169 13.3914L12.6586 15.3851ZM15.4795 2.53721C16.8026 3.91558 16.8457 6.16269 15.5706 7.59643L17.8123 9.5901C20.1249 6.98979 20.0533 2.97003 17.6438 0.459748L15.4795 2.53721ZM17.6438 0.459748C15.1356 -2.15325 11.0426 -2.15325 8.53441 0.459752L10.6987 2.53722C12.0262 1.15426 14.152 1.15426 15.4795 2.53721L17.6438 0.459748ZM2.52052 2.53723C3.848 1.15427 5.97384 1.15427 7.30132 2.53723L9.46561 0.459767C6.95743 -2.15324 2.86442 -2.15324 0.356236 0.459764L2.52052 2.53723ZM0.356236 0.459764C-2.05335 2.97005 -2.12489 6.98982 0.187676 9.59013L2.4294 7.59646C1.1543 6.16272 1.19745 3.9156 2.52052 2.53723L0.356236 0.459764ZM5.34137 15.3851C5.71698 15.8074 6.20672 16.3055 6.77337 16.7068C7.32337 17.0964 8.09271 17.5 9.00001 17.5L8.99999 14.5C8.98069 14.5 8.82344 14.4826 8.50735 14.2587C8.20791 14.0466 7.89206 13.7388 7.58309 13.3914L5.34137 15.3851ZM9.00001 17.5C9.90729 17.5 10.6766 17.0964 11.2266 16.7068C11.7933 16.3055 12.283 15.8074 12.6586 15.3851L10.4169 13.3914C10.1079 13.7388 9.79207 14.0466 9.49263 14.2587C9.17654 14.4826 9.01929 14.5 8.99999 14.5L9.00001 17.5Z'
                    fill='#999999'
                    mask='url(#path-1-inside-1_348_7964)'
                  />
                </svg>
              </S.SvgWrap>
              <S.Text>관심 목록</S.Text>
            </li>
            <li>
              <S.SvgWrap>
                <svg
                  width='18'
                  height='20'
                  viewBox='0 0 18 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.55 0.4C8.81667 0.2 9.18333 0.2 9.45 0.4L17.45 6.4C17.6389 6.54164 17.75 6.76393 17.75 7V19C17.75 19.4142 17.4142 19.75 17 19.75H12C11.5858 19.75 11.25 19.4142 11.25 19V12.75H6.75V19C6.75 19.4142 6.41421 19.75 6 19.75H1C0.585786 19.75 0.25 19.4142 0.25 19V7C0.25 6.76393 0.361146 6.54164 0.55 6.4L8.55 0.4ZM1.75 7.375V18.25H5.25V12C5.25 11.5858 5.58579 11.25 6 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V18.25H16.25V7.375L9 1.9375L1.75 7.375Z'
                    fill={Common.colors.primary}
                  />
                </svg>
              </S.SvgWrap>
              <S.TextHome>홈</S.TextHome>
            </li>
            <li>
              <S.SvgWrap>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_348_8110)'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V12.0033L15.3422 13.3326C15.7108 13.5216 15.8564 13.9737 15.6674 14.3422C15.4784 14.7108 15.0263 14.8564 14.6578 14.6674L11.25 12.9198V9C11.25 8.58579 11.5858 8.25 12 8.25Z'
                      fill='#999999'
                    />
                    <path
                      d='M2.11796 12.4328L4.15227 14.4672C4.30848 14.6234 4.56175 14.6234 4.71796 14.4672L6.75227 12.4328C7.00373 12.1814 6.82654 11.7518 6.47168 11.75H5.18512C5.18512 10.0238 5.80106 8.35416 6.92217 7.04152C8.04328 5.72887 9.59597 4.85932 11.301 4.58928C13.006 4.31923 14.7514 4.66642 16.2232 5.56838C17.6951 6.47034 18.7968 7.86788 19.3303 9.50964C19.8637 11.1514 19.7938 12.9296 19.1332 14.5245C18.4726 16.1193 17.2646 17.4261 15.7265 18.2098C14.1884 18.9935 12.4212 19.2027 10.7426 18.7997C9.88341 18.5934 9.07632 18.2337 8.35699 17.7443C8.01452 17.5113 7.54801 17.6 7.31502 17.9425C7.08202 18.285 7.17077 18.7515 7.51324 18.9845C8.38135 19.5751 9.35548 20.0093 10.3925 20.2582C12.4183 20.7446 14.5512 20.4921 16.4075 19.5463C18.2639 18.6005 19.7218 17.0233 20.5191 15.0985C21.3163 13.1737 21.4007 11.0275 20.7569 9.04611C20.1131 7.06468 18.7834 5.37799 17.007 4.28942C15.2306 3.20084 13.1241 2.78183 11.0663 3.10775C9.00856 3.43366 7.13463 4.48311 5.78156 6.06734C4.4285 7.65157 3.68512 9.66661 3.68512 11.75L2.4008 11.75C2.04444 11.75 1.86597 12.1809 2.11796 12.4328Z'
                      fill='#999999'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_348_8110'>
                      <rect width='24' height='24' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </S.SvgWrap>
              <S.Text>내가 쓴 글</S.Text>
            </li>
          </S.Ul>
        </S.NaviBar>
      </S.Container>
    </>
  );
};

export default Home;
