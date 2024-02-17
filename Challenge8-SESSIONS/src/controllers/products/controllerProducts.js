import { Router } from "express";
import {ProductManager} from "../../dao/mongoClassManager/ProductManager.js";
const ProductJSON = new ProductManager();
const routerProducts = Router();

let res; 

routerProducts.get("/", async function(request, response){
    try {
        // Copiar y pegar en barra de navegacion --> http://localhost:5500/api/products?page=1&limit=3&sort=asc&stock=1&category=New
        const {category, stock, limit, page, sort} = request.query;
        let numLimit, numPage, filter, numSort, prevSort, nextLink, prevLink;
        let link = request.protocol+"://"+request.get("host")+'/api/products/'; //Obtenemos el link original
        // let linkProducts = request.protocol+"://"+request.get("host")+'/products/'; //Obtenemos el link original
        let linkProducts = '/products/'; //Obtenemos el link original (No hace falta agregar el path completo si el recurso se encuentra dentro del mismo dominio)

        if(category == undefined && stock == undefined){
            filter = {};
        }else if(category == undefined && stock != undefined){
            filter = { stock: {$gte: stock} };
        }else if(category != undefined && stock == undefined){
            filter = { category: {$regex: category} };
        }else{
            filter = { 
                category: {$regex: category},  //$regex --> Selects documents where values match a specified regular expression.
                stock: {$gte: stock}           //$gte --> Matches values that are greater than or equal to a specified value.
            };
        }

        if (page === undefined) {
            numPage = 1;
        } else {
            numPage = page;
        }

        if (limit === undefined) {
            numLimit = 10;
        } else {
            numLimit = limit;
        }

        // page == undefined ? numPage = 1 : numPage = page;
        // limit == undefined ? numLimit = 5 : numLimit = limit;

        if(sort == "asc"){
            prevSort = "asc";
            numSort = 1;
        }else if(sort == "desc"){
            prevSort = "desc";
            numSort = -1;
        }else{
            numSort = undefined;
        }        

        let conditionalQuery = {
            page: numPage,
            limit: numLimit,
            numSort: { /* category: numSort,  */price: numSort}
        };

        const products = await ProductJSON.getProductsNew(filter, conditionalQuery); // Model.paginate([filter], [options], [callback])
        products.hasPrevPage == false ? prevLink = null : prevLink = request.protocol+"://"+request.get("host")+'/api/products'+ "?"+ `page=${products.prevPage}`+ `&limit=${limit}&sort=${prevSort}`;
        products.hasNextPage == false ? nextLink = null : nextLink = request.protocol+"://"+request.get("host")+'/api/products'+ "?"+ `page=${products.nextPage}`+ `&limit=${limit}&sort=${prevSort}`;

        res = {
            status: "success",                 //success/error
            payload: products.docs,            //Resultado de los productos solicitados
            totalPages: products.totalPages,   //Total de páginas
            prevPage: products.prevPage,       //Página anterior
            nextPage: products.hasNextPage,    //Página siguiente
            page: products.page,               //Página actual
            hasPrevPage: products.hasPrevPage, //Indicador para saber si la página previa existe
            hasNextPage: products.hasNextPage, //Indicador para saber si la página siguiente existe.
            prevLink: prevLink,                //Link directo a la página previa (null si hasPrevPage=false)   
            nextLink: nextLink,                //Link directo a la página siguiente (null si hasNextPage=false)
            link: link,
            linkProducts: linkProducts
        };


        // response.status(200).json(res.payload); 
        response.status(200).render('products',{res}); 

        // const allProducts = await ProductJSON.getProducts();    
        // response.json(allProducts);

    } catch (error) {
        response.status(404).json({ mesagge: { error } });
    } 

});

routerProducts.get("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const getById = await ProductJSON.getProductById(id);
        response.status(200).json({getById, message: "User found"});
    } catch (error) {
        response.status(404).json({message: "User NOT found", error});
    }
    
});

routerProducts.post("/", async function(request, response){
    const {title, description, price, thumbnail, code, stock, status, category} = request.body;
    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}

    // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
    const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status") && nuevoProducto.hasOwnProperty("category");
    if (parametersExist) {
        const crearProducto = await ProductJSON.addProduct(nuevoProducto);
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

routerProducts.put("/:pid", async function(request, response){
    const {pid} = request.params;
    const {title, description, price, thumbnail, code, stock, status, category} = request.body;
    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}

    const verificarId = ProductJSON.getProductById(pid);
    if(!verificarId){
        response.status(404).json({message: "Not found id."});
    }else{
        const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
        if (verifyExistenceUndefined == -1) {
            const actualizarProducto = await ProductJSON.updateProduct(pid, nuevoProducto);
            response.status(200).json({message: actualizarProducto});
        }else{
            response.status(404).json({message: "Not enough information."});
        }
    }
});

routerProducts.delete("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const verificarId = await ProductJSON.getProductById(id);
        if(!verificarId){
            response.status(404).json({message: "Not found id."});
        }else{
            const eliminarProducto = await ProductJSON.deleteProduct(id);
            response.status(200).json({message: eliminarProducto});
        }
    } catch (error) {
        response.status(404).json({message: "Not found id.", error});
    }
});

// export default routerProducts;
export {routerProducts, res};