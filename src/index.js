import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';

import './assets/styles.css';

// Comprobar si estamos en desarrollo o producción
//console.log(process.env);

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);
