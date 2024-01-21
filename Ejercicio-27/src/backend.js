//Ejemplo 27: Servidor con Websockets (after class)
// ✓ Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde al introducir texto, el mensaje se vea reflejado en todos 
//   los clientes conectados en un párrafo por debajo del input. El texto debe ser enviado caracter a caracter y debe reemplazar el mensaje previo.
// ✓ Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento 
//   de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un arrayde objetos, donde cada objeto tendrá la siguiente estructura:
//                                  { socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

// - Cada cliente que se conecte recibirá la lista de mensajes completa.
// - Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
// - Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.

import express from "express";
import { Server } from "socket.io";
import routerMain from "./src/router/main.js";
import { ManagerPost } from "./src/utils/ManagerPost.js";

const app = express();
const PORT = 5500;

routerMain(app); 

const manager = new ManagerPost("./data/post.json");
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket


io.on("connection", function(socket){
    console.log("Nuevo cliente conectado");

    socket.on("post_send", async function(data){
        try {
            await manager.savePost(data);
            socket.emit("posts", manager.getPosts());
        } catch (error) {
            console.log(error);
        }
    });

    socket.emit("posts", manager.getPosts());

});