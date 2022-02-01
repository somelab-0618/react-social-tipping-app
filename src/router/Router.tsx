import { memo, VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignUpPage } from '../components/pages/SignUpPage';
import { UsersPage } from '../components/pages/UsersPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path='/' element={<SignUpPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
});
