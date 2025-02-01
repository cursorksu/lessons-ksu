import React, {useCallback, useState} from 'react';
import {ButtonIconMiniStyled, ButtonStyled} from '../ButtonStyled';
import {ReactComponent as CloseIcon} from '../../assets/close.svg';
import {ReactComponent as DeleteIcon} from '../../assets/delete.svg';
import {
    Modal,
    ModalActions,
    ModalContent,
    ModalHeader, Popup,
} from 'semantic-ui-react';
import {useTranslation} from 'react-i18next';

export const DeleteConfirmationModal = ({
                                            modalTitle,
                                            modalContent,
                                            onConfirm,
                                            onCancel,
                                            size = 'small',
                                        }) => {
    const {t} = useTranslation('tr');
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setOpen(false);
    }, [onCancel]);
    const handleConfirm = useCallback(
            (e) => {
                onConfirm(e);
                setOpen(false);
            },
            [onConfirm],
    );

    return (
            <Modal
                    onClose={onCancel}
                    onOpen={handleOpen}
                    trigger={
                        <Popup
                                trigger={
                                    <ButtonIconMiniStyled onClick={handleOpen} className={'delete-button'}>
                                        <DeleteIcon/>
                                    </ButtonIconMiniStyled>
                                }
                                content={modalTitle}
                        />
                    }
                    size={size}
                    open={open}>
                <ModalHeader>
                    <h2 className="title">{modalTitle}</h2>
                    <ButtonIconMiniStyled onClick={handleClose}>
                        <CloseIcon/>
                    </ButtonIconMiniStyled>
                </ModalHeader>
                <ModalContent>{modalContent}</ModalContent>
                <ModalActions>
                    <ButtonStyled onClick={handleClose} className="secondary">
                        {t('button.cancel')}
                    </ButtonStyled>
                    <ButtonStyled onClick={handleConfirm}>
                        {t('button.delete')}
                    </ButtonStyled>
                </ModalActions>
            </Modal>
    );
};
