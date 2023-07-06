//         $$$$$$$$$$$$$$$ Funciones y funciones de orde superior $$$$$$$$$$$$$$$


/* //Ejemplo 1: Definicion de mi funcion
function saludar (){
    console.log("--> Hola !!");
}

 //Ejemplo 2: Llamado de mi funcion
for (let index = 0; index < 6; index++) {
    saludar();
} */

/* //Ejemplo 3: Definicion de mi funcion

function pedirNombre(){
    let nombreIngresado = prompt("Ingresar nombre");
    console.log("El nombre es: "+ nombreIngresado);
}

pedirNombre(); */

/* //Ejemplo 4: Como crear una funcion si necesito reiterar varias veces su funcionalidad

function pedirNombre(){
    let index = 0;
    let cantidad = 3;

    for (index; index < cantidad; index++) {
        let nombreIngresado = prompt("Ingresar nombre");
        alert("El nombre es: "+ nombreIngresado);
    }
}

pedirNombre(); */

/* //Ejemplo 5: Creacion de una funcion que recibe parametros
function verParametros(p1,p2){
    let res = p1 - p2;
    console.log("La resta es: ".concat(res));
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

verParametros(variable1, variable2); */

/* //Ejemplo 6: Creacion de una funcion que recibe parametros, esta calcula una resta aritmetica y devuelve su valor.
function resta(p1,p2){
    let res = p1 - p2;
    return res;
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

//let res = verParametros(variable1, variable2);
//console.log("El resultado es: " + res);

console.log("El resultado es: " + resta(variable1, variable2)); */

/* //Ejemplo 7: Uso de una funcion para validar una contrasena.

function passwordValidation(password, repeatPassword)
{
    if (password == "" || repeatPassword) 
    {
        console.log("Las contrasenas deben contener caracteres.");
    }

    if (password != repeatPassword) ;
    {
        console.log("Las contrasenas ingresadas no son iguales.");
    }

    if (password.length < 8);
    {
        console.log("La contrasena debe tener al menos 8 caracteres.");
    }

    if (password.length > 15);
    {
        console.log("La contrasena no debe tener mas de 15 caracteres.");
    }
} 

passwordValidation("123", "pass"); */

/* //Ejemplo 8: Uso del ambito de varaibles para cambiar el valor de variables globales
let res = 0;
function suma(num1, num2){
    res = num1 + num2;
}
suma(5,6);
console.log(res); */

/* //Ejemplo 9: Uso del ambito de varaibles para cambiar el valor de variables locales
let res = ""; //let resultado = undefined; let resultado = null;
function suma(num1, num2)
{
    let res = num1 + num2;
    return res; 
}
res = suma(5,6);
console.log(res); */

/* //Ejemplo 10: Creacion de variables anonimas y su uso.

const sum = function(a,b)
{
    return a + b;
};

const res = function(a,b)
{
    return a - b;
};

console.log( sum(15,20) );
console.log( res(15,5) ); */

/* //Ejemplo 11: Uso de finiciones flecha (Si es una funcion de una sola linea con retorno podemos evitar escribir el cuerpo.)

const add = (a, b) => {return a + b}; //Metodo 1 para utilizar flecha 
const subs = (a, b) => a - b;         //Metodo 2 para utilizar flecha

console.log( add(15,20));
console.log( subs(20,5));

//Ejemplo de practica - Si una funci�n es una sola l�nea con retorno y un par�metro puede evitar escribir los ().

const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const iva = x => x * 0.21;

let precioProducto = 500;
let descuento = 50;

let nuevoPrecio = resta( suma(precioProducto, iva(precioProducto)), descuento );
console.log(nuevoPrecio); */

/* //Ejemplo 1: Desarrollo de una funcion para conseguir la abstraccion de la suma consecutiva de numeros dentro de un rango.

let total = 0;
function sumarRango(inicio, fin){
    for (let i = inicio; i <= fin; i++) {
        total += i;
    }
    return total;
}
console.log( sumarRango(1, 100) ) 
console.log("La suma total de 1 hasta 10 es: "+ total.toString()); */

/* //Ejemplo 2: Retorno de funciones y concepto sobre funciones con un esquema superior

function mayorQue(n) {
    return (m) => m > n
}

// Retorna    (m) => m>17     y nos queda     mayorDeEdad = (m) => m>17    donde (m) contendra el valor que le mandaremos desde la linea 28. En este caso, ahora la variable
// mayorDeEdad se convertira en una funcion, en la cual (m) sera el parametro al que le llegara el valor enviado desde la linea 32, que es 5.
let mayorDeEdad = mayorQue(17); 

// Como tenemos que \ mayorDeEdad = (m) => m>17 /. Entonces nos damos cuenta que en la funcion ahora tenemos el parametro (m) y no (n) como en la primera funcion, por lo que 
//ahora desde la linea 32 mandamos un 5, que se almacenara en ese variable (m) y obtendremos que  5>17, lo que resulta como un valor booleano, que se almacena en "res".
let numero = parseInt(5); 
let res = mayorDeEdad(numero); 

if (res) {
    console.log("El numero "+ numero+ " es mayor que 17."+ mayorDeEdad);
}else{
    console.log("El numero "+ numero+ " NO es mayor que 17."+ mayorDeEdad);
} */

/* //Ejemplo 2.1: Retorno de funciones y concepto sobre funciones con un esquema superior


function mayorQue(n) {
    return (m) => m > n
}

let mayorQueDiez = mayorQue(10);
let mayorDeEdad = mayorQue(17);

let precioSuperiorA = mayorQue(100000);
let precioInferiorA = !mayorQue(100000);

let numero = parseInt(5); 
let res = mayorDeEdad(numero); 

if (res) {
    console.log("El numero "+ numero+ " es mayor que 17."+ mayorDeEdad);
}else{
    console.log("El numero "+ numero+ " NO es mayor que 17."+ mayorDeEdad);
} */

/* //Ejemplo 3: Retorno de funciones con un if.
function asignarOperacion (op) {
    if (op == "sumar") {
        return (a, b) => a + b
    }else if (op == "restar") {
        return (a, b) => a - b
    }
}
let suma = asignarOperacion ("sumar")
let resta = asignarOperacion ("restar")
console.log( suma(4, 6) ) // 10
console.log( resta(5, 3) ) // 2 */

/* //Ejemplo 4: Como podemos pasar por parametro una funcion (funcionalidad)
function porCadaElemento(elementos, funcionalidad){
    for (const unElemento of elementos) {
        funcionalidad(unElemento);
    }
}

function acumular(numero){
    total += numero;
}

let total = 0;
let numeros = [10, 20, 30, 40, 50];
porCadaElemento(numeros, console.log);
porCadaElemento(numeros, acumular);
console.log("El valor total de la suma de los elementos de "+ numeros.toString()+ " es: "+ total+"."); */


//         $$$$$$$$$$$$$$$ Objetos $$$$$$$$$$$$$$$


/* // Ejemplo 1: Definicion de caracteristicas para un objeto y como podemos ver los datos dentro del objeto
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
console.log("El objeto contiene estos datos: ", unPaciente);
console.log("El paciente se llama: ", unPaciente.nombre);         //Forma 1 de seleccionar una variable de un objeto
console.log("El paciente se apellida: ", unPaciente["apellidos"]);//Forma 2 de seleccionar una variable de un objeto */

/* // Elemplo 2: Aignacion de valores
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/* // Ejemplo 3: Definicion de un objeto sin datos definidos para sus propiedades.
let unPaciente = {DNI: undefined, apellidos: undefined, nombre: undefined, edad: undefined, altura: undefined, peso: undefined, generoBiologico: undefined, tipoSangre: undefined};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/* // Ejemplo 4: Definicion de una funcion constructora para un objeto
function paciente(DNI, apellidos, nombre, edad, altura, peso, generoBiologico, tipoSangre){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
this.altura = altura; 
this.peso = peso;
this.generoBiologico = generoBiologico;
this.tipoSangre = tipoSangre;
this.obraSocial = undefined;};

let paciente1 = new paciente("44555666","Cosme","Pricilla",undefined,183,65,"femenino",undefined);
console.log("Los datos actualizados son: ", paciente1); */

/* // Ejemplo 5: Ejemplo de aplicacion de metodos de un objeto
function producto(nombre, precio, cantidad){
    //propiedades
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    
    //. !parseInt(cantidad) --> es un valor booleano, si el n�mero es 10, se convierte en false, si es 0 se convierte en true.
    //   Pero nosotros necesitamos el valor equivalente real, si ingres� 10 quiero que sea true, si ingres� 0 quiero que sea false. Por ello es que agregamos dos negaciones !!
    //. !!parseInt(cantidad) --> lo que conseguimos con la !! es consegui el inverso de un elemento inverso. O sea, el valor booleano true de un elemento.
    //   Podemos definir un par�metro como (hayInventario) y en este pasar desde la funci�n constructora a partir de la palabra reservada new. Tener en cuenta que esta segunda opci�n nos "obliga" a manejar este dato y su valor durante la carga de los datos que el usuario indique.    
    
    //metodos
    this.toString = function(){
        return this.nombre;
    };

    this.Stock = (cantidadIncrementada) => {
        return this.cantidad += this.cantidad + parseInt(cantidadIncrementada);
    };

    this.comprar = (cantidadComprada) => {
        return this.cantidad -= parseInt(cantidadComprada);
    };
};

let nombre = "Carne";
let precio = "200";
let cantidad = "5";
let unProducto1 = new producto(nombre, precio, cantidad);
console.log("Los valores que cargaste para el producto son: ", unProducto1); */

