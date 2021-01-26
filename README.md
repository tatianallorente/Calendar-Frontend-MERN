# Frontend MERN - Calendar

>Frontend para el proyecto "Calendar", hecho con ReactJS.\
>Aplicación desplegada en: ![Heroku](https://img.shields.io/badge/-430098?style=flat&logo=Heroku&logoColor=white) [mern-calendar-tatiana](https://mern-calendar-tatiana.herokuapp.com/)\
>Ver Backend: ![GitHub](https://img.shields.io/badge/-181717?style=flat&logo=GitHub&logoColor=white) [Calendar-Backend-MERN](https://github.com/tatianallorente/Calendar-Backend-MERN)
---
# Tecnologías usadas

![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=flat&logo=Bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/-FontAwesome-339AF0?style=flat&logo=font-awesome&logoColor=white)

# Herramientas utilizadas

- ![Visual Studio Code](https://img.shields.io/badge/-007ACC?style=flat&logo=visual-studio-code&logoColor=white) Visual Studio Code
- ![MongoDB](https://img.shields.io/badge/-47A248?style=flat&logo=MongoDB&logoColor=white) MongoDB Compass (MongoDB Atlas)
- ![Postman](https://img.shields.io/badge/-FF6C37?style=flat&logo=Postman&logoColor=white) Postman
- ![Heroku](https://img.shields.io/badge/-430098?style=flat&logo=Heroku&logoColor=white) Heroku
- ![GitHub](https://img.shields.io/badge/-181717?style=flat&logo=GitHub&logoColor=white) Github

# Funcionalidades

- Registro de usuarios
- Autenticación
- Vistas del calendario: Mes, Semana, Día y Agenda
- CRUD de eventos del calendario: 
    - Ver eventos
    - Crear evento
    - Editar evento
    - Borrar evento
- Los usuarios no podrán editar/borrar los eventos creados por otro usuarios.
- Validación en todos los formularios de la aplicación, mostrando ventanas modales de error.
- Recordar la última vista que consultó el usuario.

# Capturas de pantalla

## Registro/Login

![login](https://user-images.githubusercontent.com/73536562/105878512-6a532600-6001-11eb-9ca6-4e7ded85f43a.png)
![login-error](https://user-images.githubusercontent.com/73536562/105878517-6aebbc80-6001-11eb-86e8-2bfb9afdf332.png)


## Vistas del calendario

![vista-mes](https://user-images.githubusercontent.com/73536562/105878407-4c85c100-6001-11eb-8e37-2497ee0efb0d.png)
![vista-semana](https://user-images.githubusercontent.com/73536562/105878524-6b845300-6001-11eb-96ea-32b4119bc0b3.png)
![vista-dia](https://user-images.githubusercontent.com/73536562/105878523-6aebbc80-6001-11eb-835f-4ba6afc60249.png)
![vista-agenda](https://user-images.githubusercontent.com/73536562/105878518-6aebbc80-6001-11eb-9032-6597ffdf5fc6.png)

## Crear, editar y borrar eventos

![crear-evento](https://user-images.githubusercontent.com/73536562/105878508-69ba8f80-6001-11eb-8e1b-af3bd50cdcec.png)
![editar-evento](https://user-images.githubusercontent.com/73536562/105878509-6a532600-6001-11eb-979a-8bbeb507e1fe.png)

# Instalaciones necesarias

## Rutas 

    npm install react-router-dom

## Calendario

    npm i react-big-calendar

## Fechas

    npm i moment

## Modal

    npm i react-modal

## Selector de fechas

    npm i react-datetime-picker

## Mostrar mensajes de error (modales)

    npm i sweetalert2

## Redux

    npm install react-redux

## Para las tareas asíncronas, necesitamos un middleware, en este caso Thunk

    npm i redux-thunk
