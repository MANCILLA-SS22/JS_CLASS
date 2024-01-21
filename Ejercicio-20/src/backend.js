//Ejemplo 20: Tipos de Middleware
import express from "express";
import { Router } from "express";
const router = express.Router();
const app = express();
const PORT = 5500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware de nivel de aplicación
function logger(req, res, next) {
    console.log("Servidor recibe peticion");
    next();
}

app.use(logger);

// //Middleware de nivel de endpoint
function middleware(request, response, next){
    const { code, productName } = req.body;

    if (!code || code === "") {
        return res.json({
            error: "Esta el campo code vacio",
        });
    }

    next();
}

app.get("/", middleware, function(request, response){ //Ejecutamos primero la ruta "/", despues se ejecuta la funcion middleware y, si todo sale bien, se ejecuta la funcion next, y pasamos al siguiente middleware. En este caso, al no haber, simplemente pasa al la funcion.
    response.json({
        mensaje: "Bienvenido",
    });
});

// //Middleware de nivel del Router
// function logger(req, res, next) {
//     console.log("Servidor recibe peticion");
//     next();
// }

// router.use(logger);

// //Middleware de manejo de errores
// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));