/* // Ejemplo 6: Uso de las construcciones IN y FOR-IN
function paciente(DNI, apellidos, nombre, edad){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
};

let paciente1 = new paciente("44555666", "Cosme", "Pricilla", 24);

console.log("Existe la propiedad DNI dentro del objeto?", {resultado: "DNI" in paciente1});
//console.log("Existe la propiedad DNI dentro del objeto?", "DNI" in paciente1); //Esto es lo mismo que la linea de arriba

console.log("Existe la propiedad obraSocial dentro del objeto?", {resultado: "obraSocial" in paciente1});
//console.log("Existe la propiedad obraSocial dentro del objeto?", "obraSocial" in paciente1); //Esto es lo mismo que la linea de arriba

for(const iter in paciente1){ //Despues del const podemos poner cualquier nombre, el cual servira para iterar y buscar todas las propiedades del objeto.
    console.log("La propiedad ("+iter + ") tiene el valor de: "+ paciente1[iter]);
} */ 

/* // Ejemplo 7: Ejemplo practico con objetos y funciones 

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    calcAge0: function (birthYeah) {
        return 2037 - birthYeah;
    },

    calcAge1: function () {
        return 3000 - this.birthYeah;
    },
    
    calcAge2: function () {
        return this.age = 4000 - this.birthYeah;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge2() - this.birthYeah}years old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    //  return `${jonas.firstName} is a ${this.calcAge2()}-year old ${jonas.job}, and he has ${jonas.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(jonas);
console.log("res1: ",jonas.calcAge0(1991));
console.log("res2: ",jonas.calcAge1());
console.log("res3: ",jonas.calcAge2());
console.log("res4: ",jonas.age);
console.log("res5: ",jonas.getSummary()); 

const measureKelvin = function () {
    const measurement = {type: 'temp', unit: 'celsius', value: parseInt(100),};
    console.table(measurement);
    const kelvin = measurement.value + 273;
    return kelvin;
};

console.log(measureKelvin()); */

/* // Ejemplo 8: Definicion de una clase y uso de los metodos dentro de una clase

class producto{
    //Metodo constructor de una clase
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    };

    //Metodos y funciones
    nombreProducto() {
        return this.nombre;
    }

    incrementarStock(cantidadIncrementada) {
        this.cantidad = this.cantidad + parseInt(cantidadIncrementada);
    }

    comprar(cantidadComprada){
        this.cantidad = this.cantidad - parseInt(cantidadComprada);
    }
}

let unProducto = new producto("Papa", 400, 50);
console.log("Los datos del producto son: ", unProducto);
console.log("El nombre del producto es: "+ unProducto.nombreProducto());

unProducto.incrementarStock(10);
console.log("Compre 10 kilos mas de papa y ahora tengo: ", unProducto);
unProducto.comprar(40); 
console.log("Compre 40 kilos mas de papa y ahora tengo:", unProducto); */

/* // Ejemplo 9: Literales de objeto mejoradas

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
        [weekdays[3]]: {open: 12,close: 22,},
        [weekdays[4]]: {open: 11,close: 23,},
        [weekdays[5]]: {open: 0,close: 24,},
    };

    console.log(openingHours);

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order(starterIndex, mainIndex){  //order: function(starterIndex, mainIndex){   Ambas son lo mismo
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
}; */


//         $$$$$$$$$$$$$$$ Arrays $$$$$$$$$$$$$$$


/* //Ejemplo 1: Declaracion y manejo de un array con numeros que vamos a operar entre ellos

const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"]; console.log("Los datos del vector son: ", VECTOR_DE_CADENAS);
const VECTOR_DE_BANDERAS = [true, false, true, false];console.log("Los datos del vector son: ", VECTOR_DE_BANDERAS);
const VECTOR_HETEROGENEO = [2023, "german", true, 22]; console.log("Los datos del vector son: ", VECTOR_HETEROGENEO);
const MI_ARRAY_DE_NUMEROS = [10, 20, 50, 80]; console.log("Los datos del vector son: ", MI_ARRAY_DE_NUMEROS);

const res1 = MI_ARRAY_DE_NUMEROS[2] + MI_ARRAY_DE_NUMEROS[3]; console.log("El resultado es: "+ res1);
const res2 = VECTOR_DE_CADENAS[0] + " " + VECTOR_DE_CADENAS[2]; console.log("Los datos del vector son: ", res2);
const res3 = MI_ARRAY_DE_NUMEROS[0] + VECTOR_DE_CADENAS[2]; console.log("El resultado es: ", res3); */

/* //Ejemplo 2: Como recorremos un array
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
//for (let i = 0; i < VECTOR_DE_CADENAS.["length"]; i++) {
for (let i = 0; i < VECTOR_DE_CADENAS.length; i++) {
    console.log("El elemento en la posicion " + i + " es el nombre: "+ VECTOR_DE_CADENAS[i])    
} */

/* //Ejemplo 3: Como anadir elementos en x posicion sustituyendo el de esa misma posicion
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "karla";
VECTOR_DE_CADENAS[2] = nombre;
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 4: Recorrer un array con |for-of|
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0, close: 24,}, // Open 24 hours
    },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const res of menu) {
//     console.log(res);
// }

// for (const item of menu.entries()) {
//     console.log(item);
// }

for (const item of menu.entries()) {
    console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log("\n");

for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
} */

/* //Ejemplo 5: Conocer la cantidad de elementos que tiene nuestro array con  |.length()|
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
console.log("Cuantos elementos tengo en mi array?", VECTOR_DE_CADENAS.length);
console.log("Cual es la posicion de mi ultimo elemento dentro de mi array?", VECTOR_DE_CADENAS.length-1) */

/* //Ejemplo 6: Como anadir elementos a un array con  |.push()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.push(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 7: Como anadir elementos al principio de un array con |.unshift()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.unshift(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 8: Como eliminar elementos en la primer posicion de un array con |.shift|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.shift();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 9: Como eliminar elementos en la ultima posicion de un array con |.pop()|

let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.pop();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 10: Como eliminar y eliminar uno o mas elementos de un array con |.splice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.splice(1,2); //1 = la posicion - 2 = cantidad de numeros a eliminar a partir de 1
console.log("Los elementos removidos dentro del array son ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);

console.log("\n");

let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez", "junior"];
let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, "karla", "res"); //1 = la posicion - 0 = cantidad de numeros a eliminar a partir de 1
//let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, ["marquez", "beatriz"]);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS1);
console.log("Los elementos removidos dentro del array son ", elementoRecuperado1); */

/* //Ejemplo 11: Obtener una cadena con cada uno de sus elementos concatenados, separados con un caracter o cadena especial con |.join()|.
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let resultadoDelJoin = VECTOR_DE_CADENAS.join(", ");
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 13: Combinar los elementos de dos arrays con |.concat()|
let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez"], VECTOR_DE_CADENAS2 = ["Karla", "beatriz", "marquez"];
let resultadoDelJoin = VECTOR_DE_CADENAS1.concat(VECTOR_DE_CADENAS2);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 14: Tomar un conjunto de elementos de dentro de un array y generar un nuevo array con ellos con |.slice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior", "karla"];
let resultadoDelSlice = VECTOR_DE_CADENAS.slice(2, 5); //2 = esta posicion no se toma, sino la siguiente. 5 = limite que se toma en cuenta
console.log("La cadena generada con nombres es: ",resultadoDelSlice); */

/* //Ejemplo 15: Conocer la posicion de un elemento dentro de un array (si existe o no) con |.indexof()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let posicionDeMancilla = VECTOR_DE_CADENAS.indexOf("chavez");
console.log("La cadena generada con nombres es: ",posicionDeMancilla);

let posicion = VECTOR_DE_CADENAS.indexOf("karla");
posicion != -1 ? console.log("El nombre esta en la posicion: ", posicion) : console.log("El nombre NO existe"); */

/* //Ejemplo 16: Conocer si existe o no un elemento dentro de un array (Valor booleano) con |.includes()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "mancilla"
let existe = VECTOR_DE_CADENAS.includes(nombre);

existe ? console.log("El nombre SI existe") : console.log("El nombre NO existe"); */

/* //Ejemplo 17: Tomar al array e invertir el orden de sus elementos con |.reverse()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
VECTOR_DE_CADENAS.reverse();
console.log("--> El array con los nombres cambiados de lugar es", VECTOR_DE_CADENAS); */

/* //Ejemplo 18: como iterar sobre los elementos de un array, no importa si posee valores simples u objetos, con |.foreach()|

class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" ($"+ this.precio.toFixed(2) +")"
    };
    //convertirEnString = () => {return this.id + ". " + this.nombre +" ($"+ this.precio.toFixed(2) +")"};
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];

misProductos.forEach( (unProducto) => {
    console.log( "--> "+unProducto.convertirEnString() );
}); */

