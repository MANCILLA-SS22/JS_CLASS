//         $$$$$$$$$$$$$$$ Node, express, files $$$$$$$$$$$$$$$


/* //Ejemplo 0: Uso del file system (fs) node.js
const fs = require("fs"); //console.log(fs);

fs.writeFileSync("./text.txt", "Escribiendo en un archivo nuevo \nOtro texto");
if(fs.existsSync("./text.txt")){
    console.log("Si existe");
    let contenido = fs.readFileSync("./text.txt", "utf-8");
    console.log(contenido);
    
    fs.appendFileSync("./text.txt", "\nContenido añadido");

    contenido = fs.readFileSync("./text.txt", "utf-8");
    console.log(contenido);

    fs.unlinkSync("./text.txt");    
} */

/* //Ejemplo 1: Uso del file system (fs) con callbacks
const fs = require("fs");
fs.writeFile("./texto_callback.txt", "Escribiendo en un callback", function(error){

    if (error) return console.log("Hubo un error al escribir el archivo");

    fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
        if (error) return console.log("Hubo un error al leer el archivo");
    
        console.log(contenido);
    
        fs.appendFile("./texto_callback.txt","\nTexto recién salido del horno", function(error){
            if (error) return console.log("Hubo un error al agregar contenido al archivo");
    
            fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
                if (error) return console.log("Hubo un error al leer el archivo");
                console.log(contenido);
    
                fs.unlink("./texto_callback.txt", function(error){
                    if (error) return console.log("Hubo un error al eliminar el archivo");
                });
            });
        });
    });
}); */

/* //Ejemplo 2: Ejercicio practico con fs.
const fs = require("fs");
const fecha = new Date().toLocaleString();

fs.writeFile("./texto_callback.txt", fecha, function(error){

    if (error) return console.log("Hubo un error al escribir el archivo");

    fs.readFile("./texto_callback.txt", "utf-8", function(error, contenido){
        if (error) return console.log("Hubo un error al leer el archivo");
        console.log("La fecha del arcghivo es: ", contenido);
    });
}); */

/* //Ejemplo 3: Uso del file system (fs) con callbacks Y promesas
const fs = require("fs");

async function operaciones(fileName) {
    try {
        await fs.promises.writeFile(fileName, "Escribiendo en un archivo con promesas");
        let contenido = await fs.promises.readFile(fileName, "utf-8"); console.log(contenido);
        
        await fs.promises.appendFile(fileName, "\nAgregando contenido");
        contenido = await fs.promises.readFile(fileName, "utf-8"); console.log(contenido);

        await fs.promises.unlink(fileName);

    } catch (error) {
        console.log("Hubo un error");
    }
};

operaciones("./texto.txt"); */

/* //Ejemplo 4: Manejo de datos complejos con fs.promise
const fs = require("fs");

async function operacion (fileName, objeto){
    try {
        await fs.promises.writeFile(fileName, JSON.stringify(objeto, null, "\t"));
        let contenido = await fs.promises.readFile(fileName, "utf-8");
        let data = JSON.parse(contenido);

        console.log(contenido);
        console.log(data);
        console.log(data.id);
        console.log(typeof contenido);

        let array = [data, { id: 2, name: "Arturo", age: 25 }];
        await fs.promises.writeFile(fileName, JSON.stringify(array, null, "\t"));
    
    } catch (error) {
        console.log(error);
        console.log("Hubo un error");
    }
};

operacion("./texto.json", {
    id: 1,
    name: "Roberto",
    age: 24,
}); */

/* //Ejemplo 5: Ejercicio practico Manager de usuarios
// Se creará una clase que permita gestionar usuarios usando fs.promises, éste deberá contar sólo con dos métodos: Crear un usuario y consultar los usuarios guardados.
// ✓ El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
// ✓ El método “Crear usuario” debe recibir un objeto con los campos: Nombre Apellido Edad Curso.
//   El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios
// ✓ El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios

const fs = require("fs");

class ManagerUsuarios{
    #usuarios;

    constructor(fileName){ //Mandamos el "fileName", ya que se podria utilizar varios "ManagerUsuarios" con diferentes tipos de usuarios.
        this.fileName = fileName;

        let comprobacion = fs.existsSync(this.fileName);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                console.log("True");
                this.usuarios = fs.readFileSync(fileName, "utf-8");
                this.usuarios = JSON.parse(usuarios);
            } catch (error) {
                // console.log(error);
                this.usuarios = [];
            }
        }else {
            this.usuarios = [];
        }
    }

    async saveFile(data) {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, "\t"));
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async addUsuario(usuario) {
        this.usuarios.push(usuario);
        const respuesta = await this.saveFile(this.usuarios);
    
        if (respuesta) {
            console.log("Usuario creado");
        } else {
            console.log("Hubo un error al crear un usuario");
        }
    }
    
    consultarUsuarios() {
        console.log(this.usuarios);
        return this.usuarios;
    }
}

class Usuario{
    constructor(nombre, apellido, edad, curso){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.curso = curso;
    }
}

// Pruebas
const usuario1 = new Usuario("Mariano", "Lopez", 26, "Backend");
const usuario2 = new Usuario("Felipe", "Lopez", 36, "Backend");
const usuario3 = new Usuario("Arturo", "Feliz", 26, "Frontend");

const manager = new ManagerUsuarios("./Usuarios.json");

console.log(manager.consultarUsuarios());
manager.addUsuario(usuario1);
manager.addUsuario(usuario2);
manager.addUsuario(usuario3);
// console.log(manager.consultarUsuarios()); */

