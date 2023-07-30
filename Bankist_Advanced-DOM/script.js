const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (evento) {
  evento.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* //Metodo 1
for (let i = 0; i < btnsOpenModal.length; i++){
  btnsOpenModal[i].addEventListener('click', openModal);
} */

//Metodo 2
btnsOpenModal.forEach(function(evento) {
  evento.addEventListener("click", openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


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
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 30 + 'px'; //El segundo elemento en parseInt representa el radix (base del sistema numerico, en este caso 10 es decimal)
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.parentElement.removeChild(message);
});

document.documentElement.style.setProperty("--color-primary", "orangered");


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
logo.clasName = 'jonas'; // Don't use because this will override all the existing classes and it will allow us only put one class on any element.