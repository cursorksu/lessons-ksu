import { useCallback, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../index';

export const useGetUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const getUserProfile = useCallback(
    async (uid) => {
      try {
        const docRef = doc(fireStore, `users`, uid);
        const docSnap = await getDoc(docRef);
        setProfile(docSnap.data());
      } catch (error) {
        throw new Error(error);
      }
    },
    []
  );

  return { profile, getUserProfile };
};
