import React from 'react';
import { ButtonStyled } from '../components/ButtonStyled';
import { ReactComponent as BookIcon } from '../assets/open-book.svg';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { MainLayout } from './MainLayout';

export const Home = () => {
  const navigate = useNavigate();

  const lessonsHandler = () => {
    navigate(routes.lessons);
  };

  return (
    <MainLayout>
      <div className="button-wrapper">
        <ButtonStyled onClick={lessonsHandler}>
          <span>Передріздвяний спринт</span>
          <BookIcon />
        </ButtonStyled>
      </div>
    </MainLayout>
  );
};
