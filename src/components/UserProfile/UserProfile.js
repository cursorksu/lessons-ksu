import { UserProfileStyled } from './UserProfileStyled';
import { Tab } from 'semantic-ui-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { CreateEntityForm } from "../CreateEntityForm/CreateEntityForm";
import {ButtonIconStyled, ButtonStyled} from "../ButtonStyled";
import { StudentsTable } from "../DataTable/StudentsTable";
import { studentConfig } from "../../constants/entities/studentConfig";
import { EditStudentEstimateModal } from "../EditStudentEstimateModal/EditStudentEstimateModal";
import { useUpdateStudent } from "../../api/student/useUpdateStudent";
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { useNavigate, useParams } from 'react-router';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { routes } from '../../router/constants';
import { useSelector } from 'react-redux';
import {
  getDateLocalString, getDateObject
} from '../../utils/getDateLocalString';
import { getAge } from '../../utils/getAge';
import { UserAvatarInStorage } from '../Dropzone/UserAvatarInStorage';
import { useUpdateProfileField } from '../../api/user/useUpdateUser';
import { NavLink } from 'react-router-dom';

export const UserProfile = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { t } = useTranslation('tr');
  const [activeTab, setActiveTab] = useState(0);
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { updateStudentData } = useUpdateStudent();
  const { deleteEntity } = useDeleteEntity('students');
  const { editUserProfile } = useUpdateProfileField();

  const { getEntities, entities: groups } = useGetEntityListByIds('group');
  const { getEntities: getChurches, entities: churches } = useGetEntityListByIds('church');

  useEffect(() => {
    getEntities(user?.groups || []);
    getChurches(user?.church || []);
  }, [user, getEntities, getChurches]);

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
    isActive: true,
    group: groupId,
  };

  const [defaultValues, setDefaultValues] = useState(initialValues);
  const handleRowClick = useCallback((data) => {
    const birthday = JSON.parse(data.birthday);
    setIsFormShown(true);
    setDefaultValues({
      ...data,
      group: groupId,
      createdAt: JSON.parse(data.createdAt),
      birthday: birthday ? getDateObject(JSON.parse(birthday)) : new Date(),
    });
  }, [groupId]);
  const confirmationHandler = () => {
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

  const handleTabChange = useCallback(({ activeIndex }) => {
    setActiveTab(activeIndex);
    const activeGroup = groups[activeIndex];
    navigate(`${routes.cabinet}/${user?.uid}${routes.group}/${activeGroup.id}`);
  }, [user, groups, navigate]);

  const panes = useMemo(() => (groups?.map((item) => (
    {
      menuItem: {
        key: item.id,
        content: item.title
      },
      render: () => (
        <StudentsTable
          onSwitch={onIsActiveSwitch}
          selectedRow={defaultValues.id}
          shouldUpdate={shouldUpdate}
          columns={[
            ...studentConfig.filter(el => el.name !== 'birthday'),
            {
              name: 'birthday',
              isIgnored: false,
              render: (data) => data.birthday && (
                <div>
                  {getDateLocalString(JSON.parse(data.birthday))}
                </div>
              ),
            },
            {
              name: 'years',
              isIgnored: true,
              render: (data) => (
                <div>
                  {getAge(data.birthday)}
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
      ),
    })
  )), [
    groups,
    shouldUpdate,
    defaultValues,
    deleteStudentHandler,
    handleRowClick,
    onIsActiveSwitch,
    updateStudentHandler
  ]);

  useEffect(() => {
    setActiveTab(groups?.findIndex(el => el.id === groupId));
  }, [groupId, groups]);

  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const handleAvatarChange = async (file) => {
    try {
      await editUserProfile({ uid: user.uid, avatar: file.downloadURL });
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsEditAvatar(false);
    }
  };
  const [titleIsEdit, setTitleIsEdit] = useState(false);
  const [userTitle, setUserTitle] = useState('');
  const handleTitleChange = (e) => {
    e.stopPropagation();
    setUserTitle(e.target.value);
  };

  const handleTitleSave = async () => {
    if (!userTitle) return;
    try {
      await editUserProfile({
        uid: user.uid,
        avatar: user.avatar,
        firstName: userTitle.split(' ')[0],
        lastName: userTitle.split(' ')[1] ?? user.lastName,
        fullName: userTitle,
      });
      setTitleIsEdit(false);
    } catch (err) {
      throw new Error(err);
    }
  };


  return (
    <UserProfileStyled>
      <div className="top-container">
        <div className="d-flex">
          <div className="avatar-wrapper">
            {isEditAvatar
              ? (
                <UserAvatarInStorage
                  folder="users"
                  onChange={handleAvatarChange}
                  file={user?.avatar}
                />
              )
              : (
                <>
                  <ButtonIconStyled onClick={() => setIsEditAvatar(true)}>
                    <EditIcon />
                  </ButtonIconStyled>
                  <img src={user?.avatar} alt={user?.fullName} className="image avatar"/>
                </>
              )}
          </div>
          <div>
            <h1 className="title">
              {titleIsEdit
                ? <input
                  className="user-title"
                  type='text'
                  value={userTitle}
                  onChange={handleTitleChange}
                />
                : user?.fullName
              }
              {titleIsEdit
                ? (
                  <ButtonIconStyled onClick={handleTitleSave}>
                    <SaveIcon />
                  </ButtonIconStyled>
                )
                : (
                  <ButtonIconStyled onClick={() => {
                    setUserTitle(user?.fullName);
                    setTitleIsEdit(true);
                  }}>
                    <EditIcon />
                  </ButtonIconStyled>
                )
              }
            </h1>
            <div className="meta">{user?.email}</div>
            {churches?.length > 0 && churches.map(el => (
              <NavLink
                key={el.id}
                to={`${routes.church}/${el.id}`}
                className="meta"
              >
                {el.title}
              </NavLink>
            ))
            }
          </div>
        </div>
      </div>
      <div className="action-wrapper">
        <ButtonStyled onClick={() => {
          setDefaultValues(initialValues);
          setIsFormShown(true);
        }}>
          + {t('students.addStudent')}
        </ButtonStyled>
        <ButtonStyled onClick={() =>navigate(`${routes.group}/${groupId}/games/rate`)}>
          {t('students.showResult')}
        </ButtonStyled>
      </div>
      {isFormShown && (
        <CreateEntityForm
          className="sticky"
          entityName="students"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={studentConfig}
          defaultValues={defaultValues}
        />
      )}
      <Tab
        panes={panes}
        activeIndex={activeTab}
        onTabChange={(_, data) => handleTabChange(data)}
      />
    </UserProfileStyled>
  );
};
