import dotenv from 'dotenv';
import program from '../process.js';

const environment = program.opts().mode; //nodemon backend.js --mode prod   -->   Servidor escuchando por el puerto: 3001
dotenv.config({ path: environment === "prod" ? "./Ejercicio-45/src/config/.env.production" : "./Ejercicio-45/src/config/.env.development" });

console.log("environment --> ", environment);
console.log("PERSISTENCE::: ", program.opts().persist);

const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};

export default config;