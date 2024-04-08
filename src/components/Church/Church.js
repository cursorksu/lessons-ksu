import React, { useCallback, useEffect, useState } from 'react';
import { ChurchStyled } from './style';
import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import { ButtonIconStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { churchConfig } from '../../constants/entities/churchConfig';
import { MainLayout } from '../../pages/MainLayout';
import { useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { getDateLocalString } from '../../utils/getDateLocalString';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { TeachersList } from './TeachersList';
import { GroupList } from './GroupList';
export const Church = () => {
  const { user } = useSelector(state => state.auth);
  const { churchId } = useParams();
  const [church, setChurch] = useState({});
  const { getEntityById } = useGetEntity('church', churchId);
  const { getEntities: getTeachers, entities: teachers } = useGetEntityListByIds('users');
  const { getEntities: getGroups, entities: groups } = useGetEntityListByIds('group');
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    getEntityById().then(data => {
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

  const onEditList = useCallback(async () => {
    setShouldUpdate(prev => !prev);
  }, []);

  return (
    <MainLayout>
      <UserProfileStyled>
        <div className="top-container">
          <div className='d-flex'>
            <div className="avatar">
              <img src={church?.avatar && church?.avatar[0]?.base64} alt='church' />
            </div>
            <h1 className="title">{church?.title}</h1>
          </div>
          <div>
            {church?.createdBy?.uid === user?.uid && (
              <ButtonIconStyled onClick={() => setIsFormShown(true)}>
                <EditIcon />
              </ButtonIconStyled>
            )}
          </div>
        </div>

        {isFormShown && (
          <CreateEntityForm
            entityName="church"
            onConfirm={() => {}}
            onClose={() => setIsFormShown(false)}
            fields={churchConfig}
            defaultValues={{
              ...church,
              createdDate: church?.createdDate && new Date(getDateLocalString(church?.createdDate)),
            }}
          />
        )}
      </UserProfileStyled>
      <ChurchStyled>
        <InfoBlockStyled>
          <h2>Started {church?.createdDate && getDateLocalString(church?.createdDate)}</h2>
          {church?.about}
        </InfoBlockStyled>
        <div className='d-grid'>
          <InfoBlockStyled>
            <div className="pastor-avatar">
              <img src={church?.avatar && church?.avatar[0]?.base64} alt="pastor avatar"/>
            </div>
            <div>
              <h2>Pastor</h2>
              {church?.pastor}
            </div>
          </InfoBlockStyled>
          <InfoBlockStyled className='text-block'>
            <div><b>Address:</b> {church?.address}</div>
            <div><b>Email:</b> {church?.email}</div>
            <div><b>Web Site:</b> {church?.web}</div>
            <div><b>Phone:</b> {church?.phone}</div>
          </InfoBlockStyled>
        </div>
        <div className='d-grid'>
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
        </div>
      </ChurchStyled>
    </MainLayout>
  );
};
