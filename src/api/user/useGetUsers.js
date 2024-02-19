import { useCallback, useState } from 'react';
import { fireStore } from '../index';
import { collection, query, getDocs  } from 'firebase/firestore/lite';

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = useCallback(
    async () => {
      try {
        const q = query(collection(fireStore, "users"));
        const querySnapshot = await getDocs(q);
        setUsers([]);
        querySnapshot.forEach((doc) => {
          setUsers(prevUsers => [
            ...prevUsers,
            doc.data(),
          ]);
          // console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    []
  );

  return { users, getUsers };
};
