import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useCreateEntity = ( entity, onCreationComplete ) => {
  const user = useSelector(state => state?.auth?.user);

  const dispatch = useDispatch();
  const createEntityDock = useCallback(async (formData) => {
    try {
      const entityCollection = collection(fireStore, entity);
      const result = await addDoc(entityCollection, {
        ...formData,
        createdAt: new Date(),
        createdBy: {
          uid: user?.uid,
          name: `${user?.firstName} ${user?.lastName}`,
        },
      });
      dispatch(
        setMessage({
          type: 'success',
          message: {
            title: `${entity}`,
            description: 'successfully created',
          },
        })
      );
      await onCreationComplete && onCreationComplete();
      return result.id;
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error creating ${entity}:`,
            description: error.message,
          },
        })
      );
    }
  }, [dispatch, entity, user, onCreationComplete]);

  return { createEntity: createEntityDock };
};
