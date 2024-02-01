// Utilizando argumentos con dotenv
// ✓ Realizar un servidor basado en node js con express, El cual reciba por flag de cli el comando --mode <modo> y sea procesado por commander.
// ✓ Acorde con este argumento, hacer una lectura a los diferentes entornos, y ejecutar dotenv en el path correspondiente a cada modo (--mode development debería conectar con .env.development).
// ✓ Para el entorno development, el servidor debe escuchar en el puerto 8080, para el entorno productivo, el servidor debe escuchar en el puerto 3000. 

// Ejemplo en vivo
// ✓ Se creará una función llamada “listNumbers” el cual recibirá un número indefinido de argumentos (...numbers)
// ✓ Si se pasa un argumento no numérico, entonces deberá mostrar por consola un error indicando “Invalid parameters” seguido de una lista con los tipos de dato (para [1,2,”a”,true], el error mostrará [number,number,string,boolean]
// ✓ Escapar del proceso con un código -4. Utilizando un listener, obtener el código de escape del error y mostrar un mensaje “Proceso finalizado por argumentación inválida en una función”


import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import {__dirname} from "./utils.js"
import {config} from './config/config.js';
import viewsRouter from './routes/views.router.js';

import program from './process.js';

const app = express();

// console.log(process);
// console.log(process.argv); // npm run start
// console.log(process.argv.slice(2)); // --> ["hello", "world"]
const SERVER_PORT = config.port;
const URL = config.urlMongo;

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect(URL);
    } catch (error) {
        console.log("error");
        process.exit();
    }
}
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);
app.set("view engine", "hbs");


app.use("/", viewsRouter);

app.listen(SERVER_PORT, function(){
    console.log(`Server listening on port ${SERVER_PORT}`)

    // 2do - Listeners
    // process.exit(5);

    // Esta exception no fue capturada, o controlada.
    // Exception no capturada: TypeError: console is not a function
    // console();
});