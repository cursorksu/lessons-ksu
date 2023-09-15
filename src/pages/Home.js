import React from 'react';
import { Box, Grid } from '@mui/material';
import { ButtonStyled } from '../components/ButtonStyled';
import { ReactComponent as BookIcon } from '../assets/open-book.svg';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';

export const Home = () => {
  const navigate = useNavigate();

  const lessonsHandler = () => {
    navigate(routes.lessons);
  };

  return (
    <Grid item sm={12} className="App-header">
      <div className="button-wrapper">
        <Box>
          <ButtonStyled onClick={lessonsHandler}>
            <Box component="span" mr={3}>
              Передріздвяний спринт
            </Box>
            <BookIcon />
          </ButtonStyled>
        </Box>
      </div>
    </Grid>
  );
};
