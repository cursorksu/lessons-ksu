import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { ButtonIconStyled } from '../ButtonStyled';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ChurchItemStyled } from './style';
import { USER_AVATAR_PLACEHOLDER } from '../../constants/main';
export const TeacherItem = ({ entityName, id, removeEntity, isAuth }) => {
  const { getUserById } = useGetEntity(entityName);
  const [entityData, setEntityData] = useState(null);

  useEffect(() => {
    getUserById(id).then((data) => {
      setEntityData(data);
    });
  }, [id, getUserById]);

    const isRealAvatar = useMemo(() => {
      const regex = /googleusercontent/;
      return regex.test(entityData?.avatar)
    },  [entityData]);

    return (
    <ChurchItemStyled key={entityData?.id}>
      <h3>
        {entityData?.firstName} {entityData?.lastName}
      </h3>
      <img
          className={isRealAvatar && 'avatar-placeholder'}
        src={isRealAvatar ? USER_AVATAR_PLACEHOLDER : entityData?.avatar}
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
