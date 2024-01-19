import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github"
import {userModel} from "../models/user.model.js";
import { createHash, validateHash } from "../utils.js";

const localStrategy = passportLocal.Strategy; //Declaramos estrategia
function initialPassport(){ 
    passport.use("register", new localStrategy( {passReqToCallback: true, usernameField: 'email'}, register ));
    passport.use("login", new localStrategy( {passReqToCallback: true, usernameField: 'email'}, login ));
    passport.use("github", new GitHubStrategy( {clientID: "",clientSecret: "",callbackUrl: ""}, github ));    
    passport.serializeUser(serialize); 
    passport.deserializeUser(deserialize);    
}

async function github(accessToken, refreshToken, profile, done){
    console.log("Profile obtenido del usuario de Github", profile);

    try {
        const user = await userModel.findOne({email: profile._json.email});
        console.log("Usuario encontrado para login: ", user);
        if(!user){ //Al no existir el usuario, lo agregamos a la base de datos
            console.warn("User doesn't exists with username: " + profile._json.email);
            let newUser = {
                first_name: profile._json.name,
                last_name: '',
                age: 28,
                email: profile._json.email,
                password: '',
                loggedBy: "GitHub"
            };
            
            const result = await userModel.create(newUser);
            return done(null, result);
        }else{
            return done(null, user); // Si entramos por aca significa que el user ya existe en la DB
        }

    } catch (error) {
        return done(error);
    } 
};

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

function serialize(user, done){
    done(null, user._id)
}
    
async function deserialize(id, done){
    try {
        let user = await userModel.findById(id);
        done(null, user);

    } catch (error) {
        console.error("Error deserializando el usuario: " + error);
    }
}

export {initialPassport};
