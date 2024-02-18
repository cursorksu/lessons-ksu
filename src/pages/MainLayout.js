import React from 'react';
import { Control } from './Control';
import { MainContentStyled } from './MainContentStyled';
import { useSelector } from 'react-redux';

export const MainLayout = ({ children }) => {
  const mainMenuCollapsed  = useSelector(({ mainMenuCollapsed }) => mainMenuCollapsed);
  return (
    <MainContentStyled collapsed={mainMenuCollapsed}>
      <Control />
      <div className="main-content">
        {children}
      </div>
    </MainContentStyled>
  );
};
