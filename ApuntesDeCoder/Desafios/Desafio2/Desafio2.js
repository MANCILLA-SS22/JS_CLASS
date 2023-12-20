//Ejemplo: Manejo de archivos
//  ✓ Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos.
//  ✓ La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//  ✓ Debe guardar objetos con el siguiente formato:
//    - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//    - title (nombre del producto)
//    - description (descripción del producto)
//    - price (precio)
//    - thumbnail (ruta de imagen)
//    - code (código identificador)
//    - stock (número de piezas disponibles)
//  ✓ Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//  ✓ Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//  ✓ Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//  ✓ Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
//  ✓ Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

import fs from 'fs';

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
        num ? console.log("The product found by id is: ", num) : console.log("Product not found by id");
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
    9, 
    "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
    "SS1998",
    5
));

const producto2 = Product.addProduct(new GestionDeProductos(
    "P-90", 
    "Sub machine gun", 
    6, 
    "https://www.therange702.com/wp-content/uploads/2022/12/fn-p90-sqsh.jpg.webp",
    "SS1999",
    5
));

const producto3 = Product.addProduct(new GestionDeProductos(
    "Saiga-12", 
    "Shotgun", 
    10, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS2000",
    5
));

const producto4 = Product.addProduct(new GestionDeProductos(
    "RPG", 
    "Launchers", 
    200, 
    "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
    "SS2001",
    5
));

const productiActualizar = {
    title: "new title", 
    description: "new description", 
    price: 1000, 
    thumbnail: "new url image", 
    code: "new code", 
    stock: 10 
}

// Paso 4: Obtenemos el array con todos los productos seleccionados
// console.log(Product.getProducts());

// Paso 5: Recuperamos un elemento con base en su id.
// console.log(Product.getProductById(3));

// Paso 6: Eliminamos un producto del array con base en su id y nuevamente mostramos el array modificado en consola
Product.deletePost(4);
console.log(Product.getProducts());

// Paso 7: Modificamos uno de los elementos agregados con nueva informacion en sus campos, y tambien le pasamos el id del elemento a modificar.
// Product.updateProduct(1, productiActualizar);
// console.log(Product.getProducts());