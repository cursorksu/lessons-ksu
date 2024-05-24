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
}, ref) => {
  const slideList = useMemo(() => {
    return entity?.list?.filter((el) => el.type === 'image');
  }, [entity]);

  return (
    <Grid divided ref={ref}>
      <GridRow>
        <GridColumn width={16}>
          {slideList?.length > 0 && (
            <KsuCard hideTitle hideAction className='single-content'>
              <SlideShow
                slideList={slideList}
              />
            </KsuCard>
          )}
        </GridColumn>
        <GridColumn width={16}>
          <KsuCard
            title={entity?.title}
          >
            <div>
              <div className='action-top'>
                <EditTextModal
                  entityId={lesson?.craft && lesson.craft[0]}
                  entityName={entityName}
                />
              </div>
              <DisplayEntity entity={entity} />
            </div>
          </KsuCard>
        </GridColumn>
      </GridRow>
    </Grid>
  );
});
