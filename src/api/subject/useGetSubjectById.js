import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setSubject as setSubjectInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetSubjectById = () => {
  const dispatch = useDispatch();
  const getSubjectIdById = useCallback(async (subjectId) => {
    try {
      const subjectDocRef = doc(fireStore, 'subject', subjectId);
      const subjectSnapshot = await getDoc(subjectDocRef);
      if (subjectSnapshot.exists()) {
        dispatch(setSubjectInStore({
          id: subjectSnapshot.id,
          ...subjectSnapshot.data(),
        }));

        return { id: subjectSnapshot.id, ...subjectSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching subject:', description: error.message,
        },
      }));
      return null;
    }
  }, [dispatch]);

  return { getSubjectIdById };
};
