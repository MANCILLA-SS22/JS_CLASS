//Ejemplo 28: Aplicación chat con websocket
// Nuestro chat comunitario contará con:
// ✓ Una vista que cuente con un formulario para poder identificarse. El usuario podrá elegir el nombre de usuario con el cual aparecerá en el chat.
// ✓ Un cuadro de input sobre el cual el usuario podrá escribir el mensaje.
// ✓ Un panel donde todos los usuarios conectados podrán visualizar los mensajes en tiempo real
// ✓ Una vez desarrollada esta aplicación, subiremos nuestro código a glitch.com, para que todos puedan utilizarlo
// ✓ Cuando el usuario se autentique correctamente, el servidor le mande los logs de todo el chat.
// ✓ Cuando el usuario se autentique correctamente, todos los demás usuarios (menos el que se acaba de registrar) reciban una notificación indicando qué usuario se acaba de conectar. (utiliza Swal toast).

import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./router/views.routes.js";
import { Server } from "socket.io";

const app = express();
const PORT = 5500;
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
app.engine("hbs", handlebars.engine({ 
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);

app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter); // Routes

//Socket comunication
const messages = [];
io.on('connection', function(socket){//El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 

    socket.on("inicio", function(data){ //2. Recivimos el nombre
        socket.broadcast.emit("connected", data); //3. Lo enviamos a todos los usuarios menos al ultimo
    })

    socket.on("message", function(data){//7. Recivimos el mensaje que se capturo en el imput
        messages.push(data);
        io.emit("messages", messages); //8. lo enviamos a todo los demas. (Esto es para indicar que se envia a todos y no solo a uno o a todos menos el ultimo, como con broadcast)
    });

    socket.emit("messages", messages);//Al cargar la pagina, se envia un array vacio. Cuando un usuario nuevo entre o cuando uno actualice el navegador, podra ver el array de mensajes. De lo contrario, aparecera en blanco.
});