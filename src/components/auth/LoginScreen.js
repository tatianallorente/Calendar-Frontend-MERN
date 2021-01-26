import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, starRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    // Formulario de login
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail: 'test@gmail.com',
        lPassword: '123456'
    } );

    // Formulario de registro
    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''
    } );

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    // Se ejecuta al hacer submit del formulario de login
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    // Se ejecuta al hacer submit del formulario de registro
    const handleRegister = (e) => {
        e.preventDefault();

        // Validar que las contraseñas sean iguales
        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }
        dispatch(starRegister(rName, rEmail, rPassword1));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form login-form-login">
                    <h3>Acceder</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form login-form-register">
                    <h3>Registrarse</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirmar contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}