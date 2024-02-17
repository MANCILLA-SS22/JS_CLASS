import dotenv from "dotenv";  dotenv.config({path: "Desafios/Desafio8-SESSIONS/src/config.env"});
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createHash(password){ //Generamos el hash.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //genSaltSync genera un Salt de 10 caracteres. Un Salt es un string random que hace que el proceso de hasheo se realice de manera impredecible. Devuelve un string con el password hasheado. El proceso es irreversible
};

function validateHash(user, password){ //Validamos el hash. 
    return bcrypt.compareSync(password, user.password); //compareSync toma primero la clave sin hashear y lo compara con la clave hasheada en la base de datos. Devolvera true o false dependiendo si la clave coincide o no
};


export { __dirname, createHash, validateHash  };