import routerProducts from "../products/controllerProducts.js";
import routerCarts from "../carts/controllerCarts.js";

function routerMain(app){

    app.get("/", function(request, response){
        response.send("<h1>Hello world from express!</h1>");
    });

    app.use("/api/products/", routerProducts);
    app.use("/api/carts", routerCarts);
}

export default routerMain;