/* //Ejemplo 19: como para hallar un elemento dentro de la coleccion (el PRIMER elemento), con |.find()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];
 
let nombreBuscado = "mermelada";
let unProductoBuscado1 = misProductos.find(unProducto => {
    return unProducto.nombre.includes( nombreBuscado.toUpperCase()); 
    //El metodo includes() retorna true o false si existe algo en el array, y este seguira iterando aunque ya haya retornado algo. Ahora bien, con el includes, unicamente 
    //retornara un elemento, puesto que es la funcion principal de find(), retornar lo primero que encuentre nada mas.
});

// let nombreBuscado = "pan lactal";
// let unProductoBuscado1 = misProductos.find(unProducto => unProducto.nombre == nombreBuscado.toUpperCase()); console.log(unProductoBuscado1);

if (unProductoBuscado1 !== undefined) {
    console.log("El producto buscado es: "+ unProductoBuscado1.convertirEnString());
} else {
    console.log("No encontramos el producto con nombre: "+ nombreBuscado);
} */

/* //Ejemplo 20: como hallar todos los elementos dentro de la coleccion que cumplan con una condicion, con |.filter()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "Mermelada de naranja", 189.88),
    new producto (10,"Mermelada de fresa", 356.24),
];

let nombreBuscado = "Mermelada";
let productoHallados = misProductos.filter( (unProducto) => unProducto.nombre.includes( nombreBuscado.convertirEnString() ));
console.log("Numero de productos hallados con el nombre "+ "'"+`${nombreBuscado}`+"'" +" son: "+ productoHallados.length+ " y tienen los siguientes nombres: ", productoHallados); */

/* //Ejemplo 21: como saber si un elemento dentro de la coleccion existe o no, con |.some()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombreBuscado = "AZUCAR";
let existe = misProductos.some( (unProducto) => {
    return unProducto.nombre === nombreBuscado.toUpperCase();
});

if (existe) {
    console.log("El producto buscado SI existe");
} else {
    console.log("El producto buscado NO existe");
} */

/* //Ejemplo 22: como enlistar solamente los nombres de los productos, con |.map()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombres, preciosIncrementados;

nombres = misProductos.map( (unProducto => unProducto.nombre));
console.log("1. Los nombres del array son: ", nombres);

preciosIncrementados = misProductos.map( (unProducto) => {
    return incrementarPrecio(unProducto.precio, 10)
});
console.log("2. Los precios incrementados seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map( (unProducto) => {
    return new producto (unProducto.id, unProducto.nombre, incrementarPrecio(unProducto.precio, 10));
});
console.log("3. Los precios incrementados en forma de array seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map( (unProducto) => {
    return {id: unProducto.id, nombre: unProducto.nombre, precio: incrementarPrecio(unProducto.precio, 10)}
});
console.log("4. Los precios incrementados forma de objeto seran: ", preciosIncrementados);

function incrementarPrecio(precio, porcentaje){
    return precio + (precio * (porcentaje/100) )
} */

/* //Ejemplo 23: como calcular el valor total de una compra, con |.reduce()|

class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let preciosTotales = misProductos.reduce( (acumulador, unProducto) => acumulador + unProducto.precio, 0);
console.log("El total de la suma es: "+ preciosTotales.toFixed(2)); */

/* //Ejemplo 24: como re-ordenar nuestro array (es DESTRUCTIVO, cambia su posicion), con |.sort()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

// Utilizar una de las 6 opciones a la vez porque todas al mismo tiempo no funcionaran.
// misProductos.sort( (first, second) => first.id - second.id);                        console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => first.id - second.id);                        console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.nombre.localeCompare(second.nombre));   console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.nombre.localeCompare(first.nombre));   console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.precio - second.precio);                console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.precio - first.precio);                console.log("Forma descendente: ", misProductos); */


//         $$$$$$$$$$$$$$$ STRINGS & MODERN OPERATORS $$$$$$$$$$$$$$$


/* // Ejemplo 1: uso de los operadores Suggar Syntax con operaciones aritméticas sencillas como +, -, /, *. Te dejo para que investigues cómo se realizaría la potenciación (exponenciación).

// Operador adición ++ (en una sola unidad)
let num = 10;
console.log("--> El valor actual del nùmero es " + num);
num++;
console.log("--> El valor actual del nùmero es", {num}); 

// Operador sustracción -- (en una sola unidad)
let numB = 10;
console.log("--> El valor actual del nùmero es " + numB);
numB--;
console.log("--> El valor actual del nùmero es", {numB});

// Aplicar los mismos operadores pero con dos valores
let numeroUno = parseInt(prompt("Ingrese el numero 1"));
let numeroDOs = parseInt(prompt("Ingrese el numero 2"));

// Adición
numeroUno += numeroDOs;
console.log("--> El resultado de la suma de los dos valores es", {numeroUno});

// Sustracción
numeroUno -= numeroDOs;
console.log("--> El resultado de la resta de los dos valores es", {numeroUno});

// División
/* numeroUno /= numeroDOs;
console.log("--> El resultado de la división de los dos valores es", {numeroUno});

// Producto
numeroUno *= numeroDOs;
console.log("--> El resultado de la multiplicación de los dos valores es", {numeroUno}); */

/* // Ejemplo 2: Uso del oeprador ternario (simplificación de la estructura IF-ELSE)
let tempt = 31;
let diaCaluroso;

tempt > 30 ? (diaCaluroso = true) : (diaCaluroso = false);

alert("--> La evalaución resulto " + diaCaluroso); */

/* // Ejemplo 4: Operador lógico AND
let carrito = [];
let carritox2 = [{id: 10, nombre: "Play Station 5"}];

//(condición lógica) && (return si true);
// El return por default en caso de false, es false.

carrito.length == 0 && console.log("--> El carrito está vacío");
carritox2.length == 1 && console.log("--> El carritox2 está lleno"); */

/* // Ejemplo 5: Operador Lógico OR

// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
console.log("Hola Mundo" || "Falsy"); // Hola Mundo
console.log(40 || "Falsy"); // 40
console.log(true || "Falsy"); // true
console.log(0 || "Falsy"); // Falsy
console.log("" || "Falsy"); // Falsy
console.log(null || "Falsy"); // Falsy
console.log(undefined || "Falsy"); // Falsy
console.log(NaN || "Falsy"); // Falsy
console.log(false || "Falsy"); // Falsy 

let numero = 15;
const numerSelected = numero || 0 ;
console.log("--> numerSelected", {numerSelected}); */

/* // Ejemplo 6: Nullish Coalescing
// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
 console.log(0 ?? "Nullish"); // 0
console.log(40 ?? "Nullish"); // 40
console.log("Hola Mundo" ?? "Nullish"); // Hola Mundo
console.log("" ?? "Nullish"); // ""
console.log(NaN ?? "Nullish"); // NaN
console.log(true ?? "Nullish"); // true
console.log(false ?? "Nullish"); // false
console.log(null ?? "Nullish"); // Nullish
console.log(undefined ?? "Nullish"); // Nullish */

/* // Ejemplo 7: uso dep operador de acceso condicional ?
const usuarios = [];
const usuario = usuarios.find((u) => u.name == 100);

console.log(usuario.nombre || "El usuario no existe"); //Error: "No se pueden leer propiedades de NULL"
console.log(usuario?.nombre || "El usuario no existe"); //"El usuario no existe" */

/* // Ejemplo 8: Uso del acceso condicional con más de un atributo (propiedad)
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

for (const res of days) {
    const open = restaurant?.openingHours[res]?.open ?? "closed";
    console.log(`On ${res}, we open at ${open}`);
}

console.log(restaurant.order ?. (0,1) ?? "Error");
console.log(restaurant.orderNew ?. (0,1) ?? "Error"); */

/* // Ejemplo 9: Looping Objects: Object Keys, Values, and Entries
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

const properties1 = openingHours; console.log(properties1);
const properties = Object.keys(openingHours); console.log("Object.keys()", properties);
const values = Object.values(openingHours);  console.log("Object.values()", values);
const entries = Object.entries(openingHours);  console.log("Object.entries()", entries);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
    openStr = openStr + `${day}, `
}
console.log(openStr);

for (const [day, {open, close}] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
} */

