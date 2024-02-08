//Ejemplo 46: Arquitectura de capas, servidor, diseno y persistencia. Patron Singleton (para una sola instancia en una clase), y comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.

import express from "express";
import {__dirname} from './utils.js';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import cors from 'cors';

import routerProduct from './routes/product.routes.js';
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'

const app = express();
const corsOptions = { // Configura el middleware cors con opciones personalizadas
    origin: 'http://localhost:5500', // Permitir solo solicitudes desde un cliente específico
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Configura los métodos HTTP permitidos    
    allowedHeaders: 'Content-Type,Authorization', // Configura las cabeceras permitidas
    credentials: true, // Configura si se permiten cookies en las solicitudes
};

function test(req, res){
    res.send({ message: "success", payload: "Success!!" });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cors(corsOptions)); //Si utilizamos unicamente cors(), quiere decir que cualquiera podra acceder al servidor. Pero al mandarle un objeto cors(corsOptions), este contiene la info de quien o quienes pueden acceder.

app.get('/test', test);
app.use("/api", routerProduct);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);


const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => console.log("Server listening on port " + SERVER_PORT));

// Esta configuracion solo se usa SI estoy usando SERVICE.
// async function mongoInstance(){
//     try {
//         await MongoSingleton.getInstance();
//     } catch (error) {
//         console.log(error);
//     }
// }
// mongoInstance();
// mongoInstance();