import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import { ButtonStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../../pages/MainLayout';
import { church } from '../../constants/entities/church';
import { SprintCard } from '../SprintCard/SprintCard';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { ChurchesListStyled } from './styles';
import { getDateLocalString } from '../../utils/getDateLocalString';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const initialValues = {
  title: '',
  address: '',
  about: '',
  phone: '',
  email: '',
  createdDate: new Date(),
  web: '',
  pastor: '',
  avatar: '',
  pictures: [],
  groups: [],
  teachers: [],
};

export const ChurchesList = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [isFormShown, setIsFormShown] = useState(false);
  const [defaultValues, setDefaultValues] = useState(initialValues);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { t } = useTranslation('tr');
  const { getAllEntities } = useGetAllEntities('church');
  const { deleteEntity } = useDeleteEntity('church');
  const [churchList, setChurchList] = useState([]);

  useEffect(() => {
    getAllEntities().then(data => setChurchList(data));
  }, [getAllEntities, shouldUpdate]);

  const confirmationHandler = (id, data) => {
    const churchList = localStorage.getItem('church');
    const churchListParsed = churchList?.length ? JSON.parse(churchList) : [];
    const newData = {
      id, ...data,
    };
    localStorage.setItem('church', JSON.stringify([...churchListParsed,  newData]));
    setShouldUpdate(prev => !prev);
  };

  const cardClickHandler = useCallback((e, id) => {
    e.stopPropagation();
    navigate(`/church/${id}`);
  }, [navigate]);
  const handleDelete = useCallback((e, id) => {
    e.stopPropagation();
    deleteEntity(id).then(() => setShouldUpdate(prev => !prev));
  }, [deleteEntity]);

  return     (
    <MainLayout>
      <UserProfileStyled>
        <div className="top-container">
          <h1 className="title">{t('mainMenu.community')}</h1>
          <div>
            <ButtonStyled onClick={() => {
              setDefaultValues(initialValues);
              setIsFormShown(true);
            }}>
          + {t('church.addChurch')}
            </ButtonStyled>
          </div>
        </div>

        {isFormShown && (
          <CreateEntityForm
            entityName="church"
            onConfirm={confirmationHandler}
            onClose={() => setIsFormShown(false)}
            fields={church}
            defaultValues={defaultValues}
          />
        )}
      </UserProfileStyled>
      <ChurchesListStyled>
        {churchList?.length > 0 && churchList.map(el => (
          <SprintCard
            editEnable={el.createdBy.uid === user.uid}
            onDelete={(e) => handleDelete(e, el.id)}
            modalTitle={'church.deleteChurch'}
            modalContent={'modal.churchDelete'}
            onClick={(e) => cardClickHandler(e, el.id)}
            img={el?.avatar[0]?.base64}
            titleHover={el.title}
            id={el.id}
          >
            <div>
              <div><span className="meta">{getDateLocalString(el.createdDate)}</span></div>
              <div><span className="meta">{el.pastor}</span></div>
            </div>
            <div>
              <hr/>
              <div><span className="meta description">{el.about}</span></div>
              <h3 className="title" title={el.title}>{el.title}</h3>
            </div>
          </SprintCard>
        ))}
      </ChurchesListStyled>
    </MainLayout>
  );
};
