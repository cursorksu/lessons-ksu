import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { setCollectionsInStore } from '../../store/collectionsResucer';
import { setEntity } from '../../store/entitiesReducer';
import { getDateObject } from '../../utils/getDateLocalString';

export const useGetAllEntities = (entity) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchEntities = useCallback(async () => {
    try {
      const entityCollection = collection(fireStore, entity);
      const querySnapshot = await getDocs(entityCollection);
      let entityData = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        if (data.birthday && data.birthday !== '') {
          data.birthday = data.birthday.toDate();
        }

        return ({
          id: doc?.id, ...data, createdAt: getDateObject(data?.createdAt),
        });
      });
      setLoading(false);

      if (entity === 'collections') {
        dispatch(
          setCollectionsInStore(entityData
            .sort((a, b) => b.createdAt - a.createdAt))
        );
      }

      if (entity === 'students') {
        dispatch(
          setEntity({ students: entityData }));
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
