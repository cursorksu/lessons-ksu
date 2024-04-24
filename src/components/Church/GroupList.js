import React, { useCallback, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown, FormField } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { StyledDropdown } from '../KsuDropdown/StyledDropdown';
import { NavLink } from 'react-router-dom';
import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { useAssignGroupToChurch } from '../../api/refs/useAssignGroupToChurch';
import { useAssignGroupTeacher } from '../../api/refs/useAssignGroupTeacherю';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { useParams } from 'react-router';

const initialValues = {
  title: '',
  description: '',
  church: '',
  teachers: [],
  students: [],
};

export const GroupList = ({ isAuth, church, onEdit }) => {
  const { t } = useTranslation('tr');
  const { churchId } = useParams();
  // eslint-disable-next-line
  const { addGroupToChurch, removeGroupFromChurch } = useAssignGroupToChurch();
  // eslint-disable-next-line
  const { addTeacherToGroup, removeTeacherFromGroup } = useAssignGroupTeacher();
  const { createEntity } = useCreateEntity('group');
  const [isFormShown, setIsFormShown] = useState(false);
  // eslint-disable-next-line
  const [teachers, setTeachers] = useState([]);
  // eslint-disable-next-line
  const { getEntities: getFullTeachers, entities: teachersList } = useGetEntityListByIds('users');

  const { reset, control, getValues, setValue } = useForm({
    defaultValues: {
      ...initialValues,
      church: churchId,
    },
    caches: false });

  const handleChangeTeachersList = useCallback(async (_, data) => {
    setValue('teachers', data.value);
  }, [setValue]);

  const handleAddGroup = useCallback(async () => {
    const newData = getValues();

    try {
      await createEntity(newData).then(async (createdGroupId) => {
        await addGroupToChurch(churchId, createdGroupId);
        for (const teacherId of newData?.teachers) {
          await Promise.all(await addTeacherToGroup(createdGroupId, teacherId));
        }
      });
      reset();
      onEdit();
    } catch (error) {
      throw new Error(`Error in creation group:  ${error.message}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEntity, getValues, onEdit, reset]);

  const removeTeacher = useCallback(async (id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  const getTeacherData = (id) => {
    const teacherItem = church?.teachers?.find(item => item.id === id);
    return `${teacherItem?.firstName} ${teacherItem?.lastName}`;
  };

  return (
    <InfoBlockStyled>
      <div>
        <div className="d-flex">
          <h2 className="title">Our Groups</h2>
          {isAuth && (
            <ButtonIconStyled onClick={() => setIsFormShown(prev => !prev)}>
              {!isFormShown ? '+' : '-'}
            </ButtonIconStyled>
          )}
        </div>

        {isFormShown && (
          <div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled>{t(`grope.labels.title`)}</LabelStyled>
                  <InputStyled
                    value={field.value}
                    {...field}
                    placeholder={t(`grope.placeholders.title`)}
                  />
                </FormField>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled>{t(`grope.labels.description`)}</LabelStyled>
                  <InputStyled
                    value={field.value}
                    {...field}
                    placeholder={t(`grope.placeholders.description`)}
                  />
                </FormField>
              )}
            />
            <Controller
              name="teachers"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled>{t(`grope.labels.teachers`)}</LabelStyled>
                  <StyledDropdown>
                    <Dropdown
                      placeholder={`grope.labels.teachers`}
                      fluid
                      multiple={true}
                      search
                      selection
                      value={field.value}
                      onChange={handleChangeTeachersList}
                      options={teachers}
                    />
                  </StyledDropdown>
                </FormField>
              )}
            />
            <div className='button-wrapper'>
              <ButtonStyled
                className="ksu-button"
                onClick={handleAddGroup}
              >
                Add
              </ButtonStyled>
              <ButtonStyled
                className="ksu-button"
                onClick={() => setIsFormShown(false)}
              >
                Cancel
              </ButtonStyled>
            </div>
          </div>
        )}

        <ul className='vertical-card-lis'>
          {church?.groups && church?.groups?.length > 0 && church?.groups?.map(el => (
            <ShadowCardStyled className="vertical-card group" key={el.id}>
              {isAuth && <NavLink to={`/group/${el.id}`}>go to group</NavLink>}
              <div>
                <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
                <h2>{el.title}</h2>
                <h4 className="subtitle">{el.description}</h4>

                <ul>
                  <li><b>Teachers:</b></li>
                  {el?.teachers?.map(teacher => {
                    return <li key={teacher.toString()}>
                      {getTeacherData(teacher)}
                      <ButtonIconStyled onClick={() => removeTeacher(teacher)}>
                        <CloseIcon />
                      </ButtonIconStyled>
                    </li>;
                  })}
                  <li><b>Students:</b> {el?.students?.length}</li>
                </ul>
              </div>
              {isAuth && (
                <ButtonIconStyled onClick={() => {}}>
                  <CloseIcon />
                </ButtonIconStyled>
              )}
            </ShadowCardStyled>
          ))}
        </ul>
      </div>
    </InfoBlockStyled>
  );
};
