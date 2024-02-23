import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setFood as setFoodInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetFoodById = () => {
  const dispatch = useDispatch();
  const getFoodIdById = useCallback(async (foodId) => {
    try {
      const foodDocRef = doc(fireStore, 'food', foodId);
      const foodSnapshot = await getDoc(foodDocRef);
      if (foodSnapshot.exists()) {
        dispatch(setFoodInStore({
          id: foodSnapshot?.id,
          ...foodSnapshot.data(),
        }));

        return { id: foodSnapshot?.id, ...foodSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching food:', description: error.message,
        },
      }));
      return null;
    }
  }, [dispatch]);

  return { getFoodIdById };
};
