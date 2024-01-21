//Ejemplo 40: Cookies, Session & Storage
// Utilización de cookies: set, get, clear y firmar una cookie. (Con cookieParser)
// ✓ Setear una cookie
// ✓ Obtener una cookie
// ✓ Eliminar una cookie
// ✓ Firma de una cookie

// Inyectar cookies en frontend: Crear una única vista de frontend en nuestro servidor express, la cual contará con dos campos input y dos botones 
// ✓ El primer campo input deberá ser el nombre del cliente. 
// ✓ El segundo campo input deberá contener el correo electrónico 
// ✓ El botón getCookie debe enviar una petición de tipo GET para recibir la cookie, solo mostrar por consola la cookie. 
// ✓ El botón submit, deberá enviar una petición POST, la cual deberá crear una cookie con el formato {user:correoDelInput} 
// ✓ La cookie debe tener un tiempo de vida de 10 segundos. Corroborar que la cookie se borre después del tiempo indicado. 

// Sesiones de usuario en el server: Realizar un programa de backend que establezca sesiones de usuarios en el servidor.
// ✓ Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de “Te damos la bienvenida”.
// ✓ Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
// ✓ Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre, solo se almacenará la primera vez que el cliente visite el sitio. 

import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import session from "express-session"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

const app = express();
// const filestore = Filestore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("views", `${__dirname}/view`);
app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
app.use(session ({
    // store: new filestore({path: "./sessions", ttl: 15, retries: 0}),
    secret: "coder1234",
    resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
    saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
}));
app.use("/", viewRouter);

app.listen(5500, () => console.log(`Server listening on port ${5500}`));