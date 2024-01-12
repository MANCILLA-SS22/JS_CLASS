import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

function createHash(password){ //Generamos el hash
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function validateHash(user, password){ //Validamos el hash
    return bcrypt.compareSync(password, user.password);
}


export { __dirname, createHash, validateHash };