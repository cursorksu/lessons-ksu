import {Dropdown, FormField, Popup} from 'semantic-ui-react';
import {ButtonIconStyled, ButtonStyled} from '../ButtonStyled';
import {ReactComponent as DeleteIcon} from '../../assets/delete.svg';
import {ReactComponent as PrintIcon} from '../../assets/print.svg';
import {ReactComponent as ScreenIcon} from '../../assets/screen.svg';
import {ReactComponent as FullScreenIcon} from '../../assets/full-screen.svg';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useGetEntityListByIds} from '../../api/entity/useGetEntityListByIds';
import {useParams} from 'react-router';
import {InfoBlockStyled} from '../InfoBlockStyled';
import {useReactToPrint} from 'react-to-print';
import {useCreateEntity} from '../../api/entity/useCreateEntity';
import {Controller, useForm} from 'react-hook-form';
import Editor from '../TextEditor';
import {HTMLRenderer} from '../HTMLRender/HTMLRender';
import {useAssignEntityToLesson} from '../../api/refs/useAssignEntityToLesson';
import clsx from 'clsx';
import {InputFieldStyled, InputStyled, LabelStyled} from '../InputStyled';
import {StyledDropdown} from '../KsuDropdown/StyledDropdown';
import {EVENTS_OPTIONS} from '../../constants/eventsType/eventsType';
import {useLessonToGroup} from '../../api/lesson/useLessonToGroup';
import {KsuCard} from '../KsuCard';
import {TitleMedium, TitleSmall} from '../TitleStyled';
import {useTranslation} from 'react-i18next';
import {useEditEntity} from '../../api/entity/useEditEntity';

const INITIAL_VALUES = {
    text: '',
    title: '',
    imageUrl: '',
};

export const LessonEntity = ({entityName, lesson}) => {
    const {t} = useTranslation('tr');
    const {lessonId} = useParams();
    const {getEntities, entities} = useGetEntityListByIds(entityName);
    const {createEntity} = useCreateEntity(entityName);
    const {editEntity} = useEditEntity('lessons');
    const [isVideoShown, setIsVideoShown] = useState(false);
    const {addEntityToArrayField, removeEntityFromArrayField} =
            useAssignEntityToLesson(entityName);

    const {control, getValues, setValue, reset} = useForm({
        defaultValues: INITIAL_VALUES,
        caches: false,
    });

    useEffect(() => {
        lesson &&
        lesson[entityName]?.length &&
        getEntities(lesson[entityName]).then(() => {
        });
    }, [lesson, entityName, getEntities]);

    const [isFormShown, setIsFormShown] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const handleEntityCreate = async () => {
        try {
            if (entityName === 'video') {
                await editEntity({id: lessonId, videoUrl: getValues('videoUrl')});
                setIsVideoShown(false);
                return;
            }
            const newValue = getValues();
            const id = await createEntity(newValue);

            if (id === undefined) {
                throw new Error(`${entityName} Did Not Created!`);
            }
            await addEntityToArrayField(entityName, id, lessonId);

            setIsFormShown(false);
            reset(INITIAL_VALUES);
        } catch (err) {
            throw new Error(err);
        }
    };

    const removeEntity = async (entityId) => {
        await removeEntityFromArrayField(entityName, entityId, lessonId);
    };

    const handleCancel = () => {
        reset();
        setIsFormShown(false);
    };

    const createButtonHandler = () => {
        switch (entityName) {
            case 'video': {
                return setIsVideoShown(true);
            }
            default: {
                return setIsFormShown(true);
            }
        }
    };

    return (
            <>
                <div className={'title-wrapper'}>
                    <TitleMedium>{t(`lessonTabs.${entityName}`)}</TitleMedium>
                    {user?.uid && lesson?.createdBy.uid === user?.uid && (
                            <div className="btn-block print-hide">
                                <ButtonStyled onClick={createButtonHandler}>
                                    {t('button.add')} {t(`lessonTabs.${entityName}`)}
                                </ButtonStyled>
                                <Popup
                                        trigger={
                                            <ButtonIconStyled
                                                    onClick={() => removeEntity(el.id)}>
                                                <DeleteIcon/>
                                            </ButtonIconStyled>
                                        }
                                        content={`Відкріпити ${entityName} від урока`}
                                />
                            </div>
                    )}
                </div>
                <section className="content-wrapper">
                    <div>
                        <div className="action-top">
                            {isFormShown
                                    ? (
                                            <div className="print-hide">
                                                <Controller
                                                        name={'title'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>Назва</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <Controller
                                                        name={'imageUrl'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>Посилання на зображення</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <Controller
                                                        name={'text'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>Контент</LabelStyled>
                                                                    <Editor
                                                                            {...field}
                                                                            placeholder={'Почніть вводити текст...'}
                                                                            onChange={(data) => setValue('text', data)}
                                                                            value={field.value}
                                                                    />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <ButtonStyled className="secondary"
                                                              onClick={handleCancel}>Cancel</ButtonStyled>
                                                <ButtonStyled onClick={handleEntityCreate}>Save</ButtonStyled>
                                            </div>
                                    )
                                    : (
                                            entities.map((el) => (
                                                    <div key={el.id}>
                                                        <img src={el.imageUrl} alt={el.title} className="item-image"/>
                                                        <div className="item-action print-hide">
                                                            <TitleSmall>{el.title}</TitleSmall>
                                                        </div>
                                                        <HTMLRenderer htmlContent={el.text}/>
                                                    </div>
                                            ))
                                    )}
                        </div>
                    </div>
                </section>
            </>
    );
};
