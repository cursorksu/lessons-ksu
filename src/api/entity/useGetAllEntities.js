import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { setCollectionsInStore } from '../../store/collectionsResucer';

export const useGetAllEntities = (entity) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchEntities = useCallback(async () => {
    try {
      const entityCollection = collection(fireStore, entity);
      const querySnapshot = await getDocs(entityCollection);
      let entityData = querySnapshot.docs.map((doc) => {
        return {
          id: doc?.id,
          ...doc.data(),
        };
      });
      setLoading(false);

      if (entity === 'collections') {
        dispatch(
          setCollectionsInStore(entityData
            .sort((a, b) => a.createdAt - b.createdAt))
        );
      }

      return entityData;
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error fetching ${entity}:`,
            description: error.message,
          },
        })
      );
    }
  }, [dispatch, entity]);

  return { loading, getAllEntities: fetchEntities };
};