import { SprintCardStyled } from './SprintCardStyled';
import { ReactComponent as ShapeBg } from '../../assets/shape.svg';
import React from 'react';
import {DeleteConfirmationModal} from "../DeleteConfirmationModal/DeleteConfirmationModal";
import {useTranslation} from "react-i18next";

export const SprintCard = ({ img, id, children, onClick, titleHover, onDelete }) => {
  const { t } = useTranslation('tr');
    
  return (
    <SprintCardStyled onClick={onClick}>
      <img src={img} alt="img"/>
      <div className="shape-light">
        <ShapeBg />
      </div>
      <div className="shape">
        <ShapeBg />
      </div>
      <div className="content">
        { children }
      </div>
      <h3 className="title hover">{titleHover}</h3>
      <DeleteConfirmationModal
        modalTitle={`${t('collections.deleteCollection')} ${titleHover}`}
        modalContent={`${t('modal.collectionDelete')}`}
        onConfirm={(e) => onDelete(e, id)}
      />
    </SprintCardStyled>
  );
};