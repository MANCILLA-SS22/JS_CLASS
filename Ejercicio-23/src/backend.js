//Ejemplo 23: Servidor basado en Node.JS y express de un carrito de compras
import express from "express";
import routerMain from "./router/main.js";

const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerMain(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


// - Paso 1: Debemos crear los produtos que se encuentran en ProductManager. En este archivo hasta el final se encuentran los objetos que serviran 
// para copiar y pegar en postman y asi crear los productos en un archivo products.json
// - Paso 2: El siguiente metodo es crear el o los carritos deseados, los cuales contendran un arreglo "products" vacio y un id. Es importante crearlos
// antes de introducir los productos al carrito o de lo contrario obtendremos un error.
// - Paso 3: Finalmente podemos agregar elementos al arreglo products en el archivo carts.json.