/* //Ejemplo 6: Ejercicio practico Manager de posts
const fs = require("fs");

class ManagerPost{
    constructor(path){ //El constructor no puede ser asincrono. Por eso se usa readFileSync.
        this.path = path;
        this.posts;

        try{
            this.posts = fs.readFileSync(this.path, "utf-8"); //Creamos una variable "posts" que va a tener los datos (que recibira del archivo)
            this.posts = JSON.parse(posts); //Despues, el texto que recibimos en la linea de arriba, lo parseamos (convertimos a JSON) y se vuelve a almacenar en el atributo de la clase.
        } catch (error) {
            this.posts = []; //En caso de que no exista, simplemente almacenamos un array vacio.
        }
    }

    async savePost(post){
        if(!post) return console.log("El post esta vacio");

        const existPost = this.posts.find(event => event.id === post.id);
        if(existPost) return console.log("El post ya existe!");

        try{
            this.posts.push(post);
            await fs.promises.writeFile(this.path, JSON.stringify(this.posts, null, "\t"))
        }catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
        }
    }

    async deletePost(id) {
        const post = this.posts.find((p) => p.id === id);

        if (!post) {
            return console.log("El post no existe");
        }

        const index = this.posts.findIndex(post);

        try {
            this.posts.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(this.posts, null, "\t") );
        } catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
        }
    }

    validate(post){
        if(!post.userId || !post.id || !post.title || !post.body){
            return false;
        }else{
            return true;
        }
    }

    getPosts(){
        return this.posts;
    }

};

class Post{
    constructor(userId, id, title, body){
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

async function fetchDatos() {
    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    
    const manager = new ManagerPost("./posts.json");
    for (let i = 0; i < 10; i++) {
        const post = new Post(
            data[i].userId,
            data[i].id,
            data[i].title,
            data[i].body,
        );
        manager.savePost(post);
    }

    console.log(manager.getPosts());
    
    } catch (error) {
    console.log(`Hubo un error ${error}`);
    }
}

fetchDatos(); */

/* //Ejemplo 7: Manejo de archivos (Segundo desafio)
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

const fs = require("fs");

class ProductManager{
    constructor(products){ // ./products.txt
        this.products = products; 
        this.res;
        
        let comprobacion = fs.existsSync(this.products);
        if (comprobacion) {
            try { //Recordar que el metodo contructor no puede ser asincrono, y por eso unicamente utilizamos el try-catch.
                console.log("True");
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
                // if (this.res.length === 0) {
                //     product.id = this.res.length+1;
                // }else{
                //     if(this.res[this.res.length-1].id === this.res.length){
                //         product.id = this.res.length + 1;
                //     } 
                //     else{
                //         product.id = this.res[this.res.length-1].id+1;
                //     }
                // }
                this.res.length === 0 ? product.id = 1 : product.id = this.res.length + 1;
                this.res.push(product);
                await fs.promises.writeFile(this.products, JSON.stringify([...this.res, product], null, "\t"));
                // return console.error("Product added successfully");
            }else{
                return console.error("Product already in stock");
            }

        } catch (error) {
            console.log(error);
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

const Product = new ProductManager("./products.txt");

// Obtenemos el array vacio
// console.log(Product.getProducts());

// Agregamos productos al arreglo vacio
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
    "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
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

// console.log(Product.getProducts());

// console.log(Product.getProductById(3));
// console.log(Product.getProducts());

// Product.deletePost(4);
// console.log(Product.getProducts());

// console.log(Product.getProducts());
// console.log(Product.getProducts());

// Product.updateProduct(1, productiActualizar);
// console.log(Product.getProducts()); */

