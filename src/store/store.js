import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { rootReducer } from "../reducers/rootReducer";

// Esto es para poder tener configurada la extensión de chrome + el middleware
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



// El createStore() solo puede recibir un reducer
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
// Como la autenticación es asíncrona, necesitamos un middleware
// En este caso usamos Thunk



// Para que funcione la extensión de chrome, ponemos esta línea:
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

/*
export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/

