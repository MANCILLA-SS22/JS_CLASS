import productModel from "../models/products.model.js"

class ProductManager{

    async getProducts (){
        return  await productModel.find();
    }

    async getProductsNew (filter, conditionalQuery){
        try {
            return await productModel.paginate(filter, conditionalQuery);
        }catch (error) {
            return error;
        }
    }

    async getProductById (_id){
        const res = await productModel.findById(_id);
        return res;
    }

    async addProduct(product){
        try {
            const verifyExistence = await productModel.findOne({code: product.code}); //Verificamos que el codigo de cada producto sea igual. Si son iguales, entonces el producto ya existe y no es necesario agreagarlo
            if (!verifyExistence){
                const newProduct = await productModel.create(product);
                return "Product added successfully";
            }else{
                return "Product already in stock";
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct (_id, product){
        try {
            return await productModel.findByIdAndUpdate({_id}, product);

        }catch (error) {
            console.log(error);
        }
    }
}

export  {ProductManager}

// AQUI SE ENCUENTRAN LOS OBJETOS PARA REALIZAR PRUEBAS EN POSTMAN
/* [
    {
        "title": "Saiga-12", 
        "description": "Shotgun", 
        "price": 800, 
        "thumbnail": "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
        "code": "SS2000",
        "stock": 1,
        "status": true,
        "category": "New"
    }
    {   
        "title": "RPG", 
        "description": "Launchers", 
        "price": 1000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2001",
        "stock": 5,
        "status": true,
        "category": "Old"
    }
    {   
        "title": "AA-12", 
        "description": "Shotgun", 
        "price": 3000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2002",
        "stock": 8,
        "status": true,
        "category": "Medium"
    }
    {
        "title": "Barret .50 cal", 
        "description": "Sniper", 
        "price": 5000, 
        "thumbnail": "https://www.militarytimes.com/resizer/uM3S85PI9oSYKigYiohxkx3Si7w=/1024x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/    4FP5BTDFBNDWPOBKJPROA3ZDOE.png",
        "code": "SS2003",
        "stock": 3,
        "status": true,
        "category": "Medium"
    }
    {   
        "title": "AK-12", 
        "description": "Assault riffle", 
        "price": 900, 
        "thumbnail": "https://files.cults3d.com/uploaders/14777289/illustration-file/422a8f9d-fe09-467d-9aa0-7c6976561d36/1.png",
        "code": "SS2004",
        "stock": 8,
        "status": true
        "category": "New"
    }
    {
        "title": "MP7", 
        "description": "Sub machine gun", 
        "price": 650, 
        "thumbnail": "https://www.airsoftatlanta.com/cdn/shop/products/DSC07015.JPG?v=1558658466",
        "code": "SS2005",
        "stock": 10,
        "status": true
        "category": "Medium"
    }
    {
        "title": "G36C", 
        "description": "Launchers", 
        "price": 700, 
        "thumbnail": "https://cdn11.bigcommerce.com/s-9mcepdq780/images/stencil/1280x1280/products/511/1738/1__81892.1553886372.jpg?c=2",
        "code": "SS2006",
        "stock": 9,
        "status": true
        "category": "Old"
    }
    {
        "title": "VEPR-12", 
        "description": "Shotgun", 
        "price": 1500, 
        "thumbnail": "https://gundigest.com/wp-content/uploads/Molot-Vepr-12-f2.jpg",
        "code": "SS2007",
        "stock": 2,
        "status": true
        "category": "New"
    }
] */