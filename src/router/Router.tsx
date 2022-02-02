import { memo, VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignUpPage } from '../components/pages/SignUpPage';
import { LoginPage } from '../components/pages/LoginPage';
import { UsersPage } from '../components/pages/UsersPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
});
