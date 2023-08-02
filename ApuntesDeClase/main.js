//         $$$$$$$$$$$$$$$ Proyectos $$$$$$$$$$$$$$$
/* //Proyecto 1: Bankist
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2023-05-27T17:01:17.194Z',
        '2023-07-23T23:36:17.929Z',
        '2023-07-18T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
const accounts = [account1, account2]; //Almacenamos la informacion de los 4 objetos en un array.

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

let currentAccount, timer;
let sorted = false;// For the btnSort, we fix this variable to false so the function displayMovements still recieve false, which means that it doesn't sort the array.

createUserNames(accounts);
function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

function updateUI(acc){
    displayMovements(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
}

function formatMovementDate(date, locale){

    function calcDaysPassed(date1, date2){
        return Math.round(Math.abs(date2 - date1) / (1000*60*60*24));
    }

    const dayPassed = calcDaysPassed(new Date(), date);
    if (dayPassed === 0) return "Today";
    if (dayPassed === 1) return "Yesterday";
    if (dayPassed <= 7)  return `${dayPassed} days`;
    
    // // METODO 1
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    
    //METODO 2
    return new Intl.DateTimeFormat(locale).format(date)

}

function formatCur(value, locale, currency){
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}

function displayMovements(acc, sort=false){

    containerMovements.innerHTML="";
    const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
    
    movs.forEach(function(mov, i) {
        const date = new Date(acc.movementsDates[i]); //Accedemos a las fechas que estan en account1.movementsDates[]
        const displayDate = formatMovementDate(date, acc.locale);

        const type = mov > 0 ? "deposit" : "withdrawal";    

        //METODO 1
        // const html = `
        //     <div class="movements__row">
        //         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        //         <div class="movements__date">${displayDate}</div>
        //         <div class="movements__value">${mov.toFixed(2)}€</div>
        //     </div>`
        // containerMovements.insertAdjacentHTML("afterbegin", html);

        //METODO 2
        const formattedMov = formatCur(mov, acc.locale, acc.currency);
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMov}</div>
            </div>`
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
}

function calcDisplayBalance(acc){
    acc.balance = acc.movements.reduce(function(acc, mov){
        return acc + mov;
    }, 0);

    //METODO 1
    // labelBalance.textContent = `${acc.balance.toFixed(2)}€`

    //METODO 2
    const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);
    labelBalance.textContent = formattedMov;
}

function calcDisplaySummary(acc){
    // //METODO 1
    // const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    // const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

    // const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

    //METODO 2
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

function startLogOutTimer(){
    function tick(){
        const min = String(Math.trunc(tiempo / 60)).padStart(2, 0);
        const sec = String(tiempo % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
        if(tiempo === 0) {
            clearInterval(startLogOutTimer);
            labelWelcome.textContent = "Log in to get started"
            containerApp.style.opacity = 0;
        }
        tiempo--;
    }

    let tiempo = 20;
    tick(); //Llamamos a la funcion antes de que se ejecute el setInterval para que, al final se ejecuten al mismo tiempo. Ya que, de ejecutarse esta funcion dentro del setInterval, entonces obtendremos primero un '1' en la pantalla y luego iniciara el temporizador.
    return setInterval(tick, 1000); //Volvemos a llamar a la funcion tick en el setInterval para que cada segundo que pase, se vuelva a ejecutar.
}

btnLogin.addEventListener("click", function(evento){
    evento.preventDefault();
    
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) //We verify if the username typed in the input is the same as the one in the array that is into "accounts". If so, we get the found object.

    if(currentAccount?.pin === Number(inputLoginPin.value)){ //We check if the pin in the object is the same as the one typed in the input. (We must write use "?." so that we can get an "undefined" and not an error)
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`; //If so, then we change the sentence in the upper right corner.
        containerApp.style.opacity = 100; //We do this so that we can see the menu with information.

        //METODO 1
        // const now = new Date();
        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

        //METODO 2
        const now = new Date();
        const options = {hour:"numeric", minute: "numeric", day: "numeric", month: "numeric", year: "numeric", }; //weekday: "numeric"

        // const locale = navigator.language;
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
        inputLoginUsername.value = inputLoginPin.value = ""; //Now we delete the written values in our inputs (user and PIN)
        inputLoginPin.blur(); //This work so that when we want to log in and finally press "enter", then our cursor will disappear.

        if (timer) {//Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
            clearInterval(timer)
        }
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function(evento){
    evento.preventDefault();
    const amount = Number(inputTransferAmount.value); //Recuperamos el numero ingresado en el input donde introducimos el dinero
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value); //Recuperamos el objeto contenido en uno de los arrays de accounts, al verificar si el nombre de usuario existe dentro de los 4 arrays de accounts y si es igual al ingresado en el input.
    inputTransferAmount.value = inputTransferTo.value = "";

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);

        clearInterval(timer); //Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
    }
});

btnClose.addEventListener("click", function(evento){
    evento.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) { //We verify if the written values in the inputs are the same as those in the current object.
        const index = accounts.findIndex(acc => acc.username === currentAccount.username); //If so, we proceed to find the index of the object in the array "accounts"
        accounts.splice(index, 1);
        containerApp.style.opacity = 0; 
        console.log(accounts);
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function(evento){
    evento.preventDefault();

    const amount = Math.floor(inputLoanAmount.value)
    if (amount > 0 && currentAccount.movements.some(mov => (mov >= amount*0.1))) {
        
        setTimeout(function(){
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());

            updateUI(currentAccount);

            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);

    }
    inputLoanAmount.value = "";
});

btnSort.addEventListener("click", function(evento){
    evento.preventDefault();

    displayMovements(currentAccount.movements, !sorted); //When clicking the button, then that variable changes to true and the array is sorted.
    sorted =! sorted; //After that, we need to change the "sorted" variable to the opposite boolean value. We do this so that when we press the button again, this back to normal (unsorted).
})

labelBalance.addEventListener('click', function () {
    let valor = document.querySelectorAll('.movements__value'); 
    const movementsUI = Array.from(valor, function(el){   // Array.from(Array-like or iterable object, mapFunction, thisValue)
        return Number(el.textContent.replace('€', ''))
    });  console.log(movementsUI);
    // const movementsUI2 = [...document.querySelectorAll('.movements__value')];


    [...document.querySelectorAll(".movements__row")].forEach(function(row, i){
        if (i % 2 === 0) row.style.backgroundColor = "orangered";
        if (i % 3 === 0) row.style.backgroundColor = "blue";
    })
}); */

//Proyecto 2: Bankist_Advanced-DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

function openModal(evento) {
    evento.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

//Metodo 2
btnsOpenModal.forEach(function(evento) {
    evento.addEventListener("click", openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Closing a card by using the keydown method in addEventListener
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    section1.scrollIntoView({behavior: "smooth"});
});

//Page navigation
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
});

