import {Schema, model} from "mongoose";

const productShema = new Schema({
    products: Array
});

const cartModel = model("carts", productShema);

export {cartModel};