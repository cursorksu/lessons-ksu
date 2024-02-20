import { SprintCardStyled } from './SprintCardStyled';
import { ReactComponent as ShapeBg } from '../../assets/shape.svg';
import React from 'react';

export const SprintCard = ({ img, children, onClick, titleHover }) => {
  return (
    <SprintCardStyled onClick={onClick}>
      <img src={img} alt="img"/>
      <div className="shape-light">
        <ShapeBg />
      </div>
      <div className="shape">
        <ShapeBg />
      </div>
      <div className="content">
        { children }
      </div>
      <h3 className="title hover">{titleHover}</h3>
    </SprintCardStyled>
  );
};