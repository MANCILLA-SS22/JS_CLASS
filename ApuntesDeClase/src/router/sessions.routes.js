/* //Ejemplo 41: Login por formulario, autenticacion-autorizacion

import { Router } from "express";
import {userModel} from "../models/user.model.js";
import { createHash, validateHash } from "../utils.js";

const router = Router();

router.post('/register', async function(req, res){
    const { first_name, last_name, email, age, password } = req.body;
    // console.log("Registrando usuario:", req.body);

    const exist  = await userModel.findOne({email});
    if(exist) return res.status(400).send({status: "error", msg: "Usuario existente!"});

    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password)
    }

    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
});

router.post('/login', async function(req, res){
    const { email, password } = req.body;
    // const user = await userModel.findOne({ email, password }); //Ya que el password no está hasheado, podemos buscarlo directamente
    const user = await userModel.findOne({ email });

    if(!validateHash(user, password)) return res.status(401).send({ status: 'error', error: "Incorrect credentials" });
    if (!user) return res.status(401).send({ status: 'error', error: "Incorrect credentials" })

    req.session.user = { //creamos session con el atributo user
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ 
        status: "success", 
        payload: req.session.user, 
        message: "¡Primer logueo realizado! :)" 
    });
})

export default router; */

// Ejemplo 42: Uso de passport 
import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate("register", {failureRedirect: "api/session/fail-register"}), async function(req, res){
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
});

router.post('/login', passport.authenticate("login", {failureRedirect: "api/session/fail-login"}), async function(req, res){
    console.log("User found to login:");    
    const user = req.user;
    req.session.user = { //creamos session con el atributo user
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;