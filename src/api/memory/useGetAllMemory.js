import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMemoryList as setMemoryInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetAllMemory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchMemory = useCallback(async () => {
    try {
      const memoryCollection = collection(fireStore, 'memory');
      const querySnapshot = await getDocs(memoryCollection);
      const memoryData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date().toLocaleDateString(),
        };
      });
      setLoading(false);
      dispatch(
        setMemoryInStore(memoryData
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
    fetchMemory();
  }, [fetchMemory]);

  return { loading, getMemory: fetchMemory };
};
