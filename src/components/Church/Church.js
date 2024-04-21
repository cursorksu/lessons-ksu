import React, { useCallback, useEffect, useState } from 'react';
import { ButtonIconStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { churchConfig } from '../../constants/entities/churchConfig';
import { MainLayout } from '../../pages/MainLayout';
import { useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import {
  getDateLocalString, getDateObject
} from '../../utils/getDateLocalString';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { TeachersList } from './TeachersList';
import { GroupList } from './GroupList';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { ScenarioList } from './ScenarioList';
import { LessonsList } from './LessonsList';

export const Church = () => {
  const { user } = useSelector(state => state.auth);
  const { churchId } = useParams();
  const [church, setChurch] = useState({});
  const { getEntityById } = useGetEntity('church');
  const { getEntityById: getTeacherById } = useGetEntity('users');
  const { getEntities: getTeachers, entities: teachers } = useGetEntityListByIds('users');
  const { getEntities: getGroups, entities: groups } = useGetEntityListByIds('group');
  const { editEntity: editTeacher } = useEditEntity('users');
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    getEntityById(churchId).then(data => {
      setChurch(data);
    });
  }, [shouldUpdate, churchId, getEntityById]);

  useEffect(() => {
    church?.teachers?.length && getTeachers(church?.teachers);
    church?.groups?.length && getGroups(church?.groups);
  }, [church, getTeachers, getGroups]);

  useEffect(() => {
    teachers?.length && setChurch(prev => ({
      ...prev,
      teachers,
    }));
  }, [teachers]);

  useEffect(() => {
    teachers?.length && setChurch(prev => ({
      ...prev,
      groups,
    }));
  }, [groups, teachers?.length]);

  const confirmationHandler = async (_, churchData) => {
    churchData.teachers.map(async el => {
      const teacher = await getTeacherById(el);
      await editTeacher({
        ...teacher,
        church: [...teacher?.church, churchData.id]
      });
    });
    setShouldUpdate(prev => !prev);
  };

  const onEditList = useCallback(async () => {
    setShouldUpdate(prev => !prev);
  }, []);

  return (
    <MainLayout>
      <div className="herro" style={{ backgroundImage: `url("${church?.avatar && church?.avatar[0]?.base64}")`}}>
        <div className="title-wrapper top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">{church?.title}</h1>
          <div className="actions">
            {church?.createdBy?.uid === user?.uid && (
              <ButtonIconStyled onClick={() => setIsFormShown(true)}>
                <EditIcon />
              </ButtonIconStyled>
            )}
          </div>
        </div>
      </div>

      {isFormShown && (
        <CreateEntityForm
          entityName="church"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={churchConfig}
          defaultValues={{
            ...church,
            createdDate: church?.createdDate && getDateObject(church?.createdDate),
          }}
        />
      )}
      <div>
        <section className='ksu-content'>
          <aside className='aside-wrapper'>
            <InfoBlockStyled className='aside'>
              <h2 className='title'>
                <p>Started {church?.createdDate && getDateLocalString(church?.createdDate)}</p>
              </h2>
              <ShadowCardStyled>
                <div className="pastor-avatar">
                  <img src={church?.avatar && church?.avatar[0]?.base64} alt="pastor avatar"/>
                </div>
              </ShadowCardStyled>
            </InfoBlockStyled>
            <InfoBlockStyled>
              {church.about}
            </InfoBlockStyled>
            <InfoBlockStyled className='aside-wrapper'>
              <ShadowCardStyled>
                <ul className="contacts">
                  <li><b>Pastor: </b> <address>{church?.pastor}</address></li>
                  <li><b>Address: </b> <address>{church?.address}</address></li>
                  <li><b>Email: </b> <a href={`mailto:${church?.email}`}>{church?.email}</a></li>
                  <li><b>Web Site: </b> <a href={church?.web}>{church?.web}</a></li>
                  <li><b>Phone: </b><a href={`tel:${church?.phone}`}>{church?.phone}</a></li>
                </ul>
              </ShadowCardStyled>
            </InfoBlockStyled>
          </aside>
          <section className='content-wrapper'>
            {church && (
              <TeachersList
                isAuth={church?.createdBy?.uid === user?.uid}
                teachers={church?.teachers}
                onEdit={onEditList}
                church={church}
              />
            )}
            {church && (
              <GroupList
                isAuth={church?.createdBy?.uid === user?.uid}
                groups={church?.groups}
                onEdit={onEditList}
                church={church}
              />
            )}
            {church && (
              <LessonsList
                isAuth={church?.createdBy?.uid === user?.uid}
                teachers={church?.groups}
                lessons={church?.lessons}
                onEdit={onEditList}
                church={church}
              />
            )}
            {church && (
              <ScenarioList
                isAuth={church?.createdBy?.uid === user?.uid}
                teachers={church?.groups}
                scenarios={church?.scenario}
                onEdit={onEditList}
                church={church}
              />
            )}
          </section>
        </section>
      </div>
    </MainLayout>
  );
};
