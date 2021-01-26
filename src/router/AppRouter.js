import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);


    useEffect(() => {
        // Comprobamos en todo momento si el usuario está logueado
        dispatch( startChecking() );
    }, [dispatch]);

    if (checking) {
        return (<h5 class="loading">Espere...</h5>);
    }

    return (
        <Router>
            <div className="global-container">
                <Switch>
                    <PublicRoute 
                        exact
                        path="/login" 
                        component={LoginScreen}
                        isAuthenticated={ !!uid } // Convertir string a booleano
                    />
                    
                    <PrivateRoute 
                        exact
                        path="/" 
                        component={CalendarScreen}
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
