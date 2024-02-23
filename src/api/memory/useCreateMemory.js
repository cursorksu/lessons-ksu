import { useDispatch, useSelector } from 'react-redux';
import { useUpdateLesson } from '../lesson';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '../index';
import {
  setMemory as setMemoryInStore, setLesson as setLessonInStore
} from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useCreateMemory = () => {
  const dispatch = useDispatch();
  const { updateLesson } = useUpdateLesson();
  const { lesson } = useSelector((state) => state.lessonData);
  const createMemoryDock = useCallback(async (lessonId, memoryFormData) => {
    try {
      const memoryCollection = collection(fireStore, 'memory');
      const createdAt = new Date().toString();
      const memoryData = await addDoc(memoryCollection, {
        ...memoryFormData, createdAt,
      });

      await updateLesson(lessonId, { memory: [memoryData.id] });
      dispatch(setMemoryInStore({ ...memoryFormData, createdAt }));
      dispatch(setLessonInStore({ ...lesson, memory: [memoryData.id]}));

      return memoryData.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating memory:',
          description: error.message,
        },
      }));
    }
  }, [dispatch, lesson, updateLesson]);

  return { createMemory: createMemoryDock };
};
