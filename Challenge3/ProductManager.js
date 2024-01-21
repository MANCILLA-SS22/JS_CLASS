const fs = require("fs");

class ProductManager{
    constructor(products){ // ./products.txt
        this.products = products; 
        this.res;
        
        let comprobacion = fs.existsSync(this.products);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                this.res = fs.readFileSync(products, "utf-8"); //Leemos (y obtenemos) un array vacio justo cuando no hemos cargado ningun producto
                this.res = JSON.parse(this.res); //Una vez cargado el producto, lo parseamos para poder obtenerlo el objeto proveniente del formato JSON.
            } catch (error) {
                this.res = [];
            }
        }else {
            this.res = [];
        }
    }

    async addProduct (product){
        try {
            const verifyExistence = this.res.some((e) => e.code === product.code); //Verificamos que el codigo de cada producto sea igual. Si son iguales, entonces el producto ya existe y no es necesario agreagarlo
            if (!verifyExistence){
                /* if (this.res.length === 0) {
                    product.id = this.res.length+1;
                }else{
                    if(this.res[this.res.length-1].id === this.res.length){
                        product.id = this.res.length + 1;
                    } 
                    else{
                        product.id = this.res[this.res.length-1].id+1;
                    }
                } */
                this.res.length === 0 ? product.id = 1 : product.id = this.res.length + 1;
                this.res.push(product);
                await this.saveFile(this.res);
                return console.error("Product added successfully");
            }else{
                return console.error("Product already in stock");
            }

        } catch (error) {
            console.log(error);
        }
    }

    async saveFile(data){
        try {
            console.log([...data])
            await fs.promises.writeFile(this.products, JSON.stringify([...data], null, "\t"));
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async deletePost(id) {
        try {
            const post = this.res.find((p) => p.id === id); console.log(post)
            if(post){
                const deleteById = this.res.filter(event => event.id !== id);
                console.log("Nuevi array", deleteById)
                await fs.promises.writeFile(this.products, JSON.stringify(deleteById, null, "\t"));
                return console.log("Removed product successfully");
            }else{
                return console.log("El post no existe");
            }

        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct (id, product){
        try {
            const parametersExist = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock");
            const val = this.res.find((p) => p.id === id); 

            if (val){
                if (parametersExist){
                    val.title = product.title;
                    val.description = product.description;
                    val.price = product.price;
                    val.thumbnail = product.thumbnail;
                    val.code = product.code;
                    val.stock = product.stock;

                    await fs.promises.writeFile(this.products, JSON.stringify(this.res, null, "\t")); 
                    return console.log("updated product successfully");
                }else{
                    return console.error("Not enough information.");
                }
            }else{
                return console.error("Not found id.");
            }            

        } catch (error) {
            console.log(error);
        }
    }

    getProducts (){
        return this.res;
    }

    getProductById (id){
        const num = this.res.find(event => event.id === id);
        return num;
    }

}

class GestionDeProductos{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// Paso 1: Creamos un una nueva funcion y le asignamos el nombre del archi a crear en formato .json
const Product = new ProductManager("./products.json");

// Paso 2: Obtenemos el array vacio creado en la funcion
// console.log(Product.getProducts());

// Paso 3: Agregamos productos al arreglo vacio en la funcion addProduct
const producto1 = Product.addProduct(new GestionDeProductos(
    "AK-47", 
    "Assault riffle", 
    550, 
    "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
    "SS1998",
    5
));

const producto2 = Product.addProduct(new GestionDeProductos(
    "P-90", 
    "Sub machine gun", 
    330, 
    "https://www.therange702.com/wp-content/uploads/2022/12/fn-p90-sqsh.jpg.webp",
    "SS1999",
    5
));

const producto3 = Product.addProduct(new GestionDeProductos(
    "Saiga-12", 
    "Shotgun", 
    800, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS2000",
    5
));

const producto4 = Product.addProduct(new GestionDeProductos(
    "RPG", 
    "Launchers", 
    1000, 
    "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
    "SS2001",
    5
));

const producto5 = Product.addProduct(new GestionDeProductos(
    "AA-12", 
    "Shotgun", 
    3000, 
    "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
    "SS2002",
    8
));

const producto6 = Product.addProduct(new GestionDeProductos(
    "Barret .50 cal", 
    "Sniper", 
    5000, 
    "https://www.militarytimes.com/resizer/uM3S85PI9oSYKigYiohxkx3Si7w=/1024x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/4FP5BTDFBNDWPOBKJPROA3ZDOE.png",
    "SS2003",
    3
));

const producto7 = Product.addProduct(new GestionDeProductos(
    "AK-12", 
    "Assault riffle", 
    900, 
    "https://files.cults3d.com/uploaders/14777289/illustration-file/422a8f9d-fe09-467d-9aa0-7c6976561d36/1.png",
    "SS2004",
    8
));

const producto8 = Product.addProduct(new GestionDeProductos(
    "MP7", 
    "Sub machine gun", 
    650, 
    "https://www.airsoftatlanta.com/cdn/shop/products/DSC07015.JPG?v=1558658466",
    "SS2005",
    10
));

const producto9 = Product.addProduct(new GestionDeProductos(
    "G36c", 
    "Launchers", 
    700, 
    "https://cdn11.bigcommerce.com/s-9mcepdq780/images/stencil/1280x1280/products/511/1738/1__81892.1553886372.jpg?c=2",
    "SS2006",
    9
));

const producto10 = Product.addProduct(new GestionDeProductos(
    "VEPR-12", 
    "Shotgun", 
    1500, 
    "https://gundigest.com/wp-content/uploads/Molot-Vepr-12-f2.jpg",
    "SS2007",
    2
));

const productiActualizar = {
    title: "new title", 
    description: "new description", 
    price: 1000, 
    thumbnail: "new url image", 
    code: "new code", 
    stock: 10 
}

module.exports = {ProductManager} //Utilizamos esta linea de codigo en caso de no querer utilizar    "type": "module"   en el package.json.

// Paso 4: Obtenemos el array con todos los productos seleccionados
// console.log(Product.getProducts());

// Paso 5: Recuperamos un elemento con base en su id.
// console.log(Product.getProductById(3));

// Paso 6: Eliminamos un producto del array con base en su id y nuevamente mostramos el array modificado en consola
// Product.deletePost(4);
// console.log(Product.getProducts());

// Paso 7: Modificamos uno de los elementos agregados con nueva informacion en sus campos, y tambien le pasamos el id del elemento a modificar.
// Product.updateProduct(1, productiActualizar);
// console.log(Product.getProducts());