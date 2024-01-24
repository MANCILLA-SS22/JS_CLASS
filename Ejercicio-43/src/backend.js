//Ejemplo 43: Uso de passport avanzado
// Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo
// ✓ No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!
// ✓ Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import cookieParser from 'cookie-parser';
import passport from "passport";

import {__dirname} from "./utils.js"
import viewRouter from "./router/views.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import jwtRouter from "./router/jwt.routes.js";
import { initialPassport } from "./config/passport.config.js";

const app = express();

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority");
    } catch (error) {
        console.log(err);
        process.exit();
    }
}
connectMongo();

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

app.use(cookieParser("CoderS3cr3tC0d3")); //colocamos la inicialización de nuestro passport, la inicialización de passport y cookieParser también para que el servidor pueda reconocer correctamente las cookies. 
initialPassport();
app.use(passport.initialize());

app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/api/jwt", jwtRouter);

app.listen(5500, () => console.log(`Server listening on port ${5500}`));