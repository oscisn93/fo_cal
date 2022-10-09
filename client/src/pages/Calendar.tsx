import { useState, useMemo, useCallback, useRef, Fragment, useEffect } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
  stringOrDate,
  Views,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// construccts necessary for calendar and timekeeping
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 1);
const FullCalendar = withDragAndDrop(BigCalendar);

//Calendar Page
export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);

  // const [selectedEvent, setSelectedEvent] = useState({
  //   title: "None",
  //   start: new Date(),
  //   end: new Date()
  // });

  const createEvent = (newEvent: Event) => {
    setEvents((prev: Event[]) => [...prev, newEvent]);
  }

  const updateEvent = (event: Event, start: stringOrDate, end: stringOrDate) => {
    if (events)
    setEvents((currentEvents: Event[]) => {
      const index = currentEvents.indexOf(event);
      currentEvents.splice(index, 1);
      const updatedEvent = {
        title: event.title,
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, updatedEvent];
    });
  };

  // const deleteEvent = (event: Event) => {
  //   if (events)
  //   setEvents((currentEvents: Event[]) => {
  //     const index = currentEvents.indexOf(event);
  //     currentEvents.splice(index, 1);
  //     return [...currentEvents];
  //   });
  // };

  const handleSelectSlot = useCallback(
    ({ start, end }: SlotInfo) => {
      const title = String(window.prompt('New Task name'));
      createEvent({title, start, end, allDay:false});
    },
    [updateEvent]
  );

  // const handleSelectEvent = useCallback(
  //   (event: Event) => {
  //     setOpen(true);
  //   }, [updateEvent]
  // );

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { event, start, end } = data;
    updateEvent(event, start, end);
  };
  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { event, start, end } = data;
    updateEvent(event, start, end);
  };


  const { views } = useMemo(
    () => ({
      views: {
        week: true,
        work_week: true,
        month: true,
        day: true
      },
    }), []
  );

  const pageStyle: React.CSSProperties = {
    backgroundImage: 'url(https://www.freepik.com/free-photo/gray-abstract-wireframe-technology-background_15474085.htm#query=white%20background&position=15&from_view=keyword)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div style={ pageStyle }>
      <FullCalendar
        localizer={localizer}
        defaultView={Views.DAY}
        views={ views }
        events={events}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        selectable
        resizable
        style={{ height: 500, margin: 50 }}
        step={5}
        timeslots={12}
        defaultDate={new Date(2022,9,13)}
      />
    </div>
  );
}