/* // Ejemplo 10: Desestructuración de arrays y objetos
const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0,close: 24,},
    },

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2: function({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
};

const [first, , second] = restaurant.categories; 
console.log("Desestructuracion de un array: ",first, second);

const [starter, main] = restaurant.order(2,0); 
console.log("Desestructuracion usando funcion: ",starter, main);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; 
console.log("Desestructuracion con Nested: ", i, j, k);

const [p=1, q=1, r=1] = [8, 9]; 
console.log("Desestructuracion con Default values: ", p, q, r);

const {Name, categories, openingHours, openingHours:{ sat }, info} = restaurant;
console.log("Desestructuracion de un objeto: ", Name, categories, openingHours, sat, info, {info}); //Deconstruimos el objeto y se crean nuevas variables, las cuales son las que estan entre los corchetes. Se debe de igualar con el nombre del objeto.


const {Name: restaurantName, categories: tags, openingHours: hours} = restaurant;
console.log("Desestructuracion de un objeto con uso del alias: ", restaurantName, tags, hours);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log("Cambiando el nombre de la variable en objeto: ", menu, starters);

let a = 111, b = 999;
const obj = {
    a: 23, b: 7, c: 14
};

({a, b} = obj);
console.log("Desestructuracion de un objeto con mutating variables: ",a, b);

const { fri: {open: x, close: y} } = openingHours;
console.log("Desestructuracion de un objeto con nested objects: ",x, y);

function desestructurar(item){
    const {Name, location} = item;
    console.log("Desestructuracion en parámetros", Name, location);
}
desestructurar(restaurant);

restaurant.orderDelivery({
    time: "22:30",
    address: "Tijuana, 22",
    mainIndex:"2", 
    starterIndex:"2"
});

restaurant.orderDeliveryX2({
    address: "Tijuana, 22",
    starterIndex:"1"
}); */

/* // Ejemplo 11: Aplicación de la desestructuración para el evento del click
window.addEventListener("click", (event) => {
    console.log(event.x, event.y);
});

window.addEventListener("click", ({ x, y }) => {
    console.log(x, y);
}); */

/* // Ejemplo 12: Operacion de spreading con Arrays
const nombres1 = ["Juan", "Julieta"], nombres2 = ["Carlos", "Mariela"];
const array = [...nombres1, ...nombres2]; // spread de los dos arrays dentro de otro
const nombresObjeto = {// spread del array en un objeto
    ...array,
};

console.log("--> El nuevo array es: " , array);
console.log("--> El spread de un string se define como: ", [...nombres1[0]]);
console.log("--> Si queremos agregar algo mas al array con spread, hacemos lo siguiente: ", [...array, "German"]);
console.log("--> El resultado del spread del array en un objeto es", nombresObjeto); // { '0': 'Juan', '1': 'Julieta', '2': 'Carlos', '3': 'Mariela' }
console.log("--> Acceder a una propiedad especìfica es: " + nombresObjeto["2"]);

console.log("\n");

const profile = {id_profile: 300, profile_name: "Operador", profile_created_date: new Date(), password: "123"};
const user = {id_name: 500, user_name: "Chaman", user_lastname: "Coderhouse", contact: {email: "chaman.profe@gamail.com", mobile: "1111454545"}};
const menus = {id_menus: 9, actions: ["Ver operadores", "Editar nóminas", "Otorgar permisos"]};
const userProfile = {...profile, id_profile: profile.id_profile, profile_name: profile.profile_name, password: undefined};
const allObjects = {...profile, ...user, ...menus};
console.log("--> Los datos de los objetos Perfil y Usuario", userProfile);
console.log("--> Los datos del objeto con el spread de todos los objetos es: ", allObjects);

console.log("\n");

const numeros = [4, 77, 92, 10, 3, -32, 54, 11];
console.log(Math.max(numeros)); // NaN
console.log("--> Spredading de Array: ", ...numeros, "y el Math.max es: ", Math.max(...numeros));
console.log("--> Equivalente a la anterior: ", Math.max(4, 77, 92, 10, 3, -32, 54, 11)); */

/* // Ejemplo 13: Rest parameters

sumar_1(10, 15, 30, 5, 13, 47, 98); // [10, 15, 30, 5, 13, 47, 98]
console.log("Res 2: ", sumar_2(10, 15, 30, 5) ) // 60

function sumar_1(...numeros) {
    console.log("Res 1: ", numeros);
}

function sumar_2(...numeros) {
    return numeros.reduce((acumulador, unProducto) => acumulador + unProducto, 0);
} */

/* // Ejemplo 14: Uso de Set
const orderSets = new Set(["res", "german", "mancilla", "chavez", "res", "ss22", "res,"])
console.log(orderSets);
console.log(orderSets.size);
console.log(orderSets.has("pizza"));
console.log(orderSets.has("german"));
orderSets.add("ps4");
orderSets.add("ps8")
orderSets.delete("res")
console.log(orderSets);

for (const order of orderSets) {
    console.log(order);
}

const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); */

/* // Ejemplo 15: Uso de Map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const time = 8;
console.log(rest.get( time > (rest.get('open') && time < rest.get('close')) ));

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr)); */

/* // Ejemplo 16: Uso de Map con iteration

// Maps: Iteration
const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
]);         console.log(question);


openingHours = { thu: {open: 12,close: 22}, fri: {open: 11,close: 23}, sat: {open: 0,close: 24} }
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log("Convert object to map: ", hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}

const answer = 3;
console.log(question.get(question.get('correct') === answer));

//Convert map to array
console.log([...question]);
console.log(question.entries());

console.log([...question.keys()]);
console.log([...question.values()]); */

/* // Ejemplo 17: Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann'); */

/* // Ejemplo 18: Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + ""; // Lo que esta a la derecha de number es para convertir el dato de tipo numero a string.
    const last = str.slice(-4);
    const res = last.padStart(str.length, '*');
    return res;
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747')); */

/* // Ejemplo 19: Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(3));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12); */

/* // Ejemplo 20: Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1)); */

/* // Ejemplo 21: Working With Strings - Part 2

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection'); */

/* // Ejemplo 22: Working With Strings - Part 3

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// console.log(flights.split("+"));
for (const iter of flights.split("+")) {
    // console.log(iter.split(";"));
    const [type, from, to, time] = iter.split(";");
    const output = `${type.startsWith('_Delayed') ? '🔴' : ""} ${type.replaceAll("_", " ")} from ${getCode(from)} to ${getCode(to)} (${time.replace(":", "h")})`.padStart(45);
    console.log(output);
}

function getCode(str){
    return str.slice(0, 3).toUpperCase();
} */

/* // Ejemplo 23: Exercise for Data Structures, Modern Operators and Strings (1)
// Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data. Your tasks:

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        ['Neuer','Pavard','Martinez','Alaba','Davies','Kimmich','Goretzka','Coman','Muller','Gnarby','Lewandowski'],
        ['Burki','Schulz','Hummels','Akanji','Hakimi','Weigl','Witsel','Hazard','Brandt','Sancho','Gotze']
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski','Hummels'],
    date: 'Nov 9th, 2017',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }
    
};

//1. Create one player array for each team (variables 'players1' and'players2')
const [players1,players2] = game.players;       //console.log(players1, players2);

//2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;         //console.log(gk, fieldPlayers);

//3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players1];  //console.log(allPlayers);

//4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1]; //console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {team1, x:draw, team2} = game.odds;   //console.log(team1, draw, team2);

//6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
function printGoals(...players){ //Debemos desestructurar lo que mandamos a esta funcion tambien porque, al ser 4 elementos los que recibe, y si no hacemos eso, entonces unicamente se enviara el primer elemento y no los demas. 
    //console.log(players, "and "+ `${players.length}` + " goals were scored");
}
printGoals(...game.scored);

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator. 
let res = game.team2 > game.team1 && "Team 2 is more likely to win!!";  //console.log(res);
let res2 = game.team2 < game.team1 && "Team 1 is more likely to win!!";  //console.log(res2);

//8. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, player] of game.scored.entries()) {
    //console.log(`Goal ${i + 1}: ${player}`);
}

//9. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let average = 0;
for (const odd of Object.values(game.odds)) {
    average = average + odd/3;
}
//console.log(average);

//10. Print the 3 odds to the console, but in a nice formatted way, exactly like this: Odd of victory Bayern Munich: 1.33, Odd of draw: 3.25, Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names
for (const [team, odd] of Object.entries(game.odds)) {
    let res = ( team === "x" ? "draw" : ("victory "+ game[team]) ); // team retorna un string, en este caso, sera team1 y team2. Pero, al ser ambos de tipo STRING, quiere decir que vienen de esta forma "team1" y "team2". Por eso al final queda game[team], si necesidad de poner los "".
    //console.log(`Odd of ${res}: ${odd}`);
}

//11. Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value: { Gnarby: 1, Hummels: 1, Lewi: 2}
const scorers = {};
for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);//En la primer y segunda iteracion no existe nada. No es hasta la tercera iteracion cuando ahi se repite "Lewandowski", por lo que ahora en este caso, se le suma 1.
};      //console.log(scorers);

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '↩️ Substitution'],
    [47, '⚽ GOAL'],
    [61, '↩️ Substitution'],
    [64, '🟨 Yellow card'],
    [69, '🟥 Red card'],
    [70, '↩️ Substitution'],
    [72, '↩️ Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🟨 Yellow card'],
]);


// 12. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set((gameEvents.values()));   console.log(events);

// 13. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);   console.log(gameEvents.values());

// 14. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(`An event happened, on average, every ${(90/gameEvents.size)} minutes`);
const des = [...gameEvents.keys()].pop();

// 15. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game: [FIRST HALF] 17: ⚽ GOAL
for (const [key, value] of gameEvents) {
    console.log( key < 45 ? `[FIRST HALF] ${key + ": " + value}` : `[SECOND HALF] ${key + ": " + value}` );
} */

