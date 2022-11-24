import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import axiosRequest from '../api/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/user';
import { Label_L2, Label_L3, Title_T1 } from '../styles/style.font';
import { C } from '../styles/emotionStyle';
import LikeIcon from '../components/asset/LikeIcon';

interface InputProps {
  state?: string;
}

const S = {
  Introduce: styled.h3`
    padding: ${getVwValue('70 20 60')};
    text-align: center;
    ${Title_T1}
  `,
  IntroduceImg: styled.h3`
    width: ${getVwValue('280')};
    height: ${getVwValue('280')};
    margin: 0 auto;
    background: #f8f8f8;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${getVwValue('0 20 70')};
  `,
  Arrow: styled.div`
    width: 100%;
    height: ${getVwValue('64')};
  `,
  ImgWrap: styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    padding: ${getVwValue('0 28')};
    vertical-align: center;
    cursor: pointer;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${getVwValue('10')};
      height: ${getVwValue('20')};
      object-fit: contain;
    }
  `,

  Form: styled.form``,

  Join: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      display: block;
      margin-top: ${getVwValue('16')};
      color: ${Common.colors.grey_sub};
      ${Label_L2};
    }
  `,
  ArrowImg: styled.div`
    display: inline-block;
    width: ${getVwValue('8')};
    height: ${getVwValue('14')};
    margin-left: ${getVwValue('10')};
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
    color: ${Common.colors.grey_headline};
    ${Label_L2};
    &::placeholder {
      color: ${Common.colors.grey_disabled};
    }
  `,
  Label: styled.label`
    color: ${Common.colors.grey_body};
    ${Label_L3};
  `
};

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PWD_REGEX = /^[A-Za-z0-9]{6,12}$/;

const Login = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const userData = useRecoilValue(userState);

  const userRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [collectPwd, setCollectPwd] = useState<boolean>(true);

  const [success, setSuccess] = useState<boolean>(false);

  const inputEmailState = () => {
    let color = '';
    if (!!email && !validEmail) color = Common.colors.system_error;
    else if (!!email && validEmail) color = Common.colors.system_good;
    else if (!email && !validEmail) color = Common.colors.grey_disabled;
    return color;
  };
  const inputPwdState = () => {
    let color = '';
    if (!!pwd && !validPwd) color = Common.colors.system_error;
    else if (!collectPwd) color = Common.colors.system_error;
    else if (!!pwd && validPwd) color = Common.colors.system_good;
    else if (!pwd && !validPwd) color = Common.colors.grey_disabled;
    return color;
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setCollectPwd(true);
  }, [pwd]);

  const handleSubmit = async () => {
    const data = { email, password: pwd };

    try {
      const response = await axiosRequest().post('/api/user/login', data);
      if (response.data) {
        // const accessToken = response.data.accessToken;
        console.log(response.data);
        const { email, fullName, location, userId } = response.data;
        if (email && fullName && location && userId) {
          setUserState({ email, fullName, location, userId });
        }
        setEmail('');
        setPwd('');
        setSuccess(true);
        setTimeout(() => navigate('/home'), 2000);
      }
    } catch (err) {
      console.log(err);
      setCollectPwd(false);
    }
    // 로그인을 성공했을 때 : accessToken을 저장
  };

  return (
    <>
      {success ? (
        <C.Wrapper>
          <S.Introduce>
            {userData.fullName}에게
            <br /> {userData.location} 친구들을 소개할게요!
          </S.Introduce>
          <S.IntroduceImg></S.IntroduceImg>
        </C.Wrapper>
      ) : (
        <C.Wrapper>
          <S.Arrow>
            <S.ImgWrap onClick={() => navigate(-1)}>
              <img src='/images/back_arrow.png' alt='arrow' />
            </S.ImgWrap>
          </S.Arrow>
          <S.Content>
            <C.Title>
              로그인하고
              <br />내 동네 댕댕이들 만나기
            </C.Title>

            <S.Form>
              <S.Field>
                <S.Label htmlFor='email'>이메일</S.Label>
                <S.Input
                  type='email'
                  name='email'
                  id='email'
                  ref={userRef}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder='올바른 이메일 형식을 입력해주세요.'
                  state={inputEmailState()}
                />
                {email && !validEmail ? (
                  <p>올바른 이메일 형식을 입력해 주세요.</p>
                ) : (
                  <></>
                )}
              </S.Field>
              <S.Field>
                <S.Label htmlFor='password'>비밀번호</S.Label>
                <S.Input
                  type='password'
                  name='password'
                  id='password'
                  autoComplete='off'
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder='6자리 이상 입력해 주세요.'
                  state={inputPwdState()}
                />
                {pwd && !validPwd ? (
                  <p>6자리 이상의 비밀번호를 입력해 주세요.</p>
                ) : (
                  <></>
                )}
                {!collectPwd ? <p>잘못된 비밀번호입니다.</p> : <></>}{' '}
              </S.Field>
            </S.Form>
            <S.Join onClick={() => navigate('/location')}>
              <LikeIcon />
              <span>아직 계정이 없으신가요?</span>
            </S.Join>
          </S.Content>
          <C.Bottom>
            <C.Button>
              <ButtonRound
                onClick={handleSubmit}
                disabled={!(validEmail && validPwd)}
                type='button'
              >
                로그인
              </ButtonRound>
            </C.Button>
          </C.Bottom>
        </C.Wrapper>
      )}
    </>
  );
};

export default Login;
