import { Router } from 'express';
import { ProductManager } from '../dao/mongoClassManager/ProductManager.js';

const router = Router();
const Product = new ProductManager();

function logger(req, res, next){
    if (req.session.user){
        return res.redirect("/api/products");
    }/* else if(!req.session.user){
        return res.status(404).send("Not found");
    } */else{
        next();
    }
}

router.get("/login", logger, function(req, res){
    res.render('login')
});

router.get("/register", logger, function(req, res){
    res.render('register')
});

router.get("/", logger, async function(req, res){
    try {

        const allProducts = await Product.getProducts();
        res.render('profile', {fileCss: "styles.css", data: allProducts, user: req.session.user});
    } catch (error) {
        response.status(500).json({message: {error}})
    }    
});

export default router;