/* // Ejemplo 24: Exercise for Data Structures, Modern Operators and Strings (2)
// Write a program that receives a list of variable (SEE BELOW) names written in underscore_case and convert them to camelCase.

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase    ✅
// firstName         ✅✅
// someVariable      ✅✅✅
// calculateAge      ✅✅✅✅
// delayedDeparture  ✅✅✅✅✅

// Hints:
// § Remember which character defines a new line in the textarea
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 


document.body.append(document.createElement('textarea'));

let btn = document.createElement("button");
btn.innerHTML = "Click Me";
document.body.append(btn);

document.querySelector("button").addEventListener("click", function(){
    const text = document.querySelector("textarea").value;
    const rows = text.split("\n");

    for (const [i, iter] of rows.entries()) {
        let [first, second] = iter.toLowerCase().trim().split("_");
        let output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
        console.log(`${output.padEnd(20, " ")}${"✅".repeat(i + 1)}`);
    }
}); */


//         $$$$$$$$$$$$$$$ Fechas $$$$$$$$$$$$$$$


/* //Ejemplo 1: Acceso a propiedades del objeto Math, y metodo Min y Max. 
console.log("--> euler: "+ Math.E);
console.log("--> pi: "+ Math.PI);

const numeros = [55, 13, -25, 93, 4]; 
console.log("Los numeros SIN spread son: ",numeros);
console.log("Los numeros CON spread son: ",...numeros); //... pasan de un array a cada numero separado de manera individual
const minimo = Math.min(...numeros); 
const maximo = Math.max(...numeros);
console.log("El menor es: ", minimo);
console.log("El mayor es: ", maximo); */

/* //Ejemplo 2: Aplicacion para metodo de redondeo con ceil, floor, round y Aplicacion para metodo de raiz cuadrada
console.log(Math.ceil(.95));   // Expected output: 1
console.log(Math.ceil(4));     // Expected output: 4
console.log(Math.ceil(7.004)); // Expected output: 8
console.log(Math.ceil(-7.004));// Expected output: -7

console.log("\n");

console.log(Math.floor(.95));   // Expected output: 0
console.log(Math.floor(4));     // Expected output: 4
console.log(Math.floor(7.004)); // Expected output: 7
console.log(Math.floor(-7.004));// Expected output: -8

console.log("\n");

console.log(Math.round(20.49));
console.log(Math.round(20.50));
console.log(Math.round(-20.50));
console.log(Math.round(-20.51));

console.log("\n");

let x;
x= Math.sqrt(9); console.log("El valor de la raiz de 9 es: ", x.toFixed(4));
x= Math.sqrt(2); console.log("El valor de la raiz de 2 es: ", x.toFixed(4));
x= Math.sqrt(1); console.log("El valor de la raiz de 1 es: ", x.toFixed(4));
x= Math.sqrt(0); console.log("El valor de la raiz de 0 es: ", x.toFixed(4));
x= Math.sqrt(-1); console.log("El valor de la raiz de -1 es: ", x.toFixed(4)); */

/* //Ejemplo 3: Uso del metodo random para la generacion de numeros psudo-aleatorios, entre [0, 1), entre [0, limite) y entre [limiteInferior, limiteSuperior).

for (let i = 0; i < 5; i++) {
    console.log(Math.random());
}

console.log("\n");

let limite = parseInt(10);
for (let i = 0; i < 5; i++) { 
    console.log(Math.random()*limite);
}

console.log("\n");

let limiteInferior = parseInt(0);
let limiteSuperior = parseInt(100);
for (let i = 0; i < 5; i++) {
    const x = Math.random()*(limiteSuperior-limiteInferior) + limiteInferior;   console.log(x);
} */

/* //Ejemplo 4: Transformamos en una funcion el codigo del ejemplo 11

function generateRandomNumber (limiteInferior, limiteSuperior){
    return Math.random()*(limiteSuperior-limiteInferior) + limiteInferior
}

const generateRandomNumberVar = (limiteInferior, limiteSuperior) => Math.random()*(limiteSuperior-limiteInferior) + limiteInferior;

let limiteInferior = parseInt(0);
let limiteSuperior = parseInt(1000);

for (let i = 0; i < 5; i++) {
    const x = generateRandomNumber(limiteInferior, limiteSuperior);
    const y = generateRandomNumberVar(limiteInferior, limiteSuperior);
    console.log(x, y);
} */

/* //Ejemplo 5: Obtener la fecha y hora actuales. Creacion de instancias de objetos Date con la clase date con fechas personalizadas. Y obtener datos de las fechas en formato STRING.

let fechaActual = new Date();  console.log("La fecha actual del sistema es: ", fechaActual);
let fecha1 = new Date(2023, 3, 22);  console.log("La fecha actual del sistema es: ", fecha1);
let fecha2 = new Date(2023, 11, 24, 23, 59, 59);  console.log("La fecha actual de navidad es: ", fecha2); 

console.log("\n");

console.log("Los valores singulares de la fecha de navidad son: ",{
    numeroMes: fecha2.getMonth(),
    anio: fecha2.getFullYear(),
    numeroSemana: fecha2.getDay(),
    hora: fecha2.getHours(),
    minutos: fecha2.getMinutes(),
    segundos: fecha2.getSeconds()
});

console.log("\n");

//Obtener los datos de las fechas en cadenas de texto (STRING)
console.log("toDateString: ", fechaActual.toDateString());
console.log("toLocalString: ", fechaActual.toLocaleString());
console.log("toLocalDateString: ", fechaActual.toLocaleDateString());
console.log("toTimeString: ", fechaActual.toTimeString());
console.log("toLocaleTimeString: ", fechaActual.toLocaleTimeString());

const hoy = new Date("December 17, 2021" )
console.log( hoy.toDateString() ) // Fri Dec 17 2021
console.log( hoy.toLocaleString () ) // 17/12/2021 00:00:00
console.log( hoy.toLocaleDateString () ) // 17/12/2021
console.log( hoy.toTimeString() ) */

/* //Ejemplo 6: Como calcular la diferencia entre 2 fechas 
let fechaMiCumple = new Date(2024, 4, 22);
let hoy = new Date();

// diferencia = fechaSuperior - fechaInferior
const diferencia = fechaMiCumple - hoy;// Marca de timempo (milisegundos)
const milisegundosPorDia = 86400000; // 86400000mS = 86400s = 1440min = 24h
console.log("--> La diferencia de fechas entre hoy y mi cumpleanos es: " + Math.round((diferencia/milisegundosPorDia))); */


//         $$$$$$$$$$$$$$$ DOM & EVENTOS $$$$$$$$$$$$$$$


/* //Ejemplo 1: Acceso a la variable global document y sus propiedades
console.log("Cual es nuestro body? ", document.body);
console.log("Cual es nuestro body? ", document.head); */

/* //Ejemplo 2: Obtener un elemento del HTML con su identificador unico (ID)
console.log("Nuestra etiqueta con el titulo es: ", document.getElementById("bienvenida"));

let tema = document.getElementById("temaClase");
console.log("Este es el tema de la clase: ",tema); */

/* //Ejemplo 3: Como recuperar elementos a partir de su clase
let textos = document.getElementsByClassName("texto");
console.log("Los elementos de nuestra pagina que contienen la clase 'texto' son: ",textos); */

/* //Ejemplo 4: Como recuperar elementos a partir de su etiqueta HTML
let recuperados = document.getElementsByTagName("h1");
console.log("Los elementos de nuestra pagina que estan fabricados a partir de la etiqueta HTML 'h1' son: ",recuperados);

let parrafos = document.getElementsByTagName("p");
console.log("Los elementos de nuestra pagina que estan fabricados a partir de la etiqueta HTML 'p' son: ",parrafos); */

/* //Ejemplo 5: Recorrer una coleccion de nodos devueltos por alguna query
let items = document.getElementsByTagName("li");
console.log("Los elementos de nuestra pagna que estan fabricados a partir de la etiqueta HTML son: ",items);

for (const unItem of items) {
    console.log("--> ", unItem);
} */

/* //Ejemplo 6: Como modificamos el contenido del texto de un nodo
let frase_obtenida = prompt("Que quieres mostrar? ");
let nodo = document.getElementById("frase");
console.log("El texto original que modificaremos es: ", nodo.innerText);
nodo.innerText = frase_obtenida; */

/* //Ejemplo 7: Como modificamos el contenido del texto de un nodo (ejemplo 1)
let sub = document.getElementById("subtitulo");
sub.innerHTML = "<strong>Hola soy german!!</strong>";
sub.className = "coloreado";

// document.getElementById("subtitulo").className = "coloreado";
// document.getElementById("subtitulo").innerHTML = "<strong>Hola soy german!!</strong>"; */

/* //Ejemplo 8: Como modificamos el contenido del texto de un nodo (ejemplo 2)
let cardButton = document.getElementById('frase');
cardButton.classList.add('estilo_frase'); */

