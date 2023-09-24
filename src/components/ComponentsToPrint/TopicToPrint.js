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
import { useSelector } from 'react-redux';

export const TopicToPrint = React.forwardRef(({ lesson }, ref) => {
  const [hideElement, showElement] = useState({
    goal: true,
    bible: true,
    material: true,
    list: true,
  });
  const { topic } = useSelector((state) => state.lessonData);

  const viewHandler = (name) => {
    showElement((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (<Grid container ref={ref}>
    <Grid
      item
      sm={12}
      container
      justifyContent='space-between'
      alignItems='center'
    >
      <h1>{lesson?.title}</h1>
    </Grid>
    <Grid
      item sm={3}
      sx={{ paddingRight: '12px' }}
    >
      <Card
        className={clsx({'print-hide': !hideElement.goal})}
        title='Цель урока'
        action={<Box className='action'>
          <EditModal fieldName={'goal'} fieldData={lesson?.goal} />
          <ButtonIconStyled
            onClick={() => viewHandler('goal')}
            className='print-hide'>
            {hideElement.goal
              ? <ViewIcon />
              : <ClosedViewIcon />
            }
          </ButtonIconStyled>
        </Box>}
      >
        {lesson?.goal}
      </Card>
      <Card
        className={clsx({'print-hide': !hideElement.bible})}
        title='Золотой стих'
        action={<Box className='action'>
          <EditModal fieldName={'bible'} fieldData={lesson?.bible} />
          <ButtonIconStyled
            onClick={() => viewHandler('bible')}
            className='print-hide'>
            {hideElement.bible
              ? <ViewIcon />
              : <ClosedViewIcon />
            }
          </ButtonIconStyled>
        </Box>}
      >
        <div>
          {lesson?.bible}
          <br />
          <b>{lesson?.quote}</b>
        </div>
      </Card>
      <Card
        className={clsx({'print-hide': !hideElement.material})}
        title='Материалы к уроку'
        action={<Box className='action'>
          <EditModal fieldName={'quote'} fieldData={lesson?.quote} />
          <ButtonIconStyled
            onClick={() => viewHandler('material')}
            className='print-hide'>
            {hideElement.material
              ? <ViewIcon />
              : <ClosedViewIcon />
            }
          </ButtonIconStyled>
        </Box>}
      >
        {lesson?.quote}
      </Card>
      <Card
        className={clsx({'print-hide': !hideElement.list})}
        title='В этом уроке:'
        action={<Box className='action'>
          <EditModal fieldName={'list'} fieldData={lesson?.list} />
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
        {lesson?.list?.map((el, idx) => (
          <Box sx={{ textAlign: 'left' }} key={el?.id}>
            <b>{++idx}</b>.{el?.value}
          </Box>))}
      </Card>
    </Grid>
    <Grid
      item
      sm={9}
      className={clsx({'print-fluid': Object.keys(hideElement)
        .every((el) => !hideElement[el])})}
    >
      <Card
        title='История'
        action={
          <div className='action'>
            <EditTextModal entityId={lesson.id} entityName='topic' />
          </div>
        }>
        <DisplayEntity entity={topic}/>
      </Card>
    </Grid>
  </Grid>);
});
