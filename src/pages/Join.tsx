import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface JoinType {
  email: string;
  password: number | string;
  tel: number | string;
  name: string;
  nick: string;
}

const Join = () => {
  const initialValues: JoinType = {
    email: '',
    password: '',
    tel: '',
    name: '',
    nick: ''
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Please enter a valid email')
          .required('Required'),
        password: Yup.string().min(5).required('Required'),
        tel: Yup.number().required('Required'),
        name: Yup.string().required('Required'),
        nick: Yup.string().required('Required')
      }),
      onSubmit: (values) => {
        console.log(values);
      }
    });
  console.log(values);
  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <dl>
          <dt>
            <label htmlFor='email'>이메일</label>
          </dt>
          <dd>
            <input
              value={values.email}
              onChange={handleChange}
              id='email'
              type='email'
              placeholder='이메일을 입력해주세요'
              onBlur={handleBlur}
            />
          </dd>
          <p
            style={{
              visibility: errors.email && touched.email ? 'visible' : 'hidden'
            }}
          >
            {errors.email}
          </p>

          <dt>
            <label htmlFor='password'>비밀번호</label>
          </dt>
          <dd>
            <input
              value={values.password}
              onChange={handleChange}
              id='password'
              type='password'
              placeholder='비밀번호'
              onBlur={handleBlur}
            />
          </dd>
          <p
            style={{
              visibility:
                errors.password && touched.password ? 'visible' : 'hidden'
            }}
          >
            {errors.password}
          </p>

          <dt>
            <label htmlFor='tel'>핸드본 번호</label>
          </dt>
          <dd>
            <input
              value={values.tel}
              onChange={handleChange}
              id='tel'
              type='tel'
              placeholder='핸드본 번호'
              onBlur={handleBlur}
            />
          </dd>
          <p
            style={{
              visibility: errors.tel && touched.tel ? 'visible' : 'hidden'
            }}
          >
            {errors.tel}
          </p>

          <dt>
            <label htmlFor='name'>이름</label>
          </dt>
          <dd>
            <input
              value={values.name}
              onChange={handleChange}
              id='name'
              type='name'
              placeholder='이름'
              onBlur={handleBlur}
            />
          </dd>
          <p
            style={{
              visibility: errors.name && touched.name ? 'visible' : 'hidden'
            }}
          >
            {errors.name}
          </p>

          <dt>
            <label htmlFor='nick'>닉네임</label>
          </dt>
          <dd>
            <input
              value={values.nick}
              onChange={handleChange}
              id='nick'
              type='nick'
              placeholder='닉네임'
              onBlur={handleBlur}
            />
          </dd>
          <p
            style={{
              visibility: errors.nick && touched.nick ? 'visible' : 'hidden'
            }}
          >
            {errors.nick}
          </p>
        </dl>
        <button type='submit'>가입하기</button>
      </form>
    </>
  );
};

export default Join;
