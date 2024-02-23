import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useDeleteMemory = () => {
  const dispatch = useDispatch();
  const deleteMemory = useCallback(async (memoryId) => {
    try {
      const memoryDocRef = doc(fireStore, 'memory', memoryId);
      await deleteDoc(memoryDocRef);
      setMessage({
        type: 'success', message: {
          title: `Success!`,
          description: `Memory id: ${memoryId} was deleted successfully`,
        },
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error deleting memory:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { deleteMemory };
};
