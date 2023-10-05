import { useDispatch, useSelector } from 'react-redux';
import { useUpdateLesson } from '../lesson';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import {
  setSubject as setSubjectInStore, setLesson as setLessonInStore
} from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useCreateSubject = () => {
  const dispatch = useDispatch();
  const { updateLesson } = useUpdateLesson();
  const { lesson } = useSelector((state) => state.lessonData);
  const createSubjectDock = useCallback(async (lessonId, subjectFormData) => {
    try {
      const subjectCollection = collection(fireStore, 'subject');
      const createdAt = new Date().toString();
      const subjectData = await addDoc(subjectCollection, {
        ...subjectFormData, createdAt,
      });

      await updateLesson(lessonId, { subject: [subjectData?.id] });
      dispatch(setSubjectInStore({ ...subjectFormData, createdAt }));
      dispatch(setLessonInStore({ ...lesson, subject: [subjectData?.id]}));

      return subjectData.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating subject:',
          description: error.message,
        },
      }));
    }
  }, [dispatch, lesson, updateLesson]);

  return { createSubject: createSubjectDock };
};
