import React from 'react';
import {Route, BrowserRouter as Router, Navigate} from 'react-router-dom';
import {authRouts, publicRoutes} from './routes';
import {Routes} from 'react-router';
import {useSelector} from "react-redux";

export const AppRouter = () => {
  const { auth } = useSelector(state => state);

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({path, component}) => (
          <Route path={path} element={component} key={path}/>
        ))}
        {auth?.user?.uid &&
                    authRouts.map(({path, component}) => (
                      <Route path={path} element={component} key={path}/>
                    ))}
        {!auth?.user?.uid && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};