/* //Ejemplo 8: Lectura y escritura de archivos
Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:
✓ Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y. Esto creará un archivo especial (lo veremos más adelante) de nombre package.json
✓ Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
    const info = {
        contenidoStr: (contenido del archivo leído en formato string),
        contenidoObj: (contenido del archivo leído en formato objeto),
        size: (tamaño en bytes del archivo)
    }
✓ Muestre por consola el objeto info luego de leer el archivo
✓ Guardar el objeto info en un archivo llamado info.json dentro de la misma carpeta de package.json
✓ Incluir el manejo de errores (con throw new Error)
✓ Utilizar el módulo promises de fs dentro de una función async/await y utilizar JSON.stringify + JSON.parse para poder hacer las transformaciones json->objeto y viceversa. */

/* //Ejemplo 9: Práctica de módulos nativos: fs + crypto
// Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña 
// hasheada con crypto. Utilizar los módulos nativos fs y crypto, El manager debe contar con los siguientes métodos:
// ✓ El método “Crear usuario” debe recibir un objeto con los campos: Nombre, Apellido, Nombre de usuario, y Contraseña
//    El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad
// ✓ El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la contraseña, debe poder leer el json previamente generado con el arreglo de 
//    usuarios y hacer la comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje “Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide.

const fs = require("fs");
const crypto = require("crypto");

class UserManager {
    constructor(path) {
        try {
            this.path = path;
            this.users = fs.readFileSync(path, "utf-8");
            this.users = JSON.parse(users);
        } catch {
            this.users = [];
        }
    }

    async crearUsuario(user){
        const hashPassword = crypto.createHash("sha256").update(user.password).digest("hex");
        user.password = hashPassword;
        this.users.push(user);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, "\t"));
            console.log("User Created")
        } catch (error) {
            console.log("Error creating user: "+ error);
        }

    }

    validarUsuario(username, password) {
        const userExists = this.users.find((user) => user.username === username);
        if (!userExists) return console.log("User does not exists");

        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
        userExists.password === hashPassword ? console.log("Logged!") : console.log("Invalid Password");
    }
}

class User {
    constructor(nombre, apellido, username, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.password = password;
    }
}

const user = new UserManager("./Users.json");
user.crearUsuario(new User("emi", "perez", "emiperez", "123"));
user.crearUsuario(new User("yessi", "perez", "yessiperez", "1234"));
user.crearUsuario(new User("facu", "perez", "facuperez", "pauli"));
user.crearUsuario(new User("paula", "perez", "pauperez", "facu123"));

// user.validarUsuario("emiperez", "123");
// user.validarUsuario("pauperez", "facu123");
// user.validarUsuario("yessiperez", "123");
// user.validarUsuario("yessuperez", "123"); */

/* //Ejemplo 10: Calculadora de edad
// Realizar un programa que utilice la dependencia momentjs (deberá instalarse por npm install).
// ✓ Debe contar con una variable que almacene la fecha actual (utilizar moment())
// ✓ Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).
// ✓ Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());
// ✓ Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()
// ✓ Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa.

const moment = require("moment");
const fechaActual = moment();
const fechaPropia = moment("1998-04-22");
const transcurso = fechaActual.diff(fechaPropia, "days");

if (!fechaPropia.isValid()){
    return console.log("Please fix the date introduced!");
}else{
    return console.log(`La cantidad de dias pasados es de: ${transcurso} dias`)
} */

/* //Ejemplo 11: Nodemon ~ Solucion a error en consola: https://www.alexmedina.net/habilitar-la-ejecucion-de-scripts-para-powershell/ ~
const http = require("http"); //console.log(http);
const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.method === "GET" && request.url === "/")  response.end("Mi primer servidor con node js"); //Con .end enviamos una respuesta
    if(request.url !== "/") response.end("Error pagina no encontrada!");
});

server.listen(8080, function(){ //Con este comando definimos el numero de puerto
    console.log("Server listening on port 8080");
}); */

/* //Ejemplo 12: Trabajando con express
// const express = require("express");
import express from "express";
const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello world from express!</h1>");
});

app.get('/bienvenida', function(request, response){
    response.send(`<h1 style="color: blue">Hello world from express!</h1>`);
});

app.get("/usuario", function(request, response){
    response.json({
        nombre: "German",
        apellido: "Mancilla",
        edad: "26",
        correo: "german@gmail.com"
    });
});

app.listen(8080, () => console.log("Sever listenint on port 8080!")); */

