import { json } from '@remix-run/node';
import { Event, Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { db } from '~/services/db.server';
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale';
import { useState } from 'react';
import dndStyles from 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import styles from 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';

export function links() {
    return [{rel: "stylesheet", href: styles }]
}

const CalendarComponent = withDragAndDrop(Calendar);

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
        'en-US': enUS
    }
});

export default function calendar() {
    const [events, setEvents] = useState<Event[]>([{
        title: 'Event Title',
        start: new Date(),
        end: new Date()
    }]);

    return (
        <CalendarComponent
            defaultView='week'
            localizer={localizer}
            events={events}
            resizable
            style={{ height: '100vh' }}
        />
    );
}