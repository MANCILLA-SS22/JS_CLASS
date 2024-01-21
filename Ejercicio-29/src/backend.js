//Ejemplo 29: Aplicación chat con websocket
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

app.set("views", `${__dirname}/view`);
app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
app.use("/", viewRouter); // Routes


const userIo = io.of("/")
userIo.on("send-message", function(socket){
    console.log("Connected to user namespace"+ socket.username);
});

userIo.use(function(socket, next){
    if(socket.handshake.auth.token){
        socket.username = getUsernameFromToken(socket.handshake.auth.token);
        next();
    }else{
        next(new Error("Please send token"));
    }
});

function getUsernameFromToken(token){
    return token;
}


io.on("connection", function(socket){  console.log(socket.id);
    socket.on("send-message", function (message, room){
        if(room === ""){
            socket.broadcast.emit("receive-message", message);
        }
        else{
            socket.to(room).emit("receive-messag", message);
        }

        socket.on("join-room", function(room, res){
            socket.join(room);
            res(`Joined ${room}`);
        });
    });
    socket.on("ping", n => console.log(n));
});