// Ejemplo 45: 
// Uso de process, variables de entorno (dotenv) y child process. 
// Arquitectura de capas, servidor, diseno y persistencia. 
// Patron Singleton (para una sola instancia en una clase)
// Comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.
// Mailer y mensajeria

// Utilizando argumentos con dotenv
// ✓ Realizar un servidor basado en node js con express, El cual reciba por flag de cli el comando --mode <modo> y sea procesado por commander.
// ✓ Acorde con este argumento, hacer una lectura a los diferentes entornos, y ejecutar dotenv en el path correspondiente a cada modo (--mode development debería conectar con .env.development).
// ✓ Para el entorno development, el servidor debe escuchar en el puerto 8080, para el entorno productivo, el servidor debe escuchar en el puerto 3000. 

// Ejemplo en vivo
// ✓ Se creará una función llamada “listNumbers” el cual recibirá un número indefinido de argumentos (...numbers)
// ✓ Si se pasa un argumento no numérico, entonces deberá mostrar por consola un error indicando “Invalid parameters” seguido de una lista con los tipos de dato (para [1,2,”a”,true], el error mostrará [number,number,string,boolean]
// ✓ Escapar del proceso con un código -4. Utilizando un listener, obtener el código de escape del error y mostrar un mensaje “Proceso finalizado por argumentación inválida en una función”

// Cálculo bloqueante con contador
// ✓ Realizar un servidor en express que contenga una ruta raíz '/' donde se represente la cantidad de visitas totales a este endpoint
// ✓ Se implementará otra ruta '/calculo-bloq', que permita realizar una suma incremental de los números del 0 al 100000 con el siguiente algoritmo.
// ✓ Comprobar que al alcanzar esta ruta en una pestaña del navegador, el proceso queda en espera del resultado. Constatar que durante dicha espera, la ruta de visitas no responde hasta terminar este proceso.
// ✓ Luego crear la ruta '/calculo-nobloq' que hará dicho cálculo forkeando el algoritmo en un child_process, comprobando ahora que el request a esta ruta no bloquee la ruta de visitas.


import express from "express";
import {__dirname} from './utils.js';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import program from './process.js';
import cors from 'cors';

import viewsRouter from "./router/views.routes.js";
import studentRouter from './router/students.routes.js';
import coursesRouter from './router/courses.routes.js';
import emailRouter from './router/email.routes.js';
import smsRouter from './router/sms.routes.js';

const app = express();

// console.log("config: ", config)
// console.log(process);
// console.log(process.argv); // npm run start
// console.log(process.argv.slice(2)); // --> ["hello", "world"]

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

app.use("/", viewsRouter);
app.get('/test', test);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);


const SERVER_PORT = config.port;
app.listen(SERVER_PORT, function(){
    console.log("Server listening on port " + SERVER_PORT);
    
    // ****** Uso de listeners ******
    // process.exit(5);
    // res; // Exception no capturada: TypeError: console is not a function    
});

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