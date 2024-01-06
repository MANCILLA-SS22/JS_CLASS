const { Router } = require('express');
const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();
const router = Router();

router.get('/', async (req, res) => {
    try {
        let linkMold = req.protocol + '://' + req.get('host') + '/api/products/';
        let limit;
        let page;
        let sort;
        let prevSort;
        let filter;

        if(req.query.category == undefined && req.query.stock == undefined){
            filter =  {};
        }
        else if(req.query.category == undefined && req.query.stock != undefined){
            filter = {
                stock: { $gte: req.query.stock }
            };
        }
        else if(req.query.category != undefined && req.query.stock == undefined){
            filter = {
                category: { $regex: req.query.category }
            };
        }
        else{
            filter = {
                category: { $regex: req.query.category },
                stock: { $gte: req.query.stock }
            };
        }

        if (req.query.limit == undefined) {
            limit = 10;
        }
        else {
            limit = req.query.limit;
        }

        if (req.query.page == undefined) {
            page = 1;
        }
        else {
            page = req.query.page;
        }

        if (req.query.sort == 'asc') {
            prevSort = 'asc';
            sort = 1;
        }
        else if (req.query.sort == 'desc') {
            prevSort = 'desc';
            sort = -1;
        }
        else {
            sort = undefined;
        }

        const condicionesQery = {
            page: page,
            limit: limit,
            sort: { price: sort }
        };
        //console.log(filter)


        const products = await productsMongo.getProducts(filter, condicionesQery);
        console.log(products)
        let nextLink;
        let prevLink;
        
        if (products.hasPrevPage == false) {
            prevLink = null;
        }
        else {
            prevLink = req.protocol + '://' + req.get('host') + '/api/products' + '?' + `page=${products.prevPage}` + `&limit=${limit}&sort=${prevSort}`;
        }

        if (products.hasNextPage == false) {
            nextLink = null;
        }
        else {
            nextLink = req.protocol + '://' + req.get('host') + '/api/products' + '?' + `page=${products.nextPage}` + `&limit=${limit}&sort=${prevSort}`;
        }

        const respuestaInfo = {
            status: 'success',
            playload: products.docs,
            totalPges: products.totalDocs,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink,
            linkMold: linkMold
        };
        res.status(200).render('products',{respuestaInfo: respuestaInfo}); 
        //res.status(200).json({ mesagge: { respuestaInfo } });

    } catch (error) {
        res.status(500).json({ mesagge: { error } });
    }

});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.getProductById(productId);
    //console.log(getById)
    res.status(500).render('productID',getById);
    //res.status(200).json({ mesagge: getById });
});

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        const verifyExistenceUndefined = Object.values(newProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
            const createdProduct = await productsMongo.addProduct(newProduct);
            const products = await productsMongo.getProducts();
            global.io.emit('statusProductsList', products);
            res.json({ mesagge: createdProduct });
        }
        else {
            res.status(406).json({ mesagge: "Product with missing information" });
        }
    } catch (error) {
        res.status(500).json({ mesagge: { error } });
    }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    const newUpdatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    }

    const verifyExistenceUndefined = Object.values(newUpdatedProduct).indexOf(undefined);

    if (verifyExistenceUndefined === -1) {
        const UpdatedProduct = await productsMongo.updateProduct(productId, newUpdatedProduct);
        const products = await productsMongo.getProducts();
        global.io.emit('statusProductsList', products);
        res.json({ mesagge: UpdatedProduct });
    }
    else {
        res.status(406).json({ mesagge: "Product with missing information" });
    }
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.deleteById(productId);
    const products = await productsMongo.getProducts();
    global.io.emit('statusProductsList', products);
    res.status(200).json({ mesagge: getById });
});

module.exports = router;