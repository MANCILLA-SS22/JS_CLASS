import { Router } from "express";
import { UserManager } from "../dao/mongoClassManager/UserManager.js";

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
        }
        return res.json({ message: req.session.user });
        // return res.send({  status: "success",  payload: req.session.user,  message: "¡Primer logueo realizado! :)"  });
    }
});

router.post('/register', async function(req, res){
    try {
        const { first_name, last_name, email, age, password } = req.body;
        // console.log("Registrando usuario:", req.body);
    
        const user = {
            first_name: first_name,
            last_name: last_name, 
            email: email,
            age: age,
            password: password
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

export default router;