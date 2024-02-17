import { Router } from 'express';
import { ProductManager } from '../../dao/mongoClassManager/ProductManager.js';
import { authToken, passportCall, authorization } from "../../utils.js";
import passport from 'passport';

const router = Router();
const productManager = new ProductManager();

function logger(req, res, next){
    console.log("req", req.cookies)
    if (req.cookies.jwtCookieToken){
        return res.redirect("/");
    }else{
        next();
    }
}

router.get("/login", logger, function(req, res){
    res.render('login')
});

router.get("/register", logger, function(req, res){
    res.render('register');
});

// Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
// router.get("/", authToken, function(req, res){
//     res.render('profile', {user: req.user});
// });

//Metodo 2: Usando JWT por Cookie
router.get("/", passport.authenticate('jwt', { session: false }), async function(req, res){  //Colocamos session:false debido a que no ocupamos express-session para estos procesos.
    const allProducts = await productManager.getProducts();
    res.render('profile', {user: req.user, data: allProducts});
});

//Metodo 3: Usando passport-JWT por Cookie mediante customCall
// router.get("/", passportCall('jwt'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });

// //Metodo 4
// router.get("/", authorization('admin'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });



export default router;