const fs = require("fs");

class CartManager {

    constructor(cart) {
        this.cart = cart;
    }

    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.cart, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error) {
            return error;
        }
    }

    async addCart(cart) {
        try {
            let newJsonData;
            const jsonData = await this.getCarts();
            if (jsonData.length === 0) {
                cart.id = jsonData.length + 1;
                cart.products = [];
            }
            else {
                if (jsonData[jsonData.length - 1].id == jsonData.length) {
                    cart.id = jsonData.length + 1;
                    cart.products = [];
                }
                else {
                    cart.id = jsonData[jsonData.length - 1].id + 1;
                    cart.products = [];
                }
            }
            newJsonData = JSON.stringify([...jsonData, cart]);
            await fs.promises.writeFile(this.cart, newJsonData);
            return "Cart added successfully";
        }
        catch (error) {
            return error;
        }
    }

    async getCartById(id) {
        try {
            const jsonData = await this.getCarts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            if (itemId === undefined) {
                return "Not Found";
            }
            else {
                return itemId;
            }
        }
        catch (error) {
            return error;
        }
    }

    async updateCartProductsId(id, arrayProducts) {
        try {
            const jsonData = await this.getCarts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            itemId.products = arrayProducts
            await fs.promises.writeFile(this.cart, JSON.stringify(jsonData));
            return "cart products updated"
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { CartManager };
