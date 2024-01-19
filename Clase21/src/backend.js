import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import session from "express-session";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initialPassport } from "./config/passport.config.js";

import {__dirname} from "./utils.js"
import viewRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import sessionsRouter from "./router/sessions.routes.js"
import githubLoginViewRouter from "./router/github-login.views.routes.js"

const app = express();
const MONGO_URL = "";

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

initialPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/github", githubLoginViewRouter)

app.listen(5500, () => console.log(`Server listening on port ${5500}`));