import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { useGetUserProfile } from './useGetUserProfile';

export const useUpdateProfileField = () => {
  const { getUserProfile } = useGetUserProfile();
  const updateUserField = useCallback(
    async (userId, data) => {
      try {
        const userDocRef = doc(fireStore, `/users/${userId}`);
        const profileSnap = await getDoc(userDocRef);
        const user = profileSnap.data();

        if (user) {
          await updateDoc(userDocRef, {
            ...user?.profile,
            ...data,
            modification_timestamp: new Date().getTime(),
          });
          await getUserProfile(userId);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [getUserProfile]
  );

  return { updateUserField };
};
