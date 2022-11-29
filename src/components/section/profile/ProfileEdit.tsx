import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';

import ArrowBack from '../../asset/ArrowBack';
import ImageControl from '../../asset/ImageControl';
import {
  Body_B2,
  Label_L2,
  Label_L3,
  Title_T1
} from '../../../styles/style.font';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';
import axiosRequest, { axiosMultiRequest } from '../../../api/axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { C } from '../../../styles/emotionStyle';
import ButtonRound from '../../asset/ButtonRound';

interface InputProps {
  state?: string;
  editError: boolean;
}

interface EditErrorProps {
  editError: boolean;
}
const S = {
  Container: styled.div`
    padding: ${getVwValue('0 20 100')};
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
    color: ${Common.colors.grey_headline};
    ${Title_T1}
  `,
  P: styled.p<EditErrorProps>`
    color: ${(props) =>
      !props.editError ? Common.colors.grey_sub : Common.colors.system_error};
    ${Body_B2}
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
  NickForm: styled.div`
    margin-top: ${getVwValue('80')};
  `,
  UploadImage: styled.div`
    width: ${getVwValue('90')};
    height: ${getVwValue('45')};
    border-radius: ${getVwValue('8')};
    overflow: hidden;
  `,
  UploadName: styled.div<EditErrorProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: ${getVwValue('12')};
    width: ${getVwValue('200')};
    pointer-events: ${(props) => (props.editError ? 'none' : 'auto')};
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
    padding: ${getVwValue('70 20 60')};
    text-align: center;
  `,
  IntroduceImg: styled.h3`
    text-align: center;
  `,
  Field: styled.div`
    margin-bottom: ${getVwValue('28')};
    ,
    & > p {
      color: ${Common.colors.system_error};
      font-size: ${getVwValue('12')};
    }
  `,
  Input: styled.input<InputProps>`
    display: block;
    width: 100%;
    padding: ${getVwValue('12')};
    margin-top: ${getVwValue('5')};
    border-bottom: 1px solid ${(props) => props.state};
    color: ${(props) =>
      props.editError
        ? Common.colors.grey_disabled
        : Common.colors.grey_headline};
    ${Label_L2};
    &::placeholder {
      color: ${Common.colors.grey_disabled};
    }
  `,
  LabelNick: styled.label`
    color: ${Common.colors.grey_body};
    ${Label_L3};
  `
};

interface IProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  profile: string | null | undefined;
  fullName: string | undefined;
}
const formData = new FormData();
const NICK_REGEX = /^[A-Za-z가-힣]{1,8}$/;
const KEYWORD_REGEX = /^[A-Za-z가-힣]{2,8}$/;

