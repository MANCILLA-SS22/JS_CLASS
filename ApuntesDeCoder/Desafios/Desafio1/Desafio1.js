// Ejemplo 11: Clases con ECMAScript y ECMAScript avanzado
// ✓ Realizar una clase “ProductManager” que gestione un conjunto de productos.
// ✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío
// ✓ Cada producto que gestione debe contar con las propiedades:
//    - title (nombre del producto)
//    - description (descripción del producto)
//    - price (precio)
//    - thumbnail (ruta de imagen)
//    - code (código identificador)
//    - stock (número de piezas disponibles)
// ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
//    - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
//    - Al agregarlo, debe crearse con un id autoincrementable
// ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento.
// ✓ Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id. En caso de no coincidir ningún id, mostrar en consola un error “Not found”.

class ProductManager{

    #products;

    constructor(){
        this.#products = [];
    }

    getProducts(){
        return this.#products;
    }
    
    addProduct(product){
        const parametersExist = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock");
        const verifyExistence = this.#products.some((e) => e.code === product.code)
        if(!verifyExistence){
            if(!parametersExist || (product.title === "" ||  product.description === "" ||  product.price === null ||  product.thumbnail === "" ||  product.code === "" ||  product.stock === null) ){
                return console.error("Not enough information");
            }else{
                this.#products.push({
                    ...product,
                    id: this.#products.length === 0 ? product.id = 1 : product.id = this.#products[this.#products.length - 1].id + 1
                });
                
            }
        }else{
            return console.error("Same code is registered")
        }
    }

    getProductById(id){
        const res = this.#products.find(event => event.id === id);
        if (res) {
            return res;
        }else{
            console.error("Not found")
        }
    }
}

class GestionDeProductos{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title || "";
        this.description = description || "";
        this.price = price || null;
        this.thumbnail = thumbnail || "";
        this.code = code || "";
        this.stock = stock || null;
    }
}

const Product = new ProductManager();

//Obtenemos el array vacio
console.log(Product.getProducts());

//Agregamos productos al arreglo vacio
const producto1 = Product.addProduct(new GestionDeProductos(
    "AK-47", 
    "Assault riffle", 
    9, 
    "https://www.therange702.com/wp-content/uploads/2021/09/AK47-768x513-1.jpg.webp",
    "SS-1998",
    5
));

const producto2 = Product.addProduct(new GestionDeProductos(
    "P-90", 
    "Sub machine gun", 
    6, 
    "https://www.therange702.com/wp-content/uploads/2022/12/fn-p90-sqsh.jpg.webp",
    "SS-1999",
    5
));

const producto3 = Product.addProduct(new GestionDeProductos(
    "Saiga-12", 
    "Shotgun", 
    10, 
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
    "SS-2000",
    5
));

//Mostramos el array con los productos anadidos
console.log(Product.getProducts());