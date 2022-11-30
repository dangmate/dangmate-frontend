import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { useNavigate, useParams } from 'react-router-dom';
import axiosRequest, { axiosMultiRequest } from '../api/axios';
import ArrowBack from '../components/asset/ArrowBack';
import ImageControl from '../components/asset/ImageControl';
import Category from '../components/asset/Category';
import ButtonRound from '../components/asset/ButtonRound';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { Common } from '../styles/common';
import { TEXT_REGEX } from '../utils/regex';
import { Body_B2, Label_L3, Title_T1 } from '../styles/style.font';
import { C } from '../styles/emotionStyle';

const S = {
  UploadWrap: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
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
    justify-content: center;
    align-items: center;
    height: 100%;
    flex: 1 1 0%;
    margin-bottom: ${getVwValue('80')};
  `,
  FormContent: styled.div`
    margin: ${getVwValue('60 0 0')};
  `,
  H2: styled.h2`
    margin: ${getVwValue('8 0')};
    color: ${Common.colors.grey_headline};
    ${Title_T1}
  `,
  P: styled.p`
    color: ${Common.colors.grey_sub};
    ${Body_B2}
  `,
  CategoryWrap: styled.div`
    display: flex;
    justify-content: space-between;
    width: ${getVwValue('210')};
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
    padding: ${getVwValue('12 0')};
    margin-top: ${getVwValue('5')};
    border: none;
    resize: none;
    height: ${getVwValue('300')};
    color: ${Common.colors.grey_headline};
    ${Body_B2}
    &::placeholder {
      color: ${Common.colors.grey_disabled};
    }
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
  TextSub: styled.div`
    color: ${Common.colors.grey_body};
    ${Label_L3}
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
    padding: ${getVwValue('70 20 140')};
    text-align: center;
    ${Title_T1}
    &>p {
      margin-top: ${getVwValue('8')};
      ${Body_B2}
    }
  `,
  IntroduceImg: styled.h3`
    display: flex;
    justify-content: center;
  `
};

interface PostType {
  category: string;
  comments: number;
  content: string;
  createdAt: string;
  fullName: string;
  isLike?: boolean;
  isPost?: boolean;
  likes: number;
  location: string;
  postId: number | null;
  profile: string | null;
  thumbnail: string;
  views?: number;
}
const formData = new FormData();

