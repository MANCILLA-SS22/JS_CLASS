// import axios from 'axios';
// import { showAlert } from './alert.js';
async function login (email, password){
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5500/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        console.log(res)
    if (res.data.status === 'success') {
        alert('success', 'Logged in successfully!');
        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    }

    }catch (err) {
        console.log(err)
        // alert('error', err.response.data.message);
    }
};

document.querySelector(".form").addEventListener("submit", function(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password)
    });

async function logout(){
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:5500/api/v1/users/logout'
        });
        if ((res.data.status = 'success')) location.reload(true);
    
    }catch (err) {
        console.log(err.response);
        showAlert('error', 'Error logging out! Try again.');
    }
};

// export {login , logout};