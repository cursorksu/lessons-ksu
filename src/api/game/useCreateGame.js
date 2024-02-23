import { useDispatch, useSelector } from 'react-redux';
import { useUpdateLesson } from '../lesson';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '../index';
import {
  setGame as setGameInStore, setLesson as setLessonInStore
} from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useCreateGame = () => {
  const dispatch = useDispatch();
  const { updateLesson } = useUpdateLesson();
  const { lesson } = useSelector((state) => state.lessonData);
  const createGameDock = useCallback(async (lessonId, gameFormData) => {
    try {
      const gameCollection = collection(fireStore, 'game');
      const createdAt = new Date().toString();
      const gameData = await addDoc(gameCollection, {
        ...gameFormData, createdAt,
      });

      await updateLesson(lessonId, { game: [gameData.id] });
      dispatch(setGameInStore({ ...gameFormData, createdAt }));
      dispatch(setLessonInStore({ ...lesson, game: [gameData.id]}));

      return gameData.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating game:',
          description: error.message,
        },
      }));
    }
  }, [dispatch, lesson, updateLesson]);

  return { createGame: createGameDock };
};
