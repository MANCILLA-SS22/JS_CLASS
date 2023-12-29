const fs = require("fs");

class ProductManager {

    constructor(products) {
        this.products = products;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error) {
            return error;
        }
    }

    async addProduct(product) {
        try {
            const jsonData = await this.getProducts();
            let newJsonData;
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock") && product.hasOwnProperty("status") && product.hasOwnProperty("category");
            const verifyExistence = Object.values(jsonData).find((e) => e.code === product.code);
            if (verifyExistence === undefined) {
                if (propertyCondition) {
                    if (jsonData.length === 0) {
                        product.id = jsonData.length + 1;
                    }
                    else {
                        if (jsonData[jsonData.length - 1].id == jsonData.length) {
                            product.id = jsonData.length + 1;
                        }
                        else {
                            product.id = jsonData[jsonData.length - 1].id + 1;
                        }
                    }
                    newJsonData = JSON.stringify([...jsonData, product]);
                    await fs.promises.writeFile(this.products, newJsonData);
                    return "Product added successfully";
                }
                else {
                    return "Product with missing information";
                }
            }
            else {
                return "Product already in stock";
            }
        }
        catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const jsonData = await this.getProducts();
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

    async deleteById(id) {
        try {
            const jsonData = await this.getProducts();
            const product = Object.values(jsonData).find((e) => e.id === id);
            if (product) {
                let newJsonData = jsonData.filter((item) => item.id !== id);
                await fs.promises.writeFile(this.products, JSON.stringify(newJsonData));
                return "Removed product successfully";
            }
            else {
                return "Not Found";
            }
        }
        catch (error) {
            return error;
        }
    }

    async updateProduct(id, product) {
        try {
            const jsonData = await this.getProducts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock") && product.hasOwnProperty("status") && product.hasOwnProperty("category");

            if (itemId === undefined) {
                return "Not Found";
            }
            else {
                if (propertyCondition) {
                    itemId.title = product.title;
                    itemId.description = product.description;
                    itemId.price = product.price;
                    itemId.thumbnail = product.thumbnail;
                    itemId.code = product.code;
                    itemId.stock = product.stock;
                    itemId.status = product.sattus;
                    itemId.category = product.category;

                    await fs.promises.writeFile(this.products, JSON.stringify(jsonData));
                    return "updated product successfully";
                }
                else {
                    return "Product with missing information";
                }
            }
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { ProductManager };