import React from 'react';
import { Routes } from 'react-router';
import Situations from '../Games/Situations/Situations';
import { Route } from 'react-router-dom';
import { routes } from '../router/constants';
import { MainLayout } from './MainLayout';

export const Games = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={`${routes.games}/situations`} element={<Situations />} />
      </Routes>
    </MainLayout>
  );
};
