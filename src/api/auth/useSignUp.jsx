import {
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCreateUser } from '../user/useCreateUser';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authReducer';
import { auth, fireStore } from '../index';
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {routes} from "../../router/constants";

export const useSignUp = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation('tr');
  const { createUser } = useCreateUser();
  const navigate= useNavigate();

  const getSignUpData = async () => {
    await getRedirectResult(auth)
      .then(async () => {
        onAuthStateChanged(auth, async (user) => {
          if (!user) return;
          const token = auth?.currentUser?.accessToken;
          token && localStorage.setItem('KSU_TOKEN', token);

          const userDocRef = doc(fireStore, `/users/${user.uid}`);
          const profileSnap = await getDoc(userDocRef);
          const userData = await profileSnap.data();
          const profile = {
            uid: user.uid,
            email: user.email,
            firstName: user.displayName?.split(' ')[0],
            lastName: user.displayName?.split(' ')[1],
            avatar: user.photoURL,
            lang: i18n.language,
          };

          if (userData) {
            await i18n.changeLanguage(userData.lang);
          }

          if (!userData) {
            await createUser(profile);
          }
          dispatch(setAuthData({
            user: userData,
            token: auth?.currentUser?.accessToken,
          }));
          
          return profile;
        });
      })
      .then(() => {
        navigate(routes.collections);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const signOutUser = useCallback(async () => {
    await signOut(auth).catch((error) => {
      throw new Error(error);
    });
  }, []);

  return { getSignUpData, signOutUser };
};
