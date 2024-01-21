//Ejemplo 25: Handlebars con express
// Realizar un formulario en una nueva plantilla.
// ✓ Se creará un archivo “register.handlebars” como nueva plantilla, donde se colocará un form
// ✓ Dicho form debe servir para registrar un usuario, por lo que contará con nombre, correo, y contraseña
// ✓ Enviar los datos a una ruta POST ‘/user’, y guardar el usuario en un arreglo. Confirmar que el guardado se realice exitosamente.
// ✓ Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla. 

import express from "express";
import handlebars from "express-handlebars";
import {__dirname} from "./utils.js"
import viewRouter from "./router/views.routes.js";

const app = express();
const PORT = 5500;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
app.engine("hbs", handlebars.engine({
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);

app.set("views", `${__dirname}/view`); //Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter);// Routes

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));