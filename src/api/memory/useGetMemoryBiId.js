import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMemory as setMemoryInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetMemoryMemory = () => {
  const dispatch = useDispatch();
  const getMemoryIdById = useCallback(async (memoryId) => {
    try {
      const memoryDocRef = doc(fireStore, 'memory', memoryId);
      const memorySnapshot = await getDoc(memoryDocRef);
      if (memorySnapshot.exists()) {
        dispatch(setMemoryInStore({
          id: memorySnapshot.id,
          ...memorySnapshot.data(),
        }));

        return { id: memorySnapshot.id, ...memorySnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching memory:', description: error.message,
        },
      }));
      return null;
    }
  }, [dispatch]);

  return { getMemoryIdById };
};
