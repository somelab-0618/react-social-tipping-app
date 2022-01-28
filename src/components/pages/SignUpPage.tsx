import { memo, VFC } from 'react';

import { MainButton } from '../atoms/MainButton';
import { TextInput } from '../atoms/TextInput';

export const SignUpPage: VFC = memo(() => {
  return (
    <>
      <div>
        <h1>新規登録</h1>
        <div>
          ユーザー名
          <TextInput />
        </div>
        <div>
          メールアドレス
          <TextInput />
        </div>
        <div>
          パスワード
          <TextInput />
        </div>
        <MainButton>新規登録</MainButton>
      </div>
    </>
  );
});
