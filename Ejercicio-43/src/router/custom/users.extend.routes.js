import CustomRouter from "./custom.routes.js";
import {userModel} from '../../models/user.model.js';
import { createHash, validateHash, generateJWToken } from '../../utils.js';


class UsersExtendRouter extends CustomRouter {
    init() {
        const userService = new userModel();

        /*====================================================
                    EJEMPLO de como se conecta con el CustomRouter --> this.verboHTTP(path, policies, ...callbacks);                   
        =====================================================*/

        /* function authToken(req, res, next){
            console.log("Hello!!");
            next();
        }; */

        this.get('/', /* authToken,  */function(req, res){ // this.get() proviene del custom.routes.js
            console.log("TEST");
            res.send("Hola coders!!")
        })

    }

}

export default UsersExtendRouter