const productsController = require('../products/controller.products');
const cartsController = require('../carts/controller.carts');
const fsProductsController = require('../products/controller.fs.products');
const fsCartsController = require('../carts/controller.fs.carts ');
const realTimeProductsController = require('../realTime/controller.realTimeProducts');
const viewsController = require('../chat/controller.chat')

const router = (app) => {
    app.use('/chat', viewsController)
    app.use('/api/products', productsController);
    app.use('/api/carts', cartsController);
    app.use('/api/fs/products', fsProductsController);
    app.use('/api/fs/carts', fsCartsController);
    app.use('/realTimeProducts', realTimeProductsController);
};

module.exports = router;