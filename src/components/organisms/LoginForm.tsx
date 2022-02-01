// 新規登録用のフォームパーツの集合
import { ChangeEvent, memo, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../atoms/MainButton';
import { FormInput } from '../molecules/FormInput';

import { useAuth } from '../hooks/useAuth';

export const LoginForm: VFC = memo(() => {
  const { login } = useAuth();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const onChangeInputEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserEmail(e.target.value);
  };

  const onChangeInputPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = (userEmail: string, userPassword: string) =>
    login(userEmail, userPassword);

  return (
    <>
      <FormInput
        inputType={'email'}
        placeholder={'Eメールアドレス'}
        onChange={onChangeInputEmail}
      >
        Email
      </FormInput>
      <FormInput
        inputType={'password'}
        placeholder={'password'}
        onChange={onChangeInputPassword}
      >
        Password
      </FormInput>
      <MainButton onClick={() => handleLogin(userEmail, userPassword)}>
        ログイン
      </MainButton>
      <SLoginLink to='/sign-up'>新規登録はこちら</SLoginLink>
    </>
  );
});

const SLoginLink = styled(Link)`
  display: block;
  margin-top: 8px;
`;
