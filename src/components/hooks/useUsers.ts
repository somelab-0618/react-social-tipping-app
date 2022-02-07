import '../../config/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { LoginUser } from '../../types/type';

const db = getFirestore();

export const useUsers = () => {
  const getAllUsers = async (currentUserUid: string | null) => {
    const q = query(collection(db, 'users'), where('uid', '!=', currentUserUid));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.reduce(
      (acc: LoginUser[], doc: QueryDocumentSnapshot<DocumentData>) => {
        // return [...acc, doc.data() as LoginUser]; // キャストしないと通らないのですが、やはり型どおりのオブジェクトを明示的に作成するしかないのでしょうか？
        return [
          ...acc,
          {
            name: doc.data().name,
            uid: doc.data().uid,
            wallet: doc.data().wallet,
          },
        ];
      },
      []
    );

    // mapでもやってみました
    // const users = querySnapshot.docs.map(
    //   (doc: QueryDocumentSnapshot<DocumentData>) => {
    //     return {
    //       name: doc.data().name,
    //       uid: doc.data().uid,
    //       wallet: doc.data().wallet,
    //     };
    //   }
    // );

    return users;
  };

  return { getAllUsers };
};
