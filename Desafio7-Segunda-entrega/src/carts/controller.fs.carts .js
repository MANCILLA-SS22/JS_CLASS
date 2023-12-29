const {Router} = require('express');

const router = Router();

const {CartManager} = require("../dao/fsClassManagers/cartsClass/cartManager");
const cartsJson = new CartManager('./src/dao/fsClassManagers/cartsClass/db/carts.json');

const {ProductManager} = require("../dao/fsClassManagers/productsClass/productManager");
const productsJson = new ProductManager('./src/dao/fsClassManagers/productsClass/db/products.json');


//Url ejemplos
//http://localhost:8080/api/carts
router.get('/', async (req, res) => {
    const getAll = await cartsJson.getCarts();
    if (req.query.limit) {
        res.json(Object.values(getAll).slice(0, req.query.limit));
    } else {
        res.json(getAll);
    }
});

//Url ejemplo post
//http://localhost:8080/api/carts
router.post('/', async (req, res) => {
    try {
        const createdCart = await cartsJson.addCart({});
        res.json({mesagge: createdCart});
    } 
    catch (error) {
        res.status(500).json({mesagge: "Server error"});
    }
        

});

//Url ejemplos
//http://localhost:8080/api/carts/1
router.get('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartsJson.getCartById(Number(cartId));
    if(getById === "Not Found"){
        res.status(404).json({mesagge: getById});
    }
    else{
        const mesagge = {
            Carrito: cartId,
            Elementos: getById.products
        }
        res.status(200).json({mesagge: mesagge});
            
    }
});

//Url ejemplos
//http://localhost:8080/api/carts/1/products/1
router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartsJson.getCartById(Number(cartId));
    const getProductById = await productsJson.getProductById(Number(productId));
    

    if(getCartById === "Not Found"){
        res.status(404).json({mesagge: getCartById});
    }
    else{
        
        if(getProductById === "Not Found"){
            res.status(404).json({mesagge: getProductById});
        }
        else{
            const verifyExistence = getCartById.products.find((e) => e.product === Number(productId));
            if (verifyExistence === undefined) {
                const newArray = {
                    product: Number(productId),
                    quantity: 1
                };
                getCartById.products.push(newArray);
                const updateCartProducts = await cartsJson.updateCartProductsId(Number(cartId),getCartById.products)
                res.status(200).json({mesagge: 'New product added'});
            } 
            else {
                let newArray=getCartById.products;
                const productsArrayPosition = getCartById.products.findIndex(item => item.product === Number(productId));
                newArray[productsArrayPosition].quantity=newArray[productsArrayPosition].quantity=newArray[productsArrayPosition].quantity=newArray[productsArrayPosition].quantity+1;
                const updateCartProducts = await cartsJson.updateCartProductsId(Number(cartId),newArray);
                res.status(200).json({mesagge: 'Product quantity updated'});
                
            }
            
                
        }
            
    }

});

module.exports = router;