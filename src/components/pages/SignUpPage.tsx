import { memo, VFC } from 'react';
import { SignUpForm } from '../organisms/SigunUpForm';

export const SignUpPage: VFC = memo(() => {
  return (
    <>
      <div>
        <h1>新規登録</h1>
        <SignUpForm />
      </div>
    </>
  );
});
