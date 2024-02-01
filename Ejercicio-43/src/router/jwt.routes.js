import { Router } from 'express';
import { generateJWToken } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate("login", {session:false}), login);
router.post("/register", passport.authenticate("register", {session: false}), register);

async function login(req, res){
    try {
        if(!req.user) return res.status(400).json({message: "Invalid credentials"});

        console.log("User found to login:", req.user);    
        const user = req.user;

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
        res.send({ message: "Login success!!", access_token: access_token });

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