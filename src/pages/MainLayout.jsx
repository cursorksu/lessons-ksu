import React, { useCallback } from 'react';
import { Control } from './Control';
import { MainContentStyled } from './MainContentStyled';
import { useDispatch, useSelector } from 'react-redux';
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { useSignUp } from '../api/auth/useSignUp';
import { auth } from '../api';
import { clearAuthData } from '../store/authReducer';
import { TestEnvMessage } from '../components/Messages/TestEnvMessage';
import { VeremInviteStyled } from '../components/VeremInvite/style';
import { Footer } from '../components/Footer/Footer';

export const MainLayout = ({ children, className }) => {
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
    <MainContentStyled collapsed={mainMenuCollapsed} className={className}>
      <Control loginWithGoogle={loginWithGoogle} signOut={signOut} />
      <div className="main-content">
          <TestEnvMessage/>
          {children}
          <Footer />
      </div>
    </MainContentStyled>
  );
};
