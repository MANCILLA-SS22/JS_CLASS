//Ejemplo 1: Exporting modile

console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

// const shippingCost = 10; //This will give us an error because we haven't exported the shippingCost variable from shoppingCart.js
export const cart = [];

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq }; //we use "as" when we want to re-name a variable and we can re-name as in the export secion and in the import section

//1. Named exportation
export function addToCart (product, quantity) {
    cart.push({
        product: product, 
        quantity: product
    });
    console.log(`${quantity} ${product} added to cart`);
};

//2. Default exportation
export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
}
