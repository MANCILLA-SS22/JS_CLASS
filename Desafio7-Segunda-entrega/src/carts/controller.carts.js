const { Router } = require('express');

const router = Router();

const { MongoCartManager } = require('../dao/mongoClassManagers/cartsClass/cartMongoManager');
const cartsMongo = new MongoCartManager();

const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();

router.get('/', async (req, res) => {
    const carts = await cartsMongo.getCarts();

    res.json(carts);
});

router.post('/', async (req, res) => {
    try {
        const createdCart = await cartsMongo.addCart({});
        res.json({ mesagge: createdCart });
    }
    catch (error) {
        res.status(500).json({ mesagge: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartsMongo.getCartById(cartId);
    console.log(getById);
    //res.status(200).json(getById);
    res.status(500).render('cart',getById);
});

router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartsMongo.getCartById(cartId);

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if(verifyExistence){
         const updateCartProducts = await cartsMongo.postCartProductsId(cartId,productId,true);
         res.status(200).json({ mesagge: updateCartProducts });
        }

    else{
         const updateCartProducts = await cartsMongo.postCartProductsId(cartId,productId,false);
         res.status(200).json({ mesagge: updateCartProducts });
        } 
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartsMongo.getCartById(cartId);
    const getProductById = await productsMongo.getProductById(productId);
    const productoTitulo = getProductById.title;

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if (verifyExistence === undefined) {
        res.status(404).json({ mesagge: 'not found' });
    }
    else {
        const productsArrayPosition = getCartById.products.findIndex(item => item.id === productId);
        getCartById.products.splice(productsArrayPosition, 1);
        let newArray = getCartById.products;
        const deleteCartProducts = await cartsMongo.deleteCartProductsId(cartId, newArray);
        res.status(200).json({ mesagge: deleteCartProducts });

    } 
});

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartsMongo.deleteById(cartId);
    //console.log(cartId);
    res.status(200).json({ mesagge: getById });
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { quantity } = req.body;
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartsMongo.getCartById(cartId);

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if(verifyExistence){
         const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, productId, true, quantity);
         res.status(200).json({ mesagge: "cart products updated" });
        }

    else{
         const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, productId, false, quantity);
         res.status(200).json({ mesagge: "cart products updated" });
        }
});

router.put('/:cid', async (req, res) => {
    const { products } = req.body;
    const cartId = req.params.cid;
    const getCartById = await cartsMongo.updateCartId(cartId, products);
    res.status(200).json( getCartById );
});


module.exports = router;