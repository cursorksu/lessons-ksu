import { BigModal } from './BigModal';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { EVENTS_OPTIONS, EVENTS_TYPE } from '../../constants/eventsType/eventsType';
import { useTranslation } from 'react-i18next';
import { StyledDropdown } from '../KsuDropdown/StyledDropdown';
import { Dropdown } from 'semantic-ui-react';
import { KsuDatePicker } from '../KsuDatePicker';
import { lessonDefaultValues } from '../../constants/entities/lessonConfig';

const initialLessonEvent = {
    title: '',
    start: new Date(),
    end: new Date(),
    resource: {
        type: EVENTS_TYPE.NORMAL_LESSON,
        teachers: [],
        ...lessonDefaultValues,
    },
};

const initialManageEvent = {
    title: '',
    start: new Date(),
    end: new Date(),
    resource: {
        type: EVENTS_TYPE.MANAGE_MEETING,
    },
};

const initialEvent = {
    title: '',
    start: new Date(),
    end: new Date(),
    resource: {
        type: EVENTS_TYPE.IMPORTANT_EVENT,
        responsible: [],
        image: '',
    },
};

export const EventEditModal = ({ isOpen, setIsOpen, onSave, event, group }) => {
    const { t } = useTranslation('tr');

    const initialValues = useMemo(() => {
        switch (event) {
            case (event && event.type === EVENTS_TYPE.IMPORTANT_EVENT): {
                return initialEvent;
            }
            case (event && event.type === EVENTS_TYPE.MANAGE_MEETING) : {
                return initialManageEvent;
            }
            default: {
                return initialLessonEvent
            }
        }
    }, [event]);

    const { reset, control, getValues, setValue } = useForm({
        defaultValues: {
            ...initialValues,
            group: group?.id,
        },
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (event && group) {
            reset({
                title: event.title || '',
                start: event.start || new Date(),
                end: event.end || new Date(),
                resource: event.resource || initialLessonEvent.resource,
                group: group?.id,
            });
        }
    }, [event, reset, group]);

    return (
        <BigModal
            size={'small'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={!!event?.id ? t('planer.editEvent') : t('planer.addEvent')}
            onCancel={reset}
            icon={!!event?.id ? <EditIcon /> : (!isOpen ? <AddIcon/> : <RemoveIcon/>)}
        >
            <ModalContent>
                {getValues('resource').type === EVENTS_TYPE.NORMAL_LESSON && (
                    <Controller
                        name="resource.imageUrl"
                        id="imageUrl"
                        control={control}
                        render={({ field }) => (
                            <div className="event-image-holder">
                                <img src={field.value} alt={field.title}/>
                            </div>
                        )}
                    />
                )}

                <FormStyled>
                    <Controller
                        name="start"
                        id="start"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`planer.labels.time`)}
                                </LabelStyled>
                                <KsuDatePicker
                                    {...field}
                                    legend={'Дата'}
                                    onChange={(date) => {
                                        setValue('start', date);
                                        setValue('start', date);
                                    }}
                                />
                            </InputFieldStyled>
                        )}
                    />
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t(`planer.labels.title`)}
                                </LabelStyled>
                                <InputStyled
                                    value={field.value}
                                    {...field}
                                    placeholder={t(`planer.labels.title`)}
                                />
                            </InputFieldStyled>
                        )}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t('group.addToGroup')}
                                </LabelStyled>
                                <StyledDropdown>
                                    <Dropdown
                                        fluid
                                        multiple={false}
                                        placeholder={'group.addToGroupPlaceholder'}
                                        options={EVENTS_OPTIONS.map(el => ({...el, text: t(el.text)}))}
                                        {...field}
                                    />
                                </StyledDropdown>
                            </InputFieldStyled>
                        )}
                    />
                    <Controller
                        name="teachers"
                        control={control}
                        render={({ field }) => (
                            <InputFieldStyled>
                                <LabelStyled className="label">
                                    {t('planer.labels.teachers')}
                                </LabelStyled>
                                <KsuTeachersDropdown
                                    {...field}
                                    value={field.value}
                                    placeholder={t('planer.labels.teachers')}
                                    multiple
                                    search
                                    selection
                                    optionsIds={group?.teachers}
                                    pointing={'top right'}
                                    onChange={(teacher) => console.log({teacher})}
                                />
                            </InputFieldStyled>
                        )}
                    />
                </FormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="secondary"
                    onClick={() => setIsOpen(false)}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled onClick={onSave}>
                    {!!event ? t('button.edit') : t('button.add')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
}