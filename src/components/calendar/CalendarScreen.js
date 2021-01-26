import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewButton } from '../ui/AddNewButton';
import { DeleteEventButton } from '../ui/DeleteEventButton';

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // Leemos los eventos del store con useSelector
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    // Mantener la última vista que se usó (mes, semana, día..)
    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView',e);   
    }


    // Limpiar el evento activo cuando dejemos de seleccionar un evento (seleccionemos una celda vacía). Aprovechamos esto para ocultar el botón de borrar.
    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    // Estilos de los eventos (celdas)
    const eventStyleGetter = (event,start,end,isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#8D6A9F' : '#7DBBC3',
            borderRadius: '0px',
            display: 'block',
            color: '#fff'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
                /*style={{ height: 500 }}*/
            />

            <CalendarModal/>

            <AddNewButton/>

            {
                // Mostrar el botón de borrar cuando haya un evento activo
                (activeEvent) && <DeleteEventButton/>
            }
        </div>
    )
}
