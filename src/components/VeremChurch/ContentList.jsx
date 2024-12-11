import React, { useEffect } from 'react';
import { VeremChips, VeremLink } from './VeremChurchContent';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowIcon } from '../../assets/arrow-right.svg';
import { useGetLessonsInCollection } from '../../api/lesson/useGetLessonsInCollection';
import { useSelector } from 'react-redux';
import { VeremContentChurchItem } from './style';

export const ContentList = () => {
    const { t } = useTranslation('tr');
    const { getLessonsInCollection } = useGetLessonsInCollection();

    const { lessons } = useSelector(state => state.lessonData);


    useEffect(() => {
        getLessonsInCollection([ 'JAYSwQ9uMQxW0m5EvwU0', 'TpyBYyskyUGJWjltNCYq', 'cUuWLb9AtrQWMxTDQqlZ', 'hpRXO468Mk5P6XC3gpbX' ]);
    }, []);

    return (
        <div>
            <div className="content-block">
                <h3>
                    <VeremChips>{`${t('church.labels.content')}`}</VeremChips>
                </h3>
                <h3>
                    Уроки
                </h3>
                {lessons?.map(el => (
                    <VeremContentChurchItem>
                        <img src={el.imageUrl} alt="lesson pict"/>
                        <div>
                            <h4>{el.title}</h4>
                            <p>Created: {el.createdAt}</p>
                        </div>
                    </VeremContentChurchItem>
                ))}
                <VeremLink href="/collections"><ArrowIcon/>до списку уроків</VeremLink>
            </div>

            <div className="content-block-placeholder">
                Ще нема доданих сценаріїв
            </div>
        </div>
    );
};