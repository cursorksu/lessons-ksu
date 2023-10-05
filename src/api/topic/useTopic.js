import { useCallback, useEffect, useState } from 'react';
import { fireStore } from '../index';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import {
  setTopic as setTopicInStore,
} from '../../store/dataReducer';

// const Topic = [{
//   id,
//   type,
//   value:
//     string |
//     [{id, value}] |
//     {id, text, quote} |
//     date | image-link |
//     media-link
// }];

export const useGetTopic = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopic = useCallback(async () => {
    try {
      const topicsCollection = collection(fireStore, 'topics');
      const querySnapshot = await getDocs(topicsCollection);
      const topicsData = querySnapshot.docs.map((doc) => ({
        id: doc?.id,
        ...doc.data(),
      }));
      setTopic(topicsData.sort((a, b) => a.createdAt - b.createdAt));
      setLoading(false);
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error!',
            description: error.message,
          },
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return { topic, loading, getTopic: fetchTopic };
};

export const useDeleteTopic = () => {
  const dispatch = useDispatch();
  const deleteTopic = useCallback(
    async (topicId) => {
      try {
        const topicDocRef = doc(fireStore, 'topics', topicId);
        await deleteDoc(topicDocRef);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error!',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { deleteTopic };
};

export const useGetTopicById = () => {
  const dispatch = useDispatch();
  const getTopicById = useCallback(
    async (topicId) => {
      try {
        const topicDocRef = doc(fireStore, 'topics', topicId);
        const topicSnapshot = await getDoc(topicDocRef);
        if (topicSnapshot.exists()) {
          const dataTopic = topicSnapshot.data();

          dispatch(setTopicInStore( JSON.parse(dataTopic.topic)));

          return { id: topicSnapshot?.id, ...topicSnapshot.data() };
        } else {
          return null;
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error!',
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch]
  );

  return { getTopicById };
};

export const useCreateTopic = () => {
  const dispatch = useDispatch();
  const createTopicDock = useCallback(
    async (topic) => {
      try {
        const topicCollection = collection(fireStore, 'topics');
        const docRef = await addDoc(topicCollection, {
          topic: JSON.stringify(topic),
          createdAt: new Date(),
        });
        const id = docRef?.id;
        return id;
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error!',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { createTopic: createTopicDock };
};

export const useUpdateTopic = () => {
  const dispatch = useDispatch();
  const updateTopic = useCallback(
    async (topicId, updatedFields) => {
      try {
        const topicDocRef = doc(fireStore, 'topics', topicId);
        const topicSnapshot = await getDoc(topicDocRef);

        if (topicSnapshot.exists()) {
          const existingTopicData = topicSnapshot.data();
          const updatedTopicData = {
            ...existingTopicData,
            topic: JSON.stringify(updatedFields),
          };
          await updateDoc(topicDocRef, updatedTopicData);

          return { id: topicSnapshot?.id, ...updatedTopicData };
        } else {
          return null;
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error!',
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch]
  );

  return { updateTopic };
};
