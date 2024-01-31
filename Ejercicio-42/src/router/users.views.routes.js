import { Router } from 'express';
import { authToken } from '../utils.js';

const router = Router();


router.get("/login", function(req, res){
    res.render('login')
});

router.get("/register", function(req, res){
    res.render('register')
});

router.get("/error", function(req, res){
    res.render("error");
});


//Comentar o descomentar uno de los dos metodos nada mas 

router.get("/", function(req, res){ //Metodo 1 (UTILIZAR EL NAVEGADOR)
    res.render('profile', {user: req.session.user});
    // user: req.user // Trtabajando con JWT
});

// router.get("/", authToken, function(req, res){ //Metodo 2 (UTILIZAR POSTMAN PARA INICIAR SESION Y QUE EL authToken NO ARROGE UNDEFINED)
//     res.render('profile', {user: req.user});
// });

export default router;