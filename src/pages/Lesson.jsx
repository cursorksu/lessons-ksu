import React, {useEffect, useRef, useState} from 'react';
import {MainLayout} from './MainLayout';
import {TopicToPrint} from '../components/ComponentsToPrint';
import {useDispatch, useSelector} from 'react-redux';
import {setLesson as setLessonInStore} from '../store/dataReducer';
import {useParams} from 'react-router';
import {useGetEntity} from '../api/entity/useGetEntity';

export const Lesson = () => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const componentRef = useRef();
    const {lessonId} = useParams();
    const dispatch = useDispatch();
    const {getEntityById} = useGetEntity('lessons');
    const {
        lessonData: {lesson},
    } = useSelector((state) => state);

    useEffect(() => {
        lessonId &&
        getEntityById(lessonId).then((lesson) =>
                dispatch(setLessonInStore(lesson)),
        );
    }, [lessonId, getEntityById, shouldUpdate, dispatch]);

    return (
        <MainLayout className={'lesson-page'}>
            <TopicToPrint
                    ref={componentRef}
                    lesson={lesson}
                    onChangeConfirm={() => setShouldUpdate(prev => !prev)}
            />
        </MainLayout>
    );
};
