//Ejemplo 42: Uso de passport y jwt 
// Inicio de sesión con jwt --> A partir del servidor de express que estamos construyendo:
// ✓ Configurar la creación del token para que ésta solo tenga duración de 1 minuto.
// ✓ Crear tres vistas, vista base, vista de registro y vista de login. (puedes hacerlo sin motor de plantillas).
// ✓ Al cargar la página principal (‘/’), si existe una sesión iniciada, se mostrarán los datos del usuario en cuestión (obtenidos mediante una consulta con el token debidamente adjunto en el encabezado de la petición de datos). Caso contrario, se deberá cargar automáticamente la pantalla de login.
// ✓ Corroborar el envío del token al front para su futuro almacenamiento

import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import morgan from "morgan"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";

import { initialPassport } from "./config/passport.config.js";
import {__dirname} from "./utils.js"
import viewRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import sessionsRouter from "./router/sessions.routes.js";
import githubLoginViewRouter from "./router/github-login.views.routes.js";


const app = express();
const MONGO_URL = "mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority";

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
app.set("views", `${__dirname}/views`);
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "hbs");

initialPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/github", githubLoginViewRouter);


app.listen(5500, () => console.log(`Server listening on port ${5500}`));