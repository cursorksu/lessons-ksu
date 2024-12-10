import React, { useCallback, useEffect, useState } from 'react';
import { VeremLayout } from '../../pages/VeremLayout';
import { GroupList } from './GroupList';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { ButtonIconStyled } from '../ButtonStyled';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { churchConfig } from '../../constants/entities/churchConfig';
import {
  getDateLocalString,
  getDateObject,
} from '../../utils/getDateLocalString';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import {
  VeremChips,
  VeremChipsSmall,
  VeremChurchContent,
  VeremLink,
} from './VeremChurchContent';
import { useTranslation } from 'react-i18next';
import { TeachersList } from './TeachersList';
import { ChurchItemStyled } from './style';

export const VeremChurch = () => {
  const { user } = useSelector((state) => state.auth);
  const { churchId } = useParams();
  const [church, setChurch] = useState({});
  const { getEntityById } = useGetEntity('church');
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { t } = useTranslation('tr');

  const getChurch = useCallback(async () => {
    await getEntityById(churchId).then((data) => {
      setChurch(data);
    });
  }, [getEntityById, churchId]);

  useEffect(() => {
    getChurch();
  }, [shouldUpdate, churchId, getEntityById, getChurch]);

  const confirmationHandler = async (_, churchData) => {
    setShouldUpdate((prev) => !prev);
  };

  const onEditList = useCallback(async () => {
    setShouldUpdate((prev) => !prev);
  }, []);

  return (
    <VeremLayout>
      <div className="hero">
        <div className="verem-church-title">
          <div>
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/Black.png?alt=media&token=7a67912e-d6c3-408f-bc31-819eafa5cb60"
              alt="logo png"
            />
          </div>
          <div className="title-info">
            <p className="subtitle">євангельська церква</p>
            <h1 className="title">"{church?.title}"</h1>
            <VeremChipsSmall>м. Ківерці</VeremChipsSmall>
          </div>

          <div className="actions">
            {church?.createdBy?.uid === user?.uid && (
              <ButtonIconStyled onClick={() => setIsFormShown(true)}>
                <EditIcon />
              </ButtonIconStyled>
            )}
          </div>
        </div>
        <div className="church-avatar">
          <div
            className="img"
            style={{
              backgroundImage:
                'url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/photo_2024-12-10_01-23-25.jpg?alt=media&token=52790f3c-a9fd-4469-8ba7-72f194d9aa25")',
            }}></div>
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
            createdDate:
              church?.createdDate && getDateObject(church?.createdDate),
          }}
        />
      )}
      <div>
        <VeremChurchContent>
          <div className="balls-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fcircles.png?alt=media&token=7d9cc5b2-37ef-4aea-86f0-0aee2217d6d2"
              alt="decor"
            />
          </div>
          <div className="content">
            <h3>
              <VeremChips>{`${t('church.labels.about')}`}</VeremChips>
            </h3>
            <h3>
              Started{' '}
              {church?.createdDate && getDateLocalString(church?.createdDate)}
            </h3>
            {church?.about}
          </div>
          <div className="content">
            <h3>
              <VeremChips>{`${t('church.labels.pastor')}`}</VeremChips>
            </h3>
            <h3>{church?.pastor}</h3>
            <ChurchItemStyled>
              <img
                src={
                  'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpastor.jpg?alt=media&token=297b7dc7-8cdc-42d3-a347-03ab113d2f58'
                }
                alt="pastor avatar"
              />

              <ul className="contacts">
                <li>
                  <span>Address: </span>
                  <VeremLink>{church?.address}</VeremLink>
                </li>
                <li>
                  <span>Email: </span>{' '}
                  <VeremLink href={`mailto:${church?.email}`}>
                    {church?.email}
                  </VeremLink>
                </li>
                <li>
                  <span>Web Site: </span>{' '}
                  <VeremLink href={church?.web}>{church?.web}</VeremLink>
                </li>
                <li>
                  <span>Phone: </span>
                  <VeremLink href={`tel:${church?.phone}`}>
                    {church?.phone}
                  </VeremLink>
                </li>
              </ul>
            </ChurchItemStyled>
          </div>
          <div className="content">
            <div>
              {church && (
                <TeachersList
                  isAuth={church?.createdBy?.uid === user?.uid}
                  onEdit={onEditList}
                  church={church}
                />
              )}
              {church && (
                <GroupList
                  isAuth={church?.createdBy?.uid === user?.uid}
                  onEdit={getChurch}
                  church={church}
                />
              )}
            </div>
          </div>
          <section className="verem-content">
            {/*{church && (*/}
            {/*  <LessonsList*/}
            {/*    isAuth={church?.createdBy?.uid === user?.uid}*/}
            {/*    teachers={church?.groups}*/}
            {/*    lessons={church?.lessons}*/}
            {/*    onEdit={getChurch}*/}
            {/*    church={church}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{church && (*/}
            {/*  <ScenarioList*/}
            {/*    isAuth={church?.createdBy?.uid === user?.uid}*/}
            {/*    teachers={church?.groups}*/}
            {/*    scenarios={church?.scenario}*/}
            {/*    onEdit={onEditList}*/}
            {/*    church={church}*/}
            {/*  />*/}
            {/*)}*/}
          </section>
        </VeremChurchContent>
      </div>
    </VeremLayout>
  );
};
