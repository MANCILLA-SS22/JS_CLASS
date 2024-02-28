// import "@babel/polyfill";
// import "core-js/stable"
// import "regenerator-runtime";
import {login} from "./login.js"
import {displayMap} from "./leaflet.js"
console.log("Res")

const mapLeaftlet = document.getElementById('map');
const loginForm = document.querySelector(".form")

if (mapLeaftlet){
    const locations = JSON.parse(mapLeaftlet.dataset.locations);
    displayMap(locations);
};

if(loginForm){
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password)
    });
};