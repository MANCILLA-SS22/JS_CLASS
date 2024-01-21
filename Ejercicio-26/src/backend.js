//Ejemplo 26: Socket.io
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import {__dirname} from "./utils.js"
import viewRouter from "./router/views.routes.js";

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


const users = [];

//Socket comunication
io.on('connection', function(socketClient){ //El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
    console.log("Nuevo cliente conectado");
    
    socketClient.on("message", function(data){ //Esta vez, una vez que el socket se ha conectado, podemos escuchar eventos de dicho socket, a partir de la sintaxis indicada: socket.on(“nombre_del_evento_a_escuchar”,callback con la data que me hayan enviado); Este “evento a escuchar” tiene un identificador que el cliente tiene que colocar de su lado para poder enviar información. Podemos tener múltiples socket.on, para tener así escuchar diferentes eventos.
        console.log(data);
        socketClient.emit("send_message", data);
    });
    
    socketClient.emit("server_message", "Mensaje desde el servidor"); //el carácter de un websocket debe ser bidireccional, eso significa que el servidor también debe poder enviar mensajes al cliente. 
    socketClient.emit("message_all",  "Mensaje para todos"); //Mensaje para todos incluyendo el sender

    socketClient.broadcast.emit("message_all_1", "Mensaje a todos los sockets, sin incluir al sender"); //broadcast va a enviar algo a todos los que esten conectados, menos al ultimo que se conecta o al sender
    // socketClient.broadcast.emit("message_all_2",  `${socketClient.id} Conectado`); //Esto se puede ver mejor si lo probamos entrando a localhost desde otro navegador 

    socketClient.on("form_message", function(data){
        console.log(data);
        users.push(data);
        socketClient.emit("users_list", users);
    });

    socketClient.emit("users_list", users);
});