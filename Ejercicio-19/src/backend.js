//Ejepmlo 19: Carpeta public
// ✓ El router de users debe tener la ruta principal /api/users
// ✓ El router de pets debe tener la ruta principal /api/pets
// ✓ Ambos deben tener, de manera interna, un array para almacenarlos.
// ✓ Ambos deben contar con un método get en su ruta raíz para poder obtener el arreglo.
// ✓ Ambos deben contar con un método POST en su ruta raíz para poder agregar un usuario omascota según sea el router.
// ✓ Conectar los routers al archivo app.js para tener listo el apuntador al router.
// ✓ Probar funcionalidad con Postman.
// ✓ recrear la estructura con un index.html para poder visualizarse en la ruta raíz.
// ✓ En este archivo deberá haber un formulario donde podremos ingresar una mascota a partir del método POST. Dicho POST conectará al endpoint raíz del router pets
// ✓ Configurar el router pets para que pueda recibir el json por parte del formulario (recordar express.json() y express.urlencoded({extended:true}))
// ✓ Verificar con POSTMAN que la información llegue al servidor y se guarde correctamente.

import express from "express";
import petsRouter from "./src/router/pets.router.js";
import userRouter from "./src/router/users.router.js";
const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("src/public/")); // Si no se quiere usar POSTMAN, usar el siguiente link --> http://localhost:5500/static/html/indexLayout.html

app.use("/api/pets", petsRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));