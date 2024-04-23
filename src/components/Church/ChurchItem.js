import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { ButtonIconStyled } from '../ButtonStyled';
import React, { useEffect, useState } from 'react';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

export const ChurchItem = ({ entityName, id, removeEntity, isAuth }) => {
  const { getEntityById } = useGetEntity(entityName);
  const [entityData, setEntityData] = useState(null);

  useEffect(() => {
    getEntityById(id).then((data) => {
      setEntityData(data);
    });
  }, [id, getEntityById]);

  return (
    <ShadowCardStyled key={entityData?.id} className="vertical-card">
      <img src={entityData?.avatar && entityData?.avatar} alt={entityData?.firstName}/>
      <h2>
        {entityData?.firstName} {entityData?.lastName}
      </h2>
      <ul>
        <li><b>Students:</b> {entityData?.students?.length}</li>
        <li><b>Groups:</b> {entityData?.groups?.length}</li>
        <li><b>Created lessons:</b> {entityData?.lessons?.length}</li>
        <li><b>Created scenarios:</b> {entityData?.scenarios?.length}</li>
      </ul>
      {isAuth && (
        <ButtonIconStyled onClick={() => removeEntity(entityData?.id)}>
          <CloseIcon />
        </ButtonIconStyled>
      )}
    </ShadowCardStyled>
  );
};