const ProfileEdit = (props: IProps) => {
  const [userData, setUserData] = useRecoilState(userState);
  const [image, setImage] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>();

  const [nickname, setNickname] = useState<string | undefined>(
    props.fullName?.split(' ')[1]
  );
  const [validNick, setValidNick] = useState<boolean>(false);
  const [nickFocus, setNickFocus] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string | undefined>(
    props.fullName?.split(' ')[0]
  );
  const [validKeyword, setValidKeyword] = useState<boolean>(false);
  const [keywordFocus, setKeywordFocus] = useState<boolean>(false);
  const [checkUniqNick, setCheckUniqNick] = useState<boolean>(true);

  const [isEdited, setEdited] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string | undefined>(props.fullName);
  const [editError, setEditError] = useState<boolean>(false);

  const inputNickState = () => {
    let color = '';
    if (editError) {
      color = Common.colors.line_dark;
      return color;
    }
    if (!!nickname && !validNick) color = Common.colors.system_error;
    else if (!!nickname && validNick) color = Common.colors.system_good;
    else if (!nickname) color = Common.colors.grey_disabled;
    return color;
  };

  const inputUniqNickState = () => {
    let color = '';
    if (editError) {
      color = Common.colors.line_dark;
      return color;
    }
    if (!!keyword && !validKeyword) color = Common.colors.system_error;
    else if (!!keyword && !checkUniqNick) color = Common.colors.system_error;
    else if (!!keyword && validKeyword) color = Common.colors.system_good;
    else if (!keyword) color = Common.colors.grey_disabled;
    return color;
  };

  /**
   * nickname uniq check
   * */
  const checkNickname = async () => {
    setFullName(`${keyword} ${nickname}`);
    console.log(fullName);
    if (fullName === props.fullName) {
      setCheckUniqNick(true);
      return;
    }
    if (isEdited) {
      try {
        const res = await axiosRequest().post('/api/user/full-name', fullName);
        setCheckUniqNick(true);
        console.log('사용가능 : ', res.data.fullName);
      } catch (err: any) {
        setCheckUniqNick(false);
        console.log(err);
      }
    } else {
      setCheckUniqNick(true);
    }
  };

  // 이미지 업로드
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

  const updateUserProfile = async () => {
    if (image) {
      formData.append('multipartFile', image);
      const response = await axiosMultiRequest().post('/api/gallery', formData);
      if (response.data) {
        const thumbnail = response.data.imagePath;
        const data = {
          thumbnail,
          fullName
        };
        try {
          const res = await axiosRequest().put(
            `/api/user/${userData.userId}`,
            data
          );
          if (res.status == 200) {
            setUserData({
              email: userData.email,
              fullName: res.data.fullName,
              location: userData.location,
              userId: userData.userId
            });
            console.log(userData);
            props.setEditMode(false);
          }
        } catch (err: any) {
          if (err.response.status === 401) {
            setEditError(true);
          } else if (err.response.status === 404) {
            console.log('존재하지 않는 유저입니다.');
          } else if (err.response.status === 500) {
            console.log('유저 업데이트에 실패했습니다.');
          }
        }
      }
    } else {
      const data = {
        thumbnail: props.profile,
        fullName
      };
      try {
        const res = await axiosRequest().put(
          `/api/user/${userData.userId}`,
          data
        );
        if (res.status == 200) {
          setUserData({
            email: userData.email,
            fullName: res.data.fullName,
            location: userData.location,
            userId: userData.userId
          });
          console.log(userData);
          props.setEditMode(false);
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          setEditError(true);
        } else if (err.response.status === 404) {
          console.log('존재하지 않는 유저입니다.');
        } else if (err.response.status === 500) {
          console.log('유저 업데이트에 실패했습니다.');
        }
      }
    }
  };

  const getCheckProfile = async () => {
    try {
      const { data } = await axiosRequest().get(
        `/api/user/${userData.userId}/check-profile`
      );
      if (data.canBeUpdated) {
        console.log('업데이트가능');
        setEditError(() => false);
      } else {
        console.log('업데이트불가능');
        setEditError(() => true);
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        console.log('존재하지 않는 유저입니다.');
      } else if (err.response.status === 500) {
        console.log('유저 업데이트에 실패했습니다.');
      }
    }
  };

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
    if (nickname) {
      setValidNick(NICK_REGEX.test(nickname));
    }
  }, [nickname]);

  useEffect(() => {
    if (keyword) {
      setValidKeyword(KEYWORD_REGEX.test(keyword));
    }
  }, [keyword]);

  useEffect(() => {
    checkNickname();
  }, [nickname, keyword, fullName]);

  useEffect(() => {
    console.log(fullName);
    if (fullName === userData.fullName && !image) {
      setEdited(false);
      console.log('편집안됨');
    } else {
      setEdited(true);
      console.log('편집됨');
    }
  }, [isEdited, fullName, nickname, keyword, image, checkUniqNick]);

  useEffect(() => {
    getCheckProfile();
  }, [editError]);

  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <>
      <ArrowBack onClick={() => props.setEditMode(false)} />

      <S.Container>
        <S.Row>
          <S.H2>프로필 수정</S.H2>
          <S.P editError={editError}>
            수정 후 7일 이내에 다시 수정할 수 없어요
          </S.P>
        </S.Row>
        <S.FormContent>
          <S.UploadForm>
            <S.Label htmlFor='image'>
              <S.UploadImage>
                <ImageControl
                  width={'90'}
                  height={'45'}
                  src={
                    preview
                      ? preview
                      : props.profile
                      ? props.profile
                      : '/images/profile.png'
                  }
                  alt={'image'}
                  fit={'cover'}
                />
              </S.UploadImage>
              <S.UploadName editError={editError}>
                <S.TextSub onClick={uploadImage}>
                  프로필 사진 변경하기
                </S.TextSub>
                <ImageControl
                  width={'6'}
                  height={'12'}
                  src={'/images/join_arrow.png'}
                  alt={'arrow'}
                />
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
          <S.NickForm>
            <S.Field>
              <S.LabelNick htmlFor='nickname'>반려견 이름</S.LabelNick>
              <S.Input
                type='text'
                name='nickname'
                id='nickname'
                autoComplete='off'
                required
                value={
                  !editError
                    ? nickname
                    : props.fullName
                    ? props.fullName.split(' ')[1]
                    : nickname
                }
                onChange={(e) => setNickname(e.target.value)}
                onFocus={() => setNickFocus(true)}
                onBlur={() => setNickFocus(false)}
                placeholder='초코'
                state={inputNickState()}
                editError={editError}
                disabled={editError}
              />
              {nickname && !validNick ? (
                <p>반려견 이름은 8자리 이내로 입력해 주세요.</p>
              ) : (
                <></>
              )}
            </S.Field>
            <S.Field>
              <S.LabelNick htmlFor='keyword'>
                반려견을 한 단어로 표현한다면?
              </S.LabelNick>
              <S.Input
                type='text'
                name='keyword'
                id='keyword'
                autoComplete='off'
                required
                value={
                  !editError
                    ? keyword
                    : props.fullName
                    ? props.fullName.split(' ')[0]
                    : keyword
                }
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setKeywordFocus(true)}
                onBlur={() => setKeywordFocus(false)}
                placeholder='세젤귀'
                state={inputUniqNickState()}
                editError={editError}
                disabled={editError}
              />
              {keyword && !validKeyword ? (
                <p>2~8자리 이내로 입력해 주세요.</p>
              ) : (
                <></>
              )}

              {checkUniqNick ? (
                <></>
              ) : (
                <p>동일한 이름의 반려견이 이미 사용 중이에요.</p>
              )}
            </S.Field>
          </S.NickForm>
        </S.FormContent>
      </S.Container>
      <C.Bottom>
        <C.Button>
          <ButtonRound
            onClick={
              !isEdited
                ? () => props.setEditMode(false)
                : () => updateUserProfile()
            }
            disabled={
              !(
                validKeyword &&
                validNick &&
                checkUniqNick &&
                keyword &&
                nickname &&
                !editError
              )
            }
            type='button'
          >
            프로필 수정 완료
          </ButtonRound>
        </C.Button>
      </C.Bottom>
    </>
  );
};

export default ProfileEdit;
