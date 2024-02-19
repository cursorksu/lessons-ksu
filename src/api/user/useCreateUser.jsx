import { setDoc, doc } from 'firebase/firestore/lite';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { fireStore } from '../index';

// const User = {
//   accessToken,
//   displayName,
//   email,
//   emailVerified,
//   isAnonymous,
//   metadata: {createdAt: '1672348833130', lastLoginAt: '1672351573014', lastSignInTime: 'Thu, 29 Dec 2022 22:06:13 GMT', creationTime: 'Thu, 29 Dec 2022 21:20:33 GMT'}
//   phoneNumber,
//   photoURL,
//   proactiveRefresh,
//   providerData,
//   providerId,
//   reloadListener,
//   uid: "ZvBrjxD6aCSjRMF5J8pH1tEb68f2"
//   refreshToken: "AOkPPWSkb2rwH1nnnE9W9JkD8P3657Zpe4_bojtdQTGvJ-QZlXeZa6mrKV34EcM-sNGN5wFBIhX1YhCeGA86It5eXT59XR6UZbtWgIYmcMQnFHl5QsNQfWj40lCG0ANrbSb79HKhNHDz0F0Lm9A_FG7HqaTekd-JzY07POAgGaJ56CJxY4HuvhqyF5jt3oOGJJ-Icz6tgKRX_dydu_EQuZp7v-52HELTMszmZluNJkmt5p0i6RGBBpwhcIimSizxBugmR7J3XuFIqlIzZl47Noe9fc-REDfSDWTDHdtfP5JW7m3PjqUxYMl0fQ29ZRop3w3l7mAP6R1t28Yit8zgBi-S6grbAKH6DUiXPNmNSiXgHYmcTSA-ND8ZQ7y941dh18y2zfdQfE1CEhz9qBCtzyoUb97yf8zqlKj1d6svb9OwiHQIHAwjuQg"
//}

export const useCreateUser = () => {
  const dispatch = useDispatch();
  const createUserDoc = async (userObj) => {
    try {
      const userDock = doc(fireStore, `/users/${userObj.uid}`);
      const createdAt = new Date().toLocaleString();
      const userData = await setDoc(userDock, { ...userObj, createdAt });

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