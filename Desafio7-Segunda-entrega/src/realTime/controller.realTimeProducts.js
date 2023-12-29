const { Router } = require('express');
const router = Router();

const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();

router.get('/', async (req, res) => {
    const products = await productsMongo.getProducts();
    const getAll = products;

    global.io.emit('productsList', products);
    res.render('realTimeProducts.handlebars',  {getAll} );
});

module.exports = router;