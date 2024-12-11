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
import { ContentList } from './ContentList';
import { SlideShow } from '../SlideShow';
import { PHOTO_PLACEHOLDER } from '../../constants/main';

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
            {church?.logo ? (
                <img
                    className="logo"
                    src={church?.logo}
                    alt="logo png"
                />
            ) : (
              <img
              className="logo"
              src={PHOTO_PLACEHOLDER}
              alt="logo png"
              />
            )}
          </div>
          <div className="title-info">
            <p className="subtitle">{church?.subtitle}</p>
            <h1 className="title">"{church?.title}"</h1>
            <VeremChipsSmall>{church?.city}</VeremChipsSmall>
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
          <SlideShow
              navigation={false}
              blur
              autoplay={true}
              slideList={church?.pictures?.length ?
                church?.pictures.map((el, id) => ({id, value: el})) : [{ id: 1, value: PHOTO_PLACEHOLDER}]}
          />
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
            <div className="content-block">
              <h3>
                <VeremChips>{`${t('church.labels.pastor')}`}</VeremChips>
              </h3>
              <h3>{church?.pastor}</h3>
              <ChurchItemStyled>
                <img
                    src={church?.avatar && church?.avatar[0].path || PHOTO_PLACEHOLDER}
                    alt="pastor avatar"
                />
              </ChurchItemStyled>
            </div>

            <div className="content-block">
              <h3>
                <VeremChips>{`${t('church.labels.about')}`}</VeremChips>
              </h3>
              <h3>
                Started{' '}
                {church?.createdDate && getDateLocalString(church?.createdDate)}
              </h3>

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
              {church?.about}
            </div>
          </div>
          <div className="content">
              {church && church?.teachers?.length && (
                  <div className="content-block">
                    <TeachersList
                        isAuth={church?.createdBy?.uid === user?.uid}
                        onEdit={onEditList}
                        church={church}
                    />
                  </div>
              )}
              {church && church?.groups?.length ? (
                  <div className="content-block">
                    <GroupList
                        isAuth={church?.createdBy?.uid === user?.uid}
                        onEdit={getChurch}
                        church={church}
                    />
                  </div>
              ) : <div className={'content-block-placeholder'}>{t('group.no-group')}</div>}
          </div>
          <div className="content">
            <div className="content-block">
              <ContentList contentType={'lessons'} contentList={church?.lessons}/>
            </div>
            <div className="content-block">
              <ContentList contentType={'scenarios'} contentList={church?.scenarios}/>
            </div>
          </div>
        </VeremChurchContent>
      </div>
    </VeremLayout>
  );
};
