import React from 'react';
import {Route, BrowserRouter as Router, Navigate} from 'react-router-dom';
import {authRouts, publicRoutes} from './routes';
import {Routes} from 'react-router';
import {useSelector} from "react-redux";
import {routes} from "./constants";
import Scala from "../Games/Scale/Scala";

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({path, component}) => (
          <React.Fragment key={path}>
            <Route path={path} element={component} key={path}/>
            <Route key={`${routes.games}/scala`} path={`${routes.games}/scala`} element={<Scala />} />
          </React.Fragment>
        ))}
        {auth?.user?.uid && authRouts.map(({path, component}) => (
          <Route  key={path} path={path} element={component}/>
        ))}
        {!auth?.user?.uid && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};