/* //Ejemplo 9: Crear una lista de elementos a partir del contenido de un array y luego eliminar nodos
let paises = ["Argentina", "Brazil", "Mexico", "Peru", "Suecia"];
let nodoPaises = document.getElementById("paises"); //Obtenemos el elemento "paises" del HTML

nodoPaises.innerHTML = ""; //Al dejar las comillas vacias, se borra el contenido del elemento "paises" en el HTML.

for (const unPais of paises) {
    let nuevoItem = document.createElement("li"); //Creamos un elemento "li" para el elemento "ul" del HTML
    nuevoItem.innerText = unPais; //Le agregamos el nombre que se encuentra en la posicin "unPais". Que va desde "Argentina" hasta "Suecia".
    nodoPaises.append(nuevoItem); //Una vez que creamos el nuevo elemento "li", es importante AGREGARLO, ya que unicamente lo creamos en la linea anterior.
}

let paisesRecuperados = document.getElementsByTagName("li");
console.log("-->", paisesRecuperados);
paisesRecuperados[4].remove(); */

/* //Ejemplo 10: Escribir dentro de los inputs a travez del value
let nombre = prompt("Cual es tu nombre?");
let apellido = prompt("Cual es tu apellido?");

document.getElementById("nombres").value = nombre;
document.getElementById("apellidos").value = apellido; */

/* //Ejemplo 11: Uso de plantillas
const producto = {id: 1001, nombre: "Carne asada", precio: 140};

//Creamos un elemento div 
let contenedor = document.createElement("div");

//Definimos el innerHTML del elemento con una plantilla de texto
contenedor.innerHTML = `<h3> ID: ${producto.id}</h3><p> Producto: ${producto.nombre}</p><b> $ ${producto.precio}</b>`;

//Agregamos el contenedor creado al body
document.body.appendChild(contenedor);

//Formas de concatenar o mostrar en pantalla
let concatenado = "id: "+ unProducto.id+" - Nombre: "+ unProducto.nombre + " - precio: $"+ unProducto.precio;   console.log("Concatenado", concatenado);
let plantilla = `id: ${unProducto.id} - Nombre: ${unProducto.nombre} - Precio: $${unProducto.precio}`;       console.log("Plantilla  ", plantilla);  */

/* //Ejemplo 12: Acceder a un elemento con el querySelector
let nodo1 = document.querySelector("#formulario .mb-3");
console.log("QuerySelector", nodo1); */

/* //Ejemplo 13: Acceder a un elemento con el querySelectorAll
let nodo2 = document.querySelectorAll("#formulario .mb-3");
console.log("QuerySelector", nodo2); */

/* //Ejemplo 14: Agregar un elemento con estilizado (ejemplo 1)
const producto = {id: 1001, nombre: "Carne asada", precio: 140};
var contenedor = document.createElement("div");
contenedor.style.marginTop = "50px";
contenedor.style.marginBottom = "50px";
contenedor.style.padding = "40px";
contenedor.style.borderRadius = "20px";
contenedor.style.background = "rgb(1, 135, 108)";
contenedor.style.color = "rgb(250, 255, 255)";
contenedor.style.opacity = "0.8";
contenedor.innerHTML = `<h3> ID: ${producto.id}</h3><p> Producto: ${producto.nombre}</p><b> $ ${producto.precio}</b>`;

document.body.appendChild(contenedor); */

/* //Ejemplo 15: Agregar un elemento con estilizado (ejemplo 2)
var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";

document.getElementById("main").appendChild(div); //En el HTML hay un div con el nombre "main" */

/* //Ejemplo 16: Agregar un elemento con estilizado (ejemplo 3)
document.addEventListener('DOMContentLoaded', function() {
    var div = document.createElement('div');
    div.id = 'container';
    div.innerHTML = 'Hi there!';
    div.className = 'border pad';

    document.body.appendChild(div);
}, true); */

/* //Despliegue de las opciones en la etiqueta <option> en el HTML, que servira para futuros ejercicios

//Para agregar opciones al HTML select.
class Ocupacion {
    constructor(numero, name) {
        this.numero = numero;
        this.nombre = name;
    }
}

const ocupaciones = [
    new Ocupacion(1, "Estudiante"),
    new Ocupacion(2, "Docente"),
    new Ocupacion(3, "Desarrollador"),
    new Ocupacion(4, "Administrador de proyectos"),
];

let ocupacionList = document.getElementById("ocupacion");

ocupaciones.forEach((unaOcupacion) => {
    let item = document.createElement("option");
    item.value = unaOcupacion.numero.toString();
    item.innerText = unaOcupacion.nombre;
    ocupacionList.append(item);
}); */

/* // Ejemplo 17: Agregar eventos a un nodo mediante el addEventListener
function saludar() {
    alert("Hola bebe");
}

const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", saludar); */

/* // Ejemplo 18 : Agregar eventos a un nodo mediante la propiedad con el evento necesario
function saludar() {
    alert("Hola bebe");
}

const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = () => {alert("Hola, bienvenido!")}; //Metodo 1
btnInscribir.onclick = () => saludar();  //Metodo 2 */

/* // Ejemplo 19 : Agregar eventos a un nodo mediante el atributo de evento de la etiqueta (No es recomendable usar en proyectos de produccion)
function saludar() {
    alert("Hola bebe");
}

const btnInscribir = document.getElementById("btnInscribir");
//Esto va en el HTML, dentro del form
//<button type="button" class="btn btn-primary" id="btnInscribir" onclick="alert('Hola Mundo!');">Inscribir</button> //Esto va en el HTML, NO en el documento .js */

/* // Ejemplo 20: Agregar a un nodo el evento del movimiento del mouse.
const title = document.getElementsByTagName("h1")[0]; //[0] representa el numero de los h1 que se encuentran en el HTML. Como en este caso solo hay uno, entonces inicializa en 0 y asi sucesivamente, dependiendo del tipo de etiqueta que estemos utilizando.
console.log("--> H1", title);
title.addEventListener("mousemove",() => {
    console.log("--> El mouse se esta moviendo sobre el titulo de la pagina <--")
}); */

/* // Ejemplo 21: Agregar a un nodo los eventos de keydown y keyup para un input.
const input = document.getElementById("apellidos");
input.addEventListener("keydown",() => {
    console.log("--> La tecla bajo <--")
})

input.addEventListener("keyup",() => {
    console.log("--> La tecla subio <--")
})
 */

/* // Ejemplo 22: Agregar a un nodo el evento change.
const input = document.getElementById("nombres");
input.addEventListener("change",() => {
    console.log("--> El valor del input cambio <--", input.value);
    input.value = input.value.trim();
}); */

/* // Ejemplo 23: Agregar a un nodo el evento change (Simulando un keylogger).
const input = document.getElementById("apellidos");
input.addEventListener("input",() => {
    console.log("--> Ejecutaste el evento INPUT <--");
}); */

/* // Ejemplo 24: uso del evento submit para validar los inputs de un formulario.

//Para agregar opciones al select HTML del HTML cuando presionemos el recuadro.
class Ocupacion {
    constructor(numero, name) {
        this.numero = numero;
        this.nombre = name;
    }
}

const ocupaciones = [
    new Ocupacion(1, "Estudiante"),
    new Ocupacion(2, "Docente"),
    new Ocupacion(3, "Desarrollador"),
    new Ocupacion(4, "Administrador de proyectos"),
];

let ocupacionList = document.getElementById("ocupacion");

ocupaciones.forEach((unaOcupacion) => {
    let item = document.createElement("option");
    item.value = unaOcupacion.numero.toString();
    item.innerText = unaOcupacion.nombre;
    ocupacionList.append(item);
});

//Uso de eventos para rellenar los espacios en blanco y desplegar la informacion
class Participante {
    constructor(numero, apellido, nombre, ocupacion, correo, quiereBoucher = false) {
        this.numero = numero;
        this.apellido = apellido;
        this.nombre = nombre;
        this.ocupacion = ocupacion;
        this.correo = correo;
        this.quiereBoucher = quiereBoucher;
    }
}
let participantes = [];

const formulario = document.getElementById("formulario_HTML");
console.log(formulario);
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();          //Cancelamos el comportamiento del evento
    validarFormulario(evento.target); //.target sirve para pasar el conjunto de items, elementos, componentes, inputs que tenga nuestro formulario dentro que contenga info
});                                   //Es decir, se accede a los elementos del formulario a donde pertenete submit y NO a informacion del submit. O sea, el objeto que "disparo" o "activo el evento."

function validarFormulario(data) {
    // console.log("--> Validando formulario", data); //Recivimos el conjunto de elementos, items, etc. recividos de la linea 1331 y despues los imprimimos.
    // const hijos = data.children; //Asignamos los elementos del formulario a una nueva variable. En ella se encuentran 4 divs, el form-check y el btnInscribir
    // console.log("--> Que hay dentro de children", hijos);

    // for (let i = 0; i < 4; i++) {
    //     const unHijo = hijos[i]; //Asignamos individualmente los elementos del formulario a una nueva variable para despues acceder a sus hijos. (En este caso, solo queremos tomar en cuenta los primros 4 elementos, que son 4 divs)
    //     const valor = unHijo.children[1].value; //Colocamos [1].value porque es donde se encuentra el label que queremos mostrar de los 4 divs del formulario, y despues guardamos ese elemento (hijo) en una nueva variable. En este caso. Son puros input's y el contenido que escribimos en ellos.
    //     console.log("--> El valor almacenado en el input " + unHijo.children[0].innerText + " es: " ,{valor}); //unHijo.children[0].innerText muestra la primer posicion que pertenece al label en cada div, y entonces al poner innerText, mostamos el nombre que le asignamos a cada uno entre los > <.
    // }

    // Recuperaremos de cada uno de los inputs, el valor que ingreso/selecciono el usaurio
    const apellidos = document.getElementById("apellidos").value; console.log("Apellidos: "+ apellidos);
    const nombres = document.getElementById("nombres").value; console.log("Nombres: "+ nombres);
    const ocupacion = document.getElementById("ocupacion").value; console.log("Ocupacion: "+ ocupacion);
    const correo = document.getElementById("correo").value; console.log("Correo: "+ correo);
    const participar = document.getElementById("participar").checked; console.log("Participar: "+ participar);// Mediante la propiedad checked accedemos al valor booleano true/false que representa si el radiobutton o el checkbox fue "tildado/seleccionado"

    // Instanciamos la creacion de un objeto con la forma de un Participante
    const unaOcupacion = ocupaciones.find((evento) => evento.numero.toString() === ocupacion);
    console.log("unaOcupacion", unaOcupacion);
    const unParticipante = new Participante(participantes.length+1,apellidos,nombres,unaOcupacion,correo,participar);
    console.log("--> Un participante a ser anadido", unParticipante);

    // Anadimos un elemento a la lista de aprticipantes (aun no incorporamos un control sobre existentes o similar)
    participantes.push(unParticipante);
    console.log("--> Que elementos posee mi array de participantes",participantes);

    // Pintar la lista en la interfaz de usuario (solo para demostrar en la interfaz el cambio anadido -- profundizaremos este tema a medida que avanzamos con las clases.)
    let lista = document.getElementById("listaParticipantes");
    lista.innerHTML = ""; //Borramos el innerHTML de 'lista' colocando las comillas vacias para limpiar su contenido.
    participantes.forEach((individual) => {
        let item = document.createElement("p");
        item.innerText = individual.apellido + ", " + individual.nombre;
        lista.append(item);
    });

    // Limpiar todos y cada uno de los inputs
    document.getElementById("apellidos").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("ocupacion").value = "0";// el valor de este por default es 0 porque es la primera opciOn del combo de selecciOn
    document.getElementById("correo").value = "";
    document.getElementById("participar").value = "off";// para bootstrap --> on: true y off: false 
}*/


