import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';
import { useNavigate } from 'react-router-dom';
import axiosRequest, { axiosMultiRequest } from '../../../api/axios';
import ArrowBack from '../../asset/ArrowBack';
import ImageControl from '../../asset/ImageControl';
import Category from '../../common/Category';
import ButtonRound from '../../asset/ButtonRound';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';

const S = {
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

const UploadForm = ({ setWriteMode }: WriteProps) => {
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

  const [success, setSuccess] = useState<boolean>(false);

  const userData = useRecoilValue(userState);

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

  const UploadFeed = async () => {
    const formData = new FormData();
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
          onClickWriteModeHandler();
        }, 2000);
      }
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
  return (
    <>
      {!success ? (
        <>
          {!next ? (
            <>
              <ArrowBack onClick={onClickWriteModeHandler} />
              <S.Container>
                <S.Row>
                  <S.H2>우리 댕댕이가 말하고 싶은 주제는?</S.H2>
                  <S.P>언제든지 바꿀 수 있으니 걱정하지마세요.</S.P>
                </S.Row>
                <S.Content>
                  <ImageControl
                    width={'280'}
                    height={'280'}
                    src={'/images/Frame.png'}
                    alt={''}
                  />
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
              </S.Container>
              <S.Bottom>
                <S.Button>
                  <ButtonRound
                    onClick={() => setNext(true)}
                    disabled={!((toggleA || toggleB) && category)}
                    type='button'
                  >
                    다음
                  </ButtonRound>
                </S.Button>
              </S.Bottom>
            </>
          ) : (
            <>
              <ArrowBack onClick={() => setNext(false)} />
              <S.Container>
                <S.Row>
                  <S.H2>
                    {category === '산책 메이트'
                      ? userData.fullName + '에게\n산책 메이트를 선물해 주세요!'
                      : '댕댕이들이랑 복작복작 수다떨기!'}
                  </S.H2>
                </S.Row>
                <S.FormContent>
                  <S.UploadForm>
                    <S.Label htmlFor='image'>
                      <S.UploadImage onClick={uploadImage}>
                        <ImageControl
                          width={'90'}
                          height={'45'}
                          src={
                            preview ? preview : '/images/attachment_false.png'
                          }
                          alt={'image'}
                          fit={'cover'}
                        />
                      </S.UploadImage>
                      <S.UploadName>
                        <div>
                          {image
                            ? image.name
                            : '최대 1장의 사진 등록이 가능해요'}
                        </div>
                        {image && (
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
                    <label htmlFor='text'>내용 입력</label>
                    <S.Textarea
                      name='text'
                      id='text'
                      autoComplete='off'
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder='내 댕댕이를 소개해 주세요!&#10;많은 댕댕이 친구들이 기다리고 있어요.'
                    />
                  </S.TextForm>
                </S.FormContent>
              </S.Container>
              <S.Bottom>
                <S.Button>
                  <ButtonRound
                    onClick={UploadFeed}
                    disabled={!(text && validText && image && preview)}
                    type='button'
                  >
                    업로드
                  </ButtonRound>
                </S.Button>
              </S.Bottom>
            </>
          )}
        </>
      ) : (
        <S.Wrapper>
          <S.Introduce>
            {userData.location} 댕댕이들에게 전달 완료!
            <br /> 우리 {userData.fullName}에게 어떤 친구가 생길까요?
          </S.Introduce>
          <S.IntroduceImg>이미지</S.IntroduceImg>
        </S.Wrapper>
      )}
    </>
  );
};

export default UploadForm;
