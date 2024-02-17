import controllerViews from "../controllers2/views/controllerViews.js"
import RealTimeProductsController from "../controllers2/realTimeProducts/controllerRealProducts.js";

import RouterCarts from "../controllers2/carts/controllerCarts.js";
import RouterProducts from "../controllers2/products/controllerProducts.js";

import Login from "../controllers2/views/loginViewController.js";
import AuthController from "../controllers2/users/usersController.js";
import SessionsController from "../controllers2/sessions/sessionsController.js"

const realTimeProductsController = new RealTimeProductsController();
const routerCarts = new RouterCarts();
const routerProducts = new RouterProducts();
const login = new Login();
const authController = new AuthController();
const sessionsController = new SessionsController();

function routerMain(app){
    app.use(controllerViews);

    app.use("/realTimeProduct", realTimeProductsController.getRouter());
    
    app.use("/api/carts", routerCarts.getRouter());
    app.use("/api/products", routerProducts.getRouter());   
    
    app.use("/", login.getRouter());
    app.use("/api/auth", authController.getRouter());
    app.use("/api/sessions", sessionsController.getRouter());
}

export default routerMain;