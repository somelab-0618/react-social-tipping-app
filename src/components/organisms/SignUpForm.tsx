// 新規登録用のフォームパーツの集合
import { ChangeEvent, memo, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../atoms/MainButton';
import { FormInput } from '../molecules/FormInput';

import { useAuth } from '../hooks/useAuth';

export const SignUpForm: VFC = memo(() => {
  const { signUp } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const onChangeInputName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserName(e.target.value);
  };

  const onChangeInputEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserEmail(e.target.value);
  };

  const onChangeInputPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSignUp = (userName: string, userEmail: string, userPassword: string) =>
    signUp(userName, userEmail, userPassword);

  return (
    <>
      <FormInput
        inputType={'text'}
        placeholder={'ユーザー名'}
        onChange={onChangeInputName}
      >
        ユーザー名
      </FormInput>
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
      <MainButton onClick={() => handleSignUp(userName, userEmail, userPassword)}>
        新規登録
      </MainButton>
      <SLoginLink to='/'>ログインはこちら</SLoginLink>
    </>
  );
});

const SLoginLink = styled(Link)`
  display: block;
  margin-top: 8px;
`;
