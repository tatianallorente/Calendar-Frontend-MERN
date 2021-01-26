import { types } from "../types/types";


const initialState = {
    modalOpen: false,
}

// Reducer para manejar el estado de la ventana modal (Si debe mostrarse u ocultarse)
export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            };
        
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            };
        
        default:
            return state;
    }

}