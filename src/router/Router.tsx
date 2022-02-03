import { memo, VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignUpPage } from '../components/pages/SignUpPage';
import { LoginPage } from '../components/pages/LoginPage';
import { DashboardPage } from '../components/pages/DashboardPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';
import { LoginUserProvider } from '../provider';

export const Router: VFC = memo(() => {
  return (
    <LoginUserProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </LoginUserProvider>
  );
});
