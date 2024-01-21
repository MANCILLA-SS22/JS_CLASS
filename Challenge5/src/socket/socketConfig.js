import express from "express";
import { Server } from "socket.io";
import http from "http"
import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
import { ChatManager } from "../dao/mongoClassManager/ChatManager.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);  

const Product = new ProductManager(); //Persistencia de archivos: El almacenamiento persistente se refiere a la retención de datos de forma no volátil, de modo que sigan estando disponibles incluso después de que un dispositivo o aplicación se apague o reinicie
const getProducts = Product.getProducts();

const Chat = new ChatManager();

io.on('connection', async function (socket) {
	socket.emit('product_list', await getProducts); // Se envian los products al momento que se conecta un cliente
	socket.on('product_form', async function (data) {
		Product.addProduct(data);
		io.emit('product_list', await getProducts); // Utiliza io.emit para enviar los productos actualizados a todos los clientes.
	});



    socket.on("inicio", async function(data){ //2. Recivimos el nombre
        socket.broadcast.emit("connected", data); //3. Lo enviamos a todos los usuarios menos al ultimo
		// const messages = await Chat.getMessages();
        // io.emit("messagesLogs", messages);
    });
    
    socket.on("message", async function(data){//7. Recivimos el mensaje que se capturo en el imput
        Chat.saveMessages(data);
        const messages = await Chat.getMessages();
        io.emit("messagesLogs", [data]); //8. lo enviamos a todo los demas. (Esto es para indicar que se envia a todos y no solo a uno o a todos menos el ultimo, como con broadcast)
    });
    
    // socket.emit("messages", async function(data){
	// 	return await Chat.getMessages(data);
	// });//Al cargar la pagina, se envia un array vacio. Cuando un usuario nuevo entre o cuando uno actualice el navegador, podra ver el array de mensajes. De lo contrario, aparecera en blanco.
});

export {app, express, httpServer, io};