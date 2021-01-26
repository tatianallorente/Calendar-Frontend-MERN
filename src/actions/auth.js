import Swal from 'sweetalert2';

import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './events';

// Login
export const startLogin = (email, password) => {
    return async(dispatch) => {
        //console.log(email, password);
        
        const resp = await fetchSinToken('auth', {email,password}, 'POST');
        const body = await resp.json();
        //console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            if (body.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                const errors = body.errors;
                let showErrors = '';
                for (const property in errors) {
                     showErrors += `${errors[property]['msg']}<br/>`;
                }
                Swal.fire('Error', showErrors, 'error');
            }
        }
    }
}


// Register
export const starRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Una vez el usuario se ha registrado correctamente, se hace login automáticamente
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            const errors = body.errors;
            let showErrors = '';
            for (const property in errors) {
                 showErrors += `${errors[property]['msg']}<br/>`;
            }

            Swal.fire('Error', showErrors, 'error');
        }

    }
}   


// Renewal token
export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });


const login = (user) => ({
    type: types.authLogin,
    payload: user
})


// Logout
export const startLogout = () => {
    return (dispatch) => {
       localStorage.removeItem('token');
       localStorage.removeItem('token-init-date');

       // Clear events
       dispatch( eventLogout() );
       
       dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout });