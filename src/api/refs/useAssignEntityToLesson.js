import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useAssignEntityToLesson = () => {
  const dispatch = useDispatch();

  const addEntityToArrayField = useCallback((entityName, entityId, lessonId) => {
    try {
      const lessonRef = doc(fireStore, 'lessons', lessonId);

      return updateDoc(lessonRef, {
        [entityName]: arrayUnion(entityId)
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error',
        message: {
          title: `Error adding ${entityName} to array field in lesson:`,
          description: error.message,
        },
      }));
    }
  }, [dispatch]);

  const removeEntityFromArrayField = useCallback((entityName, entityId, lessonId) => {
    try {
      const lessonRef = doc(fireStore, 'lessons', lessonId);

      return updateDoc(lessonRef, {
        [entityName]: arrayRemove(entityId)
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error',
        message: {
          title: `Error removing ${entityName} from array field in lesson:`,
          description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { addEntityToArrayField, removeEntityFromArrayField };
};
