import React from 'react'
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';

// Botón para crear un nuevo evento
export const AddNewButton = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
