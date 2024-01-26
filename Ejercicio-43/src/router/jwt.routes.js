import { Router } from 'express';
import {userModel} from "../models/user.model.js";
import { validateHash, generateJWToken } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post("/login", login);
router.post("/register", passport.authenticate("register", {session: false}), register);

async function login(req, res){
    console.log(req)
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({ email });
        console.log("Usuario encontrado para login: ", user);

        if (!user)                         return res.status(204).send({ error: "Not found", message: "User doesn't exists with username: " + email });
        if (!validateHash(user, password)) return res.status(401).send({ status: "error", error: "Invalid credentials for user: "+ email});

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
        res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true } ) //Aqui se almacena la cookie
        res.send({ message: "Login success!!" });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
}

async function register(req, res){
    console.log("Registrando usuario")
    res.status(201).send({status: "success", message: "Usuario creado con exito"});
}

export default router;