import React, { useMemo } from 'react';
import { PlanerContainerStyled } from './style';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import getDay from 'date-fns/getDay';
import startOfWeek from 'date-fns/startOfWeek';
import enUS from 'date-fns/locale/en-US';
import { STORAGE_URL } from '../../constants/main';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales,
});

const myEventsList = [
    {
        title: 'Урок воскресной школы',
        start: new Date(2024, 11, 15, 10, 0),
        end: new Date(2024, 11, 15, 12, 0),
        resource: {
            type: 'lesson', theme: 'Иисус и ученики', teachers: [ 'Иван', 'Мария' ],
            image: `${STORAGE_URL}/static%2FScala_icon.png?alt=media&token=02dfe8d7-6643-47d0-a654-9f65d44ee411`
        },
    },
    {
        title: 'Рождественский урок',
        start: new Date(2024, 11, 22, 10, 0),
        end: new Date(2024, 11, 22, 12, 0),
        resource: {
            type: 'lesson', theme: 'Рождество', teachers: [ 'Сергей' ],
            image: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        title: 'Євангелізацийне шоу',
        start: new Date(2024, 11, 28, 10, 0),
        end: new Date(2024, 11, 28, 12, 0),
        resource: {
            type: 'event', theme: 'Євангелізацийне шоу', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            image: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        title: 'Організаційна зустріч',
        start: new Date(2024, 11, 27, 10, 0),
        end: new Date(2024, 11, 27, 12, 0),
        resource: {
            type: 'manage', theme: 'Організаційна зустріч', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            image: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        title: 'Конференція м.Львів',
        start: new Date(2024, 11, 5, 10, 0),
        end: new Date(2024, 11, 7, 18, 0),
        resource: {
            type: 'manage', theme: 'Конференція м.Львів', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            image: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        title: 'Організаційна зустріч',
        start: new Date(2024, 11, 26, 10, 0),
        end: new Date(2024, 11, 26, 12, 0),
        resource: {
            type: 'manage', theme: 'Організаційна зустріч', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            image: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
];

const EventComponent = ({ event }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {event.resource?.image && (
                <img
                    src={event.resource.image}
                    alt={event.title}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
            )}
            <div>
                <strong>{event.title}</strong>
                <div>{event.resource?.theme}</div>
            </div>
        </div>
    );
};

export const PlanerContainer = ({ group }) => {
    const handleSelectEvent = (event) => {
        alert(`Вы выбрали событие: ${event.title}\nТема: ${event.resource.theme}\nУчителя: ${event.resource.teachers.join(', ')}`);
    };
    const eventPropGetter = useMemo(
        () => (event) => ({
            className: event.resource?.type,
        }),
        []
    );

    return (
        <PlanerContainerStyled>
            {/*{JSON.stringify(group)}*/}
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventPropGetter}
                onSelectEvent={handleSelectEvent}
                style={{ height: 500 }}
                components={{
                    event: EventComponent,
                }}
            />
        </PlanerContainerStyled>
    );
};