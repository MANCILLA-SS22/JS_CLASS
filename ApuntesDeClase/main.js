console.log("Hola, bienvenidos a la clase de Javascript 🤯"); console.log("\n");


//         $$$$$$$$$$$$$$$ UDEMY $$$$$$$$$$$$$$$



//         $$$$$$$$$$$$$$$ Funciones $$$$$$$$$$$$$$$


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


//         $$$$$$$$$$$$$$$ Objetos $$$$$$$$$$$$$$$


/*     //Ejemplo 1: Definicion de caracteristicas para un objeto y como podemos ver los datos dentro del objeto
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
console.log("El objeto contiene estos datos: ", unPaciente);
console.log("El paciente se llama: ", unPaciente.nombre);         //Forma 1 de seleccionar una variable de un objeto
console.log("El paciente se apellida: ", unPaciente["apellidos"]);//Forma 2 de seleccionar una variable de un objeto */

/*     //Elemplo 2: Aignacion de valores
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/*     //Ejemplo 3: Definicion de un objeto sin datos definidos para sus propiedades.
let unPaciente = {DNI: undefined, apellidos: undefined, nombre: undefined, edad: undefined, altura: undefined, peso: undefined, generoBiologico: undefined, tipoSangre: undefined};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */

/*     //Ejemplo 4: Definicion de una funcion constructora para un objeto
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

/*     //Ejemplo 5: Ejemplo de aplicacion de metodos de un objeto
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

/*     //Ejemplo 6: Uso de las construcciones IN y FOR-IN
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

/*     //Ejemplo 7: Ejemplo practico con objetos y funciones 

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

/*     //Ejemplo 8: Definicion de una clase y uso de los metodos dentro de una clase

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


//         $$$$$$$$$$$$$$$ Funciones de orden superior I $$$$$$$$$$$$$$$


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

/* //Ejemplo 4: Conocer la cantidad de elementos que tiene nuestro array con  |.length()|
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
console.log("Cuantos elementos tengo en mi array?", VECTOR_DE_CADENAS.length);
console.log("Cual es la posicion de mi ultimo elemento dentro de mi array?", VECTOR_DE_CADENAS.length-1) */

/* //Ejemplo 5: Como anadir elementos a un array con  |.push()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.push(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 6: Como anadir elementos al principio de un array con |.unshift()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.unshift(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 7: Como eliminar elementos en la primer posicion de un array con |.shift|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.shift();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 8: Como eliminar elementos en la ultima posicion de un array con |.pop()|

let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.pop();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */

/* //Ejemplo 9: Como eliminar y eliminar uno o mas elementos de un array con |.splice()|
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

/* //Ejemplo 10: Obtener una cadena con cada uno de sus elementos concatenados, separados con un caracter o cadena especial con |.join()|.
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let resultadoDelJoin = VECTOR_DE_CADENAS.join(", ");
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 12: Combinar los elementos de dos arrays con |.concat()|
let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez"], VECTOR_DE_CADENAS2 = ["Karla", "beatriz", "marquez"];
let resultadoDelJoin = VECTOR_DE_CADENAS1.concat(VECTOR_DE_CADENAS2);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 13: Tomar un conjunto de elementos de dentro de un array y generar un nuevo array con ellos con |.slice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior", "karla"];
let resultadoDelSlice = VECTOR_DE_CADENAS.slice(2, 5); //2 = esta posicion no se toma, sino la siguiente. 5 = limite que se toma en cuenta
console.log("La cadena generada con nombres es: ",resultadoDelSlice); */

/* //Ejemplo 14: Conocer la posicion de un elemento dentro de un array (si existe o no) con |.indexof()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let posicionDeMancilla = VECTOR_DE_CADENAS.indexOf("chavez");
console.log("La cadena generada con nombres es: ",posicionDeMancilla);

let posicion = VECTOR_DE_CADENAS.indexOf("karla");
posicion != -1 ? console.log("El nombre esta en la posicion: ", posicion) : console.log("El nombre NO existe"); */

