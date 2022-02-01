// 新規登録用のフォームパーツの集合
import { ChangeEvent, memo, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../atoms/MainButton';
import { FormInput } from '../molecules/FormInput';

import '../../config/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginForm: VFC = memo(() => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const onChangeInputEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserEmail(e.target.value);
  };

  const onChangeInputPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = (userEmail: string, userPassword: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert('ログイン完了');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ code: errorCode, message: errorMessage });
        // ..
      });
  };

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
