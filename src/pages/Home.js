import React from 'react';
import { ReactComponent as BookIcon } from '../assets/open-book.svg';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { MainLayout } from './MainLayout';
import { SprintCard } from '../components/SprintCard/SprintCard';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

export const Home = () => {
  const navigate = useNavigate();

  const lessonsHandler = () => {
    navigate(routes.lessons);
  };

  return (
    <MainLayout>
      <Grid className="button-wrapper">
        <GridRow>
          <GridColumn width={3}>
            <SprintCard onClick={lessonsHandler} img={'https://images.kinorium.com/movie/shot/727339/h280_41276320.jpg'}>
              <h3 className="title">Професор Недовіряйко</h3>
              <BookIcon />
            </SprintCard>
          </GridColumn >
          <GridColumn width={3}>
            <SprintCard onClick={lessonsHandler} img={'https://www.verywellfamily.com/thmb/eYz1jFNmcmYrhS1YcoMHgzvpbEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Raisinglittlejess2-397852ca5b624d189ea5f65053be4625.jpeg'}>
              <h3 className="title">Pіздвяний спринт</h3>
              <BookIcon />
            </SprintCard>
          </GridColumn>
        </GridRow>
      </Grid>
    </MainLayout>
  );
};
