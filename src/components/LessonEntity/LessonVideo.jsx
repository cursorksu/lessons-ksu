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
    title: '',
    videoUrl: '',
};

export const LessonVideo = ({entityName, lesson}) => {
    const {t} = useTranslation('tr');
    const {lessonId} = useParams();
    const {editEntity} = useEditEntity('lessons');
    const [isVideoShown, setIsVideoShown] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const {control, getValues, setValue, reset} = useForm({
        defaultValues: INITIAL_VALUES,
        caches: false,
    });

    const handleChangeVideoUrl = async () => {
        await editEntity({id: lessonId, video: getValues()});
        setIsVideoShown(false);
        reset(INITIAL_VALUES);
    };

    const removeEntity = async (entityId) => {
        await editEntity({id: lessonId, video: INITIAL_VALUES});
    };

    const handleCancel = () => {
        reset();
        setIsVideoShown(false);
    };

    const embedUrl = (url) => {
        if (url?.includes('https://www.youtube.com/embed/')) return url;
        if (url?.includes('watch?v=')) return url?.replace('watch?v=', 'embed/');
        if (url?.includes('https://youtu.be/'))
            return url?.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
        return url;
    };

    return (
            <>
                <div className={'title-wrapper'}>
                    <TitleMedium>{t(`lessonTabs.${entityName}`)}</TitleMedium>
                    {user?.uid && lesson?.createdBy.uid === user?.uid && (
                            <div className="btn-block print-hide">
                                <ButtonStyled onClick={() => setIsVideoShown(true)}>
                                    {t('button.add')} {t(`lessonTabs.${entityName}`)}
                                </ButtonStyled>
                                <Popup
                                        trigger={
                                            <ButtonIconStyled
                                                    onClick={() => removeEntity(el.id)}>
                                                <DeleteIcon/>
                                            </ButtonIconStyled>
                                        }
                                        content={t('button.delete')}
                                />
                            </div>
                    )}
                </div>
                <section className="content-wrapper">
                    <div>
                        <div className="action-top">
                            {isVideoShown
                                    ? (
                                            <div className="print-hide">
                                                <Controller
                                                        name={'title'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>{t('title')}</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <Controller
                                                        name={'videoUrl'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>{t('videoUrl')}</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <div className="btn-block">
                                                    <ButtonStyled
                                                            className="secondary"
                                                            onClick={handleCancel}
                                                    >
                                                        Cansel
                                                    </ButtonStyled>
                                                    <ButtonStyled onClick={handleChangeVideoUrl}>Save</ButtonStyled>
                                                </div>
                                            </div>
                                    ) : (
                                            <div>
                                                {lesson.video?.videoUrl
                                                        ? (
                                                                <iframe
                                                                        title="lesson video"
                                                                        width="100%"
                                                                        height="200"
                                                                        src={`${embedUrl(lesson.video?.videoUrl)}?controls=1&showinfo=0`}
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                        className="video-wrapper"
                                                                />
                                                        ) : (
                                                                <div className="video-wrapper">
                                                                    <TitleMedium>No video Url</TitleMedium>
                                                                </div>
                                                        )

                                                }
                                            </div>

                                    )}
                        </div>
                    </div>
                </section>
            </>
    );
};
