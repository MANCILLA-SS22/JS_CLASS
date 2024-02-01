import passport from 'passport';
import passportLocal from "passport-local"
import jwtStrategy from 'passport-jwt';
import {userModel} from '../models/user.model.js';
import { PRIVATE_KEY, createHash, validateHash } from '../utils.js';

const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

function initialPassport(){ //Estrategia de obtener Token JWT por Cookie
    passport.use('jwt', new JwtStrategy({ jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: PRIVATE_KEY }, jwt ));
    passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, login ));
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, register ));
    passport.serializeUser(serialize); //Estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js
    passport.deserializeUser(deserialize);
};

async function login(req, username, password, done){
    try {
        const user = await userModel.findOne({ email: username });
        // console.log("Usuario encontrado para login:", user);

        if (!user) return done(null, false);
        if (!validateHash(user, password)) return done(null, false)

        return done(null, user);
    } catch (error) {
        return done(error);
    } 
}; 

async function register(req, username, password, done){
    const { first_name, last_name, email, age } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        
        if (exist) {
            console.log("El user ya existe!!");
            done(null, false)
        }

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            loggedBy: 'form'
        };

        const result = await userModel.create(user);
        console.log(result);
        return done(null, result);

    } catch (error) {
        return done(error)
    }
}

async function jwt(jwt_payload, done){
    console.log("Entrando a passport Strategy con JWT.");
    try {
        console.log("JWT obtenido del Payload: ", jwt_payload);
        return done(null, jwt_payload.user);
    } catch (error) {
        return done(error)
    }
}

function cookieExtractor(req){
    let token = null;  console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) {//Validamos que exista el request y las cookies.
        token = req.cookies['jwtCookieToken']; // jwtCookieToken viene de jwt.routes donde se almaceno la cookie
        console.log("Cookies presentes: ", req.cookies);
        console.log("Token obtenido desde Cookie: ", token);
    }
    return token;
};

function serialize(user, done){
    done(null, user._id);
}

async function deserialize(id, done){
    try {
        let user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        console.error("Error deserializando el usuario: " + error);
    }
};

export {initialPassport};