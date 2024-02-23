import { useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import {useTranslation} from "react-i18next";

export const useGetLessonsInCollection = () => {
  const { t } = useTranslation('tr', { ns: 'errors' });
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const dispatch = useDispatch();

  const getLessonsInCollection = useCallback(async (lessonIds) => {
    setLoading(true);
    try {
      const lessonPromises = lessonIds.map((lessonId) =>
        getDoc(doc(fireStore, 'lessons', lessonId))
      );
      const lessonSnapshots = await Promise.all(lessonPromises);
      const lessonsData = lessonSnapshots.map((lessonSnapshot) => ({
        id: lessonSnapshot.id,
        ...lessonSnapshot.data(),
      }));
      setLessons(lessonsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: t('fetchingError.tilte'),
            description: `${t('fetchingError.description')}: ${error.message}`,
          },
        })
      );
    }
  }, [dispatch, t]);

  return { loading, lessons, getLessonsInCollection };
};