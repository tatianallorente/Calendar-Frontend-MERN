import { types } from "../types/types";

/*
{
    id: new Date().getTime(),
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'comprar la tarta',
    user: {
        _id: '123',
        name: 'Tatiana'
    }
}
*/

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload // La info del evento actual
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events, // Los eventos que ya teníamos
                    action.payload // El evento nuevo
                ]
            };

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                // Sólo enviamos el evento que ha sido editado
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                // Enviamos todos los eventos menos el que acabamos de borrar
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

