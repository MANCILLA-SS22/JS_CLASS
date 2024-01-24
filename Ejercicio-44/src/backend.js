//Ejemplo 43: Uso de passport avanzado
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
app.use(cookieParser("CoderS3cr3tC0d3"));
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

app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/api/jwt", jwtRouter);

app.listen(5500, () => console.log(`Server listening on port ${5500}`));