//         $$$$$$$$$$$$$$$ JSON & storage $$$$$$$$$$$$$$$

/* // Ejemplo 1: setItem en localStorage para crear datos en el local storage. getItem para recuperar informacion almacenada. Y buscar si existe algo o no.
localStorage.setItem("saludar", "Hola mundo");
localStorage.setItem("existe", true);
localStorage.setItem("cantidad", parseInt(155)); 

const mensaje = localStorage.getItem("saludar");
const isExistente = localStorage.getItem("existe");
const cantidad = localStorage.getItem("cantidad");
const res = localStorage.getItem("nombreUsuario"); // "nombreUsuario" no existe

console.log("Mensaje: ", {mensaje});
console.log("Existe el elemento almacenado? ", {isExistente});
console.log("Cuantos pedidos hiciste? ", {cantidad});
res ? console.log("Informacion recuperada", {res}) : console.log("Informacion NO recuperada", {res}); */

/* // Ejemplo 2: Crear informacion dentro del sessionStorage con el metodo setItem(), y recuperar info almacenada en el mismo con getItem().
sessionStorage.setItem("Bienvenida", "Hola mundo");
sessionStorage.setItem("EsValido", true);
sessionStorage.setItem("unNumero", 155);

const isValido = sessionStorage.getItem("unNumero") == 155 ? true : false;
console.log("Existe el producto buscado?", {isValido});
console.log("Que tipo de dato persiste sin convertirlo?", {resultado: typeof sessionStorage.getItem("EsValido")});
console.log("Que tipo de dato persiste convertiendolo?", {resultado: typeof isValido}); */

/* // Ejemplo 3: Como guardar elementos de un array y como recuperarlos
const MY_ARRAY = [100, 500, 963];
//console.log("Que tipo de dato mi array?", {resultado: typeof MY_ARRAY, MY_ARRAY});

localStorage.setItem("myArray", MY_ARRAY);

const valorRecuperado = localStorage.getItem("myArray"); //console.log(typeof valorRecuperado, valorRecuperado);
console.log("Que tipo de dato es recuperado?", {resultado: typeof valorRecuperado, valorRecuperado});

//COMO CONVERTIR CADA ELEMENTO DEL ARRAY (SABIENDO QUE SON NUMEROS) A NUMEROS NUEVAMENTE (METODO MANUAL)
const valorCambiado = localStorage.getItem("myArray").split(","); //console.log(typeof valorCambiado, valorCambiado);
console.log( "Que tipo de dato es valorCambiado?", {resultado: typeof valorCambiado, myArray: valorCambiado.filter((evento)=>parseInt(evento))} ); */

/* // Ejemplo 4: Como recorrer todos y cada uno de los elementos almacenados dentro de nuestro local storage o session storage
console.log("Recuperar todos los elementos de la local storage");
for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    console.log("En la clave <"+ clave+ "> esta este dato", {valor: localStorage.getItem(clave)});
}

console.log("\nRecuperar todos los elementos de la session storage");
for (let i = 0; i < sessionStorage.length; i++) {
    const clave = sessionStorage.key(i);
    console.log("En la clave <"+clave + "> esta este dato ",{valor: sessionStorage.getItem(clave)});
} */

/* // Ejemplo 5: eliminar elementos concretos, y tambien eliminar todos los elementos en local storage y el session storage.
// localStorage.removeItem("nombre"); 
localStorage.clear();
// sessionStorage.removeItem("Bienvenida")
// sessionStorage.clear(); */

/* // Ejemplo 6: Editar informacion ya existente dentro de nuestro local storage o session storage
const nombre = "german";
localStorage.setItem("saludar", nombre);
sessionStorage.setItem("unNumero", 8); */

/* // Ejemplo 7: Recibir los datos JSON
const cars = `[
    {
        "modelo": "Ford mustang",
        "production": "2010",
        "millaje": "12000"
    },
    {
        "modelo": "Honda accord",
        "production": "2021",
        "millaje": "4560"
    },
    {
        "modelo": "Nissan Sentra",
        "production": "2016",
        "millaje": "58200"
    }
]`;

//console.log(typeof cars);

const jsonData = JSON.parse(cars); //Convertimos a un object con parse 
const carrosNuevos = jsonData.filter((evento) => evento.production > 2010 && evento.millaje < 30000); //console.log(carrosNuevos);
const newCars = JSON.stringify(carrosNuevos); //Convertimos a un string con stringify

const fs = require('fs');
const carroNuevo = {
    modelo: "Mini Cooper",
    produccion: "2022",
    millaje: "500"
};
const newCar = JSON.stringify(carroNuevo);
fs.writeFileSync('cars.json', newCar, (error) => {
    if (error) throw error;
    console.log("Informacion recivida");
}); */

/* // Ejemplo 8: Almacenar informacion de un objeto con JSON, despues recuperaramos los objetos en forma de string (stringify) y luego en forma de object (parse)
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const unaCarrera = new Carrera(100, "Analista de sistemas")
console.log("Los datos de la carrera antes de almacenarse son: ",{unaCarrera}); //Intancia de una clase que esta tipificada fuertemente

localStorage.setItem("carrera", JSON.stringify(unaCarrera));
const unaCarreraRecuperada = localStorage.getItem("carrera");
console.log("La carrera recuperada con stringify es: ", {unaCarreraRecuperada});

const recuperada = JSON.parse(localStorage.getItem("carrera"));
console.log("La carrera recuperada con parse es: ", {recuperada}); */

/* // Ejemplo 9: Almacenar un array de objetos en el local storage o session storage
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const carreras = [
    new Carrera(1, "Analista en Sistemas de Computacion"),
    new Carrera(2, "Tec. Universitaria en celulosa y Papel"),
    new Carrera(3, "Tec. Universitaria en Tecnologias de la Informacion"),
];
console.log("Mi array sin convertir es: ", {carreras});

localStorage.setItem("carreras", JSON.stringify(carreras));
let res = localStorage.getItem("carreras");

console.log("Las carreras recuperadas en formato string (stringify) son: ", {res});

//objeto recuperado de un JSON, en el cual no vamos a tener metodos. Ya que el JSON solo perciste atributos y valores, no metodos ni mucho menos los recupera. 
const convertido = JSON.parse(res);
console.log("Las carreras recuperadas en formato object (parse) son: ", {convertido}); */


//         $$$$$$$$$$$$$$$ Asincronia $$$$$$$$$$$$$$$


/* // Ejemplo 1: Creacion de una funcionalidad asincriona (timeOut)

setTimeout(() => {
    console.log("Proceso asincrono");
}, 3000) */

