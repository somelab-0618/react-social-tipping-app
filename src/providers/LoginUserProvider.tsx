import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AllUsersProvider } from './AllUsersProvider';

import { LoginUser } from '../types/type';

type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      <AllUsersProvider>{children}</AllUsersProvider>
    </LoginUserContext.Provider>
  );
};
