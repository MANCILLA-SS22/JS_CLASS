import { Router } from "express";
import ProductManager from "../classManagers/ProductManager.js";

const routerProducts = Router();
const Product = new ProductManager("./data/products.json");

routerProducts.get("/", async function(request, response){
    const allProducts = await Product.getProducts();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(allProducts).slice(0, limit)) : response.json(allProducts);
});

routerProducts.get("/:id", async function(request, response){
    const {id} = request.params;
    const allProducts = await Product.getProducts();

    const maxValue = Object.values(allProducts).length;
    if (+id < +maxValue && +id > 0) {
        const getProductId = Product.getProductById(+id);
        response.status(200).json({message: getProductId});
    } else {
        response.status(404).json({message: "User not found"});
    }
});

routerProducts.post("/", async function(request, response){
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status
    }

    // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
    const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status");
    if (parametersExist) {
        const crearProducto = await Product.addProduct(nuevoProducto);

        if(crearProducto?.error) {
            response.status(409).json({error: crearProducto.error})
            return;
        }

        response.status(200).json({message: crearProducto});
    }else{
        response.status(404).json({message: "Not enough information."});
    }
});

routerProducts.put("/:id", async function(request, response){
    const {id} = request.params;
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status
    }

    const verificarId = Product.getProductById(+id);
    if(!verificarId){
        response.status(404).json({message: "Not found id."});
    }else{
        const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
        if (verifyExistenceUndefined === -1) {
            const actualizarProducto = await Product.updateProduct(+id, nuevoProducto);
            response.status(200).json({message: actualizarProducto});
        }else{
            response.status(404).json({message: "Not enough information."});
        }
    }
});

routerProducts.delete("/:id", async function(request, response){
    const {id} = request.params;
    const deleteProduct = await Product.deleteProduct(+id);
    console.log("Array actualizado", deleteProduct);

    if(deleteProduct === "0"){
        response.status(404).json("res 1");
    }
    else{
        response.status(200).json({"Message": deleteProduct});
    }
});

export default routerProducts;
