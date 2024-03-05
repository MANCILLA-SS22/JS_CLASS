// Ejemplo 44: 
// 1. Uso de process, variables de entorno (dotenv) y child process. 
// 2. Arquitectura de capas, servidor, diseno y persistencia. 
// 3. Patron Singleton (para una sola instancia en una clase)
// 4. Comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.
// 5. Mailer y mensajeria
// 6. Test y Mocks
// 7. Optimizacion (gzip y brotli, error handling)
// 8. Logging y testing de performance 

/* Utilizando argumentos con dotenv
✓ Realizar un servidor basado en node js con express, El cual reciba por flag de cli el comando --mode <modo> y sea procesado por commander.
✓ Acorde con este argumento, hacer una lectura a los diferentes entornos, y ejecutar dotenv en el path correspondiente a cada modo (--mode development debería conectar con .env.development).
✓ Para el entorno development, el servidor debe escuchar en el puerto 8080, para el entorno productivo, el servidor debe escuchar en el puerto 3000. 

Ejemplo en vivo
✓ Se creará una función llamada “listNumbers” el cual recibirá un número indefinido de argumentos (...numbers)
✓ Si se pasa un argumento no numérico, entonces deberá mostrar por consola un error indicando “Invalid parameters” seguido de una lista con los tipos de dato (para [1,2,”a”,true], el error mostrará [number,number,string,boolean]
✓ Escapar del proceso con un código -4. Utilizando un listener, obtener el código de escape del error y mostrar un mensaje “Proceso finalizado por argumentación inválida en una función”

Cálculo bloqueante con contador
✓ Realizar un servidor en express que contenga una ruta raíz '/' donde se represente la cantidad de visitas totales a este endpoint
✓ Se implementará otra ruta '/calculo-bloq', que permita realizar una suma incremental de los números del 0 al 100000 con el siguiente algoritmo.
✓ Comprobar que al alcanzar esta ruta en una pestaña del navegador, el proceso queda en espera del resultado. Constatar que durante dicha espera, la ruta de visitas no responde hasta terminar este proceso.
✓ Luego crear la ruta '/calculo-nobloq' que hará dicho cálculo forkeando el algoritmo en un child_process, comprobando ahora que el request a esta ruta no bloquee la ruta de visitas.

Aplicar bajo el modelo de trabajo de TDD:
Una función de login (con usuarios hardcodeados user = coderUser , password = 123)
✓ Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”)
✓ Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”)
✓ Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”)
✓ Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)
✓ Si el usuario y contraseña coinciden, consologuear (“logueado”) 

Manejador personalizado de errores
Con base en el ejemplo de errores planteado.
✓ Crear un endpoint en el router de usuarios router.get(‘/:uid’) para recibir a un usuario. NO centrarse en la lógica para devolver al usuario, sino en el error en caso de que no envíen un parámetro numérico válido.
✓ Complementar el código para que se pueda arrojar un error de tipo “INVALID_PARAM”, en caso de que se quiera buscar a un usuario por un :uid inválido (por ejemplo, un valor no numérico, numérico negativo o undefined).
✓ Gestionar el tipo de error en el Enum, en el middleware y en la info

Logger multientorno
Con base en lo aprendido de los loggers
✓ Configurar el primer logger (devLogger) para que cuente con un transporte Console a nivel Verbose.
✓ Crear además un logger (prodLogger) para que cuente con un transporte Console a nivel http y un transporte File a nivel warn
✓ Configurar el middleware que setea el logger en el objeto req, para que coloque el devLogger, o el prodLogger según sea el entorno.
✓ Corroborar los logs en múltiples entornos y analizar el comportamiento.
*/

import express from "express";
import cors from 'cors';
import compression from "express-compression";

import MongoSingleton from './config/mongodb-singleton.js';
import program from './process.js';
import {__dirname} from './dirname.js';
import config from './config/config.js';
import viewsRouter from "./router/views.routes.js";
import studentRouter from './router/students.routes.js';
import coursesRouter from './router/courses.routes.js';
import emailRouter from './router/email.routes.js';
import usersRouter from "./router/users.routes.js";
import sessionRouter from "./router/sessions.routes.js"
import smsRouter from './router/sms.routes.js';
import whatsappRouter from './router/whatsapp.routes.js';
import compressionRouter from './router/compression.routes.js';
import loggerRouter from "./router/logger.routes.js";
import performanceRouter from "./router/performance-test.routes.js";
import { escenario1, escenario2, escenario3, escenario4 } from "./utils/escenarios.js";
// import { addLogger } from "./config/logger_BASE.js"; //Logger 1
import { addLogger } from "./config/logger_CUSTOM.js";  //Logger 2

const app = express();

// console.log("config: ", config);
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
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({brotli: { enabled: true, zlib: {} } }));  //app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors(corsOptions)); //Si utilizamos unicamente cors(), quiere decir que cualquiera podra acceder al servidor. Pero al mandarle un objeto cors(corsOptions), este contiene la info de quien o quienes pueden acceder.
// app.use(addLogger); //Este es un middleware que contiene los loggers, el cual se ejecutara antes de los routers de abajo.

app.get('/test', test);
app.use("/views", viewsRouter);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/email", emailRouter);
app.use("/api/users", usersRouter);
app.use("/api/session", sessionRouter);
app.use("/api/sms", smsRouter);
app.use("/api/whatsapp", whatsappRouter);
app.use("/api/performance", performanceRouter)
app.use("/compression", compressionRouter);
app.use("/logger", loggerRouter); //Al usar esta ruta, hay que COMENTAR los middlewares Logger 1 y Logger 2

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, function(){
    console.log("Server listening on port " + SERVER_PORT);
    
    // ****** Uso de listeners ******
    // process.exit(5);
    // res; // Exception no capturada: TypeError: console is not a function  
    

    // ****** Uso de tests ****** 
    const executeTest = config.runTests; //Ejecutar --> nodemon run start --test true en la terminal 
    if (executeTest) {
        console.log("Ejecutando set de pruebas de func suma()");

        //Escenarios
        let testPasados = 0;
        testPasados = escenario1(testPasados); //Test 1: Debe devolver null si algun parametro no es numérico.
        testPasados = escenario2(testPasados); //Test 2: Debe devolver 0 si no se pasa ningún parámetro
        testPasados = escenario3(testPasados); //Test 3: Debe poder realizar la suma correctamente.
        testPasados = escenario4(testPasados); //Test 4: Debe poder realizar la suma con cualquier cantidad de numeros.
        console.log(`Test a ejecutar: 4, pasados: ${testPasados}`);
    }

});

// ****** Uso de SERVICE ****** 
// async function mongoInstance(){
//     try {
//         await MongoSingleton.getInstance();
//     } catch (error) {
//         console.log(error);
//     }
// }
// mongoInstance();
// mongoInstance(); //Al usar singleton este funcion no se ejecutara dos veces




// Ejecuctar en consola cuando trabajemos con Artillery:
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/sencilla" -o ./Ejercicio-44/data/resultadosSencilla.json`
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/complex" -o ./Ejercicio-44/data/resultadosComplex.json`
// Ejecucion de script .yml      -->    `artillery run ./Ejercicio-44/src/config.yml --output ./Ejercicio-44/data/test01.json`
// Generacion de reporte .html   -->    `artillery report test01.json -o ./Ejercicio-44/data/resultUser.html` (opcional)