import { Router } from 'express';
import { ProductManager } from '../../dao/mongoClassManager/ProductManager.js';
import { authToken, passportCall, authorization } from "../../utils.js";
import passport from 'passport';

const router = Router();
const productManager = new ProductManager();

function logger(req, res, next){
    console.log("req.session.user", req.session.user)
    if (req.session.user){
        return res.redirect("/api/products");
    }else{
        next();
    }
}

router.get("/login", logger, function(req, res){
    res.render('login')
});

router.get("/register", logger, function(req, res){
    res.render('register')
});

router.get("/home", logger, async function(req, res){ //Este se usa con sessions
    try {
        const allProducts = await productManager.getProducts();
        res.render('profile', {fileCss: "styles.css", data: allProducts, user: req.session.user});
    } catch (error) {
        res.status(500).json({message: {error}})
    }    
});

export default router;