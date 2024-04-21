import React from 'react';
import { Routes } from 'react-router';
import Situations from '../Games/Situations/Situations';
import Scala from "../Games/Scale/Scala";
import { Route } from 'react-router-dom';
import { routes } from '../router/constants';
import { MainLayout } from './MainLayout';
import { Rate } from '../Games/Rate/Rate';

export const Games = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={`/situations`} element={<Situations />} />
        <Route path={`scala`} element={<Scala />} />
        <Route path={`/:groupId/games/rate`} element={<Rate />} />
      </Routes>
    </MainLayout>
  );
};
