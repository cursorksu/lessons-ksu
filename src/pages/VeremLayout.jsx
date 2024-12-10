import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUp } from '../api/auth/useSignUp';
import { auth } from '../api';
import { Control } from './Control';
import { VeremMainContentStyled } from './MainContentStyled';
import { clearAuthData } from '../store/authReducer';
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';

export const VeremLayout = ({ children }) => {
  const dispatch = useDispatch();
  const mainMenuCollapsed = useSelector(
    ({ mainMenuCollapsed }) => mainMenuCollapsed
  );
  const { getSignUpData, signOutUser } = useSignUp();

  const loginWithGoogle = useCallback(async () => {
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async () => {
          await getSignUpData();
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [auth, getSignUpData]);

  const signOut = useCallback(async () => {
    signOutUser().then(() => {
      localStorage.clear();
      dispatch(clearAuthData());
    });
  }, [dispatch, signOutUser]);

  return (
    <VeremMainContentStyled collapsed={mainMenuCollapsed}>
      <Control loginWithGoogle={loginWithGoogle} signOut={signOut} />
      <div className="main-content">{children}</div>
    </VeremMainContentStyled>
  );
};
