import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setGame as setGameInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetGameById = () => {
  const dispatch = useDispatch();
  const getGameById = useCallback(async (gameId) => {
    try {
      const gameDocRef = doc(fireStore, 'game', gameId);
      const gameSnapshot = await getDoc(gameDocRef);
      if (gameSnapshot.exists()) {
        dispatch(setGameInStore({
          id: gameSnapshot.id,
          ...gameSnapshot.data(),
        }));

        return { id: gameSnapshot.id, ...gameSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching game:', description: error.message,
        },
      }));
      return null;
    }
  }, [dispatch]);

  return { getGameById };
};
