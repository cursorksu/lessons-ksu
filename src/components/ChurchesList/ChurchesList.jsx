import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import { ButtonStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../../pages/MainLayout';
import { churchConfig } from '../../constants/entities/churchConfig';
import { SprintCard } from '../SprintCard/SprintCard';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { ChurchesListStyled } from './styles';
import { getDateLocalString } from '../../utils/getDateLocalString';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { useGetEntity } from '../../api/entity/useGetEntity';

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
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isFormShown, setIsFormShown] = useState(false);
  const [defaultValues, setDefaultValues] = useState(initialValues);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { t } = useTranslation('tr');
  const { editEntity } = useEditEntity('users');
  const { getEntityById } = useGetEntity('users');
  const { getAllEntities } = useGetAllEntities('church');
  const { deleteEntity } = useDeleteEntity('church');
  const [churchList, setChurchList] = useState([]);

  useEffect(() => {
    getAllEntities().then((data) => setChurchList(data));
  }, [getAllEntities, shouldUpdate]);

  const confirmationHandler = async (churchId, churchData) => {
    // churchData.teachers.map(async el => {
    //   const teacher = await getEntityById(el);
    //   await editEntity({
    //     ...teacher,
    //     church: [...teacher?.church, churchId]
    //   });
    // });
    setShouldUpdate((prev) => !prev);
  };

  const cardClickHandler = useCallback(
    (e, id) => {
      e.stopPropagation();
      navigate(`/church/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (e, churchData) => {
      e.stopPropagation();
      deleteEntity(churchData.id).then(() => {
        churchData.teachers.map(async (teacherId) => {
          const teacher = await getEntityById(teacherId);
          await editEntity({
            ...teacher,
            church: teacher?.church?.filter(
              (person) => person.id !== churchData.id
            ),
          });
        });
        setShouldUpdate((prev) => !prev);
      });
    },
    [deleteEntity, getEntityById, editEntity]
  );

  return (
    <MainLayout>
      <UserProfileStyled>
        <div className="top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">{t('mainMenu.community')}</h1>
          {user?.uid
? (
            <div>
              <ButtonStyled
                onClick={() => {
                  setDefaultValues({
                    ...initialValues,
                    teachers: [user.uid],
                  });
                  setIsFormShown(true);
                }}>
                + {t('church.addChurch')}
              </ButtonStyled>
            </div>
          )
: (
            <p className="info">
              Якщо ви не знайшли свою церкву у списку нижче, зареєструйтеся і
              додайте її самостійно. Це дозволить вам ділитися вашим креативним
              контентом
            </p>
          )}
        </div>

        {isFormShown && (
          <CreateEntityForm
            entityName="church"
            onConfirm={confirmationHandler}
            onClose={() => setIsFormShown(false)}
            fields={churchConfig}
            defaultValues={defaultValues}
          />
        )}
      </UserProfileStyled>
      <ChurchesListStyled>
        {churchList?.length > 0 &&
          churchList.map((el) => (
            <SprintCard
              key={el.id}
              editEnable={el.createdBy?.uid === user?.uid}
              onDelete={(e) => handleDelete(e, el)}
              modalTitle={'church.deleteChurch'}
              modalContent={'modal.churchDelete'}
              onClick={(e) => cardClickHandler(e, el.id)}
              img={el?.avatar}
              titleHover={el.title}
              id={el.id}>
              <div>
                <div>
                  <span className="meta">
                    {getDateLocalString(el.createdDate)}
                  </span>
                </div>
                <div>
                  <span className="meta">{el.pastor}</span>
                </div>
              </div>
              <div>
                <hr />
                <div>
                  <span className="meta description">{el?.about}</span>
                </div>
                <h3 className="title" title={el.title}>
                  {el?.title}
                </h3>
              </div>
            </SprintCard>
          ))}
      </ChurchesListStyled>
    </MainLayout>
  );
};
