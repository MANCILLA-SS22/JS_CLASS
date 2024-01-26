import { Router } from "express";

class CustomRouter {
    constructor() {
        this.router = Router();
        this.init(); //Esto sirve para inicializar la funcion init proveniente de users.extend.routes.js
    };
    
    init(){}; //Esta inicialilzacion se usa para las clases heredadas.

    getRouter() {
        return this.router;
    };

    get(path, ...callbacks) { // (1)
        this.router.get(path, this.applyCallbacks(callbacks)); // (2)
    }
    
    applyCallbacks(callbacks) { // (3)
        const val = callbacks.map(function(callback){ // (4)
            return async function(...params){ // (5)
                try {                    
                    await callback.apply(this, params); // (6)
                } catch (error) {
                    console.error(error);                
                    params[1].status(500).send(error);
                }
            }
        });

        return val;
    };
};

//Explicacion del get(path, ...callbacks)
//(1) --> El path representa el "path" proveniente de los routers, mientras que el "...callback" se coloca con el spread operator porque representa tanto la funcion asincrona en los routers, como los 
//        middlewares (si es que los tiene), y llegan en formato array.
//(2) --> Esto es equivalente al --> app.use("/", router); que se trabaja de manera convencional, pero ahora con clases y objetos
//(3) --> Esta funcion callback servira para ejecutar los middlewares (si es que hay) y las funciones asincronas provenientes de las peticiones, ya sean router.get(), router.post() , etc.
//(4) --> Se utuliza un map, ya que "callbacks" representas un array con todos esos parametros diferentes al path en las peticiones
//(5) --> Se ejecuta una funcion asincrona para poder capturar ahora los parametros pero de, tanto los middlewares como las funciones asincronas. Estos params representan todos los parametros contenidos 
//        en los callbacks. En este caso, req, res, next, etc.
//(6) --> Apply ejecutara la funcion "callback" (esta representan los middlewares o la funcion asincrona) apuntando directamente a una instancia de la clase, por ello, colocamos this para que se utilice 
//        solo en el contexto de este router, los parametros son internos de cada callback, y estos representan a req, res, next, etc.  
//        callback.apply(this, params);    es equivalente a -->  router.get("/", async function(req, res){}  dependiendo de lo que se este ejecutando, ya que bien podria ser un middleware.

export default CustomRouter;