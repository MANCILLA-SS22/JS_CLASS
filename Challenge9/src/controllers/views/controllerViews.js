import { Router } from "express";
import {ProductManager} from "../../dao/mongoClassManager/ProductManager.js";
import {CartManager} from "../../dao/mongoClassManager/CartManager.js";
// import { res } from "./controllerProducts.js";
const router = Router();

const Product = new ProductManager();
const CartJSON = new CartManager();
const allProducts = Product.getProducts();



router.get("/carts/:cid", async function(request, response){
    try {
        const {cid} = request.params;
        const getId = await CartJSON.getCartById(cid);
        
        console.log(getId)
        response.status(200).render("carts", getId);
    } catch (error) {
        response.status(500).json({message: {error}})
    }
});

router.get("/realTimeProduct", function(request, response){
    response.render("realTimeProducts", {title: "Form example",fileCss: "styles.css", allProducts})
});

router.get("/github/login", function(req, res){
    res.render("github-login");
});

router.get("/github/error", function(req, res){
    res.render("error", { error: "No se pudo autenticar usando GitHub!" });
});

// router.get("/api/products/:id", async function(request, response){
//     const {id} = request.params;
//     try {
//         const getById = await Product.getProductById(id);
//         response.status(200).render('productInfo', getById); 
//     } catch (error) {
//         response.status(500).json({message: {error}})
//     }
// });

// router.get("/api/products", async function(request, response){
//     try {
//         console.log(res)
//         response.status(200).render('products', {res}); 
//     } catch (error) {
//         response.status(500).json({message: {error}})
//     }
// });


export default router;