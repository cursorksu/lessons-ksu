import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useGetEntity = (entityName) => {
  const dispatch = useDispatch();
  const getEntityById = useCallback(async (entityId) => {
    try {
      const lessonDocRef = doc(fireStore, entityName, entityId);
      const lessonSnapshot = await getDoc(lessonDocRef);
      if (lessonSnapshot.exists()) {
        return { id: lessonSnapshot?.id, ...lessonSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error fetching ${entityName}:`,
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch, entityName]);

  return { getEntityById };
};
