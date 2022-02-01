import '../../config/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const useAuth = () => {
  const login = (userEmail: string, userPassword: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.displayName);
        alert('ログイン完了');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ code: errorCode, message: errorMessage });
        // ..
      });
  };

  const signUp = (userEmail: string, userPassword: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // 次にユーザ情報をdbに登録させる処理
        console.log(user);
        alert('登録完了');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ code: errorCode, message: errorMessage });
        // ..
      });
  };
  return { login, signUp };
};
