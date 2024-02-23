import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc
} from 'firebase/firestore';
import { fireStore } from '../index';
import {
  setCraftList as setCraftsInStore,
  setLesson as setLessonInStore,
  setCraft as setCraftInStore,
} from '../../store/dataReducer';
import { setMessage } from '../../store/notificationReducer';
import { useUpdateLesson } from '../lesson';

export const useGetAllCrafts = (callback, deps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchCrafts = useCallback(async () => {
    try {
      const craftsCollection = collection(fireStore, 'crafts');
      const querySnapshot = await getDocs(craftsCollection);
      const craftsData = querySnapshot.docs.map((doc) => {
        return {
          id: doc?.id, ...doc.data(),
        };
      });
      setLoading(false);
      dispatch(setCraftsInStore(craftsData
        .sort((a, b) => a.createdAt - b.createdAt)));
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching crafts:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCrafts();
  }, [fetchCrafts]);

  return { loading, getCrafts: fetchCrafts };
};

export const useGetCraftById = () => {
  const dispatch = useDispatch();
  const getCraftIdById = useCallback(async (craftId) => {
    try {
      const craftDocRef = doc(fireStore, 'craft', craftId);
      const craftSnapshot = await getDoc(craftDocRef);
      if (craftSnapshot.exists()) {
        dispatch(setCraftInStore({
          id: craftSnapshot?.id,
          ...craftSnapshot.data(),
        }));

        return { id: craftSnapshot?.id, ...craftSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error fetching craft:',
          description: error.message,
        },
      }));
      return null;
    }
  }, [dispatch]);

  return { getCraftIdById };
};

export const useCreateCraft = () => {
  const dispatch = useDispatch();
  const { updateLesson } = useUpdateLesson();
  const { lesson } = useSelector((state) => state.lessonData);
  const createCraftDock = useCallback(async (lessonId, craftFormData) => {
    try {
      const craftCollection = collection(fireStore, 'craft');
      const createdAt = new Date().toString();
      const craftData = await addDoc(craftCollection, {
        ...craftFormData, createdAt,
      });

      await updateLesson(lessonId, { craft: [craftData?.id] });
      dispatch(setCraftInStore({ ...craftFormData, createdAt }));
      dispatch(setLessonInStore({ ...lesson, craft: [craftData?.id]}));

      return craftData?.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating craft:', description: error.message,
        },
      }));
    }
  }, [dispatch, lesson, updateLesson]);

  return { createCraft: createCraftDock };
};

export const useUpdateCraft = () => {
  const dispatch = useDispatch();
  const updateCraft = useCallback(async (craftId, updatedFields) => {
    try {
      const craftDocRef = doc(fireStore, 'craft', craftId);
      const craftSnapshot = await getDoc(craftDocRef);

      if (craftSnapshot.exists()) {
        const existingCraftData = craftSnapshot.data();
        const updatedCraftData = {
          ...existingCraftData,
          list: updatedFields,
        };

        const response = await updateDoc(craftDocRef, updatedCraftData);
        dispatch(setCraftInStore(updatedCraftData));

        return response;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error updating craft:',
            description: error.message,
          },
        })
      );
      return null;
    }
  }, [dispatch]);

  return { updateCraft };
};

export const useDeleteCraft = () => {
  const dispatch = useDispatch();
  const deleteCraft = useCallback(async (craftId) => {
    try {
      const craftDocRef = doc(fireStore, 'craft', craftId);
      await deleteDoc(craftDocRef);
      setMessage({
        type: 'success', message: {
          title: `Success!`,
          description: `Craft id: ${craftId} was deleted successfully`,
        },
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error deleting craft:', description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { deleteCraft };
};
