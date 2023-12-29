const { Router } = require('express');

const router = Router();

const {ProductManager} = require("../dao/fsClassManagers/productsClass/productManager");
const productsJson = new ProductManager('./src/dao/fsClassManagers/productsClass/db/products.json');

router.get('/', async (req, res) => {
    const getAll = await productsJson.getProducts();
    //console.log(getAll);
    let data;
    if (req.query.limit) {
        data = Object.values(getAll).slice(0, req.query.limit);
        res.render('home.handlebars', { data });
    } else {
        let data = getAll;
        res.render('home.handlebars', { data });
    }

});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsJson.getProductById(Number(productId));
    if (getById === "Not Found") {
        res.status(404).json({ mesagge: getById });
    }
    else {
        res.status(200).json({ mesagge: getById });

    }
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
            const createdProduct = await productsJson.addProduct(newProduct);
            const getAll = await productsJson.getProducts();
            //global.io.emit('statusProductsList', getAll);
            console.log(getAll);
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

    const getById = await productsJson.getProductById(Number(productId));
    if (getById === "Not Found") {
        res.status(404).json({ mesagge: getById });
    }
    else {
        const verifyExistenceUndefined = Object.values(newUpdatedProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
            const UpdatedProduct = await productsJson.updateProduct(Number(productId), newUpdatedProduct);
            const getAll = await productsJson.getProducts();
            res.json({ mesagge: UpdatedProduct });
        }
        else {
            res.status(406).json({ mesagge: "Product with missing information" });
        }

    }
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsJson.deleteById(Number(productId));
    if (getById === "Not Found") {
        res.status(404).json({ mesagge: getById });
    }
    else {
        const getAll = await productsJson.getProducts();
        res.status(200).json({ mesagge: getById });
    }
});


module.exports = router;