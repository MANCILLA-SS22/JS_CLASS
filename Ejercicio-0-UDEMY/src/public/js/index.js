// import "@babel/polyfill";
// import "core-js/stable";
// import "regenerator-runtime";
import {login, logout} from "./login.js";
import {displayMap} from "./leaflet.js";
import { updateSettings } from "./updateSettings.js";

const mapLeaftlet = document.getElementById('map');
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

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

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if(userDataForm){
    userDataForm.addEventListener("submit", function(event){
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        updateSettings({name, email}, 'data');
    });
};

if(userPasswordForm){
    userPasswordForm.addEventListener("submit", async function(event){
        event.preventDefault();
        document.querySelector(".btn--save-password").textContent = "Updating...";
        const passwordCurrent = document.getElementById("password-current").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;
        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

        document.querySelector(".btn--save-password").textContent = "Save password";
        document.getElementById("password-current").value = '';
        document.getElementById("password").value = '';
        document.getElementById("password-confirm").value = '';
    });
};