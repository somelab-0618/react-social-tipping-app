import { memo, VFC } from 'react';

import { LoginUser } from '../../types/type';
import { UserListItem } from '../molecules/UserListItem';

type Props = {
  users: LoginUser[];
  currentUser: LoginUser;
};

export const UserList: VFC<Props> = memo((props) => {
  const { users, currentUser } = props;
  return (
    <>
      <ul>
        {users.map((user) => (
          <UserListItem user={user} currentUser={currentUser} key={user.uid} />
        ))}
      </ul>
    </>
  );
});
