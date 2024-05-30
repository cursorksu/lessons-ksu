import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { setAuthData } from '../../store/authReducer';
import { useImages } from '../images/useImages';

export const useUpdateProfileField = () => {
  const dispatch = useDispatch();
  const { deleteImage } = useImages();

  const editUserProfile = useCallback(
    async (data) => {
      try {
        const docRef = doc(fireStore, `/users/${data.uid}`);
        const profileSnap = await getDoc(docRef);
        const entity = profileSnap.data();

        const hasAvatarInStorage = data.avatar.includes('firebasestorage');

        if (hasAvatarInStorage && entity.avatar !== data.avatar) {
          await deleteImage(entity.avatar);
        }

        const userData = {
          ...entity,
          ...data,
          createdAt: entity.createdAt,
          modification_timestamp: Timestamp.now(),
        };

        if (entity) {
          await updateDoc(docRef, userData);

          dispatch(setAuthData({
            user: {
              ...userData,
              modification_timestamp: JSON.stringify(userData.modification_timestamp),
            },
          }));
        }
      } catch (error) {
        const docRef = doc(fireStore, `/users/${data.uid}`);
        const profileSnap = await getDoc(docRef);
        const entity = profileSnap.data();

        if ( entity.avatar !== data.avatar) {
          await deleteImage(data.avatar);
        }

        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error editing users}:`,
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch, deleteImage]
  );

  return { editUserProfile };
};
