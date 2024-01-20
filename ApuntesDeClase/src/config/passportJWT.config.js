import passport from 'passport';
import {userModel} from '../models/user.model.js';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js';


const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

function initialPassport(){ //Estrategia de obtener Token JWT por Cookie
    passport.use('jwt', new JwtStrategy({ jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: PRIVATE_KEY }, jwt ));
    passport.serializeUser(serialize); //Estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js
    passport.deserializeUser(deserialize)
};

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
        console.log("Cookies presentes: ", req.cookie);
        token = req.cookies['jwtCookieToken'];
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