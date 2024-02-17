// import { Router } from "express";
// import jwt from "jsonwebtoken";
// import { PRIVATE_KEY } from '';

// class CustomRouter { //Esta es la clase padre, y CustomRouter es la clase que hereda de esta misma clase.
//     constructor() {
//         this.router = Router();
//         this.init(); //Esto sirve para inicializar la funcion init proveniente de users.extend.routes.js
//     };
    
//     init(){}; //Esta tipo de inicialilzacion se usa para las clases heredadas.

//     getRouter() {
//         return this.router; //this.router.get("/path", middleware1, middleware2, function callback(req, res){})
//     };

//     //GET
//     get(path, policies, ...callbacks) { // (1)
//         console.log("Entrando por GET a custom router con Path: " + path, " y policies: ", policies); 
//         this.router.get(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks)); // (2)
//     }

//     // POST
//     post(path, policies, ...callbacks){
//         this.router.post(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
//     };

//     // PUT
//     put(path, policies, ...callbacks){ 
//         this.router.put(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
//     };

//     // DELETE
//     delete(path, policies, ...callbacks){
//         this.router.delete(path, this.handlePolicies(policies), this.generateCustomRespones(), this.applyCallbacks(callbacks));
//     };    

//     handlePolicies(policies){
//         return function(req, res, next){
//             console.log("Politicas a evaluar: ", policies);
//             if(policies[0] === "PUBLIC") return next();

//             //Cuando es una ruta protegida, hacemos el proceso de extraccion del token
//             const authHeader = req.headers.authorization; console.log("Token present in header auth: ", authHeader);
//             if(!authHeader) return res.status(401).send({error: "User not authenticcated or missing token!"});
//             const token = authHeader.split(' ')[1]//Se hace el split para retirar la palabra Bearer.

//             //Validamos si es un token valido
//             jwt.verify(token, PRIVATE_KEY, function(error, credential){
//                 if(error) return res.status(403).send({error: "Token invalid, Unauthorized!"})
                
//                 const user = credential.user;

//                 if( !policies.includes(user.role.toUpperCase()) )return res.status(401).send({error: "El usuario no tiene privilegios, revisa tus roles!"});

//                 req.user = user;
//                 console.log(req.user);

//                 next();
//             });
//         }
//     }

//     //es una función que agregará al objeto res, métodos adicionales de envío de información, donde seteamos status específicos, cuerpos específicos e intenciones específicas. 
//     generateCustomRespones(){
//         return function(req, res, next){

//             //Agregamos estas propiedades a cada uno de los 5 objetos, los cuales inicialmente no existen
//             res.sendSuccess = function(payload){res.status(200).send({status: "Success", payload})}
//             res.sendInternalServerError = function(error){res.status(500).send({status: "Error", error})}
//             res.sendClientError = function(error){res.status(400).send({status: "Client error ", error})}
//             next();
//         }
//     };

//     applyCallbacks(callbacks) { // (3)
//         const val = callbacks.map(function(callback){
//             return async function(...params){
//                 try {                    
//                     await callback.apply(this, params);
//                 } catch (error) {
//                     console.error(error);                
//                     params[1].status(500).send(error);
//                 }
//             }
//         });
//         return val;
//     };

// };

// export default CustomRouter;