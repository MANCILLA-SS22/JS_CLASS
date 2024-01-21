import {Schema, model} from "mongoose";

const productShema = new Schema({
    products: { type: Schema.Types.ObjectId },
    quantity: Number

});

const cartModel = model("carts", productShema);

export {cartModel};