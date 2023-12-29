const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'product';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {type: Number,index: true},
    thumbnail: Array,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
    idd: Number

});

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model(productsCollection, productSchema);
module.exports = Product;