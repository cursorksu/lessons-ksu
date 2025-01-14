import { SprintCardStyled } from './SprintCardStyled';
import { ReactComponent as ShapeBg } from '../../assets/shape.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React from 'react';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../ButtonStyled';
import { EditImage } from '../Modal/EditImage';

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
                               entity,
                               forceUpdate,
                           }) => {
    const { t } = useTranslation('tr');

    return (
        <SprintCardStyled>
            <img src={img} alt="img"/>
            <div className="shape-light">
                <ShapeBg/>
            </div>
            <div className="shape">
                <ShapeBg/>
            </div>
            <div className="content">{children}</div>
            <h3 className="title hover"  onClick={onClick}>{titleHover}</h3>
            {editEnable && (
                <div className="action">
                    {entity && (
                        <Popup
                            trigger={
                                <EditImage
                                    entity={entity}
                                    entityName={'church'}
                                    forceUpdate={forceUpdate}
                                    imageFieldName={'avatar'}
                                />
                            }
                            onClose={e => e.stopPropagation()}
                            content={t('church.placeholders.avatar')}
                        />
                    )}

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
