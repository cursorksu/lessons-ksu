import React, { useCallback, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'semantic-ui-react';
import { DeleteConfirmationModalStyled } from './DeleteConfirmationModalStyled';
import { useTranslation } from 'react-i18next';

export const DeleteConfirmationModal = ({
  modalTitle,
  modalContent,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('tr');
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback((e) => {
    e.stopPropagation();
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    onCancel && onCancel();
    setOpen(false);
  }, [ onCancel]);
  const handleConfirm = useCallback(
    (e) => {
      onConfirm(e);
      setOpen(false);
    },
    [onConfirm]
  );

  return (
    <DeleteConfirmationModalStyled>
      <Modal
        onClose={onCancel}
        onOpen={handleOpen}
        trigger={
          <ButtonIconStyled onClick={handleOpen} className={'delete-button'}>
            <DeleteIcon />
          </ButtonIconStyled>
        }
        size="small"
        open={open}>
        <ModalHeader className="title">
          <h2>{modalTitle}</h2>
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </ModalHeader>
        <ModalContent>{modalContent}</ModalContent>
        <ModalActions>
          <ButtonStyled onClick={handleClose}>
            {t('button.cancel')}
          </ButtonStyled>
          <ButtonStyled onClick={handleConfirm}>
            {t('button.delete')}
          </ButtonStyled>
        </ModalActions>
      </Modal>
    </DeleteConfirmationModalStyled>
  );
};
