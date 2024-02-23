import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setSubject as setSubjectInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useUpdateSubject = () => {
  const dispatch = useDispatch();
  const updateSubject = useCallback(async (subjectId, updatedFields) => {
    try {
      const subjectDocRef = doc(fireStore, 'subject', subjectId);
      const subjectSnapshot = await getDoc(subjectDocRef);

      if (subjectSnapshot.exists()) {
        const existingSubjectData = subjectSnapshot.data();
        const updatedSubjectData = {
          ...existingSubjectData,
          list: updatedFields,
        };

        const response = await updateDoc(subjectDocRef, updatedSubjectData);
        dispatch(setSubjectInStore(updatedSubjectData));

        return response;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating subject:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch]);

  return { updateSubject };
};
