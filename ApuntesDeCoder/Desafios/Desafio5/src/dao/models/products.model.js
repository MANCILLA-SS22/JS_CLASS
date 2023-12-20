import {Schema, model} from "mongoose";

const productShema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: Array, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    status: {type: String, required: true},
});

const productModel = model("products", productShema);

export {productModel};