//Ejemplo 43: Uso de passport avanzado
// Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo
// ✓ No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!
// ✓ Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.

// Crear un router para manejo de mascotas en una ruta base ‘/api/pets’, éste gestionará diferentes mascotas en un arreglo como persistencia. Posteriormente, desarrollar los siguientes endpoints:
// ✓ POST (‘/’): deberá insertar una nueva mascota. El formato de cada mascota será {name:String, specie: String}
// ✓ GET(‘/:pet’): Deberá traer la mascota con el nombre indicado. Utilizar una expresión regular para que sólo se puedan recibir letras e incluso espacios (recuerda cómo se lee un espacio a nivel URL). No debe permitir números.
// ✓ PUT (‘/:pet’): Deberá traer la mascota y añadirle un campo “adopted:true” a dicha mascota en caso de existir.
// ✓ Generar además un router.param que permita acceder de manera directa a la mascota, colocándola en req.pet

//Se creará un middleware que, en cada momento, valide el acceso a partir de las políticas (Sólo PUBLIC, USER, ADMIN).
// ✓ Definir una función handlePolicies,
// ✓ El método deberá recibir un arreglo de políticas (strings) y seguir los siguientes pasos:
//     ○ Si la única política es “PUBLIC”, continuar sin problema.
//     ○ para el resto de casos, primero procesar el token de jwt, el cual llegará desde los headers de autorización.
//     ○ Posteriormente, validar el rol del usuario que esté dentro del token para corroborar si se encuentra dentro de las políticas
// ✓ Cada método get, post, put, delete deberá recibir antes de los callbacks, un arreglo de políticas.
// ✓ Colocar handlePolicies como el primer middleware del procesamiento.
// ✓ Crear un router session que cuente con un endpoint ‘/login’, el cual guardará al usuario en un token (no es necesario un registro, todo es hardcodeado para agilizar el proceso de políticas)
// ✓ En el router de usuario que ya existe, crear un endpoint que utilice las políticas de usuario, y otro que utilice sólo políticas públicas.
// ✓ Validar políticas con Postman.
// CONSIDERACIONES:
// 1. Recordar agregar app.use(express.json()); para el login
// 2. Recordar agregar a los headers de autorización el Bearer token en Postman.
// 3. Enviar el jwt por medio de body para este caso
// 4. Hardcodear el rol del cliente en “user”.

import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import cookieParser from 'cookie-parser';
import passport from "passport";

import {__dirname} from "./utils.js"
import { initialPassport } from "./config/passport.config.js";
import viewRouter from "./router/views.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import jwtRouter from "./router/jwt.routes.js";
import petsRouter from "./router/pets.routes.js";
import UsersExtendRouter from "./router/custom/users.extend.routes.js";

const app = express();
const usersExtendRouter = new UsersExtendRouter();

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
app.use("/api/pets", petsRouter);
app.use("/api/extend/users", usersExtendRouter.getRouter());

app.listen(5500, () => console.log(`Server listening on port ${5500}`));

// stateless = es cuando yo no utlizo sesiones. la sesion la guarda el navegador o el cliente, NO la base de datos