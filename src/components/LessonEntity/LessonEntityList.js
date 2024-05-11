// import { FormField, Popup } from 'semantic-ui-react';
import { ButtonStyled } from '../ButtonStyled';
// import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
// import { ReactComponent as PrintIcon } from '../../assets/print.svg';
// import { ReactComponent as ScreenIcon } from '../../assets/screen.svg';
// import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
// import { useParams } from 'react-router';
// import { InfoBlockStyled } from '../InfoBlockStyled';
// import { useReactToPrint } from 'react-to-print';
// import { useCreateEntity } from '../../api/entity/useCreateEntity';
// import { Controller, useForm } from 'react-hook-form';
// import Editor from '../TextEditor';
// import { HTMLRenderer } from '../HTMLRender/HTMLRender';
// import {
//   useAssignEntityToLesson
// } from '../../api/refs/useAssignEntityToLesson';
// import clsx from 'clsx';
import { MainLayout } from '../../pages/MainLayout';
// import ReactQuill from 'react-quill';
// import { SprintCard } from '../SprintCard/SprintCard';
// import { routes } from '../../router/constants';
// import { getDateLocalString } from '../../utils/getDateLocalString';
// import { PAGE_SIZE } from '../../constants/main';
import { useTranslation } from 'react-i18next';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { EntityListStyled } from './EntityItemStyled';
import { EntityItemExpanded } from './components/EntityItemExpanded';

export const LessonEntityList = ({ entityName, lesson }) => {
  // const { lessonId } = useParams();
  const { t } = useTranslation('tr');
  const { getAllEntities } = useGetAllEntities(entityName);
  // const { createEntity } = useCreateEntity(entityName);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const [entitiesList, setEntitiesList] = useState([]);
  // const { addEntityToArrayField, removeEntityFromArrayField } = useAssignEntityToLesson(entityName);
  //
  // const {control, getValues, setValue, reset} = useForm({
  //   defaultValues: {
  //     text: '',
  //     material: lesson?.material || [],
  //   },
  //   caches: false
  // });

  useEffect(() => {
    getAllEntities().then(data => setEntitiesList(data));
  }, [getAllEntities]);

  // const [isFormShown, setIsFormShown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  //
  // const handleEntityCreate = async () => {
  //   try {
  //     const newValue = getValues('text');
  //     const id = await createEntity({  text: newValue });
  //
  //     if (id === undefined) {
  //       throw  new Error(`${entityName} Did Not Created!`);
  //     }
  //     await addEntityToArrayField(entityName, id, lessonId);
  //
  //     setIsFormShown(false);
  //     reset({
  //       text: '',
  //       material: [],
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };
  //
  // const removeEntity = async (entityId) => {
  //   await removeEntityFromArrayField(entityName, entityId, lessonId);
  // };
  //
  // const handleCancel = () => {
  //   reset();
  //   setIsFormShown(false);
  // };

  return (
    <MainLayout>
      <div className="herro scenario-herro">
        <div className="title-wrapper top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">{t(`entities.${entityName}`)}</h1>
          {user?.uid && (
            <div>
              <ButtonStyled onClick={() => null}>
               + {entityName}
              </ButtonStyled>
            </div>
          )}
        </div>
      </div>
      <EntityListStyled>
        <section className='ksu-content'>
          <aside className='aside-wrapper'>
            <h2>{entityName}{t(`entities.${entityName}`)}</h2>
          </aside>
          <section className='content-wrapper'>
            <div className="content-list">
              {entitiesList?.length > 0 && entitiesList.map(el => (
                <EntityItemExpanded entityName={entityName} item={el} />
              ))}
            </div>
          </section>
        </section>
      </EntityListStyled>
    </MainLayout>
  );
};
