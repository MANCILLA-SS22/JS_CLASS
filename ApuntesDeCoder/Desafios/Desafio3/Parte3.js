// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos
// ✓ Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
// ✓ Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
// ✓ El servidor debe contar con los siguientes endpoints:
//   ○ ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual 
//     recibirá un límite de resultados.
//     - Si no se recibe query de límite, se devolverán todos los productos
//     - Si se recibe un límite, sólo devolver el número de productos solicitados
//   ○ ruta ‘/products/:id’, la cual debe recibir por req.params el id (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 

const { ProductManager } = require("./ProductManager.js");
const Product = new ProductManager("../Desafio3/products.json");
const express = require ("express");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended:true}));

app.get("/products", async function(request, response){
    const products = await Product.getProducts();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(products).slice(0, limit)) : response.json(products);
});

app.get("/products/:id_Param", async function(request, response){
    const allProducts = await Product.getProducts();
    const {id_Param} = request.params;

    //Metodo 1:
    // const findId = allProducts.find((user) => user.id === +id_product);
    // findId ? response.json(findId) : response.json({ error: "User not found" });

    //Metodo 2:
    const maxValue = Object.values(allProducts).length;
    if (+id_Param < +maxValue && +id_Param > 0) {
        const getProductId = Product.getProductById(+id_Param);
        console.log(getProductId)
        response.json(getProductId);
    } else {
        response.send(`<h1>Something went wrong!</h1>`)
        // response.json({ error: "User not found" });
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));