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

import { LoginUserContext } from '../../provider';
import { LoginUser } from '../../types/type';

const auth = getAuth();
const db = getFirestore();

export const useAuth = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useContext(LoginUserContext);

  const getCurrentUser = async (db: Firestore, user: User): Promise<LoginUser> => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || !docSnap.data().wallet) {
      const currentUser: LoginUser = {
        name: user.displayName,
        wallet: '取得できませんでした',
      };
      return currentUser;
    }

    const currentUser: LoginUser = {
      name: user.displayName,
      wallet: docSnap.data().wallet,
    };
    return currentUser;
  };

  const login = (userEmail: string, userPassword: string) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (UserCredential) => {
        const user = UserCredential.user;
        const currentUser = await getCurrentUser(db, user);
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
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ code: errorCode, message: errorMessage });
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
                  alert('登録に失敗しました。管理者に連絡してください。');
                });
            }

            const currentUser = await getCurrentUser(db, user);
            if (typeof currentUser.wallet !== 'number') {
              alert('wallet取得を設定できませんでした。管理者に確認してください。');
              navigate('/dashboard');
            }

            setLoginUser(currentUser);
            navigate('/dashboard');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({ code: errorCode, message: errorMessage });
            alert('登録に失敗しました。再登録してください。');
            navigate('/sign-up');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ code: errorCode, message: errorMessage });
        alert('登録に失敗しました。再登録してください。');
        navigate('/sign-up');
      });
  };

  return { login, signUp };
};
