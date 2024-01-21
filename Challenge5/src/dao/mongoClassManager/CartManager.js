import {cartModel} from "../models/carts.model.js";

export class CartManager{

    async getCart(){
        try {
            return await cartModel.find();
        } catch (error) {
            return error;
        }
    }

    async addCart(cart){
        try {
            const newProduct = await cartModel.create(cart);
            return "Cart added successfully";
        } catch (error) {
            console.log(error);
        }
    }    

    async getCartById(id){
        try {
            return await cartModel.findById(id);
        } catch (error) {
            return error
        }
    }

    async updateCartProductsId(id, array) {
        try {
            return await cartModel.findByIdAndUpdate(id, {products: array});
        }
        catch (error) {
            return error;
        }
    }
}