import { CreateEntityFormStyled } from './CreateEntityFormStyled';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyled } from '../ButtonStyled';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalActions, Popup } from 'semantic-ui-react';
import { InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { KsuDatePicker } from '../KsuDatePicker';
import { KsuDropdown } from '../KsuDropdown';
import { KsuTags } from '../KsuTags/KsuTags';
import { useSelector } from 'react-redux';
import ImageCropper from '../ImageCroper/ImageCroper';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';

export const CreateEntityForm = ({
                                     entityName,
                                     onConfirm,
                                     onClose,
                                     fields,
                                     defaultValues = {},
                                 }) => {
    const [ emojiIsOpen, setEmojiIsOpen ] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { reset, control, getValues, setValue } = useForm({
        defaultValues,
        caches: false,
    });
    const emojiHandler = async (emj) => {
        await setValue('avatar', emj.unified);
        await setEmojiIsOpen(false);
    };

    useEffect(() => {
        reset(defaultValues);
    }, [ defaultValues, reset ]);

    const { editEntity } = useEditEntity(entityName);
    const { createEntity } = useCreateEntity(entityName);
    const { t } = useTranslation('tr');

    const getElement = useCallback(
        (el, field) => {
            switch (el.inputType) {
                case 'emojiPicker':
                    return (
                        <div className="d-flex duo-cell">
                            <div className="avatar">
                                <Emoji size={80} unified={getValues('avatar')}/>
                            </div>
                            <Popup
                                closeOnPortalMouseLeave={false}
                                openOnTriggerClick
                                open={emojiIsOpen}
                                trigger={
                                    <ButtonStyled onClick={() => setEmojiIsOpen((prev) => !prev)}>
                                        {t(`${entityName}.placeholders.${el.name}`)}
                                    </ButtonStyled>
                                }
                                content={
                                    <EmojiPicker
                                        width={'100%'}
                                        open={emojiIsOpen}
                                        onEmojiClick={emojiHandler}
                                    />
                                }
                            />
                        </div>
                    );
                case 'datePicker':
                    return (
                        <KsuDatePicker
                            selected={field.value}
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            onChange={(date) => setValue(el.name, date)}
                        />
                    );
                case 'imagePicker':
                    return (
                        <ImageCropper
                            size={1}
                            onChange={(data) => setValue(field.name, data)}
                            src={getValues(field.name)}
                        />
                    );
                case 'tags':
                    return (
                        <div className="triple-cell">
                            <KsuTags
                                field={field}
                                value={field.value}
                                placeholder={t(`${entityName}.placeholders.${el.name}`)}
                                onChange={(data) => setValue(field.name, data)}
                            />
                        </div>
                    );
                case 'imagesPicker':
                    return (
                        <ImageCropper
                            size={2.2}
                            onChange={(data) => setValue(field.name, data)}
                            src={getValues(field.name)}
                            multiple/>
                    );
                case 'multiselectDropdown':
                    return (
                        <KsuDropdown
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            entityName={el.entity}
                            {...field}
                            onChange={(data) => setValue(field.name, data)}
                            multiple={true}
                            optionsIds={user ? user[el.entity] : []}
                        />
                    );
                case 'dropdown':
                    return (
                        <KsuDropdown
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            entityName={el.entity}
                            {...field}
                            onChange={(data) => setValue(field.name, data)}
                            multiple={false}
                            optionsIds={user[el.entity]}
                        />
                    );
                default:
                    return (
                        <InputStyled
                            value={field.value}
                            {...field}
                            placeholder={t(`${entityName}.placeholders.${field.name}`)}
                        />
                    );
            }
        },
        [ emojiIsOpen, defaultValues, user ]
    );

    return (
        <>
            <ModalContent>
                <CreateEntityFormStyled>
                    {fields.map((el) => {
                        if (el.isIgnored) return <></>;

                        return (
                            <Controller
                                key={el.name}
                                name={el.name}
                                control={control}
                                render={({ field }) => (
                                    <InputFieldStyled>
                                        <LabelStyled>
                                            {t(`${entityName}.labels.${el.name}`)}
                                        </LabelStyled>
                                        {getElement(el, field)}
                                    </InputFieldStyled>
                                )}
                            />
                        );
                    })}
                </CreateEntityFormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="secondary"
                    onClick={async () => {
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled
                    onClick={async () => {
                        const newData = getValues();
                        const id = defaultValues.id
                                   ? await editEntity(newData)
                                   : await createEntity(newData);

                        await onConfirm(id, newData);
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.confirm')}
                </ButtonStyled>
            </ModalActions>
        </>
    );
};
