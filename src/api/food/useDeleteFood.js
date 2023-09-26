import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useDeleteFood = () => {
  const dispatch = useDispatch();
  const deleteFood = useCallback(async (foodId) => {
    try {
      const foodDocRef = doc(fireStore, 'food', foodId);
      await deleteDoc(foodDocRef);
      setMessage({
        type: 'success', message: {
          title: `Success!`,
          description: `Food id: ${foodId} was deleted successfully`,
        },
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error deleting food:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { deleteFood };
};
