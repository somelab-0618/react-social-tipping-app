import { memo, VFC } from 'react';
// import styled from 'styled-components';
import { LoginUser } from '../../types/type';
import { UserListItem } from '../molecules/UserListItem';

type Props = {
  users: LoginUser[];
};

export const UserList: VFC<Props> = memo((props) => {
  const { users } = props;
  return (
    <>
      <ul>
        {users.map((user) => (
          <UserListItem user={user} key={user.uid} />
        ))}
      </ul>
    </>
  );
});
