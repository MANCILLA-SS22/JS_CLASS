// Ejemplo 44: 
// 0. Uso de passport avanzado con cookies y localstorage (sin sessions)
// 1. Uso de process, variables de entorno (dotenv) y child process. 
// 2. Arquitectura de capas, servidor, diseno y persistencia. 
// 3. Patron Singleton (para una sola instancia en una clase)
// 4. Comunicación entre Frontend y Backend. Uso de "factory", "service" y DAO.
// 5. Mailer y mensajeria
// 6. Test y Mocks
// 7. Optimizacion (gzip y brotli, error handling)
// 8. Logging y testing de performance 

/* 
// Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo
// ✓ No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!
// ✓ Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.

// Crear un router para manejo de mascotas en una ruta base ‘/api/pets’, éste gestionará diferentes mascotas en un arreglo como persistencia. Posteriormente, desarrollar los siguientes endpoints:
// ✓ POST (‘/’): deberá insertar una nueva mascota. El formato de cada mascota será {name:String, specie: String}
// ✓ GET(‘/:pet’): Deberá traer la mascota con el nombre indicado. Utilizar una expresión regular para que sólo se puedan recibir letras e incluso espacios (recuerda cómo se lee un espacio a nivel URL). No debe permitir números.
// ✓ PUT (‘/:pet’): Deberá traer la mascota y añadirle un campo “adopted:true” a dicha mascota en caso de existir.
// ✓ Generar además un router.param que permita acceder de manera directa a la mascota, colocándola en req.pet

//Se creará un middleware que, en cada momento, valide el acceso a partir de las políticas (Sólo PUBLIC, USER, ADMIN).
// ✓ Definir una función handlePolicies,
// ✓ El método deberá recibir un arreglo de políticas (strings) y seguir los siguientes pasos:
//     ○ Si la única política es “PUBLIC”, continuar sin problema.
//     ○ para el resto de casos, primero procesar el token de jwt, el cual llegará desde los headers de autorización.
//     ○ Posteriormente, validar el rol del usuario que esté dentro del token para corroborar si se encuentra dentro de las políticas
// ✓ Cada método get, post, put, delete deberá recibir antes de los callbacks, un arreglo de políticas.
// ✓ Colocar handlePolicies como el primer middleware del procesamiento.
// ✓ Crear un router session que cuente con un endpoint ‘/login’, el cual guardará al usuario en un token (no es necesario un registro, todo es hardcodeado para agilizar el proceso de políticas)
// ✓ En el router de usuario que ya existe, crear un endpoint que utilice las políticas de usuario, y otro que utilice sólo políticas públicas.
// ✓ Validar políticas con Postman.
// CONSIDERACIONES:
// 1. Recordar agregar app.use(express.json()); para el login
// 2. Recordar agregar a los headers de autorización el Bearer token en Postman.
// 3. Enviar el jwt por medio de body para este caso
// 4. Hardcodear el rol del cliente en “user”.

Utilizando argumentos con dotenv
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



// nodemon Ejercicio-43/src/backend.js --mode prod   -->   Servidor escuchando por el puerto: 3001
// nodemon Ejercicio-43/src/backend.js --mode dev   -->   Servidor escuchando por el puerto: 5500
import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cors from 'cors';
import mongoose from "mongoose";
import morgan from "morgan";
import compression from "express-compression";
import cookieParser from "cookie-parser";
import cluster from "cluster";
import { cpus } from "os";

import MongoSingleton from './config/mongodb-singleton.js';
import program from './process.js';
import {__dirname} from './dirname.js';
import { initialPassport } from "./config/passport.config.js";
import config from './config/config.js';
import helloRouter from "./router/hello.routes.js"
import cookieRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import githubLoginViewRouter from "./router/github-login.views.routes.js";
import jwtRouter from "./router/jwt.routes.js";
import petsRouter from "./router/pets.routes.js";
import UsersExtendRouter from "./custom/users.extend.routes.js";
import forkRouter from "./router/fork.routes.js";
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
import { Mongoose } from "mongoose";
// import { addLogger } from "./config/logger_BASE.js";    //Logger 1
// import { addLogger } from "./config/logger_CUSTOM.js";  //Logger 2

const app = express();
const usersExtendRouter = new UsersExtendRouter();
const SERVER_PORT = config.port;
const corsOptions = { // Configura el middleware cors con opciones personalizadas
    origin: 'http://localhost:5500', // Permitir solo solicitudes desde un cliente específico
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Configura los métodos HTTP permitidos    
    allowedHeaders: 'Content-Type,Authorization', // Configura las cabeceras permitidas
    credentials: true, // Configura si se permiten cookies en las solicitudes
};
const stencil = { // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
    extname: "hbs", //index.hbs
    defaultLayout: "main", //Plantilla principal
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}

function test(req, res){
    res.send({ message: "success", payload: "Success!!" });
};

// async function connectMongo(){
//     try {
//         console.log("DB connected")
//         await mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority");
//     } catch (error) {
//         console.log(err);
//         process.exit();
//     }
// };

// connectMongo();
initialPassport();

app.set("views", `${__dirname}/views`);
app.engine("hbs", handlebars.engine(stencil));
app.set("view engine", "hbs");
app.use(morgan('dev'));
app.use(cookieParser("CoderS3cr3tC0d3")); //colocamos la inicialización de nuestro passport, la inicialización de passport y cookieParser también para que el servidor pueda reconocer correctamente las cookies. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({brotli: { enabled: true, zlib: {} } }));  //app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors(corsOptions)); //Si utilizamos unicamente cors(), quiere decir que cualquiera podra acceder al servidor. Pero al mandarle un objeto cors(corsOptions), este contiene la info de quien o quienes pueden acceder.
// app.use(addLogger); //Este es un middleware que contiene los loggers, el cual se ejecutara antes de los routers de abajo.
app.use("/", helloRouter);
app.use("/fork", forkRouter);
app.use("/cookie", cookieRouter);
app.use('/users', usersViewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/pets", petsRouter);
app.use("/api/extend/users", usersExtendRouter.getRouter());
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/email", emailRouter);
app.use("/api/users", usersRouter);
app.use("/api/session", sessionRouter);
app.use("/api/sms", smsRouter);
app.use("/api/whatsapp", whatsappRouter);
app.use("/api/performance", performanceRouter)
app.use("/compression", compressionRouter);
app.use("/logger", loggerRouter); //Al usar esta ruta, hay que COMENTAR los middlewares Logger 1 y Logger 2 para ver el resultado
app.get('/test', test);
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



// ****** Uso de Artillery (Ejecutar en consola) ****** 
//   --count: Especifica el número de usuarios virtuales que se crearán para hacer las peticiones
//   --num: Especifica el número de peticiones que realizará cada usuario
//   -o : Devuelve un formato json con los resultados del test.
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/sencilla" -o ./Ejercicio-43/data/resultadosSencilla.json`
// Artillery                     -->    `artillery quick --count 40 --num 50 "http://localhost:5500/api/performance/operation/complex" -o ./Ejercicio-43/data/resultadosComplex.json`
// Ejecucion de script .yml      -->    `artillery run ./Ejercicio-43/src/config.yml --output ./Ejercicio-43/data/test01.json`
// Generacion de reporte .html   -->    `artillery report test01.json -o ./Ejercicio-43/data/resultUser.html` (opcional)