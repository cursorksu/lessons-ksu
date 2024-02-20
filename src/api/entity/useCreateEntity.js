import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { useGetAllEntities } from './useGetAllEntities';

export const useCreateEntity = ( entity ) => {
  const user = useSelector(state => state?.auth?.user);
  const {getAllEntities} = useGetAllEntities(entity);
  const dispatch = useDispatch();
  const createEntityDock = useCallback(async (formData) => {
    try {
      const entityCollection = collection(fireStore, entity);
      await addDoc(entityCollection, {
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

      await getAllEntities();
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
  }, [dispatch, entity, user, getAllEntities]);

  return { createEntity: createEntityDock };
};