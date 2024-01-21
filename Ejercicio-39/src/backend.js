//Ejemplo 39: Pagination
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import {__dirname} from "./utils.js"
import viewRouter from "./router/pagination.routes.js";

const app = express();

mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@clusterclase17.a7ymnvl.mongodb.net/Clase17-Aggregations?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch(err => console.log("Hubo un error", err));

app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewRouter);
app.listen(5500, () => console.log(`Server listening on port ${5500}`));