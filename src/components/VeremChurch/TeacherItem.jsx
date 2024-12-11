import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { ButtonIconStyled } from '../ButtonStyled';
import React, { useEffect, useState } from 'react';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ChurchItemStyled } from './style';
export const TeacherItem = ({ entityName, id, removeEntity, isAuth }) => {
  const { getUserById } = useGetEntity(entityName);
  const [entityData, setEntityData] = useState(null);

  useEffect(() => {
    getUserById(id).then((data) => {
      setEntityData(data);
    });
  }, [id, getUserById]);

  return (
    <ChurchItemStyled key={entityData?.id}>
      <h3>
        {entityData?.firstName} {entityData?.lastName}
      </h3>
      <img
        src={entityData?.avatar && entityData?.avatar}
        alt={entityData?.firstName}
      />
      <ul>
        <li>
          <span>Students: </span> {entityData?.students?.length}
        </li>
        <li>
          <span>Groups: </span> {entityData?.groups?.length}
        </li>
        <li>
          <span>Created lessons: </span> {entityData?.lessons?.length}
        </li>
        <li>
          <span>Created scenarios: </span> {entityData?.scenarios?.length}
        </li>
      </ul>
      {isAuth && (
        <ButtonIconStyled onClick={() => removeEntity(entityData?.id)}>
          <CloseIcon />
        </ButtonIconStyled>
      )}
    </ChurchItemStyled>
  );
};
