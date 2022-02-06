import '../../config/firebase';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { LoginUser } from '../../types/type';

const db = getFirestore();

export const useUsers = () => {
  const getAllUsers = async (currentUserUid: string | null) => {
    const q = query(collection(db, 'users'), where('uid', '!=', currentUserUid));
    const querySnapshot = await getDocs(q);
    const users: LoginUser[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as LoginUser);
    });
    return users;
  };

  return { getAllUsers };
};
