import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setFood as setFoodInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useUpdateFood = () => {
  const dispatch = useDispatch();
  const updateFood = useCallback(async (foodId, updatedFields) => {
    try {
      const foodDocRef = doc(fireStore, 'food', foodId);
      const foodSnapshot = await getDoc(foodDocRef);

      if (foodSnapshot.exists()) {
        const existingFoodData = foodSnapshot.data();
        const updatedFoodData = {
          ...existingFoodData,
          list: updatedFields,
        };

        const response = await updateDoc(foodDocRef, updatedFoodData);
        dispatch(setFoodInStore(updatedFoodData));

        return response;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating food:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch]);

  return { updateFood };
};
