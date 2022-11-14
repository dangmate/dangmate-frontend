import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef
} from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import Header from '../components/section/home/Header';
import { Common } from '../styles/common';
import TabMenu from '../components/section/home/TabMenu';
import Feed from '../components/section/home/Feed';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '../components/asset/ArrowBack';
import ImageControl from '../components/asset/ImageControl';
import Category from '../components/section/home/Category';
import ButtonRound from '../components/asset/ButtonRound';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';

const S = {
  Container: styled.div`
    position: relative;
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  WriteBtn: styled.div`
    position: fixed;
    bottom: ${getVwValue('24')};
    right: ${getVwValue('20')};
    width: auto;
    height: auto;
    border-radius: ${getVwValue('12')};
    box-shadow: 0 0 12px rgba(83, 55, 194, 0.5);
  `
};

const Home = () => {
  const [feed, setFeed] = useState([
    // {
    //   id: 1,
    //   userName: '소심쟁이 제이',
    //   userProfile: '/images/profile.png',
    //   content:
    //     '강아지 주인 찾아요.\n 여기 공덕동이고, 갈색 진돗개 빨간색 목줄 암컷입니다. 강아지 산책하다 발견',
    //   location: '공덕동',
    //   createTime: '1시간전',
    //   comment: 0,
    //   like: 4,
    //   category: '댕댕 이야기',
    //   media: '/images/feed_thumb.jpg'
    // },
    // {
    //   id: 2,
    //   userName: '말광량이 조이',
    //   userProfile: '/images/profile.png',
    //   content:
    //     '강아지 주인 찾아요.\n 여기 공덕동이고, 갈색 진돗개 빨간색 목줄 암컷입니다. 강아지 산책하다 발견',
    //   location: '공덕동',
    //   createTime: '4분전',
    //   comment: 0,
    //   like: 4,
    //   category: '산책 메이트',
    //   media: '/images/feed_thumb.jpg'
    // }
  ]);
  const navigate = useNavigate();
  const [writeMode, setWriteMode] = useState<boolean>(false);
  const userData = useRecoilValue(userState);

  const fetchPosts = async (category: string) => {
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    try {
      const response = await axiosRequest().post(
        '/api/posts?size=5&lastPostId=10',
        data
      );
      console.log(response.data);
      setFeed(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts('all');
  }, []);

  return (
    <>
      {writeMode ? (
        <AddFeedForm setWriteMode={setWriteMode} />
      ) : (
        <S.Container>
          <Header />
          <TabMenu fetchPosts={fetchPosts} />
          <S.FeedList>
            {feed &&
              feed.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Feed data={item} />
                  </React.Fragment>
                );
              })}
          </S.FeedList>
          <S.WriteBtn onClick={() => setWriteMode(true)}>
            <ImageControl
              width={'44'}
              height={'44'}
              src={'/svg/write_btn.svg'}
              alt={''}
            />
          </S.WriteBtn>
        </S.Container>
      )}
    </>
  );
};

const S2 = {
  Container: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  Row: styled.div`
    display: block;
  `,
  Column: styled.div`
    display: flex;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${getVwValue('60 0 0')};
  `,
  FormContent: styled.div`
    margin: ${getVwValue('60 0 0')};
  `,
  H2: styled.h2`
    margin: ${getVwValue('8 0')};
    font-size: ${getVwValue('20')};
  `,
  P: styled.p`
    font-size: ${getVwValue('16')};
  `,
  CategoryWrap: styled.div`
    display: flex;
    justify-content: space-between;
    width: ${getVwValue('210')};
    margin: ${getVwValue('65 0 0')};
  `,
  Button: styled.div`
    width: 100%;
    margin-top: ${getVwValue('20')};
  `,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: ${getVwValue('0 20 16')};
  `,
  Textarea: styled.textarea`
    display: block;
    width: 100%;
    padding: ${getVwValue('12')};
    margin-top: ${getVwValue('5')};
    border: none;
    resize: none;
    height: ${getVwValue('300')};
    color: ${Common.colors.grey_headline};
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
  `,
  UploadForm: styled.div`
    position: relative;
  `,
  UploadImage: styled.div`
    width: ${getVwValue('90')};
    height: ${getVwValue('45')};
    border-radius: ${getVwValue('8')};
    overflow: hidden;
  `,
  UploadName: styled.div`
    margin-left: ${getVwValue('12')};
    font-size: ${getVwValue('12')};
    width: ${getVwValue('200')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  CloseBtn: styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  `,
  TextForm: styled.div`
    margin-top: ${getVwValue('36')};
    padding-top: ${getVwValue('36')};
    border-top: 1px solid ${Common.colors.line_medium};
    & > label {
      display: block;
      font-size: ${getVwValue('12')};
      margin-bottom: ${getVwValue('8')};
    }
  `,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  Introduce: styled.h3`
    padding: ${getVwValue('70 20 60')};
    text-align: center;
  `,
  IntroduceImg: styled.h3`
    text-align: center;
  `
};

interface WriteProps {
  setWriteMode?: Dispatch<SetStateAction<boolean>>;
}

const TEXT_REGEX = /^[A-Za-z가-힣ㄱ-ㅎ!() ]{2,500}$/;

