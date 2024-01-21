import { Router } from "express";
import {CartManager} from "../dao/mongoClassManager/CartManager.js";
import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
const routerCarts = Router();
const CartJSON = new CartManager();
const ProductJSON = new ProductManager();


routerCarts.get("/", async function(request, response){
    const allCarts = await CartJSON.getCart();
    response.json(allCarts)
});

//En el endpoint POST '/' del controller cart estas creando el cart como un objeto vacío. El formato correcto debe incluir una key "products" con un array vacío.
routerCarts.post("/", async function(request, response){
    try {
        const cart = {products: []}
        const createdCart = await CartJSON.addCart(cart);
        response.json({mesagge: createdCart});
    } 
    catch (error) {
        response.status(500).json({mesagge: "Server error"});
    }
});

routerCarts.get("/:id", function(request, response){
    const {id} = request.params;
    const getId = CartJSON.getCartById(id);
    if (!getId) {
        response.status(404).json({message: "Cart not found"});
    }else{
        response.status(200).json({message: "Cart found", getId});

        // const carrito = {
        //     id: id,
        //     products: getId.products
        // }
        // response.status(200).json({message: "Cart found", carrito});
    }
});

routerCarts.post("/:cid/products/:productId", async function(request, response){ //http://localhost:5500/api/carts/2/products/1
    const {cartId} = request.params;
    const {productId} = request.params;
    const getCartId = await CartJSON.getCartById(cartId);
    const getProductId = await ProductJSON.getProductById(productId);
    let cartIdProducts = getCartId?.products;

    if (!getCartId){
        response.status(404).json({message: "Not found cart id."});
    }else{
        if (!getProductId){
            response.status(404).json({message: "Not found product id."});
        }else{
            const verificarCartProduct = cartIdProducts.find(event => event.product === productId);
            if (verificarCartProduct === undefined){
                const newObject = {
                    product: productId,
                    quantity: 1
                }
                // cartIdProducts.push(getProductId, newObject);
                cartIdProducts.push(newObject);
                const updateCartProducts = await CartJSON.updateCartProductsId(cartId, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }else{
                const productsArrayPosition = cartIdProducts.findIndex(event => event.product === productId);
                cartIdProducts[productsArrayPosition].quantity += 1;

                const updateCartProducts = await CartJSON.updateCartProductsId(cartId, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }
        }
    }
});

export default routerCarts;