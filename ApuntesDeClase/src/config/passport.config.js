import passport from "passport";
import passportLocal from "passport-local";
import {userModel} from "../models/user.model.js";
import { createHash, validateHash } from "../utils.js";

const localStrategy = passportLocal.Strategy; //Declaramos estrategia

function initialPassport(){ 
    //Inicializando la estrategia local, username sera para nosotros email. Done será nuestro callback
    // Este sera un middleware (por eso usamos el use). Se necesitaran dos "passport", uno para register y otro para login.
    // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
    // usernameField: renombramos el username
    passport.use("register", new localStrategy( {passReqToCallback: true, usernameField: 'email'}, register ));
    passport.use("login", new localStrategy( {passReqToCallback: true, usernameField: 'email'}, login ));

    async function register(req, username, password, done){
        const { first_name, last_name, email, age } = req.body;
        try {
            const exist  = await userModel.findOne({email}); //Validamos si el usuario existe en la base de datos
            if(exist){
                console.log("El usuario ya existe!")
                done(null, false); //Como el usuario ya existe (no es un error), no se va a registrar. El segundo parametro es falso porque no se retornara ningun usuario porque ya existe
            }

            const user = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: createHash(password)
            }

            const result = await userModel.create(user);
            return done(null, result) //El primer parametro es null porque no se genera un error, sino que se genera de forma correcta.

        } catch (error) {
            return done("Error registrando el usuario"+ error)
        }
    };

    async function login(req, username, password, done){
        try {
            const user = await userModel.findOne({ email: username });
            console.log("Usuario encontrado para login:", user);

            if (!user) {
                console.warn("User doesn't exists with username: " + username);
                return done(null, false);
            }
            if (!validateHash(user, password)) {
                console.warn("Invalid credentials for user: " + username);
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        } 
    };

    //Estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Son esenciales cuando se implementa la 
    //autenticación de usuarios en una aplicación Node.js utilizando Passport.js
    passport.serializeUser(function(user, done){
        done(null, user._id)
    });

    passport.deserializeUser(async function(id, done){
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

}

export {initialPassport};