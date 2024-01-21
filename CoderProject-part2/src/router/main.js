import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import {__dirname} from "../utils.js";
import {routerCarts} from "./controllerCarts.js";
import {routerProducts} from "./controllerProducts.js";
// import routerCartsFs from "./controllerCarts.fs.js";
// import routerProductsFs from "./controllerProducts.fs.js";
import controllerViews from "../router/controllerViews.js"
import realTimeProductsController from "../router/controllerRealProducts.js";

function routerMain(app){

    app.engine("hbs", handlebars.engine({// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
            extname: "hbs", //index.hbs
            defaultLayout: "main", //Plantilla principal
            handlebars: allowInsecurePrototypeAccess(Handlebars)
        })
    );

    app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
    app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
    // app.get("/", function(request, response){response.render("index", {title: "Ejercicio",name: "German",fileCss: "styles.css"})});
    // app.use("/api/fs/carts", routerCartsFs);
    // app.use("/api/fs/products", routerProductsFs);
    app.use(controllerViews);
    app.use("/api/carts", routerCarts);
    app.use("/api/products", routerProducts);    
    app.use("/realTimeProduct", realTimeProductsController);
}

export default routerMain;