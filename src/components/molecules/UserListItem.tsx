// ユーザー名用input要素
import { memo, useState, VFC } from 'react';
import styled from 'styled-components';
import { LoginUser } from '../../types/type';
import { MainButton } from '../atoms/MainButton';

type Props = {
  user: LoginUser;
};

export const UserListItem: VFC<Props> = memo((props) => {
  const { user } = props;
  const [isShow, setIsShow] = useState(false);

  const toggleModal = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <SUserList>
        <SUserName>{user.name}</SUserName>
        <SWalletModalOverlay style={{ display: isShow ? 'flex' : 'none' }}>
          <SUserWallet>
            <div>{user.name}さんの残高</div>
            <div>{user.wallet}</div>
            <SCloseButton onClick={toggleModal}>閉じる</SCloseButton>
          </SUserWallet>
        </SWalletModalOverlay>
        <div>
          <MainButton onClick={toggleModal}>walletを見る</MainButton>
          <MainButton>送る</MainButton>
        </div>
      </SUserList>
    </>
  );
});

const SUserList = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  justify-content: space-between;
  list-style: none;
`;

const SUserName = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const SWalletModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const SUserWallet = styled.div`
  width: 50%;
  padding: 1em;
  background: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const SCloseButton = styled(MainButton)`
  && {
    margin-top: 24px;
    background-color: #e85870;
  }
`;
