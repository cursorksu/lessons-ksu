import { ButtonStyled } from '../ButtonStyled';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainLayout } from '../../pages/MainLayout';
import { useTranslation } from 'react-i18next';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { EntityListStyled } from './EntityItemStyled';
import { EntityItemExpanded } from './components/EntityItemExpanded';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { publicStatuses } from '../../constants/statuses/publicStatuses';
import { getOption } from '../../utils/getOption';
import { FormAsideCreation } from './components/FormAsideCreation';

export const LessonEntityList = ({ entityName }) => {
  const initialValue = {
    title: '',
    tags: [],
    text: '',
    image: null,
  };
  const { t } = useTranslation('tr');
  const { user } = useSelector((state) => state.auth);
  const { getAllEntities } = useGetAllEntities(entityName);
  const { getEntities: getMyLessons, entities: lessons } = useGetEntityListByIds('lessons');
  const [options, setOptions] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isAsideFormOpen, setIsAsideFormOpen] = useState(false);
  const [entitiesList, setEntitiesList] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(initialValue);

  useEffect(() => {
    getAllEntities().then(data => setEntitiesList(data));
  }, [getAllEntities, shouldUpdate]);

  useEffect(() => {
    user?.uid &&
    getMyLessons(user?.lessons).then(() => {});
  }, [getMyLessons, user]);

  useEffect(() => {
    lessons.length > 0 && setOptions(lessons
      .filter(el => el.status === publicStatuses.draft)
      .map(el => getOption(el)));
  }, [lessons]);

  return (
    <MainLayout>
      <div className="herro scenario-herro">
        <div className="title-wrapper top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">{t(`entities.${entityName}`)}</h1>
        </div>
      </div>
      <EntityListStyled>
        <section className='ksu-content'>
          <aside className='aside-wrapper d-block'>
            <h2>{t(`entities.${entityName}`)}</h2>
            {user?.uid && (
              <div>
                <ButtonStyled onClick={() => setIsAsideFormOpen(true)}>
                  + {entityName}
                </ButtonStyled>
                {isAsideFormOpen &&
                  <FormAsideCreation
                    entityName={entityName}
                    onConfirm={() => {
                      setShouldUpdate((prev) => !prev);
                      setIsAsideFormOpen(true);
                      setSelectedEntity(initialValue);
                    }}
                    onClose={() => setIsAsideFormOpen(false)}
                    defaultValues={selectedEntity}
                    lessonsOptions={[]}
                  />
                }
              </div>
            )}
          </aside>
          <section className='content-wrapper'>
            <div className="content-list">
              {entitiesList?.length > 0 && entitiesList.map(el => (
                <EntityItemExpanded
                  lessonsOptions={options}
                  onLessonSelect={(e) => e.stopPropagation()}
                  onConfirm={() => setShouldUpdate((prev) => !prev)}
                  onEdit={(e, data) => {
                    e.stopPropagation();
                    setIsAsideFormOpen(true);
                    setSelectedEntity(data);
                  }}
                  key={el.id}
                  entityName={entityName}
                  item={el}
                />
              ))}
            </div>
          </section>
        </section>
      </EntityListStyled>
    </MainLayout>
  );
};
