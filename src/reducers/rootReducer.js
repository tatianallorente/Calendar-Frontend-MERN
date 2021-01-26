import { combineReducers } from 'redux'; 
import { authReducer } from './AuthReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from "./uiReducer";

// Combinamos todos los reducers, porque createStore() solo puede recibir un reducer
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})