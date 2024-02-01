import dotenv from 'dotenv';
import program from '../process.js';

// const environment = "dev";
// dotenv.config({path: "./Ejercicio-45/.env"});

const environment = program.opts().mode;
console.log("environment", environment);
dotenv.config({path: environment === "dev" ? "./Ejercicio-45/src/config/.env.production" : "./Ejercicio-45/src/config/.env.development"});

const config = {
    port: process.env.PORT,
    urlMongo: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
}

export {config} 