// Building a Tabbed Component
tabsContainer.addEventListener('click', function (evento) {

    //Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano con el nombre operations__tab (incluyendo su hijo <span>).  Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el  class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes.
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Passing Arguments to Event Handlers
function handleHover(evento) {
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach(iter => { //Convertir a arrow function
            if (iter !== link) iter.style.opacity = this;
        });
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
const stickyNav = function(entries, observer){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    // console.log(entry, observer);

    if (entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.remove("sticky");
    }else{
        nav.classList.add("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);


// Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     //console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    // section.classList.add("section--hidden");
});


//Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento));


//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

goToSlide(0);
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

function goToSlide(slide) {
    slides.forEach(function(evento, iter){
        evento.style.transform = `translateX(${100 * (iter - slide)}%)`; //0%, 100%, 200%
    })
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
};

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
};





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


//         $$$$$$$$$$$$$$$ Funciones de orde superior $$$$$$$$$$$$$$$


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

/* //Ejemplo 3: Aplicacion de una funcion en CALL STACK
function multiply (x, y) {
 return x * y;
}
function printSquare (x) {
    let s = multiply(x,x);
    console.log(s);
}

printSquare(5); */

/* //Ejemplo 4: Retorno de funciones con un if.
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

/* //Ejemplo 5: Como podemos pasar por parametro una funcion (funcionalidad)
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

/* // Ejemplo 6.1: Default Parameters
const bookings = [];

const createBooking = function( flightNum, numPassengers = 1, price = (199*numPassengers) ){
    
    // Metodo utilizado en ES5 para establecer un valor inicial a esos parametros
    // numPassengers = numPassengers || 1;
    // price = price || 199
    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); */

/* // Ejemplo 6.2: How Passing Arguments Works: Value vs Reference
const flight = 'LH234';
const jonas = {name: 'Jonas Schmedtmann', passport: 24739479284};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
};

checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas); //When we try to copy an object, we're really only copying the reference to that object in the memory heap. They are both the same object in the memory heap

const newPassport = function(person){
    person.passport = Math.trunc(Math.random()*10000000000)
}

newPassport(jonas);
checkIn(flight, jonas); */

/* // Ejemplo 6.3: Functions Accepting Callback Functions
const oneWord = function (str) {
    const res = str.replace('/ /g', '').toLowerCase(); //     / /g sirve para capturar todos los elementos globales y no solamente 1. En este casi, queremos todos los espacios en blanco, y si no usamos esto, unicamente obtendremos el primer espacio en blanco.
    return res;
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' '); //El string tiene 4 palabras. Capturamos la 1era palabra con first, y las otras 3 las capturamos en una variable desestructurada (others), la cual devolvera un nuevo array con las 3 palabras restantes.
    const res = [first.toUpperCase(), ...others].join(' '); //Convertimos las letras de la 1era palabra a mayusculas, y a esa palabra, le unimos con ayuda del join(), las otras 3 que estan en el array generado con el split().
    return res;
};

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
    console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5); */

/* // Ejemplo 6.4: Functions Returning Functions
const greet = function (greeting) {

    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

//Llamamos a la funcion greet y le mandamos "hey". Despues, esta funcion retorna otra funcion que se almacena en greeterHey. Entonces, cuando en la linea de abajo volvemos a llamar a la funcion greeterHey, ahora ejecutaremos la funcion pero que esta almacenada en esta variable. O sea, la funcion del return.
const greeterHey = greet('Hey');
greeterHey('there');
greet('Hey')('there'); //Esto es lo mismo que las dos lineas de arriba.

// Esto es lo mismo que el procedimiento de arriba pero con arrow functions.
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hey')('there'); */

/* // Ejemplo 6.5: The call(), apply() and bind() Methods
const lufthansa = {airline: 'Lufthansa',iataCode: 'LH',bookings: [],
    book: function(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

const eurowings = {airline: 'Eurowings',iataCode: 'EW',bookings: []};
const swiss = {airline: 'Swiss Air Lines',iataCode: 'LX',bookings: []};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

// Call method: You can write a method that can be used on different objects. It takes arguments separately. No recive una lista de argumentos despues del this. Permitira que la palabra recerbada this apunte a eurowings.
const book = lufthansa.book; //Al hacer esto, ahora la funcion (metodo) del objeto lufthansa pasa a ser una funcion global, por lo que, no pudemos utilizarla asi nada mas y mandarle valores ya que esta funcion tiene "this", los cuales pertenecian al objeto lufthansa.
book.call(eurowings, 23, 'German mancilla'); 
book.call(lufthansa, 514, 'Chavez german');
// book(23, "res"); Esto NO funciona

// Apply method: You can write a method that can be used on different objects. It takes arguments as an array.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);



const bookEW = book.bind(eurowings); // Bind method: Allows us to manually set "this" for any function call. With the bind() method, an object can borrow a method from another object.
bookEW(23, "German Mancilla Chavez");

const bookEWX = book.bind(eurowings, 23);
bookEWX("German Mancilla Chavez");

// Bind method with eventListener:
lufthansa.planes = 300;             // Agregamos una nueva propiedad a lufthansa
lufthansa.buyPlane = function () {  // Agregamos un nuevo metodo a lufthansa
    this.planes++;                  // Ponemos el this para representar o llamar al objeto que dicha función está modificando.
    console.log(this);
    console.log(this.planes);
};                                  // lufthansa.buyPlane(); Esto despliega exacamente lo que queremos ver una vez que precionamos el boton del addEventListener().

//Al hacer esto, entonces decimos que, al hacer click, el console.log(this); retornara el boton. La razon de esto es porque en un event handler function, el "this" siempre 
//apunta al elemento donde se adjunta el handler. Por lo tanto, lufthansa.buyPlane es el handler function, y esta adjunto a la parte del querySelector, que seria el 
//elemento padre. Por eso, el console.log(this), muestra el elemento del boton. Ahora bien, en el handler function, necesitamos que el this de lufthansa.buyPlane apunte
//objeto de lufthansa, y no a la parte del querySelector. Para ello, tenemos que definirlo ahi mismo como se muestra en la linea que le sigue, y la manera de hacerlo es pasarle
//la funcion (bind) y no llamarla (call) porque el bind nos retornara una nueva funcion. Y finalmente, ahora el this apuntara a lufthansa y NO al boton del querySelector
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// Dos formas de devolver una funcion utilizando bind() y de la forma tradicional (devolviendo una funcion dentro de otra).
function addTax (rate, value){
    let res = value + value * rate;
    return res;
};

const addVAT = addTax.bind(null, 0.23); //Con el bind() obtendremos una nueva funcion
console.log("The result of addVAT is: "+ addVAT(100));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log("The result of addVAT is: "+addVAT2(100)); */

/* // Ejemplo 6.6: Excercise with functions
// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below. Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this: 
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)

// 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by one (1). Make sure 
// to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 
// 'array', simply display the results array as it is, using cl(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
// 5. Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object!

// Test data for bonus: Data 1: [5, 2, 3]

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"], // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer(){ // (1)
        const res = Number(prompt(`${this.question}\n${this.options.join("\n")}\n (Write option number)`)); // (1.1)
        typeof res === "number" && res < this.answers.length && this.answers[res]++; // (1.2) Si el primer if es verdadero, pasamos al siguiente, pero cuando lleguemos a un false, se corta el condicional (&& representa un if)
        console.log("Imprimos el objeto: ", poll);
        console.log("Imprimos el arreglo: ", this.answers);
        console.log("Imprimos el num seleccionado: ", res);

        this.displayResults();         //(4)
        this.displayResults("array");  //(4)
        this.displayResults("string"); //(4) 
    },
    
    displayResults(type = "array"){  //(3)
        if(type === "array"){
            console.log("Imprimimos el array con los valores", this.answers);
        }else if(type === "string"){
            console.log(`Poll results are ${this.answers.join(", ")}`);
        }
    }
};

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll)) //(2)

//Usamos call() porque necesitamos un nuevo this. Es decir, usar la funcion de un objeto en otro. Despues, como this.answers necesita apuntar a otra direccion (ya que ahora 
//esta fuera de poll), dentro de los parentesis de call creamos y le pasamos un objeto con el mismo nombre (ya que sino aparece como undefined) y a ese objeto le añadimos el nuevo array 
//que queremos. Asi mismo, le pasamos un argumento para que se pueda ejecutar el condicional.
poll.displayResults.call({answers: [5, 2, 3]}, "string"); // (5) */

/* // Ejemplo 6.7: Immediately Invoked Function Expressions (IIFE)
//Se usa cuando queremos una funcion que se utilice de inmediato una vez, que no sea necesario guardarla ni darle yn nombre, y que finalmente desaparezca para no volverla a usar

const runOnce = function(){
    console.log("This will never run again");
};
runOnce();

(function(){ //Transformamos la declaracion que tenemos arriba, en una expresion.
    console.log("This will never run again");
})(); */

/* // Ejemplo 6.8: Closures
const secureBooking = function () {
    let passengerCount = 0;

    return function () {//Al momento de retornar esta funcion (hija), se tiene acceso a sus elementos o variables del padre. Em este caso, passengerCount, que es un global scope.
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker); */

/* // Ejemplo 6.9: More Closure Examples

//Example 1
let f; //Creamos una variable global que almacenara una funcion
const g = function () {
    const a = 23; //closure
    f = function () { //Podemos utilizar esta funcion repetidas ocaciones
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777; //closure
    f = function () {
        console.log(b * 2);
    };
};

//Para poder acceder a f no podemos simplemente llamar a esa fucnion, ya que JS no la va a reconocer. Es decir, primero tenemos que llamar a su elemento padre y despues acceder a ella. En este caso, g y posteriormente h, son los padres de f.
g();
f();
console.dir(f);

h();
f();
console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () { //setTimeout necesita de dos parametros, en este caso usaremos una funcion y el otro debe ser el tiempo.
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //Si fijamos un valor en perGroup como variable global, de igual manera no se vera reflejado en el console.log porque al llamar la funcion, ejecutara la variable perGroup, la cual pisara a la que primero se creo con el valor de 1000.
boardPassengers(180, 3);


//Example 3
// Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element 
// is clicked. Do not select the h1 element again. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener("click", function(){
        header.style.color = 'blue';
    });
})();  */


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

/* //Ejemplo 10: Como eliminar uno o mas elementos de un array con |.splice()|
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

/* //Ejemplo 11: Tomar un conjunto de elementos de dentro de un array y generar un nuevo array con ellos con |.slice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior", "karla"];
console.log([...VECTOR_DE_CADENAS]);
let resultadoDelSlice = VECTOR_DE_CADENAS.slice(2, 5); //2 = esta posicion no se toma, sino la siguiente. 5 = limite que se toma en cuenta
console.log("La cadena generada con nombres es: ",resultadoDelSlice); */

/* //Ejemplo 12: Obtener una cadena con cada uno de sus elementos concatenados, separados con un caracter o cadena especial con |.join()|.
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let resultadoDelJoin = VECTOR_DE_CADENAS.join(", ");
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

/* //Ejemplo 13: Combinar los elementos de dos arrays con |.concat()|
let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez"], VECTOR_DE_CADENAS2 = ["Karla", "beatriz", "marquez"];
let resultadoDelJoin = VECTOR_DE_CADENAS1.concat(VECTOR_DE_CADENAS2);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */

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

/* //Ejemplo 17: Retornar el elemento indexado de un array o el elemento contenido en x posicion |.at()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
console.log(VECTOR_DE_CADENAS.at(3).at(1)); //Obtenemos el elemento contenido en el array (Junior), y en el siguiente at, obtenemos la posicion de la letra. */

/* // Ejemplo 18: Metodo |.fill()| para llenar un array con cualquier tipo de dato
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // Fill with 0 from position 2 until position 4  --> [1, 2, 0, 0]
console.log(array1.fill(5, 1));    // Fill with 5 from position 1 --> [1, 5, 5, 5]
console.log(array1.fill(6));       //Fill the array with only "6" --> [6, 6, 6, 6] */

/* //Ejemplo 19: Uso del metodo |new Array| para crear un arreglo de x cantidad de numeros y el metodo |Array.from()| para crear un array a partir de un objeto.
const res = new Array(1, 2, 3, 4, 5, 6, 7); // const res = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7); //Creamos un array vacio de 7 espacios de memoria.
x.fill(1);              //LLenamos el arreglo con puros "1".
console.log(x);

// Array.from(object, mapFunction, thisValue)
const y = Array.from({length: 7}, function(){
    return 1;
}); console.log(y);

const z = Array.from({length: 7}, function(_, i){
    return i + 1;
}); console.log(z); */

/* //Ejemplo 20: como iterar sobre los elementos de un array, no importa si posee valores simples u objetos, con |.foreach()|
class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre.toUpperCase() +" ($"+ this.precio.toFixed(2) +")"
    };

    // convertirEnString = () => {
    //     return this.id + ". " + this.nombre +" ($"+ this.precio.toFixed(2) +")"
    // };
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

misProductos.forEach( function(mov, i, arr) { //El primer parametro siempre sera el contenido de ese array (mov), el segundo la posicion (i) y el tercero el array (arr)
    return console.log( "--> "+ mov.convertirEnString()+ " en la posicion "+ (i+1));
});

//Ejemplo aplicado a Map()
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map){ //En el caso de usar Map(), los tres parametros principales son el valor, la clave y al final el map (array).
    console.log(`${value}: ${key}`);
});

//Ejemplo aplicado a Set()
const currenciesIsUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]); //En el caso de Set(), no existe una clave, por eso se pone "_". lo que indica una variable innecesaria.
currenciesIsUnique.forEach(function(value, _, map){
    console.log(`${value}: ${value}`);
}); */

/* //Ejemplo 21: como para hallar un elemento dentro de la coleccion (el PRIMER elemento), con |.find()|
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

// let nombreBuscado = "mermelada";
// let unProductoBuscado1 = misProductos.find(unProducto => {
//     return unProducto.nombre.includes( nombreBuscado.toUpperCase()); //El metodo includes() retorna true o false si existe algo en el array, y este seguira iterando aunque ya haya retornado algo. Ahora bien, con el includes, unicamente  retornara un elemento, puesto que es la funcion principal de find(), retornar lo primero que encuentre nada mas.    
// });

let nombreBuscado = "pan lactal";
let unProductoBuscado1 = misProductos.find(unProducto => unProducto.nombre === nombreBuscado.toUpperCase());

unProductoBuscado1 !== undefined ? console.log("El producto buscado es: "+ unProductoBuscado1.convertirEnString()) : console.log("No encontramos el producto con nombre: "+ nombreBuscado); */

/* //Ejemplo 22: como hallar todos los elementos dentro de la coleccion que cumplan con una condicion, con |.filter()|
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
let productoHallados = misProductos.filter( function(unProducto){     // let productoHallados = misProductos.filter( (unProducto) => unProducto.nombre.includes( nombreBuscado.convertirEnString() ));
    return unProducto.nombre.includes( nombreBuscado.toUpperCase() ); //Si el nombre buscado posee unicamente la palabra "Mermelada", entonces entonces retorna un true. Esto indica que no hay necesidad de tener que escribir "Mermelada de naranja" o similares.
});
console.log("Numero de productos hallados con el nombre "+ "'"+`${nombreBuscado}`+"'" +" son: "+ productoHallados.length+ " y tienen los siguientes nombres: ", productoHallados);

let preciosMayores = misProductos.filter( function(evento){
    return evento.precio > 400;
});
console.log("Los precios mayores a $400 son: preciosMayores", preciosMayores); */

/* //Ejemplo 23: como saber si un elemento dentro de la coleccion existe o no, con |.some()|

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

/* //Ejemplo 24: como saber si un elemento dentro de la coleccion existe o no, y que devuelva true o false si todo cumple la condicion. Con |.every()|
movements1 = [200, 450, 400, -3000, 650, 0, 70, 1300];  //false
movements2 = [200, 450, 100, 3000, 650, 130, 70, 1300]; //true
console.log(movements1.every(mov => mov > 0)); //
console.log(movements2.every(mov => mov > 0)); */

/* //Ejemplo 25: como enlistar solamente los nombres de los productos, con |.map()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2);
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

nombres = misProductos.map( function(unProducto){
    return unProducto.nombre;
});
console.log("1. Los nombres del array son: ", nombres);

preciosIncrementados = misProductos.map( function(unProducto) {
    return incrementarPrecio(unProducto.precio, 10)
});
console.log("2. Los precios incrementados seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map(function(unProducto) {
    return new producto (unProducto.id, unProducto.nombre, incrementarPrecio(unProducto.precio, 10));
});
console.log("3. Los precios incrementados en forma de array seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map( function(unProducto) {
    return {id: unProducto.id, nombre: unProducto.nombre, precio: incrementarPrecio(unProducto.precio, 10)}
});
console.log("4. Los precios incrementados forma de objeto seran: ", preciosIncrementados);

function incrementarPrecio(precio, porcentaje){
    return precio + (precio * (porcentaje/100) )
} */

/* //Ejemplo 26: como calcular el valor total de una compra, con |.reduce()|
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

let preciosTotales = misProductos.reduce( function(acumulador, unProducto){    //let preciosTotales = misProductos.reduce( (acumulador, unProducto) => acumulador + unProducto.precio, 0);
    return acumulador + unProducto.precio
}, 0);

console.log("El total de la suma es: "+ preciosTotales.toFixed(2));

//Valor maximo
const max = misProductos.reduce(function(acc, mov){
    return acc > mov.precio ? acc : mov.precio;
})
console.log(max); */

/* //Ejemplo 27: como re-ordenar nuestro array (es DESTRUCTIVO, cambia su posicion), con |.sort()|

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
// misProductos.sort( (first, second) => second.id - first.id);                        console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.nombre.localeCompare(second.nombre));   console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.nombre.localeCompare(first.nombre));   console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.precio - second.precio);                console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.precio - first.precio);                console.log("Forma descendente: ", misProductos); */

/* //Ejemplo 28: como crear una nueva matriz con todos los elementos de sub-array concatenados con |.flat()| y como mapear todos los elementos del array y crear un nuevo flat array con |.flatMap()|
const acc1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const acc2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const acc3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const acc4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const allAccounts = [acc1, acc2, acc3, acc4];

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [ [[1, 2], 3], [4, [5, 6]], 7, 8 ];
console.log(arrDeep.flat(2));

//flat ()
const overalBalance = allAccounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap()
const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); */

/* //Ejemplo 30: Ejercicio practico #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are 
// just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old. Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
// 4. Run the function for both test datasets

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice(); //We creat a new array (By setting the empty parenthesis) because we must not mutate the original array.
    // dogsJulia.slice(1, 3); Podemos usar esto tambien y obtendremos lo mismo que abajo
    dogsJuliaCorrected.splice(0, 1); //Borramos en la posicion 0, 1 elemento.
    dogsJuliaCorrected.splice(-2); //Borramos los ultimos dos elementos
    console.log(dogsJuliaCorrected);

    const newArray = dogsJuliaCorrected.concat(dogsKate);
    console.log(newArray);

    newArray.forEach(function(mov, key){
        const res = mov >=3 ? `Dog number ${key} is an adult, and is ${mov} years old` : `Dog number ${key+1} is still a puppy`
        console.log(res);
    });

}

checkDogs(dogsJulia, dogsKate); */

/* //Ejemplo 31: Ejercicio practico #2
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is 
// larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 
// 10% below the recommended portion. Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new 
// array, simply loop over the array. Forumla: recommendedFood = weight^0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners 
// array, and so this one is a bit tricky (on purpose)
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects ).

// Hints:
// Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended *1.10). Basically, the current portion 
// should be between 90% and 110% of the recommended portion.

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function(evento){
    evento.recFood = Number((evento.weight ** 0.75 * 28).toFixed(4));
});

//2
const dogSarah = dogs.find(function(evento){
    return evento.owners.includes("Sarah");
});
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? "much" : "little"}`);

//3 
// const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).map(evento => evento.owners).flat();
const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).flatMap(evento => evento.owners);
const ownersEatTooLittle = dogs.filter(evento => evento.curFood < evento.recFood).flatMap(evento => evento.owners);

//4
console.log(`${ownersEatTooMuch.join(" and ") }'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ") }'s dogs eat too much!`);

//5
console.log(dogs.some(evento => evento.curFood === evento.recFood));

//6. 
function checkEatingOkey(evento){
    return evento => evento.curFood > evento.recFood * 0.9 && evento.curFood < evento.recFood * 1.1;
}
let ss = dogs.some(checkEatingOkey)
console.log(ss);

//7.
let res = dogs.filter(checkEatingOkey)
console.log(res);

//8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted); */

/* //Ejemplo 32: Ejercicio practico con foreach(), split() y join().
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

createUserNames(accounts);
console.log(accounts); */

/* //Ejemplo 33: Ejercicio practico con map(), filter() y reduce() y otros elementos de arrays
// Let's go back to Julia and Kate's study about dogs. This time they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
// 4. Run the function for both test datasets
// Test Data 1: [5, 2, 4, 1, 15, 8, 3]

let array = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(res){
    let newArray = res.map(function(event){
        if (event <= 2) {
            return 2 * event;
        }else if (event > 2) {
            return 16 + (event * 4);
        }
    });
    return newArray;
}


let newArray = calcAverageHumanAge(array);
console.log("The new array in human age is: ", newArray);

let arrayLess18 = newArray.filter(function(evento){
    return evento > 18;
});
console.log("The new array with dogs that are less than 18 is: ", arrayLess18);

let averageAge = arrayLess18.reduce(function(acc, mov, i){
    return (acc + mov);
}, 0);
console.log("The average human age of adult dogs is: ", (averageAge/arrayLess18.length)); */

/* //Ejemplo 34: Mas ejemplos con arrays
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const accounts = [account1, account2, account3, account4]; //Almacenamos la informacion de los 4 objetos en un array.
const mapa = accounts.map(function(evento){
    return evento.movements;
}); //console.log(mapa);

// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

// 2.
//const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); //Debemos colocar ++count porque si no, el numero siempre se mantendra en 0.
// console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {        
        acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;  //cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
        return acc;
    },{ deposits: 0, withdrawals: 0 });

//console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
function convertTitleCase(title) {
    
    function capitzalize(str){
        return str[0].toUpperCase() + str.slice(1); //En la posicion 0, cambiamos la letra a mayuscula, y luego concatenamos con el "+", el resto de la palabra en la posicion [1]
    }
    
    const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(evento => (exceptions.includes(evento) ? evento : capitzalize(evento)))
    .join(' ');
    return capitzalize(titleCase);
};

console.log(convertTitleCase('and here is another title with an EXAMPLE'));
console.log(convertTitleCase('this is a LONG title but not too long')); */


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

/* // Ejemplo 2: Uso del operador ternario (simplificación de la estructura IF-ELSE)
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
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
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

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

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


//         $$$$$$$$$$$$$$$ Numbers, dates, Intl and timers $$$$$$$$$$$$$$$


/* //Ejemplo 1: Conversion, Parseo y verificar si es un numero, indefinido o infinito
//Convertion
console.log(Number("23"));
console.log(+"23");
console.log(parseInt("23"));

//Parsing
console.log("\n");
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
console.log(Number.parseInt('  2.5rem  '));
console.log(Number.parseFloat('  2.5rem  '));

// Check if value is NaN
console.log("\n");
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0)); */

/* //Ejemplo 2: Acceso a propiedades del objeto Math, y metodo Min y Max. 
console.log("--> euler: "+ Math.E);
console.log("--> pi: "+ Math.PI);
console.log("--> sqrt: "+ Math.sqrt(25));
console.log("--> sqrt: "+ 25**(1/2));

const numeros = [55, 13, -25, 93, 4]; 
console.log("Los numeros SIN spread son: ",numeros);
console.log("Los numeros CON spread son: ",...numeros); //... pasan de un array a cada numero separado de manera individual
const minimo = Math.min(...numeros); 
const maximo = Math.max(...numeros);
console.log("El menor es: ", minimo);
console.log("El mayor es: ", maximo); */

/* //Ejemplo 3: Use of numeric separators
const diameter = 287_460_000_000;// 287,460,000,000
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));   //NaN
console.log(parseInt('230_000')); //230000 */

/* //Ejemplo 4: Aplicacion para metodo de redondeo con ceil, floor, round y Aplicacion para metodo de raiz cuadrada
console.log(Math.ceil(.95));   // Expected output: 1
console.log(Math.ceil(4));     // Expected output: 4
console.log(Math.ceil(7.004)); // Expected output: 8
console.log(Math.ceil(-7.004));// Expected output: -7

console.log("\n");

console.log(Math.trunc(20.49));  // Expected output: 20
console.log(Math.trunc(20.50));  // Expected output: 20
console.log(Math.trunc(-20.50)); // Expected output: -20
console.log(Math.trunc(-20.51)); // Expected output: -20

console.log("\n");

console.log(Math.floor(.95));    // Expected output: 0
console.log(Math.floor(4));      // Expected output: 4
console.log(Math.floor(7.004));  // Expected output: 7
console.log(Math.floor(-7.004)); // Expected output: -8

console.log("\n");

console.log(Math.round(20.49));   // Expected output: 20
console.log(Math.round(20.50));   // Expected output: 21
console.log(Math.round(-20.50));  // Expected output: -20
console.log(Math.round(-20.51));  // Expected output: -21

console.log("\n");

console.log(+Math.sqrt(9).toFixed(4));
console.log(+Math.sqrt(2).toFixed(6));
console.log(+(2.7).toFixed(0));
console.log(+(2.345).toFixed(2)); */

/* //Ejemplo 5: Uso del metodo random para la generacion de numeros psudo-aleatorios, entre [0, 1), entre [0, limite) y entre [limiteInferior, limiteSuperior).

for (let i = 0; i < 5; i++) {
    console.log(Math.random());
}

console.log("\n");

for (let i = 0; i < 5; i++) { 
    console.log(Math.random()*10);
}

console.log("\n");

let limiteInferior = parseInt(0); 
let limiteSuperior = parseInt(10);

for (let i = 0; i < 5; i++) {
    const x = generateRandomNumber(limiteInferior, limiteSuperior);
    console.log(x);
}

function generateRandomNumber (limiteInferior, limiteSuperior){
    return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + 1) + limiteInferior;  // De 1 a 10
    //return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + limiteInferior);    // De 0 a 9
} */

/* //Ejemplo 6: Uso de BigInt
console.log(2 ** 53 - 1); //The biggest number in JS
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); //This numbers and the next three are unstable ones and must not be used.
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

// Divisions
console.log(11n / 3n); //It shows only the integer.
console.log(11 / 3);   //It shows the number with decimals. */

/* //Ejemplo 7: Obtener la fecha y hora actuales. Creacion de instancias de objetos Date con la clase date con fechas personalizadas. Y obtener datos de las fechas en formato STRING.
let fechaActual = new Date();  console.log("La fecha actual del sistema es: ", fechaActual);
let fecha1 = new Date(2023, 3, 22);  console.log("La fecha actual del sistema es: ", fecha1);
let fecha2 = new Date(2023, 11, 24, 23, 59, 59);  console.log("La fecha actual de navidad es: ", fecha2); 
let fecha3 = new Date("Aug 02 2023 18:05:41" );  console.log("La fecha actual de navidad es: ", fecha3); 
let fecha4 = new Date("December 17, 2021" ); console.log("La fecha actual de navidad es: ", fecha4); 

console.log("\n", "Los valores singulares de la fecha de navidad son: ",{
    year: fecha2.getFullYear(),
    month: fecha2.getMonth(),
    date: fecha2.getDate(), 
    week: fecha2.getDay(),
    hour: fecha2.getHours(),
    minute: fecha2.getMinutes(),
    second: fecha2.getSeconds(),
    isoString: fecha2.toISOString(),
    time: fecha2.getTime()
});

//Obtener los datos de las fechas en cadenas de texto (STRING)
console.log("\n"+ "toDateString: ", fechaActual.toDateString());
console.log("toLocalString: ", fechaActual.toLocaleString());
console.log("toLocalDateString: ", fechaActual.toLocaleDateString());
console.log("toTimeString: ", fechaActual.toTimeString());
console.log("toLocaleTimeString: ", fechaActual.toLocaleTimeString());

//Creamos una nueva fecha, y despues logeamos esa fecha sin necesidad de poner "new"
console.log("\n"+ new Date(1690259566417));
console.log(Date.now());

//Convertir una fecha a numero
const future = new Date(2037, 10, 19, 15, 23);
console.log("\n"+"La fecha convertida en milisegundos es: "+ (+future));

//Calcular la diferencia entre 2 fechas (diferencia = fechaSuperior - fechaInferior)
let fechaMiCumple = new Date(2024, 3, 22);
let hoy = new Date();
const diferencia = fechaMiCumple - hoy; // Marca de timempo (milisegundos)
const milisegundosPorDia = 86400000;    // 86400000mS = 86400s = 1440min = 24h
console.log("\n"+ "--> La diferencia de fechas entre hoy y mi cumpleanos es: " + Math.round((diferencia/milisegundosPorDia))); */

/* //Ejemplo 8: Internationalizing Dates (Intl)
const now = new Date();
const options = {
    hour:"numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
}

const locale = navigator.language;
const res = new Intl.DateTimeFormat(locale, options).format(now);
// const res = new Intl.DateTimeFormat("pt-PT", options).format(now);
console.log(res); */

/* //Ejemplo 9: Internationalizing Numbers (Intl)
const num = 3884764.23;

const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language, options).format(num)); */

/* // Ejemplo 10: Creacion de una funcionalidad asincriona con setTimeout 

const ingredients = ['olives', 'spinach', 'pepperoni'];
const pizzaTimer = setTimeout(function (ing1, ing2, ing3){
    return console.log(`Here is your pizza with ${ing1}, ${ing2} and ${ing3} 🍕`);
},1500, ...ingredients); //Tod0s los argumentos que pasemos despues del delay, seran argumentos de la funcion

console.log('Waiting...');

if (ingredients.includes('res')) clearTimeout(pizzaTimer);

// setInterval(function () {
//     const now = new Date();
//     console.log(now);
// }, 1000); */

/* // Ejemplo 11: Creacion de un countdown hacia abajo

const SEGUNDOS = 3;
for (let LEFT = 1; LEFT <= SEGUNDOS; LEFT++) {
    setTimeout(() => {
        console.log(((SEGUNDOS+1-LEFT).toString() + " segundos left"));
    }, LEFT*1000);
}  */

/* // Ejemplo 12: Aplicacion del modelo asincrono para momstrar a una de las letras de dos palabras

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

/* // Ejemplo 13: Uso del setInterval para ejecutar continuamente funcionalidades cada x cantidad de segundos.
setInterval(() => {
    console.log("Tic-Toc")
}, 1000) */

/* // Ejemplo 14: Ejemplo de como suspender un setInterval y clearTimeout
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


//         $$$$$$$$$$$$$$$ DOM & EVENTOS $$$$$$$$$$$$$$$


/* //Ejemplo 1: Acceso a la variable global document y sus propiedades
console.log("Cual es nuestro documento? ", document.documentElement);
console.log("Cual es nuestro body? ", document.body);
console.log("Cual es nuestro head? ", document.head); */

/* //Ejemplo 2: Obtener un elemento del HTML a partir de su id, clase o etiqueta HTML. Y tambien acceder a un elemento con el querySelector y querySelectorAll
console.log("Acceder a un elemento con el querySelector", document.querySelector("#formulario_HTML .mb-3"));
console.log("Acceder a un elemento con el querySelectorAll", document.querySelectorAll("#formulario_HTML .mb-3"));
console.log("Obtener un elemento del HTML a partir de su id: ", document.getElementById("bienvenida"));
console.log("Obtener un elemento del HTML a partir de su clase: ",document.getElementsByClassName("texto"));
console.log("Obtener un elemento del HTML a partir de su etiqueta HTML: ", document.getElementsByTagName("p")); */

/* //Ejemplo 3: Recorrer una coleccion de nodos devueltos por alguna query
let items = document.getElementsByTagName("h1");
console.log("Los elementos de nuestra pagina que estan fabricados a partir de la etiqueta h1 son: ",items);

for (const unItem of items) {
    console.log("--> ", unItem);
} */

/* //Ejemplo 4: Como modificamos el contenido del texto de un nodo
let frase_obtenida = "Hola, bienvenidos a la clase de Javascript 😈";
let nodo = document.getElementById("titulo");
console.log("El texto original que modificaremos es: ", document.getElementById("titulo").innerText);
nodo.innerText = frase_obtenida;

document.getElementById("subtitulo").className = "coloreado";
document.getElementById('frase').classList.add('coloreadoX2');

document.getElementById("subtitulo").innerHTML = "<strong>Hola soy german!!</strong>";
document.getElementById("frase").innerText = "Hola";
document.getElementById("bienvenida").textContent = "Adios"; */

/* //Ejemplo 5: Crear una lista de elementos a partir del contenido de un array y luego eliminar nodos
let paises = ["Argentina", "Brazil", "Mexico", "Peru", "Suecia"];

let nodoPaises = document.getElementById("paises"); //Obtenemos el elemento "paises" del HTML
nodoPaises.innerHTML = ""; //Al dejar las comillas vacias, se borra el contenido del elemento "paises" en el HTML.

for (const unPais of paises) {
    let nuevoItem = document.createElement("li"); //Creamos un elemento "li" para el elemento "ul" del HTML
    nuevoItem.innerText = unPais; //Le agregamos el nombre que se encuentra en la posicin "unPais". Que va desde "Argentina" hasta "Suecia".
    nodoPaises.append(nuevoItem); //Una vez que creamos el nuevo elemento "li", es importante AGREGARLO, ya que unicamente lo creamos en la linea anterior.
}

let paisesRecuperados = document.querySelector("li");
console.log("-->", paisesRecuperados);
paisesRecuperados[2].remove(); */

/* //Ejemplo 6: Creacion de un elemento HTML en JS, añadicion de nodos en determinada posicion, y eliminacion de nodos.
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="res">Got it!</button>';
const body = document.querySelector('body');
body.append(message);                 //Sirve para colocar el nodo al final
// body.append(message.cloneNode(true)); //Sirve para duplicar el nodo y colocarlo debajo del principal
// body.prepend(message);                //Sirve para colocar el nodo al inicio
// body.after(message);                  //Cumple la misma funcion que body.append(message)
// body.before(message);                 //Cumple la misma funcion que body.prepend(message)

document.querySelector('.res').addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
}); */

/* //Ejemplo 7: Escribir dentro de los inputs a travez del .value
document.getElementById("nombres").value = "Cual es tu nombre?";
document.getElementById("apellidos").value = "Cual es tu apellido?"; */

/* //Ejemplo 8: Uso de plantillas
const producto = {id: 1001, nombre: "Carne asada", precio: 140};

//Creamos un elemento div 
let contenedor = document.createElement("div");

//Definimos el innerHTML del elemento con una plantilla de texto
contenedor.innerHTML = `<h3> ID: ${producto.id}</h3>
                        <p> Producto: ${producto.nombre}</p>
                        <b> $ ${producto.precio}</b>`;

//Agregamos el contenedor creado al body
document.body.appendChild(contenedor);

//Formas de concatenar o mostrar en pantalla
let concatenado = "id: "+ producto.id+" - Nombre: "+ producto.nombre + " - precio: $"+ producto.precio;   console.log("Concatenado", concatenado);
let plantilla = `id: ${producto.id} - Nombre: ${producto.nombre} - Precio: $${producto.precio}`;          console.log("Plantilla  ", plantilla);  */

/* //Ejemplo 9: Agregar un elemento con estilizado
//METODO 1
const producto1 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor1 = document.createElement("div");
contenedor1.style.marginTop = "50px";
contenedor1.style.marginBottom = "50px";
contenedor1.style.padding = "40px";
contenedor1.style.borderRadius = "20px";
contenedor1.style.background = "rgb(1, 135, 108)";
contenedor1.style.color = "rgb(250, 255, 255)";
contenedor1.style.opacity = "0.8";
contenedor1.innerHTML = `<h3> ID: ${producto1.id}</h3><p> Producto: ${producto1.nombre}</p><b> $ ${producto1.precio}</b>`;
contenedor1.className = 'border pad';
document.getElementById("main").append(contenedor1); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor1);


//METODO 1.2
const producto2 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor2 = document.createElement("div");
contenedor2.classList.add("res");
// contenedor2.textContent = "Hello world!";
contenedor2.innerHTML = `<h3> ID: ${producto2.id}</h3><p> Producto: ${producto2.nombre}</p><b> $ ${producto2.precio}</b>`;
contenedor2.className = 'border pad';
document.getElementById("main").append(contenedor2); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor2);


// METODO 2.1
document.addEventListener('DOMContentLoaded', function() {
    const producto3 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor3 = document.createElement("div");
    contenedor3.style.marginTop = "50px";
    contenedor3.style.marginBottom = "50px";
    contenedor3.style.padding = "40px";
    contenedor3.style.borderRadius = "20px";
    contenedor3.style.background = "rgb(1, 135, 108)";
    contenedor3.style.color = "rgb(250, 255, 255)";
    contenedor3.style.opacity = "0.8";
    contenedor3.innerHTML = `<h3> ID: ${producto3.id}</h3><p> Producto: ${producto3.nombre}</p><b> $ ${producto3.precio}</b>`;
    contenedor3.className = 'border pad';
    document.getElementById("main").append(contenedor3); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor3);
}, true);


// METODO 2.2
document.addEventListener('DOMContentLoaded', function() {
    const producto4 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor4 = document.createElement("div");
    contenedor4.classList.add("res");
    // contenedor4.textContent = "Hello world!";
    contenedor4.innerHTML = `<h3> ID: ${producto4.id}</h3><p> Producto: ${producto4.nombre}</p><b> $ ${producto4.precio}</b>`;
    contenedor4.className = 'border pad';
    document.getElementById("main").append(contenedor4); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor4);
}, true); */

/* //Ejemplo 10: Agregar eventos a un nodo mediante el addEventListener y mediante la propiedad con el evento necesario

// METODO 1.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", function() {
    console.log("Hola");
});

//METODO 1.2
function saludar() {
    console.log("Hola, bienvenido!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", saludar);

//METODO 2.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function() {
    console.log("Hola, bienvenido!")
};

// METODO 2.2
function saludar() {
    console.log("Hola!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function(){
    saludar();
} */

/* //Ejemplo 11: Agregar eventos a un nodo mediante el atributo de evento de la etiqueta (No es recomendable usar en proyectos de produccion)
//Esto va en el HTML, dentro del form (Esto va en el HTML, NO en el documento .js)
//<button type="button" class="btn btn-primary" id="btnInscribir" onclick="alert('Hola Mundo!');">Inscribir</button> */

/* //Ejemplo 12: Agregar a un nodo el evento del movimiento del mouse, los eventos de keydown y keyup para un input, el evento change y el evento input.

//Uso del mousemove
const title = document.getElementsByTagName("h1")[0]; //[0] representa el numero de los h1 que se encuentran en el HTML. Como en este caso solo hay uno, entonces inicializa en 0 y asi sucesivamente, dependiendo del tipo de etiqueta que estemos utilizando.
console.log("--> H1", title);
title.addEventListener("mousemove",() => {
    console.log("--> El mouse se esta moviendo sobre el titulo de la pagina <--")
});

//Uso del mouseenter
const title2 = document.querySelector("h1");
const res = function(evento){
    alert("--> El mouse se esta moviendo solo una vez <--");
}

title2.addEventListener("mouseenter", res);
setTimeout(() => title2.removeEventListener("mouseenter", res), 3000);

//Uso del keydown
const input1 = document.getElementById("apellidos");  //Agregar a un nodo los eventos de keydown y keyup para un input.
input1.addEventListener("keydown",() => {
    console.log("--> La tecla bajo <--")
})

//Uso del keyup
input1.addEventListener("keyup",() => {
    console.log("--> La tecla subio <--")
})

//Uso del change
const input2 = document.getElementById("nombres"); //Agregar a un nodo el evento change.
input2.addEventListener("change",() => {
    console.log("--> El valor del input cambio <--", input2.value);
    input2.value = input2.value.trim();
});

//Uso del input
const input3 = document.getElementById("correo"); //Agregar a un nodo el evento change (Simulando un keylogger).
input3.addEventListener("input",() => {
    console.log("--> Ejecutaste el evento INPUT <--");
}); */

/* //Ejemplo 13: uso del evento submit para validar los inputs de un formulario.

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

class Participante { //Uso de eventos para rellenar los espacios en blanco y desplegar la informacion
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

const formulario = document.getElementById("formulario_HTML");      console.log(formulario);
formulario.addEventListener("submit", function(evento) {
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
    const apellidos = document.getElementById("apellidos").value;     console.log("Apellidos: "+ apellidos);
    const nombres = document.getElementById("nombres").value;         console.log("Nombres: "+ nombres);
    const ocupacion = document.getElementById("ocupacion").value;     console.log("Ocupacion: "+ ocupacion);
    const correo = document.getElementById("correo").value;           console.log("Correo: "+ correo);
    const participar = document.getElementById("participar").checked; console.log("Participar: "+ participar);// Mediante la propiedad checked accedemos al valor booleano true/false que representa si el radiobutton o el checkbox fue "tildado/seleccionado"

    // Instanciamos la creacion de un objeto con la forma de un Participante
    const unaOcupacion = ocupaciones.find((evento) => evento.numero.toString() === ocupacion);                         console.log("unaOcupacion", unaOcupacion);
    const unParticipante = new Participante(participantes.length+1,apellidos,nombres,unaOcupacion,correo,participar);  console.log("--> Un participante a ser anadido", unParticipante);

    // Anadimos un elemento a la lista de aprticipantes (aun no incorporamos un control sobre existentes o similar)
    participantes.push(unParticipante);           console.log("--> Que elementos posee mi array de participantes",participantes);

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
} */


/* //Ejemplo 14: Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    const s1coords = section1.getBoundingClientRect(); 
    console.log("Section position: ", s1coords);                              //Representa la posicion de la seccion
    console.log("Learn more botton position: ", evento.target.getBoundingClientRect()); //Representa la posicion del boton "learn more"
    console.log("Current scroll (X/Y): ", window.scrollX, window.scrollY);
    console.log("Height/width viewport: ", document.documentElement.clientHeight, document.documentElement.clientWidth);
    
    //Scrolling (method 1)
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

    //Scrolling (method 2)
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX, 
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth"
    // });

    //Scrolling (method 3)
    section1.scrollIntoView({behavior: "smooth"});
}); */

/* //Ejemplo 15: Creating and inserting elements, use of styles atributes, non-standard and classes
// Creating and inserting elements
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.parentElement.removeChild(message);
});


// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 50 + 'px'; //El segundo elemento en parseInt representa el radix (base del sistema numerico, en este caso 10 es decimal)
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty("--color-primary", "orange");


// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
logo.clasName = 'jonas'; // Don't use because this will override all the existing classes and it will allow us only put one class on any element.*/

/* //Ejemplo 16: Use and difference between target and currentTarget
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(){
    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
}

//En el HTML, estos tres querySelector que tiene el nav, nav__links y nav__link, esan agrupados en ese orden de arriba hacia abajo (O sea, un arbol). Si presiono el elemento padre (nav), unicamente se ejecutara ese evento, pero si ejecuto el ultimo (nav__link), se ejecutaran los 3 eventos ya que debe pasar por sus elementos anteriores para llegar hasta ese ultimo evento.
//Recordar que en un EventListener el this siempre apunta al elemento en el cual se adjunta ese EventListener.
//Para el caso de los target y currentTarget, se puede apreciar la diferencia cuando se hace click en los elementos hijos. Por ejemeplo. Si presiono el nav, no habra ninguna diferencia ya que es el elemento padre. Pero si presionamos nav__links, los target y currentTarget de este hijo seran los mismos, mientras que, en cuando ahora se ejecute el nav, el target seguira siendo el mismo ejecutado en el nav__links, pero en el currentTarget ahi si tomara el target actual, o sea, el del nav.
document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV e.target: ', e.target);
    console.log('NAV e.currentTarget: ', e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('CONTAINER e.target: ', e.target, );
    console.log('CONTAINER e.currentTarget:', e.currentTarget);
});

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('LINK e.target: ', e.target);
    console.log('LINK e.currentTarget: ', e.currentTarget);

    // console.log(e.currentTarget === this);
    // e.stopPropagation();
}); */

/* //Ejemplo 17: Page navigation, uso de scrollIntoView y diferencia entre usar this y target en addEventListener.
//Metodo 1 (Esto es una mala practica cuando existen muchos elementos, porque tenemos muchas copias de la misma callback function, lo cual hara que la pagina sea mas lenta)
// document.querySelectorAll(".nav__link").forEach(function(evento){
//     evento.addEventListener("click", function(iter){
//         iter.preventDefault();

//         //Aqui usamos this en este addEventListener porque, estamos trabajando directamente con cada link (nav__link) por medio del foreach, por lo que, el this representa el elemento actual en el que se esta trabajando al precionar el boton
//         const id = this.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
//         document.querySelector(id).scrollIntoView({behavior: "smooth"});
//     })
// })

//Metodo 2
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
}); */

/* //Ejemplo 18: Use of childNodes, children, firstElementChild, lastElementChild, parentNode, parentElement and closest.
const h1 = document.querySelector("h1");

// Going downwards: child
console.log("h1.querySelectorAll('.highlight')", h1.querySelectorAll(".highlight")); //Muestra todos los hijos de h1 con el nombre highlight
console.log("h1.childNodes", h1.childNodes); // Retorna una lista de nodos de los nodos hijos de un elemento. En este caso, los hijos de h1. (Casi no se usa)
console.log("h1.children", h1.children); //Retorna una coleccion HTML de los elementos hijos de un elemento y solo funciona para hijos directos. En este caso, los elementos de h1. (Se usa mucho)
h1.firstElementChild.style.color = 'white'; //Este se usa para recuperar (y/o modificar) el primer elemento hijo.
h1.lastElementChild.style.color = 'orangered'; //Este se usa para recuperar (y/o modificar) el ultimo elemento hijo.

// Going upwards: parents (parentNode y parentElement nos permiten acceder al elemento del elemento que estamos usando. En este caso, <div class="header__title"> es padre de h1.)
console.log("h1.parentNode", h1.parentNode);  
console.log("h1.parentElement", h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closese() se usa para seleccionar el elemento mas cercano a h1, por lo general es lo inverso al querySelector, ya que en lugar de buscar los elementos hijos, este busca los elementos padres.
console.log(h1.closest('.header'));

h1.closest('h1').style.background = 'var(--gradient-primary)';
console.log(h1.closest('h1'));

// Going sideways: siblings
console.log(h1.previousElementSibling); //Returns the previous element at the same node tree level
console.log(h1.nextElementSibling); //Returns the next element at the same node tree level
console.log(h1.previousSibling); //Returns the previous node at the same node tree level
console.log(h1.nextSibling); //Returns the next node at the same node tree level
console.log(h1.parentElement.children); //This allows access to the h1's parent and then it allows us to access to all its children, which are h1, h4, button and img.

[...h1.parentElement.children].forEach(function (evento) {
    if (evento !== h1) evento.style.transform = 'scale(0.5)';
}); */

/* //Ejemplo 19: Building a Tabbed Component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (evento) {
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente
//el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano
//con el nombre operations__tab (incluyendo su hijo <span>). 
//Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el 
//class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes. */

/* // Ejemplo 20.1: Passing Arguments to Event Handlers (Method 1)

// Menu fade animation 
function handleHover(evento) {
    
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    console.log(this, evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter) {
            if (iter !== link) iter.style.opacity = this;
        });

        logo.style.opacity = this;
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1)); */

/* // Ejemplo 20.2: Passing Arguments to Event Handlers (Method 2) 
// Menu fade animation
function handleHover(evento, opacity) {

    console.log(evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter){
            if (iter !== link) iter.style.opacity = opacity;
        });

        logo.style.opacity = opacity;
    }
};

//Debido a que addEventListener requiere una funcion como parametro, no podemos simplemente usar la funcion de handleHover directamente ahi porque esta al final del dia retorna un valor, lo cual es incorrecto cuando usamos addEventListener.
nav.addEventListener('mouseover', function(evento){
    handleHover(evento, 0.5);
    console.log(this);
});

nav.addEventListener('mouseout', function(evento){
    handleHover(evento, 1);
    console.log(this);
}); */

/* //Ejemplo 21: Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
    console.log(window.scrollY);
    window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
}); */

/* //Ejemplo 22.1: The Intersection Observer API

const obsCallback = function(entries, observer){ //Whenever the first section (our target) is intersecting the viewport at 10%, the function will get called and that's no matter if we're scrolling up or down.
    entries.forEach(evento => console.log(evento));
} 

const obsOptions = { 
    root: null,     //root is the element that the target is intersecting. We write null and we'll be able to observe our target element intersecting the entire wiewport (the entire rectangle which shows the current portion of the page)
    // threshold: 0.1,  //This is the percent of intersection at which the obersver callback will be called
    threshold: [0, 0.2] //0 means that our callback will trigger each time that the target element moves complitelly out of the view. and 1 when the 100% of the target is actually visible in the viewport.
}

//             new IntersectionObserver(callback,    options);
const IO_API = new IntersectionObserver(obsCallback, obsOptions); // Our "callback" and "options" will be pased into our so called IntersectionObserver object.
IO_API.observe(section1); //This is the target element that will intersect in root. */

/* //Ejemplo 22.2: The Intersection Observer API
const stickyNav = function(entries){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    console.log(entry);

    if (!entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.add("sticky");
    }else{
        nav.classList.remove("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header); */

/* //Ejemplo 23: Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
}); */

/* //Ejemplo 24: Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento)); */



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


/* // Ejemplo 1: Como conocer los estados de una promesa
function eventoFuturo (){
    return new Promise( (resolve, reject) => {

    });
}
console.log( eventoFuturo() ) // Promise { <pending> } */

/* // Ejemplo 2: Uso de los resultados de una Promesa para cambiar sus estados
function eventoFuturo1(res){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada');
        }, 1000)
    })
}
//Devuelve pending porque la funcion se ejecutara y esperara 1500mS por el setTimeout, pero como no hay nada que haga que "espere" a que esto se resuelva, entonces no se mostrara nada.
console.log( eventoFuturo1(true) ) // Promise { <pending> }
console.log( eventoFuturo1(false) ) // Promise { <pending> } */

/* // Ejemplo 3: Uso del Then y Catch para catpturar los resultados y aprovechamiento de las posibilidades de respuestas de una promesa
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

/* // Ejemplo 4: Ejercicio con un array, usando then/catch/finally y tambien ASYNC/AWAIT
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

/* // Ejemplo 5: Ejemplo del uso de Promesa para recuperar informacion de una base de datos

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

/* // Ejemplo 3: Cómo recuperar datos de una localizacion externa (http://) e una interna (.json) con rutas relativas

recuperarPosteos();

function recuperarPosteos() {
    let bodyTable = document.getElementById("tableBody"); // Pintar la tabla de carreras en la UI
    bodyTable.innerHTML = "";
    toggleLoadingContainer(true);
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")  //Localizacion externa
    // fetch("/ApuntesDeClase/data/posts.json")                //Localizacion interna
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
    }, 2000);
}

function toggleLoadingContainer(isLoading = false) {
    const loadingContainer = document.getElementById("loadingMessage");
    if (isLoading) {
        loadingContainer.classList.remove("visually-hidden");
    } else {
        loadingContainer.classList.add("visually-hidden");
    }
} */

/* // Ejemplo 4: Uso de ASYNC/AWAIT para crear funciones asincrónas que se comportan como si fueran sincronas
console.log("Previo a hacer la solicitud");
async function pedirPosts(){
  const respuesta = await fetch("./data/posts.json");  console.log("Obtuvimos la respuesta: ");
  console.log(respuesta);
  const data = await respuesta.json();  console.log("Obtengo el BODY de la respuesta: ");
  console.log(data);
};

pedirPosts(); */

/* // Ejemplo 5: Uso de los parámetros de configuración para el método fetch (CREACIÓN DE UN RECURSO)
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

/* // Ejemplo 6: Uso de los parámetros de configuración para el método fetch (MODIFICACIÓN DE UN RECURSO)
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

/* // Ejemplo 7: Uso de los parámetros de configuración para el método fetch (ELIMINACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "DELETE",
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

