import React, { useMemo } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { Card } from '../Card';
import { EditTextModal } from '../EditTextModal';
import { DisplayEntity } from '../DisplayEntity';
import { SlideShow } from '../SlideShow';

export const EntityToPrint = React.forwardRef(({
  lesson,
  entity,
  entityName,
}) => {
  const slideList = useMemo(() => {
    return entity?.list?.filter((el) => el.type === 'image');
  }, [entity]);

  return (
    <Grid divided>
      <GridRow>
        <h1 className='lesson-title title'>{lesson?.title}</h1>
      </GridRow>
      <GridRow>
        <GridColumn width={4}>
          {slideList?.length > 0 && (
            <Card hideTitle hideAction className='single-content'>
              <SlideShow
                slideList={slideList}
              />
            </Card>
          )}
        </GridColumn>
        <GridColumn width={14}>
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
        </GridColumn>
      </GridRow>
    </Grid>
  );
});
