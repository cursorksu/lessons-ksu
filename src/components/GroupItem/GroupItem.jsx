import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { MainLayout } from '../../pages/MainLayout';
import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { useSelector } from 'react-redux';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { studentConfig } from '../../constants/entities/studentConfig';
import { StudentsTable } from '../DataTable/StudentsTable';
import { EditStudentEstimateModal } from '../EditStudentEstimateModal/EditStudentEstimateModal';
import { useTranslation } from 'react-i18next';
import { useUpdateStudent } from '../../api/student/useUpdateStudent';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { Popup } from 'semantic-ui-react';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { getDateLocalString } from '../../utils/getDateLocalString';

const initialValues = {
  firstName: '',
  secondName: '',
  years: '',
  phone: '',
  avatar: '',
  about: '',
  address: '',
  birthday: '',
  estimation: 0,
  group: '',
  // :TODO change to calendar date picker logic
  listOfVisits: [new Date().toDateString()],
  isActive: true,
};

export const GroupItem = () => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { getEntityById } = useGetEntity('group');
  const [isFormShown, setIsFormShown] = useState(false);
  const [group, setGroup] = useState({});
  const { t } = useTranslation('tr');
  const [isAddStudentFormShown, setIsAddStudentFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { updateStudentData } = useUpdateStudent();
  const { deleteEntity } = useDeleteEntity('students');
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(initialValues);

  const { getEntities: getTeachers, entities: teachers } =
    useGetEntityListByIds('users');

  useEffect(() => {
    if (!user?.uid) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    group?.teachers?.length && getTeachers(group?.teachers);
  }, [group]);

  useEffect(() => {
    getEntityById(groupId).then((data) => setGroup(data));
  }, [groupId, getEntityById]);

  const handleRowClick = (data) => {
    setIsAddStudentFormShown(true);
    setIsFormShown(false);
    setIsEdit(true);
    setDefaultValues({
      ...data,
      birthday: getDateLocalString(data.birthday),
    });
  };

  const confirmationHandler = (id, data) => {
    const studentList = localStorage.getItem('students');
    const studentListParsed = studentList?.length
      ? JSON.parse(studentList)
      : [];
    if (isEdit) {
      setIsFormShown(false);
      setDefaultValues({
        ...initialValues,
        group: groupId,
      });
      localStorage.setItem(
        'students',
        JSON.stringify(
          studentListParsed.map((el) =>
            el.id === defaultValues.id ? defaultValues : el
          )
        )
      );
    } else {
      const newData = {
        id,
        ...data,
      };
      localStorage.setItem(
        'students',
        JSON.stringify([...studentListParsed, newData])
      );
    }
    setIsAddStudentFormShown(false);
    setShouldUpdate((prev) => !prev);
  };

  const updateStudentHandler = useCallback(
    async (estimation, data) => {
      await updateStudentData(data.id, {
        estimation: +data.estimation + estimation,
      });
      setIsAddStudentFormShown(false);
      setShouldUpdate((prev) => !prev);
    },
    [updateStudentData]
  );

  const deleteStudentHandler = useCallback(
    async (data) => {
      await deleteEntity(data.id);
      setIsAddStudentFormShown(false);
      setShouldUpdate((prev) => !prev);
    },
    [deleteEntity]
  );

  const onIsActiveSwitch = useCallback(
    async (data) => {
      await updateStudentData(data.id, { isActive: !data.isActive });
      setIsAddStudentFormShown(false);
      setShouldUpdate((prev) => !prev);
    },
    [updateStudentData]
  );

  return (
    <MainLayout>
      <UserProfileStyled>
        <div className="top-container">
          <div>
            <h1 className="title">{group?.title}</h1>
            {teachers?.map((el) => (
              <div key={el.id} className="subtitle">
                {el.firstName + ' ' + el.lastName}
              </div>
            ))}
          </div>
          <div>
            {group?.createdBy?.uid === user?.uid && (
              <div className="d-flex">
                <Popup
                  trigger={
                    <ButtonIconStyled
                      onClick={() => {
                        setIsFormShown(true);
                        setIsAddStudentFormShown(false);
                      }}>
                      <EditIcon />
                    </ButtonIconStyled>
                  }
                  content="Edit group"
                  basic
                />

                <ButtonStyled
                  onClick={() => {
                    setDefaultValues({
                      ...initialValues,
                      group: groupId,
                    });
                    setIsAddStudentFormShown(true);
                    setIsFormShown(false);
                  }}>
                  + {t('students.addStudent')}
                </ButtonStyled>
                <ButtonStyled
                  onClick={() => navigate(`/group/${groupId}/games/rate`)}>
                  {t('students.showResult')}
                </ButtonStyled>
              </div>
            )}
          </div>
        </div>

        {isFormShown && (
          <CreateEntityForm
            entityName="group"
            onConfirm={() => {}}
            onClose={() => setIsFormShown(false)}
            fields={[]}
            defaultValues={{}}
          />
        )}

        {isAddStudentFormShown && (
          <CreateEntityForm
            entityName="students"
            onConfirm={confirmationHandler}
            onClose={() => setIsAddStudentFormShown(false)}
            fields={studentConfig}
            defaultValues={defaultValues}
          />
        )}
        <StudentsTable
          onSwitch={onIsActiveSwitch}
          selectedRow={defaultValues.id}
          shouldUpdate={shouldUpdate}
          columns={[
            ...studentConfig.filter((el) => el.name !== 'birthday'),
            {
              name: 'birthday',
              isIgnored: false,
              render: (data) =>
                data.birthday && (
                  <div>{/*{dateFormat(data.birthday, 'dd.mm.yyyy')}*/}</div>
                ),
            },
            {
              name: 'years',
              isIgnored: true,
              render: (data) => (
                <div>
                  {/*{getAge(dateFormat(data.birthday, 'yyyy-mm-dd'))}*/}
                </div>
              ),
            },
            {
              name: 'estimation',
              label: 'Динарики',
              placeholder: 'Динарики',
              render: (data) => (
                <div className="estimation">
                  <h3 className="score">{data.estimation}</h3>
                  <EditStudentEstimateModal
                    studentName={data.firstName}
                    onConfirm={(estimation) =>
                      updateStudentHandler(estimation, data)
                    }
                  />
                </div>
              ),
              isIgnored: true,
            },
            {
              inputType: null,
              name: 'action',
              label: 'Змiнити',
              render: (data) => (
                <div>
                  <ButtonIconStyled onClick={() => handleRowClick(data)}>
                    <EditIcon />
                  </ButtonIconStyled>
                  <ButtonIconStyled onClick={() => deleteStudentHandler(data)}>
                    <DeleteIcon />
                  </ButtonIconStyled>
                </div>
              ),
            },
          ]}
        />
      </UserProfileStyled>
    </MainLayout>
  );
};
