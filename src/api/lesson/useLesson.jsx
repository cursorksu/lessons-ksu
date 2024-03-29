import { useCallback } from 'react';
import { fireStore } from '../index';
import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { setMessage } from '../../store/notificationReducer';
import {
  setLesson as setLessonInStore,
} from '../../store/dataReducer';
import { useDispatch } from 'react-redux';
import { useGetTopicById } from '../topic';
import { getDateFromTimeStep } from '../../utils/getDateFromTimeStep';

// export const useGetLessons = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//
//   const fetchLessons = useCallback(async () => {
//     try {
//       const lessonsCollection = collection(fireStore, 'lessons');
//       const querySnapshot = await getDocs(lessonsCollection);
//       const lessonsData = querySnapshot.docs.map((doc) => {
//         return {
//           id: doc?.id,
//           ...doc.data(),
//           createdAt: getDateFromTimeStep(doc.data().createdAt)
//         };
//       });
//       setLoading(false);
//       dispatch(
//         setLessonsInStore(lessonsData
//           .sort((a, b) => a.createdAt - b.createdAt))
//       );
//     } catch (error) {
//       dispatch(
//         setMessage({
//           type: 'error',
//           message: {
//             title: 'Error fetching lessons:',
//             description: error.message,
//           },
//         })
//       );
//     }
//   }, [dispatch]);
//
//   useEffect(() => {
//     fetchLessons();
//   }, [fetchLessons]);
//
//   return { loading, getLessons: fetchLessons };
// };

export const useDeleteLesson = () => {
  const dispatch = useDispatch();
  const deleteLesson = useCallback(async (lessonId) => {
    try {
      const lessonDocRef = doc(fireStore, 'lessons', lessonId);
      await deleteDoc(lessonDocRef);
      // dispatch(setLessonsInStore(lessons?.filter(el => el.id !== lessonId)));
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error deleting lesson:',
            description: error.message,
          },
        })
      );
    }
  }, [dispatch]);

  return { deleteLesson };
};

export const useGetLessonById = () => {
  const dispatch = useDispatch();
  const { getTopicById } = useGetTopicById();
  const getLessonById = useCallback(async (lessonId) => {
    try {
      const lessonDocRef = doc(fireStore, 'lessons', lessonId);
      const lessonSnapshot = await getDoc(lessonDocRef);
      if (lessonSnapshot.exists()) {
        dispatch(setLessonInStore({
          id: lessonSnapshot?.id,
          ...lessonSnapshot.data(),
          createdAt: getDateFromTimeStep(lessonSnapshot.data().createdAt),
        }));
        await getTopicById(lessonSnapshot.data().topic);

        return { id: lessonSnapshot?.id, ...lessonSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error fetching lesson:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch, getTopicById]);

  return { getLessonById };
};

export const useCreateLesson = () => {
  const dispatch = useDispatch();
  const createLessonDock = useCallback(async (lesson) => {
    try {
      const lessonsCollection = collection(fireStore, 'lessons');
      await addDoc(lessonsCollection, {
        ...lesson,
        createdAt: new Date(),
      });
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error creating lesson:',
            description: error.message,
          },
        })
      );
    }
  }, [dispatch]);

  return { createLesson: createLessonDock };
};

export const useUpdateLesson = () => {
  const dispatch = useDispatch();
  const { getLessonById } = useGetLessonById();
  const updateLesson = useCallback(async (lessonId, updatedFields) => {
    try {
      const lessonDocRef = doc(fireStore, 'lessons', lessonId);
      const lessonSnapshot = await getDoc(lessonDocRef);

      if (lessonSnapshot.exists()) {
        const existingLessonData = lessonSnapshot.data();
        const updatedLessonData = {
          ...existingLessonData,
          ...updatedFields,
        };
        await updateDoc(lessonDocRef, updatedLessonData);
        await getLessonById(lessonId);
        return { id: lessonSnapshot?.id, ...updatedLessonData };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating lesson:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch, getLessonById]);

  return { updateLesson };
};
