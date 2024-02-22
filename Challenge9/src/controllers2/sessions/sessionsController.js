import passport from "passport";
import Route from "../../router/class.routes.js"

class SessionRouter extends Route {
    init() {
        this.get('/current', ['PUBLIC'], passport.authenticate('jwt', { session: false }), function(req, res){
            try {
                if (req.cookies.jwtCookieToken) {
                    res.sendSuccess(req.user);
                }
                else {
                    res.sendClientError({message: 'no eres un usuario logeado'});
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    }
};

export default SessionRouter;

//Codigo de desafios pasados
/* import { Router } from "express";
import { UserManager } from "../../dao/mongoClassManager/UserManager.js";

const router = Router();
const userDB = new UserManager();

router.post('/login', async function(req, res){
    const { email, password } = req.body;             //console.log(email, password)
    const response = await userDB.findUser({email});    console.log("user: ", response)

    if (email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.user = { //creamos session con el atributo user
            first_name: email,
            role: "admin"
        }
        return res.status(201).json({data: req.session.user})
    }

    if(!response || response.password !== password){
        return res.status(401).json({message: "Login failed, check your credentials"});
    }else{
        //creamos session con el atributo user
        req.session.user = { 
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            age: response.age,
            role: response.role
        }
        return res.json({ message: req.session.user });
        // return res.send({  status: "success",  payload: req.session.user,  message: "¡Primer logueo realizado! :)"  });
    }
});

router.post('/register', async function(req, res){
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
        // console.log("Registrando usuario:", req.body);
    
        const user = {
            first_name: first_name,
            last_name: last_name, 
            email: email,
            age: age,
            password: password,
            role: role
        }
    
        const result = await userDB.createUser(user);
        res.status(201).json({data: result})
        // res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id });
    } catch (error) {
        return res.status(400).send({status: "error", msg: "Usuario existente!"});
    }
});

router.get('/logout',  function(req,res){ //http://localhost:5500/api/sessions/logout
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("deslogueo exitoso")
        else res.send("fallo el deslogueo")
    });
}) 

export default router;*/