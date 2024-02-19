import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useCreateCollections = () => {
  const dispatch = useDispatch();
  const createCollectionDock = useCallback(async (collectionObj) => {
    try {
      const collectionDock = collection(fireStore, 'collection');
      const createdAt = new Date().toLocaleString();
      const collectionData = await addDoc(collectionDock, {...collectionObj, createdAt });

      dispatch(setMessage({
        type: 'success', message: {
          title: 'Success creating collection with id:',
          description: collectionData.id,
        },
      }));
      return collectionData.id;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating collection:',
          description: error.message,
        },
      }));
    }
  }, [dispatch]);

  return { createCollection: createCollectionDock };
};
