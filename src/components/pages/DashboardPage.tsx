import { memo, VFC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LoginUserContext } from '../../provider';

export const DashboardPage: VFC = memo(() => {
  const { loginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();

  const isLogin = loginUser !== null;

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  });

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <SUserData>
          ログイン中: <span>{isLogin && loginUser.name}</span>
        </SUserData>
        <SUserData>
          Wallet残高: <span>{isLogin && loginUser.wallet}</span>
        </SUserData>
      </div>
    </>
  );
});

const SUserData = styled.p`
  font-size: 18px;
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;
