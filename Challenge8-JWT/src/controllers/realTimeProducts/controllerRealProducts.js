import { Router } from "express";
const router = Router();

// router.get("/", function(request, response){
//     response.render("realTimeProducts", {title: "Form example",fileCss: "styles.css"})
// });

router.post("/res", (request, response) => {
    const {title, description, price, thumbnail, code, stock} = request.body;
    const product = [];
    product.push({title, description, price, thumbnail, code, stock});
});

export default router;


/* 
import { Router } from "express";
import ProductManager from "../classManagers/ProductManager.js";

const router = Router();
const Product = new ProductManager("src/data/products.json");


router.get("/", function(request, response){
    const allProducts = Product.getProducts();
    global.io.emit("productList", allProducts);
    response.render("realTimeProducts", {allProducts});
});

export default router; 
*/