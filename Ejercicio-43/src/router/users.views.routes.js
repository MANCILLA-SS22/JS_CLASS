import { Router } from 'express';
import { authToken, passportCall, authorization } from '../utils.js';
import passport from 'passport';
// import { userModel } from '../models/user.model.js';

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


// (COMENTAR TODOS LOS METODOS MENOS EL QUE SE VA A UTILIZAR)

/* Metodo 0: Usando Authorization Bearer Token
router.get("/", function(req, res){
    res.render('profile', {user: req.user});
});
router.get("/:userId", authToken, async function(req, res){
    const userId = req.params.userId;  console.log("URL id", userId);
    try {
        const user = await userModel.findById(userId);    
        console.log("User", user);
        if (!user) res.status(202).json({message: "User not found with ID: " + userId});
        res.json(user);
    } catch (error) {
        console.error("Error consultando el usuario con ID: " + userId);
    }
}); */

//Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
router.get("/", authToken, function(req, res){
    res.render('profile', {user: req.user});
});

// // Metodo 2: Usando JWT por Cookie
router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){ 
    res.render('profile', {user: req.user});
});

// //Metodo 3: Usando passport-JWT por Cookie mediante customCall
router.get("/", passportCall('jwt'), function(req, res){ 
    res.render('profile', {user: req.user});
});

// //Metodo 4
router.get("/", authorization('admin'), function(req, res){ 
    res.render('profile', {user: req.user});
});

export default router;