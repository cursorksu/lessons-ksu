import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { Card } from '../Card';
import { EditTextModal } from '../EditTextModal';
import { DisplayEntity } from '../DisplayEntity';
import { SlideShow } from '../SlideShow';

export const EntityToPrint = React.forwardRef(({
  lesson,
  entity,
  entityName,
}, ref) => {
  const slideList = useMemo(() => {
    return entity?.list?.filter((el) => el.type === 'image');
  }, [entity]);

  return (
    <Grid container ref={ref}>
      <Grid
        item
        sm={12}
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <h1 className='lesson-title title'>{lesson?.title}</h1>
      </Grid>
      <Grid item sm={12}>
        {slideList?.length > 0 && (
          <Card hideTitle hideAction className='single-content'>
            <SlideShow
              slideList={slideList}
            />
          </Card>
        )}
        <Card
          title={entity?.title}
          action={
            <div className='action'>
              <EditTextModal
                entityId={lesson?.craft && lesson.craft[0]}
                entityName={entityName}
              />
            </div>
          }>
          <DisplayEntity entity={entity} />
        </Card>
      </Grid>
    </Grid>);
});
