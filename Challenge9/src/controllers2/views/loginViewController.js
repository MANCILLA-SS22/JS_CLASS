import Route from "../../router/class.routes.js";
import {ProductManager} from '../../dao/mongoClassManager/ProductManager.js';
import {CartManager} from "../../dao/mongoClassManager/CartManager.js";
import { authToken, passportCall, authorization } from "../../utils.js";
import passport from 'passport';

const CartJSON = new CartManager();
const productManager = new ProductManager();

function logger(req, res, next){
    console.log("Has entrado a este middleware")
    if (req.cookies.jwtCookieToken){
        return res.redirect("/api/products");
    }else{
        next();
    }
}

function init(req, res, next){
    console.log("Has entrado a este middleware")
    if (!req.cookies.jwtCookieToken){
        return res.redirect("/login");
    }else{
        next();
    }
}

class LoginRegister extends Route {        
        init(){

        //Metodo 2: Usando JWT por Cookie
        this.get("/", ['PUBLIC'], init, passport.authenticate('jwt', { session: false }), async function(req, res){  //Colocamos session:false debido a que no ocupamos express-session para estos procesos.
            const allProducts = await productManager.getProducts();
            res.render('profile', {user: req.user, data: allProducts});
        });               

        this.get("/login", ['PUBLIC'], logger, function(req, res){
            res.render('login')
        });
        
        this.get("/register", ['PUBLIC'], function(req, res){
            res.render('register');
        });  
        
        this.get("/chat", ['USER'], function(req, res){
            try {
                res.render("chat");
            } catch (error) {
                res.status(500).send({ error: "Error consultando el chat", message: error });
            }
        });   

        this.get("/github/login", ['USER'], function(req, res){
            res.render("github-login");
        });
        
        this.get("/github/error", ['USER'], function(req, res){
            res.render("error", { error: "No se pudo autenticar usando GitHub!" });
        });     



        //Pendientes
        this.get('/api/carts', ['USER'], function(req, res){
            try {
                const cars = CartJSON.getCart();
                console.log(cars)
                res.status(200).render('carts', {cars});
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.get("/carts/:cid", ['USER'], async function(request, response){
            try {
                const {cid} = request.params;
                const getId = await CartJSON.getCartById(cid);
                
                console.log(getId)
                response.status(200).render("carts", getId);
            } catch (error) {
                response.status(500).json({message: {error}})
            }
        });
        
        this.get("/api/products/:id", ['USER'], async function(request, response){
            const {id} = request.params;
            try {
                const getById = await Product.getProductById(id);
                response.status(200).render('productInfo', getById); 
            } catch (error) {
                response.status(500).json({message: {error}})
            }
        });
        
        this.get("/api/products", ['USER'], async function(request, response){
            try {
                console.log(res)
                response.status(200).render('products', {res}); 
            } catch (error) {
                response.status(500).json({message: {error}})
            }
        });

        /* // Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
        this.get("/", ['PUBLIC'], authToken, async function(req, res){
            const allProducts = await productManager.getProducts();
            res.render('profile', {user: req.user, data: allProducts});
        });   

        // Metodo 3: Usando passport-JWT por Cookie mediante customCall
        this.get("/", ['PUBLIC'], passportCall('jwt'), async function(req, res){ 
            const allProducts = await productManager.getProducts();
            res.render('profile', {user: req.user, data: allProducts});
        });

        // Metodo 4authorization
        this.get("/", ['PUBLIC'], authorization('ADMIN'), async function(req, res){ 
            const allProducts = await productManager.getProducts();
            res.render('profile', {user: req.user, data: allProducts});
        });  */   
    }
}

export default LoginRegister;