//Ejemplo 41: Login por formulario, autenticacion-autorizacion 
// Primer login por formulario
// ✓ Se deberá contar con una estructura de router para sessions en /api/sessions/ el cual contará con métodos para registrar a un usuario y para su respectivo login
// ✓ Se deberá contar además con un router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil.
// ✓ El formulario de registro insertará en la base de datos el usuario. El cual deberá contar con: first_name, last_name, email, age, password
// ✓ Se debe contar con el formulario de login el cual corroborará que el usuario exista en la base, y además genere un objeto user en req.session, indicando que puede utilizar la página.
// ✓ Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.
// ✓ En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.

// Reajustando autorización (Continuacion del Primer login por formulario)
// ✓ Cambiar la validación de rutas por middlewares de rutas públicas o privadas.
//     ○ Las rutas públicas deben regresar siempre a la pantalla de login en caso de que no se reconozca una session activa.
//     ○ Las rutas privadas deben regresar siempre a la pantalla de profile en caso de que haya una sesión activa en session.
// ✓ Realizar un botón “logout” en la vista de perfil, que permita destruir la sesión y redireccionar a la vista de login

// Restauración de contraseña (Autorizacion y Autenticacion)
// ✓ Un link desde la vista de login que diga “Restaurar contraseña”, el cual llevará a una nueva vista.
// ✓ Esta nueva vista de restauración solicitará dos campos: el correo electrónico y la nueva contraseña a cambiar.
// ✓ NO REQUERIREMOS VERIFICACIÓN DE CORREO, esto lo haremos más adelante, solo indicaremos el correo y se deberá sustituir el password.
// ✓ El nuevo password deberá estar Hasheado también.
// ✓ Reintentar el login y corroborar que el usuario se pueda loguear correctamente.

import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import morgan from "morgan";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import {__dirname} from "./utils.js"
import viewRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js"
import sessionsRouter from "./router/sessions.routes.js"

const app = express();
const MONGO_URL = "mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/?retryWrites=true&w=majority";

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect(MONGO_URL)
    } catch (error) {
        console.log(err);
        process.exit();
    }
}
connectMongo();

app.use(morgan('dev'));
app.use(session ({
    store: MongoStore.create({
        mongoUrl: MONGO_URL, 
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10*60,
    }),
    secret: "coder1234",
    resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
    saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/view`);
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "hbs");

app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(5500, () => console.log(`Server listening on port ${5500}`));