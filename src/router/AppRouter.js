import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { authRouts, publicRoutes } from './routes';
import { Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ path, component }) => (
          <Route path={path} element={component} key={path} />
        ))}
        {true &&
          authRouts.map(({ path, component }) => (
            <Route path={path} element={component} key={path} />
          ))}
        {/*{!false?.uid && <Route path="*" element={<Navigate to="/" />} />}*/}
      </Routes>
    </Router>
  );
};
