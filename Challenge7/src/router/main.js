import {routerCarts} from "./controllerCarts.js";
import {routerProducts} from "./controllerProducts.js";

import routerCartsFs from "./controllerCarts.fs.js";
import routerProductsFs from "./controllerProducts.fs.js";

import controllerViews from "../router/controllerViews.js"
import realTimeProductsController from "../router/controllerRealProducts.js";

import cookieController from "./cookieController.js";
import usersViewRouter from "./usersViewRouter.js";
import usersController from "./usersController.js";
import githubLoginViewRouter from "./github-login.views.routes.js"

function routerMain(app){
    app.use(controllerViews);

    app.use("/api/fs/carts", routerCartsFs);
    app.use("/api/fs/products", routerProductsFs);    

    app.use("/api/carts", routerCarts);
    app.use("/api/products", routerProducts);    
    
    app.use("/cookie", cookieController);

    app.use('/users', usersViewRouter);
    app.use("/api/auth", usersController);
    app.use("/github", githubLoginViewRouter);

    app.use("/realTimeProduct", realTimeProductsController);
}

export default routerMain;