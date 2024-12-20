import { BigModal } from './BigModal';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { ImageUploader } from '../ImageCroper/ImageUploader';

export const EditImage = ({ imageFieldName, entity, entityName, forceUpdate }) => {
    const initialValues = { [imageFieldName]: entity[imageFieldName] };
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity } = useEditEntity(entityName);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const { reset, control, getValues, setValue } = useForm({
        defaultValues: initialValues,
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (entity[imageFieldName]) {
            reset(initialValues);
        }
    }, [ entity[imageFieldName] ]);

    const saveChange = async () => {
        try {
            await editEntity({ ...entity, ...getValues() });
            forceUpdate(prev => !prev);
            reset(initialValues);
            setIsFormShown(false);
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
        <BigModal
            size={'small'}
            isOpen={isFormShown}
            setIsOpen={setIsFormShown}
            modalTitle={t(`${entityName}.labels.${imageFieldName}`)}
            onCancel={reset}
            icon={<EditIcon/>}
        >
            <ModalContent>
                <FormStyled>
                    <Controller
                        name={imageFieldName}
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`${entityName}.labels.${imageFieldName}`)}
                                </LabelStyled>
                                <ImageUploader
                                    size={1}
                                    onUpload={(data) => {
                                        setValue(field.name, data);
                                        data && setIsSaveDisabled(false);
                                    }}
                                    onDelete={() => setIsSaveDisabled(true)}
                                    src={getValues(field.name)}
                                />
                            </InputFieldStyled>
                        )}
                    />
                </FormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="secondary"
                    onClick={() => setIsFormShown(false)}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled onClick={saveChange} disabled={isSaveDisabled}>
                    {t('button.edit')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
};