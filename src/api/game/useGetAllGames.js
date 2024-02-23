import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../index';
import { setGameList as setGameInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetAllGames = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchGame = useCallback(async () => {
    try {
      const gameCollection = collection(fireStore, 'game');
      const querySnapshot = await getDocs(gameCollection);
      const gameData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date().toLocaleDateString(),
        };
      });
      setLoading(false);
      dispatch(
        setGameInStore(gameData
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
    fetchGame();
  }, [fetchGame]);

  return { loading, getGame: fetchGame };
};
