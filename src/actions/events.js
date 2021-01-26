import Swal from 'sweetalert2';

import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from "../helpers/prepareEvents";

// Add new event
export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        
        const {uid,name} = getState().auth;

        try {          
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if ( body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew(event) );
            } else {
                const errors = body.errors;
                let showErrors = '';
                for (const property in errors) {
                     showErrors += `${errors[property]['msg']}<br/>`;
                }
                Swal.fire('Error', showErrors, 'error');
            }

        } catch (error) {
            console.log(error); 
        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


// Set active event
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

// Clear active event
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});


// Update event
export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);            
        }

    }
};

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


// Delete event
export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);            
        }

    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});


// Load events
export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            // Convertir fechas String a objetos Date de moment
            const events = prepareEvents(body.eventos);

            // Mostrar eventos en el calendario
            dispatch( eventLoaded(events) );

        } catch (error) {
            console.log(error);           
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})


// Clear events at logout
export const eventLogout = () => ({
    type: types.eventLogout
});