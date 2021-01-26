import moment from 'moment';


// Convertir fechas en String a objetos Date de Moment
export const prepareEvents = (events = []) => {
 
    return events.map(
        (e) => ({
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    )
}