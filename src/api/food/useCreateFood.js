import { useDispatch, useSelector } from 'react-redux';
import { useUpdateLesson } from '../lesson';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '../index';
import {
  setFood as setFoodInStore, setLesson as setLessonInStore
} from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useCreateFood = () => {
  const dispatch = useDispatch();
  const { updateLesson } = useUpdateLesson();
  const { lesson } = useSelector((state) => state.lessonData);
  const createFoodDock = useCallback(async (lessonId, foodFormData) => {
    try {
      const foodCollection = collection(fireStore, 'food');
      const createdAt = new Date().toString();
      const foodData = await addDoc(foodCollection, {
        ...foodFormData, createdAt,
      });

      await updateLesson(lessonId, { food: [foodData?.id] });
      dispatch(setFoodInStore({ ...foodFormData, createdAt }));
      dispatch(setLessonInStore({ ...lesson, food: [foodData?.id]}));

      return foodData?.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating food:',
          description: error.message,
        },
      }));
    }
  }, [dispatch, lesson, updateLesson]);

  return { createFood: createFoodDock };
};
