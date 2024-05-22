import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { setEntity } from '../../store/entitiesReducer';
import { useDispatch } from 'react-redux';

export const useEditEntity = (entityName) => {
  const dispatch = useDispatch();
  const editEntity = useCallback(
    async (data) => {
      try {
        const docRef = doc(fireStore, `/${entityName}/${data.id}`);
        const profileSnap = await getDoc(docRef);
        const entity = profileSnap.data();
        if (entity) {
          const newData = {
            ...entity?.profile,
            ...data,
            modification_timestamp: new Date().getTime(),
          };
          await updateDoc(docRef, newData);
          if (entity === 'students') {
            dispatch(
              setEntity({ students: newData }));
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch, entityName]
  );

  return { editEntity };
};
