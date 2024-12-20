import { BigModal } from '../Modal/BigModal';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';
import ImageCropper from '../ImageCroper/ImageCroper';

export const EditPastor = ({ church, forceUpdate }) => {
    const initialValues = { pastor: church?.pastor, pastorAvatar: church?.pastorAvatar }
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity: editChurch } = useEditEntity('church');
    const { reset, control, getValues, setValue } = useForm({
        defaultValues: initialValues,
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (church) {
            reset(initialValues);
        }
    }, [ church ]);

    const saveChange = async () => {
        try {
            await editChurch({ ...church, ...getValues() });
            forceUpdate(prev => !prev);
            reset(initialValues);
            setIsFormShown(false);
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
        <BigModal
            size={'mini'}
            isOpen={isFormShown}
            setIsOpen={setIsFormShown}
            modalTitle={t('church.labels.pastor')}
            onCancel={reset}
            icon={<EditIcon/>}
        >
            <ModalContent>
                <FormStyled>
                    <Controller
                        name="pastorAvatar"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`church.labels.pastorAvatar`)}
                                </LabelStyled>
                                <ImageCropper
                                    size={1}
                                    onChange={(data) => setValue(field.name, data)}
                                    src={getValues(field.name)}
                                />
                            </InputFieldStyled>
                        )}
                    />
                    <Controller
                        name="pastor"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`church.labels.pastor`)}
                                </LabelStyled>
                                <InputStyled
                                    value={field.value}
                                    {...field}
                                    placeholder={t(`church.placeholders.pastor`)}
                                />
                            </InputFieldStyled>
                        )}
                    />
                </FormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="ksu-button secondary"
                    onClick={() => setIsFormShown(false)}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled className="ksu-button" onClick={saveChange}>
                    {t('button.edit')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
};