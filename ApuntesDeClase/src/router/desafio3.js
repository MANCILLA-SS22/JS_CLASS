import express from "express";
import handlebars from "express-handlebars";
import viewRouter from "./routerMain.js"
import postRouter from "./postRoutes.js"
import { __dirname } from "../../utils.js";
import { logger } from "../utils/logger.js";

function routerMain(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
            extname: "hbs", //index.hbs
            defaultLayout: "main", //Plantilla principal
        })
    );
    app.set("views", `${__dirname}/src/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
    app.set("view engine", "hbs");              //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
    app.use(express.static(`${__dirname}/src/public`)); // Public. Sentamos de manera estatica la carpeta public
    
    app.use(logger);
    app.use("/", viewRouter);
    app.use("/api/post/", postRouter);
}

export default routerMain;