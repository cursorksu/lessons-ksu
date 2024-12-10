import { SprintCardStyled } from './SprintCardStyled';
import { ReactComponent as ShapeBg } from '../../assets/shape.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React from 'react';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../ButtonStyled';

export const SprintCard = ({
  img,
  id,
  children,
  onClick,
  titleHover,
  onDelete,
  editEnable = false,
  modalTitle,
  modalContent,
  onEdit,
}) => {
  const { t } = useTranslation('tr');

  return (
    <SprintCardStyled onClick={onClick}>
      <img src={img} alt="img" />
      <div className="shape-light">
        <ShapeBg />
      </div>
      <div className="shape">
        <ShapeBg />
      </div>
      <div className="content">{children}</div>
      <h3 className="title hover">{titleHover}</h3>
      {editEnable && (
        <div className="action">
          <Popup
            trigger={
              <ButtonIconStyled onClick={(e) => onEdit(e, id)}>
                <EditIcon />
              </ButtonIconStyled>
            }
            content="Змінити колекцію"
          />
          <DeleteConfirmationModal
            modalTitle={`${t(modalTitle)} ${titleHover}`}
            modalContent={`${t(modalContent)}`}
            onConfirm={(e) => onDelete(e, id)}
          />
        </div>
      )}
    </SprintCardStyled>
  );
};
