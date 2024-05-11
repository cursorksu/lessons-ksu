import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { useGetStudentProfile } from '../student/useGetStudentProfile';
import { useGetAllEntities } from "./useGetAllEntities";
import { setEntity } from '../../store/entitiesReducer';
import { useDispatch } from 'react-redux';

export const useEditEntity = (entityName) => {
  const dispatch = useDispatch();
  // :TODO change students profile to more universe API call
  const { getStudentProfile } = useGetStudentProfile();
  const { getAllEntities } = useGetAllEntities(entityName);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getStudentProfile, getAllEntities]
  );

  return { editEntity };
};
