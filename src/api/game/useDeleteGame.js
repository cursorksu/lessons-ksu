import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useDeleteGame = () => {
  const dispatch = useDispatch();
  const deleteGame = useCallback(async (gameId) => {
    try {
      const gameDocRef = doc(fireStore, 'game', gameId);
      await deleteDoc(gameDocRef);
      setMessage({
        type: 'success', message: {
          title: `Success!`,
          description: `Game id: ${gameId} was deleted successfully`,
        },
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error deleting game:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { deleteGame };
};
