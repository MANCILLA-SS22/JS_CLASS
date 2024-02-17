// Ejercicio 46: Coder-eats food delivery para devs.
// ¿Cómo lo hacemos? Se desarrollará un sistema completo con routing, controladores, dao y
// servicios. Se recomienda realizar el proyecto en 4 etapas.
// ✓ Etapa de routing y controladores.
// ✓ Etapa de dao de mongoDB y conexión
// ✓ Etapa de negocio
// ✓ Etapa de servicios
// ✓ Etapa de frontend

import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import cors from 'cors';

import {__dirname} from './utils.js';

//import Routers
import usersRouter from './routers/users.router.js';
import businessRouter from './routers/business.router.js';
import ordersRouter from './routers/orders.router.js';

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// Declaracion de routes
app.use("/api/users", usersRouter);
app.use("/api/business", businessRouter);
app.use("/api/orders", ordersRouter);

const SERVER_PORT = config.port
app.listen(SERVER_PORT, () => console.log("Server listening on port " + SERVER_PORT));

// Levantamos instancia Mongo
async function mongoInstance(){
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
}

mongoInstance();