/* //Ejemplo 13: Otras respuestas con express
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

const usuarios = [
    {
        id: 1,
        nombre: "German",
        edad: 25,
    },
    {
        id: 2,
        nombre: "Karla",
        edad: 25,
    },
];

app.get("/", function(request, response){
    console.log(request.params);
    console.log(request.query.nombre);

    const { nombre, edad, ciudad } = request.query;
    console.log(nombre, edad, ciudad); // http://localhost:5000/?nombre=Emiliano&edad=26&ciudad=tijuana
    if (nombre) {
        const usuario = usuarios.find((user) => user.nombre === nombre);
        if (usuario) {
            return response.send(`Bienvenido ${usuario.nombre}!`);
        }else{
            return response.send("Bienvenido invitado!");
        }
    }
});

app.get("/usuarios", function(request, response){
    response.json(usuarios);
});

app.get("/usuarios/:id_user", function(request, response){   console.log(request.params); // Ejemplo URL: http://localhost:5000/usuarios/valor
    const { id_user } = request.params; // id_user es el nombre de la variable donde se almacenara el param. En este caso, debe ser el mismo nombre tanto en la barra de navegacion como en js
    const usuario = usuarios.find((user) => user.id === +id_user);
    usuario ? response.json(usuario) : response.json({ error: "User not found" });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// req.params: Se utiliza cuando necesitamos obtener elementos dinámicos desde la ruta que está llamando el cliente. para poder definir un “parámetro” dentro de la ruta a trabajar, basta con colocar el símbolo de 
//             dos puntos : antes del parámetro, de esta manera, express reconoce que queremos que ese elemento sea dinámico.
// req.query: Se refiere a las múltiples consultas que se pueden hacer a un determinado endpoint, basta conque en la url coloquemos el símbolo ? , entonces express reconocerá que hay que meter información al objeto 
//            req.query para poder utilizarlo en el endpoint. Cuando buscamos algo en nuestro navegador, llamamos a un endpoint haciendo un determinado query. Se expresa como:    ?key=valor  */

