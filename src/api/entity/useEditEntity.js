import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { setEntity } from '../../store/entitiesReducer';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';

export const useEditEntity = (entityName) => {
  const dispatch = useDispatch();
  const editEntity = useCallback(
    async (data) => {
      try {
        const docRef = doc(fireStore, `/${entityName}/${data.id}`);
        const profileSnap = await getDoc(docRef);
        const entity = profileSnap.data();

        const newData = {
          ...data,
          createdBy: entity.createdBy,
          createdAt: entity.createdAt,
          modification_timestamp: Timestamp.now(), // Set modification_timestamp to current time
        };
        console.log({ newData });
        if (entity) {
          // Parse date fields
          // if (typeof newData.createdAt === 'string') {
          //   const createdAtObj = JSON.parse(newData.createdAt);
          //   newData.createdAt = new Timestamp(createdAtObj.seconds, createdAtObj.nanoseconds);
          // }
          //
          // // Convert createdBy to a document reference
          // if (newData.createdBy && typeof newData.createdBy === 'object' && newData.createdBy.id) {
          //   newData.createdBy = doc(fireStore, `users/${newData.createdBy.id}`);
          // }
          //

          await updateDoc(docRef, newData);

          if (entityName === 'students') {
            dispatch(setEntity({ students: newData }));
          }
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error editing ${entityName}:`,
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch, entityName]
  );

  return { editEntity };
};
