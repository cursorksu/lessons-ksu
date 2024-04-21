import { setDoc, doc } from 'firebase/firestore';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { fireStore } from '../index';

export const useCreateUser = () => {
  const dispatch = useDispatch();
  const createUserDoc = async (userObj) => {
    try {
      const userDock = doc(fireStore, `/users/${userObj?.uid}`);
      const createdAt = new Date().toLocaleString();
      const userData = await setDoc(userDock, { ...userObj, createdAt, groups: [] });

      dispatch(setMessage({
        type: 'success',
        message: {
          title: 'Success!',
          description: `Created User with id: ${userObj?.uid}`,
        },
      }));
      return userData?.uid;
    } catch (error) {
      dispatch(setMessage({
        type: 'error', message: {
          title: 'Error creating collection:',
          description: error.message,
        },
      }));
    }
  };

  return { createUser: createUserDoc };
};