/* //Ejemplo 14: Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos
// ✓ Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
// ✓ Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
// ✓ El servidor debe contar con los siguientes endpoints:
//   ○ ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual 
//     recibirá un límite de resultados.
//     - Si no se recibe query de límite, se devolverán todos los productos
//     - Si se recibe un límite, sólo devolver el número de productos solicitados
//   ○ ruta ‘/products/:id’, la cual debe recibir por req.params el id (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 

const { ProductManager } = require("./src/ProductManager");
const Product = new ProductManager("./data/products.json")
const express = require ("express");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended:true}));

app.get("/products", async function(request, response){
    const products = await Product.getProducts();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(products).slice(0, limit)) : response.json(products);
});

app.get("/products/:id_Param", async function(request, response){
    const allProducts = await Product.getProducts();
    const {id_Param} = request.params;

    //Metodo 1:
    // const findId = allProducts.find((user) => user.id === +id_product);
    // findId ? response.json(findId) : response.json({ error: "User not found" });

    //Metodo 2:
    const maxValue = Object.values(allProducts).length;
    if (+id_Param < +maxValue && +id_Param > 0) {
        const getProductId = Product.getProductById(+id_Param);
        console.log(getProductId)
        response.json(getProductId);
    } else {
        response.send(`<h1>Something went wrong!</h1>`)
        // response.json({ error: "User not found" });
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 15: Utilizacion del metodo POST
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5050;

//Datos en memoria
const usuarios = [];

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido a mi API",
    });
});  // Endpoints usuarios

// Obtener usuarios
app.get("/usuarios", function(req, res){
    res.json({
        usuarios,
    });
});

// Obtener usuarios por id
app.get("/usuarios/:id", function(req, res){
    const { id } = req.params;
    validation(id, res);

    res.json({
        usuario,
    });
});

// Crear usuario
app.post("/usuarios", function(req, res){
    // console.log(req.body); //El rec.body captura la info que le llega

    const { id, username, name } = req.body;

    // const usuario = {};

    usuarios.push({
        id: Number(id),
        username,
        name,
    });

    res.json({
        status: "Creado",
    });
});

// Actualizar usuario
app.put("/usuarios/:id", function(req, res){
    const { id } = req.params;
    const { username, name } = req.body;
    
    const index = validation(id, res);

    usuarios[index] = {
        id: Number(id),
        username,
        name,
    };

    res.json({
        status: "Actualizado",
        usuario: {
            id: Number(id),
            username,
            name,
        }
    });
});

app.delete("/usuarios/:id", function(req, res){
    const { id } = req.params;
    const index = validation(id, res);

    usuarios.splice(index, 1);

    res.json({
        status: "Usuario Eliminado",
    });
});

function validation(id, res){
    const index = usuarios.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.json({
            error: "User not found",
        });
    }

    return index;
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejepmlo 16: Servidor con GET, POST, PUT, DELETE
// Dada la frase: “Frase inicial”, realizar una aplicación que contenga un servidor en express, el cual cuente con los siguientes métodos:
// ✓ GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
// ✓ GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1).
// ✓ POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
// ✓ PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
// ✓ DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).
// ✓ Utilizar POSTMAN para probar funcionalidad

import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

const frase = ["frase", "inicial"];

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido",
    });
});

app.get("/frase", function(request, response){
    response.json({
        frase: frase.join(" ")
    });
});

app.get("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;

    response.json({
        buscada: frase[Number(pos) - 1],
    });
});

app.post("/api/palabras", function(request, response){
    const { palabra } = request.body;

    frase.push(palabra);

    response.json({
        palabra,
        posicion: frase.length,
    });
});

app.put("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;
    const { palabra } = req.body;

    const anterior = frase[Number(pos) - 1];
    frase[Number(pos) - 1] = palabra;

    response.json({
        actualizada: palabra,
        anterior,
    });
});

app.delete("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;

    frase.splice(Number(pos) - 1, 1);

    response.json({
        status: "Eliminado",
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejepmlo 17: Router en Express
import express from "express";
import petsRouter from "./src/routes/pets.router.js";
import userRouter from "./src/routes/users.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido",
    });
});

app.use("/api/pets", petsRouter);
app.use("/api/users", userRouter);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejepmlo 18: Servicio de archivos estáticos con Express
import express from "express";
const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("src/public/"));  //Probar con --> http://localhost:5500/static/saiga.jpg

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejepmlo 19: Carpeta public
// ✓ El router de users debe tener la ruta principal /api/users
// ✓ El router de pets debe tener la ruta principal /api/pets
// ✓ Ambos deben tener, de manera interna, un array para almacenarlos.
// ✓ Ambos deben contar con un método get en su ruta raíz para poder obtener el arreglo.
// ✓ Ambos deben contar con un método POST en su ruta raíz para poder agregar un usuario omascota según sea el router.
// ✓ Conectar los routers al archivo app.js para tener listo el apuntador al router.
// ✓ Probar funcionalidad con Postman.
// ✓ recrear la estructura con un index.html para poder visualizarse en la ruta raíz.
// ✓ En este archivo deberá haber un formulario donde podremos ingresar una mascota a partir del método POST. Dicho POST conectará al endpoint raíz del router pets
// ✓ Configurar el router pets para que pueda recibir el json por parte del formulario (recordar express.json() y express.urlencoded({extended:true}))
// ✓ Verificar con POSTMAN que la información llegue al servidor y se guarde correctamente.

import express from "express";
import petsRouter from "./src/router/pets.router.js";
import userRouter from "./src/router/users.router.js";
const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("src/public/")); // Si no se quiere usar POSTMAN, usar el siguiente link --> http://localhost:5500/static/html/indexLayout.html

app.use("/api/pets", petsRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 20: Tipos de Middleware
import express from "express";
import { Router } from "express";
const PORT = 5500;
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //Middleware de nivel de aplicación
// function logger(req, res, next) {
//     console.log("Servidor recibe peticion");
//     next();
// }

// app.use(logger);

// //Middleware de nivel de endpoint
// function middleware(request, response, next){
//     const { code, productName } = req.body;

//     if (!code || code === "") {
//         return res.json({
//             error: "Esta el campo code vacio",
//         });
//     }

//     next();
// }

// app.get("/", middleware, function(request, response){ //Ejecutamos primero la ruta "/", despues se ejecuta la funcion middleware y, si todo sale bien, se ejecuta la funcion next, y pasamos al siguiente middleware. En este caso, al no haber, simplemente pasa al la funcion.
//     response.json({
//         mensaje: "Bienvenido",
//     });
// });

// //Middleware de nivel del Router
// function logger(req, res, next) {
//     console.log("Servidor recibe peticion");
//     next();
// }

// router.use(logger);

// //Middleware de manejo de errores
// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 21: Express Multer
import express from "express";
import {loader} from "./src/utils/multer.js"
const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public/"));

app.post("/", loader.single("file"), function(request, response){
    if(!request.file){
        return response.status(500).json({error: "Hubo un error al subir el archivo"});
    }else{
        return response.json({message: "El archivo se subio correctamente"});
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 22: Express + multer
// Basado en el formulario para ingresar una mascota al sistema:
// ✓ Configurar el formulario para añadir un campo input type=”file” name “file” para que la mascota a agregar pueda tener una “imagen representativa”.
// ✓ El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip.
// ✓ Corroborar que la imagen se guarde correctamente. Guardar la ruta del archivo guardado en un campo “thumbnail”.

import express from "express";
import router from "./src/router/postRoutes.js";
import { logger } from "./src/utils/logger.js";

const app = express();
const PORT = 5500;

function appGet1(req, res){
    res.json({
        message: "Bienvenido",
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", appGet1);
app.use(logger);
app.use("/api/posts/", router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 23: Servidor basado en Node.JS y express de un carrito de compras
import express from "express";
import routerMain from "./router/main.js";

const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerMain(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


// - Paso 1: Debemos crear los produtos que se encuentran en ProductManager. En este archivo hasta el final se encuentran los objetos que serviran 
// para copiar y pegar en postman y asi crear los productos en un archivo products.json
// - Paso 2: El siguiente metodo es crear el o los carritos deseados, los cuales contendran un arreglo "products" vacio y un id. Es importante crearlos
// antes de introducir los productos al carrito o de lo contrario obtendremos un error.
// - Paso 3: Finalmente podemos agregar elementos al arreglo products en el archivo carts.json. */

