import { useEditEntity } from '../../api/entity/useEditEntity';
import React, { useCallback, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { KsuDropdown } from '../KsuDropdown';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ShadowCardStyled } from '../../pages/MainContentStyled';

export const LessonsList = ({ isAuth, teachers, church, onEdit, lessons }) => {
  const { getEntityById } = useGetEntity('users');
  const { editEntity } = useEditEntity('church');
  const { editEntity: editTeacher } = useEditEntity('users');
  const [isFormShown, setIsFormShown] = useState(false);
  const [teachersList, setTeachersList] = useState([]);

  const handleRemoveTeacher = useCallback(async (id) => {
    const teachersNew = teachers?.filter(el => el.id !== id);
    const newData = {
      ...church,
      teachers: teachersNew.map(el => el.id)
    };
    await editEntity(newData);

    const editableTeacher = teachers?.find(el => el.id === id);
    await editTeacher({
      ...editableTeacher,
      church: editableTeacher?.church?.filter(churchId => churchId !== church.id),
    });
    onEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church, teachers]);

  const handleChangeTeacherList = useCallback(async (data) => {
    setTeachersList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church, teachers]);

  const handleAddTeachers = useCallback(async () => {
    const newData = {
      ...church,
      teachers: [
        ...teachers?.map(el => el.id),
        ...teachersList,
      ]
    };
    await editEntity(newData);

    teachersList.map(async teacherId => {
      const editableTeacher = await getEntityById(teacherId);
      await editTeacher({
        ...editableTeacher,
        church: [...editableTeacher?.church, church.id]
      });
    });

    setIsFormShown(false);
    onEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church, teachersList, editEntity, onEdit, teachers]);

  return (
    <InfoBlockStyled>
      <div>
        <div className="d-flex">
          <h2 className='title'>Our Lessons</h2>
          {isAuth && (
            <ButtonIconStyled onClick={() => setIsFormShown(prev => !prev)}>
              {!isFormShown ? '+' : '-'}
            </ButtonIconStyled>
          )}
        </div>

        {isFormShown && (
          <div>
            <KsuDropdown
              value={teachersList}
              entityName={'users'}
              placeholder={'some'}
              onChange={handleChangeTeacherList}
              multiple={true}
            />
            <div className='button-wrapper'>
              <ButtonStyled
                className="ksu-button"
                onClick={handleAddTeachers}
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
          {teachers && teachers?.length > 0 && teachers?.map(el => (
            <ShadowCardStyled key={el.id} className="vertical-card">
              <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
              <h2>
                {el.firstName} {el.lastName}
              </h2>
              <ul>
                <li><b>Students:</b> {el.students?.length}</li>
                <li><b>Groups:</b> {el.groups?.length}</li>
                <li><b>Created lessons:</b> {el.lessons?.length}</li>
                <li><b>Created scenarios:</b> {el.scenarios?.length}</li>
              </ul>
              {isAuth && (
                <ButtonIconStyled onClick={() => handleRemoveTeacher(el.id)}>
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
