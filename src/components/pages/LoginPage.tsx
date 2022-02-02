import { memo, VFC } from 'react';
import { LoginForm } from '../organisms/LoginForm';

export const LoginPage: VFC = memo(() => {
  return (
    <>
      <div>
        <h1>ログイン</h1>
        <LoginForm />
      </div>
    </>
  );
});
