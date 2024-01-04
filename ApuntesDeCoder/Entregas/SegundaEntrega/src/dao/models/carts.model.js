import {Schema, model} from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: { 
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
});

//Populate in middleware
// cartSchema.pre("findOne", function(){
//     this.populate("products.product", "title description price");
// });

const cartModel = model("carts", cartSchema);

export {cartModel};