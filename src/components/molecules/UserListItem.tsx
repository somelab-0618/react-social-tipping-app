// ユーザー名用input要素
import { memo, useContext, useRef, useState, VFC } from 'react';
import styled from 'styled-components';
import { AllUsersContext } from '../../providers/AllUsersProvider';
import { LoginUserContext } from '../../providers/LoginUserProvider';
import { LoginUser } from '../../types/type';
import { MainButton } from '../atoms/MainButton';
import { RefInput } from '../atoms/RefInput';
import { useUsers } from '../hooks/useUsers';

type Props = {
  user: LoginUser;
  currentUser: LoginUser;
};

export const UserListItem: VFC<Props> = memo((props) => {
  const { user, currentUser } = props;
  const { updateWallet, getAllUsers } = useUsers();
  const { setLoginUser } = useContext(LoginUserContext);
  const { setAllUsers } = useContext(AllUsersContext);

  const [isShowDetail, setShowDetail] = useState(false);
  const [isShowSendForm, setShowSendForm] = useState(false);

  const inputCoin = useRef<HTMLInputElement>(null);

  const toggleDetailModal = () => {
    setShowDetail(!isShowDetail);
  };

  const toggleSendForm = () => {
    setShowSendForm(!isShowSendForm);
  };

  const sendWallet = async (currentUser: LoginUser, sendToUser: LoginUser) => {
    const amount = Number(inputCoin.current?.value);
    if (typeof amount !== 'number') {
      alert('数値を入力してください。');
      return;
    }
    const walletResult = await updateWallet(currentUser, sendToUser, amount);
    if (walletResult) {
      alert('walletを送信しました');
      setLoginUser(walletResult);
      const updatedUsers = await getAllUsers(currentUser);
      setAllUsers(updatedUsers);
    } else {
      alert('walletの送信に失敗しました');
    }
    toggleSendForm();
  };

  return (
    <>
      <SUserList>
        <SUserName>{user.name}</SUserName>
        <SWalletModalOverlay style={{ display: isShowDetail ? 'flex' : 'none' }}>
          <SUserWallet>
            <div>{user.name}さんの残高</div>
            <div>{user.wallet}</div>
            <SCloseButton onClick={toggleDetailModal}>閉じる</SCloseButton>
          </SUserWallet>
        </SWalletModalOverlay>
        <SWalletModalOverlay style={{ display: isShowSendForm ? 'flex' : 'none' }}>
          <SUserWallet>
            <SUserData>
              <div>{currentUser.name}さんの残高</div>
              <div>{currentUser.wallet}</div>
            </SUserData>
            <div>
              <RefInput
                ref={inputCoin}
                inputType={'number'}
                placeholder={'残高以下の数値を入力してください'}
              />
            </div>
            <SSendButton onClick={() => sendWallet(currentUser, user)}>
              送る
            </SSendButton>
            <SCloseButton onClick={toggleSendForm}>閉じる</SCloseButton>
          </SUserWallet>
        </SWalletModalOverlay>
        <div>
          <MainButton onClick={toggleDetailModal}>walletを見る</MainButton>
          <MainButton onClick={toggleSendForm}>送る</MainButton>
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

const SUserData = styled.div`
  margin-bottom: 16px;
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

const SSendButton = styled(MainButton)`
  && {
    margin-right: 16px;
  }
`;
