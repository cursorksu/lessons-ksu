import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setGame as setGameInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useUpdateGame = () => {
  const dispatch = useDispatch();
  const updateGame = useCallback(async (gameId, updatedFields) => {
    try {
      const gameDocRef = doc(fireStore, 'game', gameId);
      const gameSnapshot = await getDoc(gameDocRef);

      if (gameSnapshot.exists()) {
        const existingGameData = gameSnapshot.data();
        const updatedGameData = {
          ...existingGameData,
          list: updatedFields,
        };

        const response = await updateDoc(gameDocRef, updatedGameData);
        dispatch(setGameInStore(updatedGameData));

        return response;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating game:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch]);

  return { updateGame };
};
