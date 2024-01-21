//Ejemplo 22: Express + multer
// Basado en el formulario para ingresar una mascota al sistema:
// ✓ Configurar el formulario para añadir un campo input type=”file” name “file” para que la mascota a agregar pueda tener una “imagen representativa”.
// ✓ El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip.
// ✓ Corroborar que la imagen se guarde correctamente. Guardar la ruta del archivo guardado en un campo “thumbnail”.

import express from "express";
import router from "./router/postRoutes.js";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = 5500;

function appGet1(req, res){
    res.json({
        message: "Bienvenido",
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", appGet1);
app.use(logger);
app.use("/api/posts/", router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));