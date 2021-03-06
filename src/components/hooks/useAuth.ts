import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../config/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  User,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';

import { LoginUserContext } from '../../providers/LoginUserProvider';
import { LoginUser } from '../../types/type';

const auth = getAuth();
const db = getFirestore();

export const useAuth = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useContext(LoginUserContext);

  const getUser = async (db: Firestore, user: User): Promise<LoginUser> => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || !docSnap.data().wallet) {
      const currentUser: LoginUser = {
        name: user.displayName,
        uid: user.uid,
        wallet: '取得できませんでした',
      };
      return currentUser;
    }

    const currentUser: LoginUser = {
      name: user.displayName,
      uid: user.uid,
      wallet: docSnap.data().wallet,
    };
    return currentUser;
  };

  const login = (userEmail: string, userPassword: string) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (UserCredential) => {
        const user = UserCredential.user;
        const currentUser = await getUser(db, user);
        // ログインできた時点でcurrentUserがfalseになるようなことはないので、
        // wallet残高が取得できているかを判定
        if (typeof currentUser.wallet !== 'number') {
          alert('wallet残高を取得できませんでした。管理者に確認してください。');
          navigate('/dashboard');
        }

        setLoginUser(currentUser);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error({ code: error.code, message: error.message });
        alert('ログインできませんでした。');
        navigate('/');
      });
  };

  const signUp = (userName: string, userEmail: string, userPassword: string) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: userName })
          .then(async () => {
            // walletデータ作成
            try {
              await setDoc(doc(db, 'users', user.uid), {
                name: userName,
                uid: user.uid,
                wallet: 100, // 初期値
              });
            } catch (e) {
              console.error('Error adding document: ', e);
              // walletデータ作成に失敗したら、ユーザーも削除
              deleteUser(user)
                .then(() => {
                  alert('登録に失敗しました。再登録してください。');
                  navigate('/sign-up');
                })
                .catch((error) => {
                  console.error({ code: error.code, message: error.message });
                  alert('登録に失敗しました。管理者に連絡してください。');
                });
            }

            const currentUser = await getUser(db, user);
            if (typeof currentUser.wallet !== 'number') {
              alert('wallet取得を設定できませんでした。管理者に確認してください。');
              navigate('/dashboard');
            }

            setLoginUser(currentUser);
            navigate('/dashboard');
          })
          .catch((error) => {
            console.error({ code: error.code, message: error.message });
            alert('登録に失敗しました。再登録してください。');
            navigate('/sign-up');
          });
      })
      .catch((error) => {
        console.error({ code: error.code, message: error.message });
        alert('登録に失敗しました。再登録してください。');
        navigate('/sign-up');
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert('ログアウトします。');
        navigate('/');
      })
      .catch((error) => {
        console.error({ code: error.code, message: error.message });
        alert('ログアウトに失敗しました。管理者に確認してください。');
      });
  };

  return { login, signUp, logout, getUser };
};