/* //Ejemplo 24: Uso de app.get(name, value);
import express from "express";

const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the value to name
app.set('title', 'Welcome to TutorialsPoint!!');

// Creating an endpoint
app.get('/', (req, res) => {
    res.send(app.get('title'));
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 25: Handlebars
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./src/router/views.routes.js";

const app = express();
const PORT = 5500;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos el engine
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
}));

// Seteamos nuestro motor.     //View engines allow us to render web pages using template files. These templates are filled with actual data and served to the client.
app.set("view engine", "hbs"); //Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo. 
app.set("views", `${__dirname}/src/view`); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.

// Public
app.use(express.static(`${__dirname}/src/public`));

// Routes
app.use("/", viewRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 26: Handlebars con express
// Realizar un formulario en una nueva plantilla.
// ✓ Se creará un archivo “register.handlebars” como nueva plantilla, donde se colocará un form
// ✓ Dicho form debe servir para registrar un usuario, por lo que contará con nombre, correo, y contraseña
// ✓ Enviar los datos a una ruta POST ‘/user’, y guardar el usuario en un arreglo. Confirmar que el guardado se realice exitosamente.
// ✓ Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla. 

import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./src/router/desafioView.routes.js";

const app = express();
const PORT = 5500;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
app.engine("hbs", handlebars.engine({
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);

app.set("views", `${__dirname}/src/view`); //Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/src/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter);// Routes

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 27: Socket.io
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./src/router/socketIntro.routes.js";
import { Server } from "socket.io";

const app = express();
const PORT = 5500;
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
app.engine("hbs", handlebars.engine({
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);
app.set("views", `${__dirname}/src/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/src/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter); // Routes


const users = [];

//Socket comunication
io.on('connection', function(socketClient){ //El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
    console.log("Nuevo cliente conectado");
    
    socketClient.on("message", function(data){ //Esta vez, una vez que el socket se ha conectado, podemos escuchar eventos de dicho socket, a partir de la sintaxis indicada: socket.on(“nombre_del_evento_a_escuchar”,callback con la data que me hayan enviado); Este “evento a escuchar” tiene un identificador que el cliente tiene que colocar de su lado para poder enviar información. Podemos tener múltiples socket.on, para tener así escuchar diferentes eventos.
        console.log(data);
        socketClient.emit("send_message", data);
    });
    
    socketClient.emit("server_message", "Mensaje desde el servidor"); //el carácter de un websocket debe ser bidireccional, eso significa que el servidor también debe poder enviar mensajes al cliente. 
    socketClient.emit("message_all",  "Mensaje para todos"); //Mensaje para todos incluyendo el sender

    socketClient.broadcast.emit("message_all_1", "Mensaje a todos los sockets, sin incluir al sender"); //broadcast va a enviar algo a todos los que esten conectados, menos al ultimo que se conecta o al sender
    // socketClient.broadcast.emit("message_all_2",  `${socketClient.id} Conectado`); //Esto se puede ver mejor si lo probamos entrando a localhost desde otro navegador 

    socketClient.on("form_message", function(data){
        console.log(data);
        users.push(data);
        socketClient.emit("users_list", users);
    });

    socketClient.emit("users_list", users);
}); */

/* //Ejemplo 28: Servidor con Websockets (after class)
// ✓ Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde al introducir texto, el mensaje se vea reflejado en todos 
//   los clientes conectados en un párrafo por debajo del input. El texto debe ser enviado caracter a caracter y debe reemplazar el mensaje previo.
// ✓ Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento 
//   de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un arrayde objetos, donde cada objeto tendrá la siguiente estructura:
//                                  { socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

// - Cada cliente que se conecte recibirá la lista de mensajes completa.
// - Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
// - Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.

import express from "express";
import { Server } from "socket.io";
import routerMain from "./src/router/desafio3.js";
import { ManagerPost } from "./src/utils/ManagerPost.js";

const app = express();
const PORT = 5500;

routerMain(app); 

const manager = new ManagerPost("./data/post.json");
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket


io.on("connection", function(socket){
    console.log("Nuevo cliente conectado");

    socket.on("post_send", async function(data){
        try {
            await manager.savePost(data);
            socket.emit("posts", manager.getPosts());
        } catch (error) {
            console.log(error);
        }
    });

    socket.emit("posts", manager.getPosts());

}); */

