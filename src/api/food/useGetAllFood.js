import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setFoodList as setFoodInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetAllFood = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchFood = useCallback(async () => {
    try {
      const foodCollection = collection(fireStore, 'food');
      const querySnapshot = await getDocs(foodCollection);
      const foodData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date().toLocaleDateString(),
        };
      });
      setLoading(false);
      dispatch(
        setFoodInStore(foodData
          .sort((a, b) => a.createdAt - b.createdAt))
      );
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error fetching lessons:',
            description: error.message,
          },
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  return { loading, getFood: fetchFood };
};
