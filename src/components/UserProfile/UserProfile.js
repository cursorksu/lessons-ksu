import { UserProfileStyled } from './UserProfileStyled';
import { Image } from 'semantic-ui-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { CreateEntityForm } from "../CreateEntityForm/CreateEntityForm";
import {ButtonIconStyled, ButtonStyled} from "../ButtonStyled";
import { DataTable } from "../DataTable/DataTable";
import { student } from "../../constants/entities/student";
import { EditStudentEstimateModal } from "../EditStudentEstimateModal/EditStudentEstimateModal";
import { useUpdateStudent } from "../../api/student/useUpdateStudent";
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';

import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { useNavigate } from 'react-router';
import { getAge } from '../../utils/getAge';
import dateFormat from 'dateformat';

export const UserProfile = ({ user }) => {
  const { t } = useTranslation('tr');
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { updateStudentData } = useUpdateStudent();
  const { deleteEntity } = useDeleteEntity('students');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) {
      navigate('/');
    }
  }, [user, navigate]);

  const initialValues = {
    firstName: '',
    secondName: '',
    years: '',
    phone: '',
    avatar: '',
    about: '',
    address: '',
    birthday: '',
    estimation: '',
    // :TODO change to calendar date picker logic
    listOfVisits: [new Date().toDateString()],
    isActive: true,
  };

  const [defaultValues, setDefaultValues] = useState(initialValues);
  const handleRowClick = (data) => {
    setIsFormShown(true);
    setIsEdit(true);
    setDefaultValues(data);
  };
  const confirmationHandler = (id, data) => {
    const studentList = localStorage.getItem('students');
    const studentListParsed = studentList?.length ? JSON.parse(studentList) : [];
    if(isEdit) {
      setIsFormShown(false);
      setDefaultValues(initialValues);
      localStorage.setItem('students', JSON.stringify(studentListParsed.map(el => el.id === defaultValues.id ? defaultValues : el)));
    } else {
      const newData = {
        id, ...data,
      };
      localStorage.setItem('students', JSON.stringify([...studentListParsed,  newData]));
    }
    setShouldUpdate(prev => !prev);
  };

  const updateStudentHandler = useCallback(async (estimation, data) => {
    await updateStudentData(data.id, { estimation: +data.estimation + estimation });
    setShouldUpdate(prev => !prev);
  }, [updateStudentData]);

  const deleteStudentHandler = useCallback(async (data) => {
    await deleteEntity(data.id);
    setShouldUpdate(prev => !prev);
  }, [deleteEntity]);

  const onIsActiveSwitch = useCallback(async (data) => {
    await updateStudentData(data.id, { isActive: !data.isActive });
    setShouldUpdate(prev => !prev);
  }, [updateStudentData]);

  return (
    <UserProfileStyled>
      <div className="top-container">
        <div className="d-flex">
          <Image src={user?.avatar} size='tiny' circular/>
          <div>
            <h1 className="title">{user?.firstName} {user?.lastName}</h1>
            <div className="meta">{user?.email}</div>
          </div>
        </div>

        <div>
          <ButtonStyled onClick={() => {
            setDefaultValues(initialValues);
            setIsFormShown(true);
          }}>
            + {t('students.addStudent')}
          </ButtonStyled>
          <ButtonStyled onClick={() =>navigate('/games/rate')}>
            {t('students.showResult')}
          </ButtonStyled>
        </div>
      </div>

      {isFormShown && (
        <CreateEntityForm
          entityName="students"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={student}
          defaultValues={defaultValues}
        />
      )}
      <DataTable
        entityName="students"
        onSwitch={onIsActiveSwitch}
        selectedRow={defaultValues.id}
        shouldUpdate={shouldUpdate}
        columns={[
          ...student.filter(el => el.name !== 'birthday'),
          {
            name: 'birthday',
            isIgnored: false,
            render: (data) => data.birthday && (
              <div>
                {dateFormat(data.birthday, 'dd.mm.yyyy')}
              </div>
            ),
          },
          {
            name: 'years',
            isIgnored: true,
            render: (data) => (
              <div>
                {getAge(dateFormat(data.birthday, 'yyyy-mm-dd'))}
              </div>
            ),
          },
          {
            name: 'estimation',
            label: 'Динарики',
            placeholder: 'Динарики',
            render: (data) => (
              <div className="estimation">
                <h3 className="score">
                  {data.estimation}
                </h3>
                <EditStudentEstimateModal
                  studentName={data.firstName}
                  onConfirm={(estimation) => updateStudentHandler(estimation, data)}
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
                  <EditIcon/>
                </ButtonIconStyled>
                <ButtonIconStyled onClick={() => deleteStudentHandler(data)}>
                  <DeleteIcon/>
                </ButtonIconStyled>
              </div>
            ),
          }
        ]}/>
    </UserProfileStyled>
  );
};
