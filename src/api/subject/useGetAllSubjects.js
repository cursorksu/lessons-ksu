import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../index';
import { setSubjectList as setSubjectInStore } from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';

export const useGetAllSubjects = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchSubject = useCallback(async () => {
    try {
      const subjectCollection = collection(fireStore, 'subject');
      const querySnapshot = await getDocs(subjectCollection);
      const subjectData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date().toLocaleDateString(),
        };
      });
      setLoading(false);
      dispatch(
        setSubjectInStore(subjectData
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
    fetchSubject();
  }, [fetchSubject]);

  return { loading, getSubject: fetchSubject };
};
