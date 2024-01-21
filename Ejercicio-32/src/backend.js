//Ejemplo 32: Práctica integradora
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import Handlebars from "handlebars"; // Esto sirve para recorrer arrays en handlebars
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import {__dirname} from "./utils.js";

import viewsRoutes from "./router/views.routes.js";
import productRoutes from "./router/product.routes.js";

const app = express();

mongoose.connect("mongodb+srv://SoldadoSS22:coder1234@clase15coder.msx0xsz.mongodb.net/Clase15?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.engine("hbs", handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewsRoutes);
app.use("/api/products", productRoutes); // Routes
app.listen(5500, () => console.log(`Server listening on port ${5500}`));