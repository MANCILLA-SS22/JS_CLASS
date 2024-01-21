import { Router } from "express";
const routerProducts = Router();

import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
const ProductJSON = new ProductManager();

routerProducts.get("/", async function(request, response){
    const allProducts = await ProductJSON.getProducts();
    response.json(allProducts)
});

routerProducts.get("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const getById = await Product.getProductById(id);
        response.status(200).json({getById, message: "User found"});
    } catch (error) {
        response.status(404).json({message: "User NOT found", error});
    }
    
});

routerProducts.post("/", async function(request, response){
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {title: title,description: description,price: price,thumbnail: thumbnail,code: code,stock: stock,status: status}

    // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
    const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status");
    if (parametersExist) {
        const crearProducto = await Product.addProduct(nuevoProducto);
        // const allProducts = await Product.addProduct();

        if(crearProducto?.error) {
            response.status(409).json({error: crearProducto.error})
            return;
        }
        response.status(200).json({message: {crearProducto}});
    
    }else{
        response.status(404).json({message: "Not enough information."});
    }
});

routerProducts.put("/:id", async function(request, response){
    const {id} = request.params;
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {title: title,description: description,price: price,thumbnail: thumbnail,code: code,stock: stock,status: status}

    const verificarId = Product.getProductById(id);
    if(!verificarId){
        response.status(404).json({message: "Not found id."});
    }else{
        const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
        if (verifyExistenceUndefined === -1) {
            const actualizarProducto = await Product.updateProduct(id, nuevoProducto);
            response.status(200).json({message: actualizarProducto});
        }else{
            response.status(404).json({message: "Not enough information."});
        }
    }
});

routerProducts.delete("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const verificarId = await Product.getProductById(id);
        if(!verificarId){
            response.status(404).json({message: "Not found id."});
        }else{
            const eliminarProducto = await Product.deleteProduct(id);
            response.status(200).json({message: eliminarProducto});
        }
    } catch (error) {
        response.status(404).json({message: "id NOT found", error});
    }
});

export default routerProducts;