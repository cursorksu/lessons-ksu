import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { Card } from '../Card';
import { EditTextModal } from '../EditTextModal';
import { DisplayEntity } from '../DisplayEntity';
import { SlideShow } from '../SlideShow';

export const FoodToPrint = React.forwardRef(({
  lesson,
  food,
}, ref) => {
  const slideList = useMemo(() => {
    return food?.list?.filter((el) => el.type === 'image');
  }, [food]);

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
        item
        sm={12}
      >
        {slideList?.length > 0 && (
          <Card hideTitle hideAction className='single-content print-fluid'>
            <SlideShow
              slideList={slideList}
            />
          </Card>
        )}
        <Card
          title={food?.title}
          action={<div className='action'>
            <EditTextModal
              entityId={lesson?.food && lesson.food[0]}
              entityName='food'
            />
          </div>
          }>
          <DisplayEntity entity={food} />
        </Card>
      </Grid>
    </Grid>);
});