/* //Ejemplo 29: Desafio con websockets: Configurar nuestro proyecto para que trabaje con Handlebars y websocket
// ✓ Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
// ✓ Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
// ✓ Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de 
//  productos, sin embargo, ésta trabajará con websockets.
// ✓ Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.
// ✓ Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un 
//   formulario simple en la vista realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
// ✓ Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. 
//   ¿Cómo utilizarás un emit dentro del POST? */

/* //Ejemplo 30: Aplicación chat con websocket
// Nuestro chat comunitario contará con:
// ✓ Una vista que cuente con un formulario para poder identificarse. El usuario podrá elegir el nombre de usuario con el cual aparecerá en el chat.
// ✓ Un cuadro de input sobre el cual el usuario podrá escribir el mensaje.
// ✓ Un panel donde todos los usuarios conectados podrán visualizar los mensajes en tiempo real
// ✓ Una vez desarrollada esta aplicación, subiremos nuestro código a glitch.com, para que todos puedan utilizarlo
// ✓ Cuando el usuario se autentique correctamente, el servidor le mande los logs de todo el chat.
// ✓ Cuando el usuario se autentique correctamente, todos los demás usuarios (menos el que se acaba de registrar) reciban una notificación indicando qué usuario se acaba de conectar. (utiliza Swal toast).

import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./router/socketView.routes.js";
import { Server } from "socket.io";

const app = express();
const PORT = 5500;
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
app.engine("hbs", handlebars.engine({ 
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);

app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter); // Routes

//Socket comunication
const messages = [];
io.on('connection', function(socket){//El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 

    socket.on("inicio", function(data){ //2. Recivimos el nombre
        socket.broadcast.emit("connected", data); //3. Lo enviamos a todos los usuarios menos al ultimo
    })

    socket.on("message", function(data){//7. Recivimos el mensaje que se capturo en el imput
        messages.push(data);
        io.emit("messages", messages); //8. lo enviamos a todo los demas. (Esto es para indicar que se envia a todos y no solo a uno o a todos menos el ultimo, como con broadcast)
    });

    socket.emit("messages", messages);//Al cargar la pagina, se envia un array vacio. Cuando un usuario nuevo entre o cuando uno actualice el navegador, podra ver el array de mensajes. De lo contrario, aparecera en blanco.
}); */

/* //Ejemplo 31: Usando mongoose desde cero
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./router/clase14.js";
import usersRoutes from "./router/users.routes.js"
import {password, PORT, db_name} from "./env.js";
import mongose from "mongoose";

const app = express();

mongose.connect(`mongodb+srv://germanss22:${password}@atlascluster.cna9ibu.mongodb.net/${db_name}?retryWrites=true&w=majority`)
.then(() => console.log("DB connected"))
.catch(err =>{
    console.log("Hubo un error");
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter);
app.use("/api/users", usersRoutes); // Routes
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 32: CRUD con Mongoose
// Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB Atlas llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.
// ✓ Crear una colección llamada "estudiantes" que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
//   a) nombre: tipo string
//   b) apellido: tipo string
//   c) edad: tipo number
//   d) dni: tipo string (campo único)
//   e) curso: tipo string
//   f) nota: tipo number
//   Tod0s los campos deben ser requeridos obligatoriamente ({ required: true })
// ✓ Insertar un arreglo de estudiantes a dicha colección
// ✓ Desarrollar los endpoints correspondientes al CRUD pensado para trabajar con esta colección
// ✓ Corroborar los resultados con Postman. */

/* //Ejemplo 33: Práctica integradora
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import Handlebars from "handlebars"; // Esto sirve para recorrer arrays en handlebars
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import {__dirname} from "./utils.js";

import viewsRoutes from "./router/views15.routes.js";
import productRoutes from "./router/product.routes.js";

const app = express();

mongoose.connect("mongodb+srv://SoldadoSS22:coder1234@clase15coder.msx0xsz.mongodb.net/Clase15?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.engine("hbs", handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewsRoutes);
app.use("/api/products", productRoutes); // Routes
app.listen(5500, () => console.log(`Server listening on port ${5500}`)); */

/* //Ejemplo 34: After 4
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import mongose from "mongoose";

import viewRouter from "./router/after4.js";
import usersRoutes from "./router/user.routes.js";
import postRouter from "./router/post.routes.js";

const app = express();

mongose.connect("mongodb+srv://german_SS22:coder1234@ClusterAfter4.hobtu25.mongodb.net/After4?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch(err =>{
    console.log("Hubo un error");
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter);
app.use("/api/users", usersRoutes); // Routes
app.use("/api/posts", postRouter); // Routes
app.listen(5500, () => console.log(`Server listening on port ${5500}`)); */