const UploadForm = () => {
  const [category, setCategory] = useState<string>('');
  const [toggleA, setToggleA] = useState<boolean>(false);
  const [toggleB, setToggleB] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const [text, setText] = useState<string>('');
  const [validText, setValidText] = useState<boolean>(false);

  const [thumbnail, setThumbnail] = useState<string>('');

  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [success, setSuccess] = useState<boolean>(false);

  const userData = useRecoilValue(userState);

  const navigate = useNavigate();
  const { postId } = useParams();

  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [data, setData] = useState<PostType>();

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
    const maxSize = 10 * 1024 * 1024;
    const fileSize = file.size;
    console.log(fileSize);
    if (fileSize > maxSize) {
      alert('첨부파일 사이즈는 10MB 이내로 등록 가능합니다.');
      setImage(null);
      return;
    }

    if (file && file.type.substring(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const RemoveImageHandler = () => {
    formData.delete('multipartFile');
    setImage(null);
    setThumbnail('');
  };

  const uploadFeedImage = async () => {
    if (image && text && category) {
      formData.append('multipartFile', image);
    }
    const response = await axiosMultiRequest().post('/api/gallery', formData);
    if (response.data) {
      const thumbnail = response.data.imagePath;

      const data = {
        userId: userData.userId,
        location: userData.location,
        category,
        thumbnail,
        content: text
      };

      const uploadResponse = await axiosRequest().post('/api/post', data);
      if (uploadResponse.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    }
  };

  const uploadFeedText = async () => {
    const data = {
      userId: userData.userId,
      location: userData.location,
      category,
      thumbnail: null,
      content: text
    };

    const uploadResponse = await axiosRequest().post('/api/post', data);
    if (uploadResponse.data) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };

  const updateFeedImage = async () => {
    // const formData = new FormData();
    if (image) {
      formData.append('multipartFile', image);
    }
    const response = await axiosMultiRequest().post('/api/gallery', formData);
    if (response.data) {
      const thumbnail = response.data.imagePath;
      console.log(thumbnail);

      const data = {
        location: userData.location,
        category,
        thumbnail,
        content: text
      };

      const uploadResponse = await axiosRequest().put(
        `/api/post/${postId}/user/${userData.userId}`,
        data
      );
      if (uploadResponse.data) {
        navigate(`/view/${postId}`);
      }
    }
  };

  const updateFeedText = async () => {
    const data = {
      location: userData.location,
      category,
      thumbnail: null,
      content: text
    };

    const uploadResponse = await axiosRequest().put(
      `/api/post/${postId}/user/${userData.userId}`,
      data
    );
    if (uploadResponse.data) {
      navigate(`/view/${postId}`);
    }
  };

  const fetchPostView = async () => {
    try {
      const { data } = await axiosRequest().get(
        `/api/post/${postId}/user/${userData.userId}`
      );
      console.log(data);
      setCategory(data.category);
      setThumbnail(data.thumbnail);
      setText(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setValidText(TEXT_REGEX.test(text));
  }, [text]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    if (postId) {
      setUpdate(true);
      setNext(true);
      fetchPostView();
    }
  }, []);

  return (
    <>
      {!success ? (
        <>
          {!next ? (
            <S.UploadWrap>
              <ArrowBack onClick={() => navigate(-1)} />
              <S.Container>
                <S.Row>
                  <S.H2>댕댕이가 말하고 싶은 주제는?</S.H2>
                  <S.P>언제든지 바꿀 수 있으니 걱정하지마세요.</S.P>
                </S.Row>
              </S.Container>
              <S.Content>
                <S.CategoryWrap>
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
                </S.CategoryWrap>
              </S.Content>
              <C.Bottom>
                <C.Button>
                  <ButtonRound
                    onClick={() => setNext(true)}
                    disabled={!((toggleA || toggleB) && category)}
                    type='button'
                  >
                    다음
                  </ButtonRound>
                </C.Button>
              </C.Bottom>
            </S.UploadWrap>
          ) : (
            <>
              {isUpdate ? (
                <ArrowBack onClick={() => navigate(-1)} />
              ) : (
                <ArrowBack onClick={() => setNext(false)} />
              )}
              <S.Container>
                <S.Row>
                  {isUpdate ? (
                    <S.H2>내가 쓴 글 수정하기</S.H2>
                  ) : (
                    <S.H2>
                      {category === '산책 메이트'
                        ? userData.fullName +
                          '에게\n산책 메이트를 선물해 주세요!'
                        : '댕댕이들이랑 복작복작 수다떨기!'}
                    </S.H2>
                  )}
                </S.Row>
                <S.FormContent>
                  <S.UploadForm>
                    <S.Label htmlFor='image'>
                      <S.UploadImage onClick={uploadImage}>
                        {isUpdate && thumbnail ? (
                          <ImageControl
                            width={'90'}
                            height={'45'}
                            src={image ? preview : thumbnail}
                            alt={'image'}
                            fit={'cover'}
                          />
                        ) : (
                          <ImageControl
                            width={'90'}
                            height={'45'}
                            src={
                              preview ? preview : '/images/attachment_false.png'
                            }
                            alt={'image'}
                            fit={'cover'}
                          />
                        )}
                      </S.UploadImage>
                      <S.UploadName>
                        {isUpdate ? (
                          <S.TextSub>
                            {thumbnail || image
                              ? '이미지 업로드 완료!'
                              : '최대 1장의 사진 등록이 가능해요'}
                          </S.TextSub>
                        ) : (
                          <S.TextSub>
                            {image
                              ? '이미지 업로드 완료!'
                              : '최대 1장의 사진 등록이 가능해요'}
                          </S.TextSub>
                        )}

                        {(image || thumbnail) && (
                          <S.CloseBtn onClick={RemoveImageHandler}>
                            <ImageControl
                              width={'18'}
                              height={'18'}
                              src={'/svg/close.svg'}
                              alt={'close'}
                            />
                          </S.CloseBtn>
                        )}
                      </S.UploadName>
                    </S.Label>
                    <input
                      type='file'
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      accept={'.jpg, .png'}
                      onChange={onChangeFileHandler}
                    />
                  </S.UploadForm>
                  <S.TextForm>
                    <S.TextSub>내용 입력</S.TextSub>
                    <S.Textarea
                      name='text'
                      id='text'
                      autoComplete='off'
                      required
                      maxLength={250}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder='내 댕댕이를 소개해 주세요!&#10;많은 댕댕이 친구들이 기다리고 있어요.'
                    />
                  </S.TextForm>
                </S.FormContent>
              </S.Container>
              <C.Bottom>
                <C.Button>
                  {isUpdate ? (
                    <ButtonRound
                      onClick={image ? updateFeedImage : updateFeedText}
                      disabled={!(text && validText)}
                      type='button'
                    >
                      수정하기
                    </ButtonRound>
                  ) : (
                    <ButtonRound
                      onClick={image ? uploadFeedImage : uploadFeedText}
                      disabled={!(text && validText)}
                      type='button'
                    >
                      업로드
                    </ButtonRound>
                  )}
                </C.Button>
              </C.Bottom>
            </>
          )}
        </>
      ) : (
        <S.Wrapper>
          <S.Introduce>
            {userData.location} 댕댕이들에게 전달 완료!
            <p>우리 {userData.fullName}에게 어떤 친구가 생길까요?</p>
          </S.Introduce>
          <S.IntroduceImg>
            <ImageControl
              width='277'
              height='282'
              src={'/images/notice.png'}
              alt={'notice'}
            />
          </S.IntroduceImg>
        </S.Wrapper>
      )}
    </>
  );
};

export default UploadForm;
