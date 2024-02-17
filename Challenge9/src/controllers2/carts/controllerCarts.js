import {CartManager} from "../../dao/mongoClassManager/CartManager.js";
import {ProductManager} from "../../dao/mongoClassManager/ProductManager.js";
import Route from "../../router/class.routes.js"

const CartJSON = new CartManager();
const ProductJSON = new ProductManager();

function logger(req, res, next){
    if (!req.cookies.jwtCookieToken){
        // return res.redirect("/login");
        return res.send("No estas registrado!!");
    }else{
        next();
    }
}

class CartRouter extends Route{
    init(){
        this.get("/", ['PUBLIC'], logger, async function(req, res){
            const allCarts = await CartJSON.getCart();
            res.sendSuccess(allCarts);
        });

        this.post("/", ['PUBLIC'], logger, async function(request, response){ //En el endpoint POST '/' del controller cart estas creando el cart como un objeto vacío. El formato correcto debe incluir una key "products" con un array vacío.
            try {
                const cart = {product: []}
                const createdCart = await CartJSON.addCart(cart);
                response.json({mesagge: createdCart});
            } 
            catch (error) {
                response.status(500).json({mesagge: "Server error"});
            }
        });

        this.get("/:id", ['PUBLIC'], logger, async function(request, response){
            const {id} = request.params;
            const getId = await CartJSON.getCartById(id);  console.log(getId)
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

        this.post("/:cid/products/:pid", ['PUBLIC'], logger, async function(request, response){ 
            const {cid} = request.params;
            const {pid} = request.params;
            const getCartId = await CartJSON.getCartById(cid);
            const getProductId = await ProductJSON.getProductById(pid);
            let cartIdProducts = getCartId?.products;
        
            if (!getCartId){
                response.status(404).json({message: "Not found cart id."});
            }else{
                if (!getProductId){
                    response.status(404).json({message: "Not found product id."});
                }else{
                    const verificarCartProduct = cartIdProducts.find((event) => event.product._id.toString() === pid);
                    if (verificarCartProduct === undefined){
                        const newObject = {
                            product: pid,
                            quantity: 1
                        }
                        // cartIdProducts.push(getProductId, newObject);
                        cartIdProducts.push(newObject);
                        const updateCartProducts = await CartJSON.updateCartProductsId(cid, cartIdProducts);
                        response.status(200).json(updateCartProducts);
                    }else{
                        const productsArrayPosition = cartIdProducts.findIndex(event => event.product.toString() === pid);
                        cartIdProducts[productsArrayPosition].quantity += 1;
        
                        const updateCartProducts = await CartJSON.updateCartProductsId(cid, cartIdProducts);
                        response.status(200).json(updateCartProducts);
                    }
                }
            }
        });

        this.delete("/:cid/products/:pid", ['PUBLIC'], logger, async function(requset, response){ //deberá eliminar del carrito el producto seleccionado.
            const {cid} = requset.params;
            const {pid} = requset.params;
            const getCartId = await CartJSON.getCartById(cid);
        
            const verify = getCartId.products.find(event => event.product._id.toString() === pid);
        
            if(verify){
                const productPosition = getCartId.products.findIndex(event => event.product._id.toString() === pid); //Buscamos la posicion del producto a eliminar
                getCartId.products.splice(productPosition, 1) //Una vez encontrado, eliminamos el producto (con la posicion obtenida)
                const newArray = getCartId.products;
                const deleteProduct = await CartJSON.deleteProductInCarById(cid, newArray);
                response.status(200).json({messaje: deleteProduct})
        
            }else{
                response.status(404).json({messaje: "Product not found"});
            }
        });

        this.put("/:cid", ['PUBLIC'], logger, async function(request, response){ //  deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
            const {products} = request.body;
            const {cid} = request.params;
            const getCartId = await CartJSON.updateOneCart(cid, products);
            response.json(200).status(getCartId);
        });
        
        this.put("/:cid/products/:pid", ['PUBLIC'], logger, async function(requset, response){ //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
            const {quantity} = requset.body;
            const {cid} = requset.params;
            const {pid} = requset.params;
            
            if (typeof quantity !== "number") return response.status(404).json({messaje: "Error"})
            
            const getCartId = await CartJSON.getCartById(cid);
            const verify = getCartId.products.find(event => event.product._id.toString() === pid);
            
            if(verify){
                let updateNumberOfProducts = await CartJSON.finder(cid);
                const arrayPosition = updateNumberOfProducts.products.findIndex(event => event.product._id.toString() === pid);
                updateNumberOfProducts.products[arrayPosition].quantity = quantity;
                const ans = await CartJSON.updateCartByProductsId(cid, updateNumberOfProducts);
                console.log("ans", ans)
                response.status(200).json({messaje: "Product quntity updated"});
            }else{
                let updateNumberOfProducts = await CartJSON.finder(cid);
                updateNumberOfProducts.products.push({product: pid, quantity: quantity});
                const ans = await CartJSON.updateCartByProductsId(cid, updateNumberOfProducts);
                console.log("ans", ans)
                response.status(200).json({messaje: "Product quntity updated"});
            }
        });
        
        this.delete("/:cid", ['PUBLIC'], logger, async function(requset, response){ //deberá eliminar todos los productos del carrito
            const {cid} = requset.params;
            const deleteProduct = await CartJSON.deleteProductsById(cid);
            response.status(200).json({messaje: deleteProduct});
        });
    }
}

export default CartRouter;