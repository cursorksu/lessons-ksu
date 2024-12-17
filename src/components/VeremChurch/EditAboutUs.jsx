import { BigModal } from '../Modal/BigModal';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, LabelStyled, TextareaAutosizeStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';

export const EditAboutUs = ({ church, forceUpdate }) => {
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity: editChurch } = useEditEntity('church');
    const { reset, control, getValues } = useForm({
        defaultValues: { about: church?.about },
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (church) {
            reset({ about: church.about });
        }
    }, [ church ]);

    const saveChange = async () => {
        try {
            await editChurch({ ...church, ...getValues() });
            forceUpdate(prev => !prev);
            reset({ about: church.about });
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
            modalTitle={t('church.labels.edit')}
            onCancel={reset}
            icon={<EditIcon/>}
        >
            <ModalContent>
                <FormStyled>
                    <Controller
                        name="about"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`church.labels.about`)}
                                </LabelStyled>
                                <TextareaAutosizeStyled
                                    value={field.value}
                                    {...field}
                                    placeholder={t(`church.placeholder.about`)}
                                />
                            </InputFieldStyled>
                        )}
                    />
                </FormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled className="ksu-button" onClick={saveChange}>
                    {t('button.edit')}
                </ButtonStyled>
                <ButtonStyled
                    className="ksu-button secondary"
                    onClick={() => setIsFormShown(false)}>
                    {t('button.cancel')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
};