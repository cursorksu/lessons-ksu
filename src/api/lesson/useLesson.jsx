import { useCallback, useEffect, useState } from "react";
import { fireStore } from "../index";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore/lite";

// const Topic = {
//   id,
//   title,
//   goal,
//   img,
//   bible,
//   quote,
//   tags,
//   createdAt,
// }

export const useGetLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = useCallback(async () => {
    try {
      const lessonsCollection = collection(fireStore, "lessons");
      const querySnapshot = await getDocs(lessonsCollection);
      const lessonsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsData.sort((a, b) => a.createdAt - b.createdAt));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return { lessons, loading, getLessons: fetchLessons };
};

export const useDeleteLesson = () => {
  const deleteLesson = useCallback(async (lessonId) => {
    try {
      const lessonDocRef = doc(fireStore, "lessons", lessonId);
      await deleteDoc(lessonDocRef);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  }, []);

  return { deleteLesson };
};

export const useGetLessonById = () => {
  const getLessonById = useCallback(async (lessonId) => {
    try {
      const lessonDocRef = doc(fireStore, "lessons", lessonId);
      const lessonSnapshot = await getDoc(lessonDocRef);

      if (lessonSnapshot.exists()) {
        return { id: lessonSnapshot.id, ...lessonSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }, []);

  return { getLessonById };
};

export const useCreateLesson = () => {
  const createLessonDock = useCallback(async (lesson) => {
    try {
      const lessonsCollection = collection(fireStore, "lessons");
      await addDoc(lessonsCollection, {
        ...lesson,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log({
        message: error,
      });
    }
  }, []);

  return { createLesson: createLessonDock };
};

export const useUpdateLesson = () => {
  const updateLesson = useCallback(async (lessonId, updatedFields) => {
    try {
      const lessonDocRef = doc(fireStore, "lessons", lessonId);
      const lessonSnapshot = await getDoc(lessonDocRef);

      if (lessonSnapshot.exists()) {
        const existingLessonData = lessonSnapshot.data();
        const updatedLessonData = {
          ...existingLessonData,
          ...updatedFields,
        };
        await updateDoc(lessonDocRef, updatedLessonData);

        return { id: lessonSnapshot.id, ...updatedLessonData };
      } else {
        return null;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  }, []);

  return { updateLesson };
};
