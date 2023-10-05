import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMemory as setMemoryInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useUpdateMemory = () => {
  const dispatch = useDispatch();
  const updateMemory = useCallback(async (memoryId, updatedFields) => {
    try {
      const memoryDocRef = doc(fireStore, 'memory', memoryId);
      const memorySnapshot = await getDoc(memoryDocRef);

      if (memorySnapshot.exists()) {
        const existingMemoryData = memorySnapshot.data();
        const updatedMemoryData = {
          ...existingMemoryData,
          list: updatedFields,
        };

        const response = await updateDoc(memoryDocRef, updatedMemoryData);
        dispatch(setMemoryInStore(updatedMemoryData));

        return response;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating memory:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch]);

  return { updateMemory };
};
