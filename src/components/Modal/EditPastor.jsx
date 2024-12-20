import { BigModal } from './BigModal';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { ImageUploader } from '../ImageCroper/ImageUploader';

export const EditPastor = ({ church, forceUpdate }) => {
    const initialValues = { pastor: church?.pastor, pastorAvatar: church?.pastorAvatar }
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity: editChurch } = useEditEntity('church');
    const [ isSaveDisabled, setIsSaveDisabled ] = useState(false);
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

    useEffect(() => {
        console.log({values: getValues(), isSaveDisabled });
    }, [getValues()])

    return (
        <BigModal
            size={'small'}
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
                                <ImageUploader
                                    size={1}
                                    onUpload={(data) => {
                                        setValue(field.name, data);
                                        setIsSaveDisabled(false);
                                    }}
                                    onDelete={() => setIsSaveDisabled(true)}
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
                <ButtonStyled className="ksu-button" onClick={saveChange} disabled={isSaveDisabled}>
                    {t('button.edit')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
};