/* // Ejemplo 2: Uso del codigo anterior para reflejar como es que se ejecutan las instrucciones lineales.
console.log("Inicia proceso" )
setTimeout(()=> {
    console.log("Mitad de proceso" )
}, 2000)
console.log("Fin proceso") */

/* // Ejemplo 3: Creacion de un countdown hacia abajo

const SEGUNDOS = 3;
for (let LEFT = 1; LEFT < SEGUNDOS; LEFT++) {
    setTimeout(() => {
        console.log(((SEGUNDOS+1-LEFT).toString() + " segundos left"));
    }, LEFT*1000);
} 

// setTimeout(() => {
//     console.log("Proceso asincrono");
// }, SEGUNDOS*1000); */

/* // Ejemplo 4: Aplicacion del modelo asincrono para momstrar a una de las letras de dos palabras

// for (let letra of "hola") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1000)
// }

// for (let letra of "mundo") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1500)
// }

for (let index = 0; index < "hola".length; index++) {
    setTimeout (() => {
    console.log("hola"[index])
    }, (index+1)*500)
} */

/* // Ejemplo 5: Aplicacion de una funcion en CALL STACK
function multiply (x, y) {
 return x * y;
}
function printSquare (x) {
    let s = multiply(x,x);
    console.log(s);
}

printSquare(5); */

/* // Ejemplo 6: Uso del setInterval para ejecutar continuamente funcionalidades cada x cantidad de segundos.
setInterval(() => {
    console.log("Tic-Toc")
}, 1000) */

/* // Ejemplo 7: Ejemplo de como suspender un setInterval y clearTimeout
console.log("Inicio");

let counter = 0
const interval = setInterval(() => {
    counter++;
    console.log("Counter: ", counter);
    if (counter >= 5) {
    clearInterval(interval);
    console.log("Se removió el intervalo");
    }
}, 1000);

const fin = setTimeout(() => {//Esta nunca se llega a ejecutar
    console.log("fin");
}, 2000);
clearTimeout(fin); */

/* // Ejemplo 8: Como conocer los estados de una promesa
function eventoFuturo (){
    return new Promise( (resolve, reject) => {

    });
}
console.log( eventoFuturo() ) // Promise { <pending> } */

/* // Ejemplo 9: Uso de los resultados de una Promesa para cambiar sus estados
function eventoFuturo (res) {
    return new Promise( (resolve, reject) => {
        res ? resolve('Promesa resuelta') : reject('Promesa rechazada');
    })
}
console.log( eventoFuturo(true) ) // Promise { 'Promesa resuelta' }
console.log( eventoFuturo(false) ) // Promise { <rejected> 'Promesa rechazada' } */

/* // Ejemplo 10: 
function eventoFuturo(res){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada');
        }, 1000)
    })
}
//Devuelve pending porque la funcion se ejecutara y esperara 1500mS por el setTimeout, pero como no hay nada que haga que "espere" a que esto se resuelva, entonces no se mostrara nada.
console.log( eventoFuturo(true) ) // Promise { <pending> }
console.log( eventoFuturo(false) ) // Promise { <pending> } */

/* // Ejemplo 11: Uso del Then y Catch para catpturar los resultados y aprovechamiento de las posibilidades de respuestas de una promesa
function eventoFuturo (res) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada')
        }, 1000)
    });
}

console.log("1. Primer proseso");

eventoFuturo(true)
//eventoFuturo(false)
.then( (response) => {
    console.log(response) // Promesa resuelta
})
.catch( (error) => {
    console.log(error)
})
.finally( () => {
    console.log("Fin del proceso con true")
    //console.log("Fin del proceso con false")
}); */

/* // Ejemplo 12: Ejercicio con un array, usando then/catch/finally y tambien ASYNC/AWAIT
const productos = [
    {marca: "Nissan", modelo: 'Sentra', precio: 1500},
    {marca: "Toyota", modelo: 'Camry', precio: 2500},
    {marca: "Honda", modelo: 'Accord', precio: 3500}
];
// const BD = [];


function getDatos(){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            productos[0].precio === 15200 ? resolve(productos) : reject(new Error ("No existe")) ;
        }, 1500);
    });
}

// //Ejercicio usando then/catch/finally
// getDatos()
// .then( (response) => {
//     console.log(response) // Promesa resuelta
// })
// .catch( (error) => {
//     console.log(error)
// })
// .finally( () => {
//     console.log("Fin del proceso :)")
// });

//Ejercicio usando ASYNC/AWAIT
pedirPosts();
async function pedirPosts(){
    try{
        const datosFetched = await getDatos();
        console.log(datosFetched);
    }catch(error){
        console.log(error.message);
    }finally{
        console.log("Proceso terminado :)");
    }
}; */

/* // Ejemplo 13: Ejemplo del uso de Promesa para recuperar informacion de una base de datos

const BD_X = [
    {id: 1, nombre: 'Producto 1', precio: 1500},
    {id: 2, nombre: 'Producto 2', precio: 3500}
];
const BD_Y = [
    {id: 3, nombre: 'Producto 3', precio: 2000},
    {id: 4, nombre: 'Producto 4', precio: 3000}
];
//const BD = [];

function obtenerUsuarios(id){
    return new Promise( (resolve, reject) => {
        if (BD_X.find(evento => evento.id === id)) {
            console.log("El usuario existe");
            resolve(obtenerNombres(id))
        }else{
            reject("El usuario no existe")
        }
    });
}

function obtenerNombres(id){
    return new Promise( (resolve, reject) => {
        if (BD_Y.find(evento => evento.id === id)) {
            resolve("El nombre existe")
        }else{
            reject("El nombre no existe")
        }
    });
}

obtenerUsuarios(1)
.then((res) => {
    return res;
})
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error(error);
}); */


//         $$$$$$$$$$$$$$$ AJAX & FETCH $$$$$$$$$$$$$$$


/* // Ejemplo 1: fetch (método) sin aplicar los el then() y el catch(), y despues la plicación del método then() para ver que estructura posee una respuesta.
console.log( fetch('https://jsonplaceholder.typicode.com/posts') );

fetch('https://jsonplaceholder.typicode.com/posts')
.then((resp) =>
  console.log(resp)
); */

/* // Ejemplo 2: Obtener la información que se encuentra dentro del BODY de la RESPONSE, y recuperar un único objeto de la API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
  }); */

/* // Ejemplo 3: Cómo recuperar datos de una localizacion externa (http://) con rutas relativas
function recuperarPosteos() {
  let bodyTable = document.getElementById("tableBody"); // Pintar la tabla de carreras en la UI
  bodyTable.innerHTML = "";
  toggleLoadingContainer(true);
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((resultado) => resultado.json()) // Obtuvimos la respuesta --> Tomar los datos del body (.json())
    .then((data) => {                      // Obtenemos la colección de posteos
      data.forEach((post) => {
        let record = document.createElement("tr");
        record.innerHTML = 
        `<tr>
        <td scope="row">${post.id}</td>
        <td scope="row">${post.title}</td>
        <td scope="row">${post.body}</td>
        </tr>`;
        bodyTable.append(record);
      });
    })
    .catch((error) => {
      let record = document.createElement("tr");
      record.innerHTML = 
      `<tr>
          <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
        </tr>`;
      bodyTable.append(record);
    })
    .finally(() => {
      toggleLoadingContainer(false);
    });
}

recuperarPosteos(); */

/* // Ejemplo 4: Cómo recuperar datos de una localizacion interna (.json) con rutas relativas
function recuperarPosteos(){
  let bodyTable = document.getElementById("tableBody");// Pintar la tabla de carreras en la UI
  bodyTable.innerHTML = "";
  toggleLoadingContainer(true);
  fetch("./data/posts.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {// Obtenemos la colección de posteos
      let record = document.createElement("tr");
      record.innerHTML = `<tr>
      <td scope="row">${post.id}</td>
      <td scope="row">${post.title}</td>
      <td scope="row">${post.body}</td>
      </tr>`;
      bodyTable.append(record);
    });
  })
  .catch((error) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
        <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
      </tr>`;
    bodyTable.append(record);
  })
  .finally(() => {
    toggleLoadingContainer(false);
  });
}

recuperarPosteos(); */

/* // Ejemplo 5: Uso de ASYNC/AWAIT para crear funciones asincrónas que se comportan como si fueran sincronas
console.log("Previo a hacer la solicitud");
async function pedirPosts(){
  const respuesta = await fetch("./data/posts.json");  console.log("Obtuvimos la respuesta: ");
  console.log(respuesta);
  const data = await respuesta.json();  console.log("Obtengo el BODY de la respuesta: ");
  console.log(data);
};

pedirPosts(); */

/* // Ejemplo 6: Uso de los parámetros de configuración para el método fetch (CREACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "POST",
  body: JSON.stringify({
    title: "Nuestro posteo personal",
    body: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

fetch("https://jsonplaceholder.typicode.com/posts", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 7: Uso de los parámetros de configuración para el método fetch (MODIFICACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "PUT",// PUT/GETCH
  body: JSON.stringify({
    title: "Le cambio el título",
    body: "Un nuevo contenido para el body de este post",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 8: Uso de los parámetros de configuración para el método fetch (ELIMINACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "DELETE",
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */







