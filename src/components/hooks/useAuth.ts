import '../../config/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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

  const signUp = (userName: string, userEmail: string, userPassword: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: userName })
          .then(() => {
            console.log(user.displayName);
            alert('登録完了');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({ code: errorCode, message: errorMessage });
            // ..
          });
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
