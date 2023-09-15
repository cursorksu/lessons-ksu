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
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopic = useCallback(async () => {
    try {
      const topicsCollection = collection(fireStore, 'topics');
      const querySnapshot = await getDocs(topicsCollection);
      const topicsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopic(topicsData.sort((a, b) => a.createdAt - b.createdAt));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }, []);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return { topic, loading, getTopic: fetchTopic };
};

export const useDeleteTopic = () => {
  const deleteTopic = useCallback(async (topicId) => {
    try {
      const topicDocRef = doc(fireStore, 'topics', topicId);
      await deleteDoc(topicDocRef);
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  }, []);

  return { deleteTopic };
};

export const useGetTopicById = () => {
  const getTopicById = useCallback(async (topicId) => {
    try {
      const topicDocRef = doc(fireStore, 'topics', topicId);
      const topicSnapshot = await getDoc(topicDocRef);

      if (topicSnapshot.exists()) {
        return { id: topicSnapshot.id, ...topicSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }, []);

  return { getTopicById };
};

export const useCreateTopic = () => {
  const createTopicDock = useCallback(async (topic) => {
    try {
      const topicCollection = collection(fireStore, 'topics');
      const docRef = await addDoc(topicCollection, {
        topic: JSON.stringify(topic),
        createdAt: new Date(),
      });
      const id = docRef.id;
      return id;
    } catch (error) {
      console.log({
        message: error,
      });
    }
  }, []);

  return { createTopic: createTopicDock };
};

export const useUpdateTopic = () => {
  const updateTopic = useCallback(async (topicId, updatedFields) => {
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

        return { id: topicSnapshot.id, ...updatedTopicData };
      } else {
        return null;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  }, []);

  return { updateTopic };
};