/* //Ejemplo 15: Conocer si existe o no un elemento dentro de un array (Valor booleano) con |.includes()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "mancilla"
let existe = VECTOR_DE_CADENAS.includes(nombre);

existe ? console.log("El nombre SI existe") : console.log("El nombre NO existe"); */

/* //Ejemplo 16: Tomar al array e invertir el orden de sus elementos con |.reverse()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
VECTOR_DE_CADENAS.reverse();
console.log("--> El array con los nombres cambiados de lugar es", VECTOR_DE_CADENAS); */

/* //Ejemplo 17: como iterar sobre los elementos de un array, no importa si posee valores simples u objetos, con |.foreach()|

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

/* //Ejemplo 18: como para hallar un elemento dentro de la coleccion (el PRIMER elemento), con |.find()|
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

/* //Ejemplo 19: como hallar todos los elementos dentro de la coleccion que cumplan con una condicion, con |.filter()|
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

/* //Ejemplo 20: como saber si un elemento dentro de la coleccion existe o no, con |.some()|

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

/* //Ejemplo 21: como enlistar solamente los nombres de los productos, con |.map()|

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

/* //Ejemplo 22: como calcular el valor total de una compra, con |.reduce()|

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

/* //Ejemplo 23: como re-ordenar nuestro array (es DESTRUCTIVO, cambia su posicion), con |.sort()|

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


//         $$$$$$$$$$$$$$$ OPERADORES AVANZADOS $$$$$$$$$$$$$$$


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
let tempt = 29;

// Así escribiríamos un IF-ELSE normalmente
if (tempt > 30) {
  alert("Día caluroso");
} else {
  alert("Día agradable");
}

// Así lo escribiríamos con el operador ternario
tempt > 30 ?
  alert("Día caluroso")
  : alert("Día agradable"); */

/* // Ejemplo 3: Aplicación del operador ternario para capturar su return implicito
let tempt = 31;
let diaCaluroso;

tempt > 30 ? (diaCaluroso = true) : (diaCaluroso = false);

alert("--> La evalaución resulto " + diaCaluroso); */

// Ejemplo 4: Operador lógico AND
// Ejemplo Operador lógico AND
let carrito = [];
let carritox2 = [{id: 10, nombre: "Play Station 5"}];

//(condición lógica) && (return si true);
// El return por default en caso de false, es false.

carrito.length == 0 && console.log("--> El carrito está vacío");
carritox2.length == 1 && console.log("--> El carritox2 está lleno");

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

// Cómo operamos con el Operador Logico OR
//const resultado = oparando1 || operando2;
let numero = 15;
const numerSelected = numero || 0 ;
console.log("--> numerSelected", {numerSelected}); */

/* // Ejemplo 5.1: Operador Lógico OR
const usuario1 = {nombre: "John Doe", edad: 14}
const usuario2 = null
console.log( usuario1 || "El usuario no existe" ) //{ nombre: 'John Doe', edad: 14 }
console.log( usuario2 || "El usuario no existe" ) //El usuario no existe */

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
const usuario = {nombre: "John Doe", edad: 22, cursos: {javascript: "Curso aprobado",}};
console.log(usuario?.cursos?.javascript || "La propiedad no existe"); //"Curso aprobado"
console.log(usuario?.trabajos?.coderhouse || "El estudiante no realizo trabajos con Coder House"); //"El estudiante no realizo trabajos con Coder House" */

/* // Ejemplo 9: Desestructuración de arrays y objetos
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
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
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

/* // Ejemplo 10: Aplicación de la desestructuración para el evento del click
window.addEventListener("click", (event) => {
    console.log(event.x, event.y);
});

window.addEventListener("click", ({ x, y }) => {
    console.log(x, y);
}); */

/* // Ejemplo 11: Operacion de spreading con Arrays
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

/* // Ejemplo 12: Rest parameters

sumar_1(10, 15, 30, 5, 13, 47, 98); // [10, 15, 30, 5, 13, 47, 98]
console.log("Res 2: ", sumar_2(10, 15, 30, 5) ) // 60

function sumar_1(...numeros) {
    console.log("Res 1: ", numeros);
}

function sumar_2(...numeros) {
    return numeros.reduce((acumulador, unProducto) => acumulador + unProducto, 0);
} */


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







