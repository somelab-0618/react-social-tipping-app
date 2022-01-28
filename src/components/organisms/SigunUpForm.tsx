// 新規登録用のフォームパーツの集合
import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../atoms/MainButton';

import { FormInput } from '../molecules/FormInput';

export const SignUpForm: VFC = memo(() => {
  return (
    <>
      <FormInput inputType={'text'} placeholder={'ユーザー名'}>
        ユーザー名
      </FormInput>
      <FormInput inputType={'email'} placeholder={'Eメールアドレス'}>
        Email
      </FormInput>
      <FormInput inputType={'password'} placeholder={'password'}>
        Password
      </FormInput>
      <MainButton>新規登録</MainButton>
      <SLoginLink to='/users'>ログインはこちら</SLoginLink>
    </>
  );
});

const SLoginLink = styled(Link)`
  display: block;
  margin-top: 8px;
`;
