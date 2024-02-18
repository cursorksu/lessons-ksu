import React, { useMemo } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { KsuCard } from '../KsuCard';
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
            <KsuCard hideTitle hideAction className='single-content'>
              <SlideShow
                slideList={slideList}
              />
            </KsuCard>
          )}
        </GridColumn>
        <GridColumn width={14}>
          <KsuCard
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
          </KsuCard>
        </GridColumn>
      </GridRow>
    </Grid>
  );
});
