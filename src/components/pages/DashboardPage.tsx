import { memo, VFC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../hooks/useAuth';
import { useUsers } from '../hooks/useUsers';
import { LoginUserContext } from '../../provider';
import { MainButton } from '../atoms/MainButton';
import { UserList } from '../organisms/UserList';
import { LoginUser } from '../../types/type';

export const DashboardPage: VFC = memo(() => {
  const [usersData, setUsersData] = useState<LoginUser[]>([]);
  const { logout } = useAuth();
  const { getAllUsers } = useUsers();
  const { loginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();
  let isLogin = false;

  const handleLogout = () => logout();

  // ログインチェック
  if (loginUser !== null) {
    isLogin = true;
  }

  useEffect(() => {
    if (false) {
      navigate('/');
    }

    let abortCtrl = new AbortController();

    const fetchUsersData = async () => {
      const users = await getAllUsers(loginUser!.uid);
      setUsersData(users);
    };
    fetchUsersData();

    return () => {
      abortCtrl.abort();
    };
  }, []);

  return (
    <>
      <SLogoutButtonWrap>
        <SLogoutButton onClick={handleLogout}>ログアウト</SLogoutButton>
      </SLogoutButtonWrap>
      <div>
        <h1>Dashboard</h1>
        <SUserData>
          ログイン中: <span>{isLogin && loginUser!.name}</span>
        </SUserData>
        <SUserData>
          Wallet残高: <span>{isLogin && loginUser!.wallet}</span>
        </SUserData>
      </div>
      <SUserListWrap>
        <UserList users={usersData} />
      </SUserListWrap>
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

const SUserListWrap = styled.div`
  padding-top: 24px;
`;
const SLogoutButton = styled(MainButton)`
  && {
    background-color: #e85870;
  }
`;
