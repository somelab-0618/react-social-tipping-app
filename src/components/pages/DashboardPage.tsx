import { memo, VFC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../hooks/useAuth';
import { LoginUserContext } from '../../provider';
import { MainButton } from '../atoms/MainButton';

export const DashboardPage: VFC = memo(() => {
  const { logout } = useAuth();
  const { loginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();

  const handleLogout = () => logout();

  // ログインチェック
  const isLogin = loginUser !== null;
  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  });

  return (
    <>
      <SLogoutButtonWrap>
        <SLogoutButton onClick={handleLogout}>ログアウト</SLogoutButton>
      </SLogoutButtonWrap>
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

const SLogoutButtonWrap = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const SLogoutButton = styled(MainButton)`
  && {
    background-color: #e85870;
  }
`;
