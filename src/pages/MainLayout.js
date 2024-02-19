import React from 'react';
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
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { clearAuthData } from '../store/authReducer';

export const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainMenuCollapsed  = useSelector(({ mainMenuCollapsed }) => mainMenuCollapsed);
  const { getSignUpData, signOutUser } = useSignUp();

  const loginWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence).then(() => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async () => {
        await getSignUpData();
      });
    }).catch((error) => {
      throw new Error(error);
    });
  };

  const signOut = async () => {
    signOutUser().then(() => {
      localStorage.clear();
      dispatch(clearAuthData());
      navigate(routes.home);
    });
  };

  return (
    <MainContentStyled collapsed={mainMenuCollapsed}>
      <Control loginWithGoogle={loginWithGoogle} signOut={signOut} />
      <div className="main-content">
        {children}
      </div>
    </MainContentStyled>
  );
};
