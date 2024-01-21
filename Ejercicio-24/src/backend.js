//Ejemplo 24: Handlebars
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./router/views.routes.js";

const app = express();
const PORT = 5500;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos el engine
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
}));

// Seteamos nuestro motor.     //View engines allow us to render web pages using template files. These templates are filled with actual data and served to the client.
app.set("view engine", "hbs"); //Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo. 
app.set("views", `${__dirname}/view`); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.

// Public
app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/", viewRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));