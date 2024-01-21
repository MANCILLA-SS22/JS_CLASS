import express from "express";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";
import {PORT} from "./env.js";

const app = express();

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//Seccion de codigo para trabajar con el chat de websockets (referente a entregas pasadas)
/* import {app, express, httpServer} from "./socket/socketConfig.js";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";
import {PORT} from "./env.js";

// const httpServer = http.createServer(app); 

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig();
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */