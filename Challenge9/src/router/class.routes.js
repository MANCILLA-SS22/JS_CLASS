// import { SECRET_KEY } from "../config/dotenvMain/env.config.js";
// import jwt from "jsonwebtoken";
import { Router } from "express";
import passport from "passport";

class CustomRouter { //Esta es la clase padre, y CustomRouter es la clase que hereda de esta misma clase.
    constructor() {
        this.router = Router();
        this.init(); //Esto sirve para inicializar la funcion init proveniente de users.extend.routes.js
    };
    
    init(){}; //Esta tipo de inicialilzacion se usa para las clases heredadas.

    getRouter() {
        return this.router; //this.router.get("/path", middleware1, middleware2, function callback(req, res){})
    };

    //GET
    get(path, policies, ...callbacks) { // (1)
        // console.log("Entrando por GET a custom router con Path: " + path, " y policies: ", policies); 
        this.router.get(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks)); // (2)
    }

    // POST
    post(path, policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    // PUT
    put(path, policies, ...callbacks){ 
        this.router.put(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };

    // DELETE
    delete(path, policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
    };    

    handlePolicies(policies){
        return function(req, res, next){
            if(policies[0] === "PUBLIC") return next();
            
            passport.authenticate("jwt", authJWT)(req, res, next); //Colocamos (req, res, next) para que se incoque la funcion a si misma sin necesidad de llamarla desde otro medio.
    
            function authJWT(err, user, info){ //La funcion interna en passport.authenticate(), por defecto tiene tres parametros que representan el error, el usuario y la informacion.
                if (err) return next(err); // will generate a 500 error
                if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() }); // Generate a JSON response reflecting authentication status
                console.log("user.role", user.role)
                if (user.role !== policies[0]) return res.status(403).send({ error: "Forbidden. You don`t have enough permissions" });

                console.log("Usuario obtenido del strategy: ", user);
                req.user = user;
                next();
            }
        }
    }

    //es una función que agregará al objeto res, métodos adicionales de envío de información, donde seteamos status específicos, cuerpos específicos e intenciones específicas. 
    generateCustomRespones(){
        return function(req, res, next){

            res.sendSuccess = function(payload){
                res.status(200).send({status: "Success", payload})
            }

            res.sendInternalServerError = function(error){
                res.status(500).send({status: "Error", error})
            }

            res.sendClientError = function(error){
                res.status(400).send({status: "Client error ", error})
            }

            next();
        }
    };

    applyCallbacks(callbacks) { // (3)
        const val = callbacks.map(function(callback){
            return async function(...params){
                try {                    
                    await callback.apply(this, params);
                } catch (error) {
                    console.error(error);
                    params[1].status(500).send(error);
                }
            }
        });
        return val;
    };

};

export default CustomRouter;