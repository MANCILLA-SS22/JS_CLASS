import { Router } from 'express';
import {userModel} from "../models/user.model.js";
import { validateHash, generateJWToken } from '../utils.js';

const router = Router();

router.post("/login", async function(req, res){
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({ email });
        console.log("Usuario encontrado para login: ", user);

        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(204).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
        }        

        if (!validateHash(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }

        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };

        const access_token = generateJWToken(tokenUser);  console.log(access_token);

        // 1ro con LocalStorage
        // res.send({ message: "Login successful!", jwt: access_token, id: user._id.toString() });


        // 2do con Cookies
        res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true } ) //httpOnly: true No se expone la cookie --- httpOnly: false Si se expone la cookie (al usar console.log)
        res.send({ message: "Login success!!" })  

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
});

export default router;