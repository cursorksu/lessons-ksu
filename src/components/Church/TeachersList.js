import { useEditEntity } from '../../api/entity/useEditEntity';
import React, { useCallback, useState } from 'react';
import { InfoBlockStyled, InfoItemStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { KsuDropdown } from '../KsuDropdown';

export const TeachersList = ({ isAuth, teachers, church, onEdit }) => {
  const { editEntity } = useEditEntity('church');
  const [isFormShown, setIsFormShown] = useState(false);
  const [teachersList, setTeachersList] = useState([]);

  const handleRemoveTeacher = useCallback(async (id) => {
    const teachersNew = teachers?.filter(el => el.id !== id);
    const newData = {
      ...church,
      teachers: teachersNew.map(el => el.id)
    };
    await editEntity(newData);
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
    setIsFormShown(false);
    onEdit();
  }, [church, teachersList, editEntity, onEdit, teachers]);

  return (
    <InfoBlockStyled>
      {isFormShown && (
        <div>
          <KsuDropdown
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
      <div>
        {isAuth && (
          <ButtonIconStyled onClick={() => setIsFormShown(true)}>
            {!isFormShown ? '+' : '-'}
          </ButtonIconStyled>
        )}
        <h2>Our Teachers</h2>
        {teachers && teachers?.length > 0 && teachers?.map(el => (
          <InfoItemStyled className="d-flex" key={el.id}>
            <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
            <h2>
              {el.firstName} {el.lastName}
            </h2>
            {isAuth && (
              <ButtonIconStyled onClick={() => handleRemoveTeacher(el.id)}>
                <CloseIcon />
              </ButtonIconStyled>
            )}
          </InfoItemStyled>
        ))}
      </div>
    </InfoBlockStyled>
  );
};
