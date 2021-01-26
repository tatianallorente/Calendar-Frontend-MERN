import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 14:00:00
const nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    // Para saber en qué estado está el modal (open o closed)
    const {modalOpen} = useSelector(state => state.ui);
    // Para saber cuál es el evento activo
    const {activeEvent} = useSelector(state => state.calendar);

   // const [dateStart, setDateStart] = useState(now.toDate());
   // const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [, setDateStart] = useState(now.toDate());
    const [, setDateEnd] = useState(nowPlus1.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setformValues] = useState(initEvent);
    
    const {notes, title, start, end} = formValues;


    // Estar pendiente de cuál es el evento activo para cargar sus datos en el modal
    useEffect(() => {
        if (activeEvent) {
            setformValues(activeEvent);
        } else {
            // Para que no se queden los datos cargados en el modal cuando hayamos borrado un evento
            setformValues(initEvent);
        }
        
    }, [activeEvent, setformValues]);


    const handleInputChange = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        // Limpiar el formulario enviando el evento vacío
        setformValues(initEvent);
        // Limpiar el evento activo
        dispatch( eventClearActiveEvent() );
    }

    const handleStartDateChange = (e) => {
        // e será la fecha
        // Es una instancia del objeto Date de javascript, no de moment
        setDateStart(e);
        setformValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setformValues({
            ...formValues,
            end: e
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        // Convertir fechas a moment
        const momentStart = moment(start);
        const momentEnd = moment(end);

        // Validaciones
        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error');
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }


        // Si hay un evento activo:
        if (activeEvent) {
            // Estamos editando un evento
            dispatch( eventStartUpdate(formValues) );
        } else {
            // Estamos creando un evento
            dispatch( eventStartAddNew(formValues) );
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-fondo"
      >
            <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        //value={ dateStart }
                        value={ start }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        //value={ dateEnd }                      
                        value={ end }
                       // minDate={ dateStart }  
                        minDate={ start }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Título y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' } `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
      </Modal>
    )
}
