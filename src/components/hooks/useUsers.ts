import '../../config/firebase';
import { useContext } from 'react';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  where,
} from 'firebase/firestore';

import { LoginUser } from '../../types/type';
import { AllUsersContext } from '../../providers/AllUsersProvider';

const db = getFirestore();

export const useUsers = () => {
  const { setAllUsers } = useContext(AllUsersContext);

  const getAllUsers = async (currentUser: LoginUser) => {
    const q = query(collection(db, 'users'), where('uid', '!=', currentUser.uid));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.reduce(
      (acc: LoginUser[], doc: QueryDocumentSnapshot<DocumentData>) => {
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

    return users;
  };

  const updateWallet = async (
    currentUser: LoginUser,
    sendToUser: LoginUser,
    amount: number
  ) => {
    const currentUserDocRef = doc(db, 'users', currentUser.uid!);
    const sendToUserDocRef = doc(db, 'users', sendToUser.uid!);

    try {
      await runTransaction(db, async (transaction) => {
        const currentUserDoc = await transaction.get(currentUserDocRef);
        const sendToUserDoc = await transaction.get(sendToUserDocRef);
        if (!currentUserDoc.exists() || !sendToUserDoc.exists()) {
          throw 'Document does not exist!';
        }

        const newCurrentUserWallet = currentUserDoc.data().wallet - amount;
        transaction.update(currentUserDocRef, { wallet: newCurrentUserWallet });

        const newSendToUserWallet = sendToUserDoc.data().wallet + amount;
        transaction.update(sendToUserDocRef, { wallet: newSendToUserWallet });
      });
      const currentUserData = await getDoc(currentUserDocRef);

      const updatedCurrentUser = {
        name: currentUserData.data()!.name,
        uid: currentUserData.data()!.uid,
        wallet: currentUserData.data()!.wallet,
      };

      console.log('Transaction successfully committed!');
      return updatedCurrentUser;
    } catch (e) {
      console.log('Transaction failed: ', e);
      return null;
    }
  };

  return { getAllUsers, updateWallet };
};
