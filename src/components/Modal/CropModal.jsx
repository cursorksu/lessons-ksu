import { Modal, ModalHeader } from 'semantic-ui-react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import React, { useCallback } from 'react';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { useTranslation } from 'react-i18next';

export const CropModal = ({
                             isOpen,
                             setIsOpen,
                             modalTitle,
                             onCancel,
                             onConfirm,
                             icon,
                             children
                         }) => {
    const { t } = useTranslation('tr');

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setIsOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setIsOpen(false);
    }, [ onCancel ]);

    return (
        <Modal
            onClose={onCancel}
            onOpen={handleOpen}
            trigger={ icon }
            size="big"
            open={isOpen}
        >
            <ModalHeader className="title">
                <h2>{modalTitle}</h2>
                <ButtonIconStyled onClick={handleClose}>
                    <CloseIcon/>
                </ButtonIconStyled>
            </ModalHeader>
            <ModalContent>
                {children}
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="secondary"
                    onClick={async () => {
                        onCancel();
                    }}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled
                    onClick={async () => {
                        onConfirm();
                        onCancel();
                    }}>
                    Crop
                </ButtonStyled>
            </ModalActions>
        </Modal>
    );
};