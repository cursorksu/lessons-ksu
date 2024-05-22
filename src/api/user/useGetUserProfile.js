import { useCallback, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../index';
import { getDateLocalString } from '../../utils/getDateLocalString';

export const useGetUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const getUserProfile = useCallback(
    async (uid) => {
      try {
        const docRef = doc(fireStore, `users`, uid);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        const serializedUser =  {
          id: docSnap?.id,
          ...user,
          createdAt: getDateLocalString(user?.createdAt) };
        setProfile(serializedUser);
      } catch (error) {
        throw new Error(error);
      }
    },
    []
  );

  return { profile, getUserProfile };
};