/* //Ejemplo 35: Indexacion

//Primera parte
// import mongoose from "mongoose";
// import { userModel } from "./models/user.model.js";

// const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

// async function entorno(){
//     await mongoose.connect(url);

//     // const result1 = await userModel.find({ first_name: "Celia" }).explain("executionStats");  console.log(result1); 
//     const result2 = await userModel.find({ $text: {$search: "@unesco"} }); console.log(result2); //Text Indexes   
// }
// entorno();




//Segunda parte
import mongoose from "mongoose";
import { userModel } from "./models/user.model.js";
import { courseModel } from "./models/course.model.js";

const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

async function entorno(){
    await mongoose.connect(url);                  // const user = await userModel.find({ first_name: "Fulano "})
    
    //Parte 1: Utilizando metodos de busqueda y actualizacion en los indices
    // await courseModel.create({ //Paso 1.- Creamos un nuevo curso y luego comentamos este linea de codigo.
    //     title: "Programación Backend",
    //     description: "Curso de Backend",
    //     difficulty: "Intermediate",
    //     professor: "Arturo",
    //     topics: ["Backend", "JavaScript", "Docker"],
    // });
    // const course = await courseModel.findById("6583e95a1e2bd3d3faac5566"); //Descomentamos esta linea y la siguiente para luego encontrar el curso segun si id. Importante recordar que aqui recivimos un objeto con los parametros establecidos
    // course.students.push("6582cc50da03636ef84f3beb"); //Una vez obtenido el objeto segun su id, ahora debemos agregar, al arreglo "students" que inicialmente esta vacio, el id 6582cc50da03636ef84f3beb. Pero hasta aqui, solo lo hemos agregado al objeto y NO a la base de datos.
    // const result = await courseModel.findByIdAndUpdate( {_id: course._id}, course ); //Finalmente, actualizamos la informacion en la base de datos. 
    // console.log("Result ", result); 
    // console.log("Course ", course);

    //Parte 2: Incorporacion de population
    // await courseModel.create({ //Paso 1.- Creamos un nuevo curso y luego comentamos este linea de codigo.
    //     title: "Programación Backend",
    //     description: "Curso de Backend",
    //     difficulty: "Intermediate",
    //     professor: "Arturo",
    //     topics: ["Backend", "JavaScript", "Docker"],
    // });
    // const course = await courseModel.findById("6583f152c9735ca1fd2ba348");
    // course.students.push("6582cc50da03636ef84f3beb");
    // const result = await courseModel.findByIdAndUpdate( {_id: course._id}, course );
    // const coursePopulate = await courseModel.findById("6583f152c9735ca1fd2ba348").populate("students");
    // console.log("Course ", coursePopulate); 

    //Parte 3: Utilizando middlewares
    // await courseModel.create({ //Paso 1.- Creamos un nuevo curso y luego comentamos este linea de codigo.
    //     title: "Programación Backend",
    //     description: "Curso de Backend",
    //     difficulty: "Intermediate",
    //     professor: "Arturo",
    //     topics: ["Backend", "JavaScript", "Docker"],
    // });
    // const course = await courseModel.findById("6583f763e93721d1e492fcf4");
    // course.students.push("6582cc50da03636ef84f3bce");
    // const result = await courseModel.findByIdAndUpdate( {_id: course._id}, course );
    // const coursePopulate = await courseModel.find(); //Con este linea recuperamos toda la informacion perteneciente "students", perteneciente a la base de datos (ver el archivo course.model.js).
    // console.log(JSON.stringify(coursePopulate, null, 2));
};

entorno(); */

// Ejemplo 36: Indexacion (Ejercicio propuesto por coderHouse)
import mongoose from "mongoose";
import { studenModel } from "./models/student.model.js";
import { courseModel } from "./models/course.model.js";

const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

async function entorno(){
    await mongoose.connect(url);      
    
    // await studenModel.create({
    //     first_name: "Hilda",
    //     last_name: "Carina",
    //     email: "hilda@gmail.com",
    //     gender: "Female",
    // });

    // await courseModel.create({
    //     title: "Curso de backend",
    //     description: "Es un curso de programacion para desarrollar servidores",
    //     difficulty: 5,
    //     topics: ["Javascript", "Servidores", "Frameworks", "Middlewares", "Base de datos"],
    //     professor: "German"
    // });

    let [student] = await studenModel.find({_id: "6583fe3291f88c0dd48df5a2"});
    // let [student] = await studenModel.find({_id: "6583fe3291f88c0dd48df5a2"}).populate("courses.course");
    // let [student] = await studenModel.find({_id: "6583fe3291f88c0dd48df5a2"}); //Esta linea es en caso de usar middlewares como en student.model.js
    student.courses.push({course: "6583fe3291f88c0dd48df5a4"});
    let result = await studenModel.updateOne({_id: "6583fe3291f88c0dd48df5a2"}, student);
    console.log(JSON.stringify(student, null, "\t"))
};

entorno();











