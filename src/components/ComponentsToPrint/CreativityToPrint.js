import React, { useState } from 'react';
import { Card } from '../Card';
import { EditTextModal } from '../EditTextModal';
import { Box, Grid } from '@mui/material';
import { EditModal } from '../EditModal';
import { DisplayEntity } from '../DisplayEntity';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as ViewIcon } from '../../assets/view.svg';
import { ReactComponent as ClosedViewIcon } from '../../assets/closed-view.svg';
import { clsx } from 'clsx';

export const CreativityToPrint = React.forwardRef(({
  lesson,
  craft,
}, ref) => {
  const [hideElement, showElement] = useState({
    goal: true,
    bible: true,
    material: true,
    list: true,
    topic: true,
  });

  const viewHandler = (name) => {
    showElement((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <Grid container ref={ref}>
      <Grid
        item
        sm={12}
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <h1 className='lesson-title'>{lesson?.title}</h1>
      </Grid>
      <Grid
        item sm={3}
        sx={{ paddingRight: '12px' }}
      >
        <Card
          className={clsx({'print-hide': !hideElement.list})}
          title='В этом уроке:'
          action={<Box className='action'>
            <EditModal fieldName={'list'} fieldData={craft?.list} />
            <ButtonIconStyled
              onClick={() => viewHandler('list')}
              className='print-hide'>
              {hideElement.list
                ? <ViewIcon />
                : <ClosedViewIcon />
              }
            </ButtonIconStyled>
          </Box>}
        >
        </Card>
      </Grid>
      <Grid
        item
        sm={9}
        className={clsx({'print-fluid': Object.keys(hideElement)
          .every((el) => !el)})}
      >
        <Card
          className={clsx({'print-hide': !hideElement.topic})}
          title={craft?.title}
          action={<div className='action'>
            <EditTextModal
              entityId={lesson?.craft && lesson.craft[0]}
              entityName='craft'
            />
            <ButtonIconStyled
              onClick={() => viewHandler('topic')}
              className='print-hide'>
              {hideElement.topic
                ? <ViewIcon />
                : <ClosedViewIcon />
              }
            </ButtonIconStyled>
          </div>
          }>
          <DisplayEntity entity={craft} />
        </Card>
      </Grid>
    </Grid>);
});