const AddFeedForm = ({ setWriteMode }: WriteProps) => {
  const onClickWriteModeHandler = () => {
    if (setWriteMode) {
      setWriteMode(false);
    }
  };

  const [category, setCategory] = useState<string>('');
  const [toggleA, setToggleA] = useState<boolean>(false);
  const [toggleB, setToggleB] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const [text, setText] = useState<string>('');
  const [validText, setValidText] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickToggleAHandler = () => {
    setToggleA(!toggleA);
    setToggleB(false);
    setCategory('산책 메이트');
  };
  const onClickToggleBHandler = () => {
    setToggleB(!toggleB);
    setToggleA(false);
    setCategory('댕댕 이야기');
  };

  const uploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file && file.type.substring(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  // const fileSizeCheck = () => {
  //   const maxSize = 1 * 1024 * 1024;
  //   if (image) {
  //     const fileSize = image.size;
  //     if (fileSize > maxSize) {
  //       // alert('첨부파일 사이즈는 5MB 이내로 등록 가능합니다.');
  //       setImage(null);
  //       setPreview(null);
  //     }
  //   }
  //   // console.log(fileSize, maxSize);
  //   // if (fileSize > maxSize) {
  //   //   alert('첨부파일 사이즈는 5MB 이내로 등록 가능합니다.');
  //   //   setImage(null);
  //   //   setPreview(null);
  //   // }
  // };

  const RemoveImageHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const UploadFeed = () => {
    console.log(category);
    console.log(image);
    console.log(text);
    setSuccess(true);
    setTimeout(() => {
      navigate('/home');
      onClickWriteModeHandler();
    }, 2000);
    // if (image && text && category) {
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   formData.append('category', category);
    //   formData.append('content', text);
    // }

    // const data = {
    //   id: 3,
    //   userName: '말괄량이 조이',
    //   userProfile: '/images/profile.png',
    //   content: text,
    //   location: '화곡동',
    //   createTime: '1분전',
    //   comment: 0,
    //   like: 0,
    //   category,
    //   media: '/images/feed_thumb.jpg'
    // };
  };

  useEffect(() => {
    setValidText(TEXT_REGEX.test(text));
  }, [text]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      // console.log(reader);
      // console.log(preview);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  return (
    <>
      {!success ? (
        <>
          {!next ? (
            <>
              <ArrowBack onClick={onClickWriteModeHandler} />
              <S2.Container>
                <S2.Row>
                  <S2.H2>우리 댕댕이가 말하고 싶은 주제는?</S2.H2>
                  <S2.P>언제든지 바꿀 수 있으니 걱정하지마세요.</S2.P>
                </S2.Row>
                <S2.Content>
                  <ImageControl
                    width={'280'}
                    height={'280'}
                    src={'/images/Frame.png'}
                    alt={''}
                  />
                  <S2.CategoryWrap>
                    <Category
                      title={'산책 메이트'}
                      active={toggleA}
                      onClick={onClickToggleAHandler}
                    />
                    <Category
                      title={'댕댕 이야기'}
                      active={toggleB}
                      onClick={onClickToggleBHandler}
                    />
                  </S2.CategoryWrap>
                </S2.Content>
              </S2.Container>
              <S2.Bottom>
                <S2.Button>
                  <ButtonRound
                    onClick={() => setNext(true)}
                    disabled={!((toggleA || toggleB) && category)}
                    type='button'
                  >
                    다음
                  </ButtonRound>
                </S2.Button>
              </S2.Bottom>
            </>
          ) : (
            <>
              <ArrowBack onClick={() => setNext(false)} />
              <S2.Container>
                <S2.Row>
                  <S2.H2>
                    {category === '산책 메이트'
                      ? '소심쟁이 제이에게\n산책 메이트를 선물해 주세요!'
                      : '댕댕이들이랑 복작복작 수다떨기!'}
                  </S2.H2>
                </S2.Row>
                <S2.FormContent>
                  <S2.UploadForm>
                    <S2.Label htmlFor='image'>
                      <S2.UploadImage onClick={uploadImage}>
                        <ImageControl
                          width={'90'}
                          height={'45'}
                          src={
                            preview ? preview : '/images/attachment_false.png'
                          }
                          alt={'image'}
                          fit={'cover'}
                        />
                      </S2.UploadImage>
                      <S2.UploadName>
                        <div>
                          {image
                            ? image.name
                            : '최대 1장의 사진 등록이 가능해요'}
                        </div>
                        {image && (
                          <S2.CloseBtn onClick={RemoveImageHandler}>
                            <ImageControl
                              width={'18'}
                              height={'18'}
                              src={'/svg/close.svg'}
                              alt={'close'}
                            />
                          </S2.CloseBtn>
                        )}
                      </S2.UploadName>
                    </S2.Label>
                    <input
                      type='file'
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      accept={'.jpg, .png'}
                      onChange={onChangeFileHandler}
                    />
                  </S2.UploadForm>
                  <S2.TextForm>
                    <label htmlFor='text'>내용 입력</label>
                    <S2.Textarea
                      name='text'
                      id='text'
                      autoComplete='off'
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder='내 댕댕이를 소개해 주세요!&#10;많은 댕댕이 친구들이 기다리고 있어요.'
                    />
                  </S2.TextForm>
                </S2.FormContent>
              </S2.Container>
              <S2.Bottom>
                <S2.Button>
                  <ButtonRound
                    onClick={UploadFeed}
                    disabled={!(text && validText && image && preview)}
                    type='button'
                  >
                    업로드
                  </ButtonRound>
                </S2.Button>
              </S2.Bottom>
            </>
          )}
        </>
      ) : (
        <S2.Wrapper>
          <S2.Introduce>
            공덕동 댕댕이들에게 전달 완료!
            <br /> 우리 제이에게 어떤 친구가 생길까요?
          </S2.Introduce>
          <S2.IntroduceImg>이미지</S2.IntroduceImg>
        </S2.Wrapper>
      )}
    </>
  );
};

export default Home;
