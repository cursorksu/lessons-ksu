import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useGetEntity = (entityName) => {
  const dispatch = useDispatch();
  const getEntityById = useCallback(async (entityId) => {
    try {
      const docRef = doc(fireStore, entityName, entityId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot?.id, ...snapshot.data() };
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
