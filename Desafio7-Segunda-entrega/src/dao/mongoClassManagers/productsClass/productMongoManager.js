const Product = require("../../models/products.model");

class MongoProductManager{

    async getProducts(filter,condicionesQuery){
        try {
            const products = await Product.paginate(filter, condicionesQuery);
            return products;
        } 
        catch (error) {
            return error;
        }
    }

    async addProduct(product){
        try {
            const condition = await Product.findOne({code: product.code})
            if(condition){
                return "Product already in stock";
            }
            else{
                const addMongoProduct = await Product.create(product);
                return 'Product added successfully';  
            } 
        } 
        catch (error) { 
            return error;
        }
    }

    async getProductById(id){
        try {
            const getProductByIdMongo = await Product.findById(id);
            return getProductByIdMongo
        } 
        catch (error) {
            return error;
        }
    }

    async deleteById(id){
        try {
            const deleteByIdMongo = await Product.findByIdAndDelete(id);
            return "deleted product successfully"
        } 
        catch (error) {
            return error;
        }
    }

    async updateProduct(id,product){
        try {
            const getProductByIdMongo = await Product.findByIdAndUpdate(id,product);
            return "updated product successfully"; 
        } 
        catch (error) {
            return error;
        }
    }
}

module.exports = {MongoProductManager};