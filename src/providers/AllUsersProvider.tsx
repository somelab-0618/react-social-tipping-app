import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { LoginUser } from '../types/type';

type AllUsersContextType = {
  allUsers: LoginUser[] | null;
  setAllUsers: Dispatch<SetStateAction<LoginUser[] | null>>;
};

export const AllUsersContext = createContext({} as AllUsersContextType);

export const AllUsersProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [allUsers, setAllUsers] = useState<LoginUser[] | null>(null);

  return (
    <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};
