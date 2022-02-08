import { memo, VFC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../hooks/useAuth';
import { useUsers } from '../hooks/useUsers';
import { LoginUserContext } from '../../providers/LoginUserProvider';
import { MainButton } from '../atoms/MainButton';
import { UserList } from '../organisms/UserList';
import { LoginUser } from '../../types/type';
import { AllUsersContext } from '../../providers/AllUsersProvider';

export const DashboardPage: VFC = memo(() => {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  // const [usersData, setUsersData] = useState<LoginUser[]>([]);
  const { logout } = useAuth();
  const { getAllUsers } = useUsers();
  const { loginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();

  const handleLogout = () => logout();

  useEffect(() => {
    if (!loginUser) {
      navigate('/');
    }

    const abortCtrl = new AbortController();

    const fetchUsersData = async () => {
      if (loginUser) {
        const users = await getAllUsers(loginUser);
        console.log(users);
        setAllUsers(users);
        console.log(allUsers);
      }
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
          ログイン中: <span>{loginUser && loginUser.name}</span>
        </SUserData>
        <SUserData>
          Wallet残高: <span>{loginUser && loginUser.wallet}</span>
        </SUserData>
      </div>
      <SUserListWrap>
        <UserList users={allUsers!} currentUser={loginUser!} />
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
  max-width: 500px;
  margin: 0 auto;
  padding-top: 24px;
`;
const SLogoutButton = styled(MainButton)`
  && {
    background-color: #e85870;
  }
`;
