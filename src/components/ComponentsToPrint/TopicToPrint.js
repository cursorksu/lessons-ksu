import React, { useState } from 'react';
import { KsuCard } from '../KsuCard';
import { EditTextModal } from '../EditTextModal';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { EditModal } from '../EditModal';
import { DisplayEntity } from '../DisplayEntity';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as ViewIcon } from '../../assets/view.svg';
import { ReactComponent as ClosedViewIcon } from '../../assets/closed-view.svg';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const TopicToPrint = React.forwardRef(({ lesson }, ref) => {
  const { t } = useTranslation('tr');
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

  return (
    <Grid>
      <GridRow>
        <GridColumn width={4}>
          <KsuCard
            className={clsx({'print-hide': !hideElement.goal})}
            title={t('lesson.goal')}
            action={(
              <div className='action'>
                <EditModal fieldName={'goal'} fieldData={lesson?.goal} />
                <ButtonIconStyled
                  onClick={() => viewHandler('goal')}
                  className='print-hide'>
                  {hideElement.goal
                    ? <ViewIcon />
                    : <ClosedViewIcon />
                  }
                </ButtonIconStyled>
              </div>
            )}
          >
            {lesson?.goal}
          </KsuCard>
          <KsuCard
            className={clsx({'print-hide': !hideElement.bible})}
            title={t('lesson.text')}
            action={<div className='action'>
              <EditModal fieldName={'bible'} fieldData={lesson?.bible} />
              <ButtonIconStyled
                onClick={() => viewHandler('bible')}
                className='print-hide'>
                {hideElement.bible
                  ? <ViewIcon />
                  : <ClosedViewIcon />
                }
              </ButtonIconStyled>
            </div>}
          >
            <div>
              {lesson?.bible}
              <br />
              <b>{lesson?.quote}</b>
            </div>
          </KsuCard>
          <KsuCard
            className={clsx({'print-hide': !hideElement.material})}
            title={t('lesson.description')}
            action={<div className='action'>
              <EditModal fieldName={'quote'} fieldData={lesson?.quote} />
              <ButtonIconStyled
                onClick={() => viewHandler('material')}
                className='print-hide'>
                {hideElement.material
                  ? <ViewIcon />
                  : <ClosedViewIcon />
                }
              </ButtonIconStyled>
            </div>}
          >
            {lesson?.quote}
          </KsuCard>
          <KsuCard
            className={clsx({'print-hide': !hideElement.list})}
            title={t('lesson.staff')}
            action={<div className='action'>
              <EditModal fieldName={'list'} fieldData={lesson?.list} />
              <ButtonIconStyled
                onClick={() => viewHandler('list')}
                className='print-hide'>
                {hideElement.list
                  ? <ViewIcon />
                  : <ClosedViewIcon />
                }
              </ButtonIconStyled>
            </div>}
          >
            {lesson?.list?.map((el, idx) => (
              <div key={el?.id}>
                <b>{++idx}</b>.{el?.value}
              </div>))}
          </KsuCard>
        </GridColumn>
        <GridColumn
          width={12}
          className={clsx({'print-fluid': Object.keys(hideElement)
            .every((el) => !hideElement[el])})}
        >
          <KsuCard
            title='История'
          >
            <div>
              <div className='action-top'>
                <EditTextModal entityId={lesson?.id} entityName='topic' />
              </div>
              <DisplayEntity entity={topic}/>
            </div>
          </KsuCard>
        </GridColumn>
      </GridRow>
    </Grid>);
});
