const { Router } = require('express');
const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();

const router = Router();

router.get('/', (req, res) => {
  res.render('chat.handlebars', {})
})

module.exports = router