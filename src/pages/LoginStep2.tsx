import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';

const S = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    padding: ${getVwValue('0 20')};
  `,
  Arrow: styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: ${getVwValue('24 28')};
    & > img {
      width: ${getVwValue('10')};
    }
  `,
  Title: styled.h3`
    padding: ${getVwValue('10 0 68')};
  `,
  Form: styled.form``,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: ${getVwValue('0 20 16')};
  `,
  Button: styled.div`
    width: 100%;
    margin-top: ${getVwValue('20')};
  `,
  Join: styled.div`
    width: ${getVwValue('150')};
    margin: 0 auto;
    background: url('/images/join_arrow.png') no-repeat right center/contain;
    background-size: ${getVwValue('10')};
    cursor: pointer;
  `,
  Field: styled.div`
    margin-bottom: ${getVwValue('28')};
    ,
    & > p {
      color: ${Common.colors.system_error};
      font-size: ${getVwValue('12')};
    }
  `,
  Input: styled.input`
    display: block;
    width: 100%;
    padding: ${getVwValue('12')};
    margin-top: ${getVwValue('5')};
    border: none;
    border-bottom: 1px solid
      ${(props) =>
        props.error ? Common.colors.system_error : Common.colors.grey_disabled};
  `
};

interface LoginType {
  email: string;
  password: string;
}

interface ErrorType {
  email: string;
  password: string;
}

interface TouchedType {
  email: boolean;
  password: boolean;
}

const LoginStep2 = () => {
  const navigate = useNavigate();

  // form
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState<LoginType>(initialValues);
  const [formErrors, setFormErrors] = useState({} as ErrorType);
  const [formTouched, setFormTouched] = useState({} as TouchedType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    console.log(formValues);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    setFormValues({ ...formValues, [name]: value });
    touched(formValues);
  };

  const touched = (values: LoginType) => {
    const touched = {} as TouchedType;
    if (!values.email) touched.email = false;
    else touched.email = true;

    if (!values.password) touched.password = false;
    else touched.password = true;
    console.log(touched);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: LoginType) => {
    const errors = {} as ErrorType;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = '필수값입니다.';
    } else if (!regex.test(values.email)) {
      errors.email = '올바른 이메일 형식을 입력해 주세요.';
    }
    if (!values.password) {
      errors.password = '필수값입니다.';
    } else if (values.password.length < 4) {
      errors.password = '잘못된 비밀번호입니다.';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  return (
    <S.Wrapper>
      <S.Arrow onClick={() => navigate(-1)}>
        <img src='/images/back_arrow.png' alt='arrow' />
      </S.Arrow>
      <S.Content>
        <S.Title>
          로그인하고
          <br /> 내 동네 댕댕이들 만나기
        </S.Title>
        {Object.keys(formErrors).length === 0 && isSubmitting && (
          <span className='success-msg'>Signed in successfully</span>
        )}
        <S.Form noValidate>
          <S.Field>
            <label htmlFor='email'>이메일</label>
            <S.Input
              type='email'
              name='email'
              id='email'
              value={formValues.email}
              onChange={handleChange}
              placeholder='올바른 이메일 형식을 입력해주세요.'
            />
            {formErrors.email && <p>{formErrors.email}</p>}
          </S.Field>
          <S.Field>
            <label htmlFor='password'>비밀번호</label>
            <S.Input
              error={formErrors.password && formTouched.password}
              type='password'
              name='password'
              id='password'
              value={formValues.password}
              onChange={handleChange}
              placeholder='N자리 이상 입력해 주세요.'
            />
            {formErrors.password && <p>{formErrors.password}</p>}
          </S.Field>
        </S.Form>
      </S.Content>
      <S.Bottom>
        <S.Join>
          <span>초간단 회원가입</span>
        </S.Join>
        <S.Button onClick={handleSubmit}>
          <ButtonRound disabled={false} type='submit'>
            로그인
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default LoginStep2;
