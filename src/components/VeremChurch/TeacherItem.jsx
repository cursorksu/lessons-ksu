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
          <b>Students:</b> {entityData?.students?.length}
        </li>
        <li>
          <b>Groups:</b> {entityData?.groups?.length}
        </li>
        <li>
          <b>Created lessons:</b> {entityData?.lessons?.length}
        </li>
        <li>
          <b>Created scenarios:</b> {entityData?.scenarios?.length}
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
