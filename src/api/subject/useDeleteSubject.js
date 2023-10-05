import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useDeleteSubject = () => {
  const dispatch = useDispatch();
  const deleteSubject = useCallback(async (subjectId) => {
    try {
      const subjectDocRef = doc(fireStore, 'subject', subjectId);
      await deleteDoc(subjectDocRef);
      setMessage({
        type: 'success', message: {
          title: `Success!`,
          description: `Subject id: ${subjectId} was deleted successfully`,
        },
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error deleting subject:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { deleteSubject };
};
