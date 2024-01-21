import { Router } from "express";
import ProductManager from "../classManagers/ProductManager.js";

const router = Router();
const Product = new ProductManager("./data/products.json");

router.get("/api/products", function(request, response){
    const data = Product.getProducts();
    response.render("home", {title: "Form example",fileCss: "styles.css", data});
});

router.get("/realTimeProduct", function(request, response){
    response.render("realTimeProducts", {title: "Form example",fileCss: "styles.css"})
});

export default router;