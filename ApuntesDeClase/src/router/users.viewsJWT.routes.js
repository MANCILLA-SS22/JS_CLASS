import { Router } from 'express';
import { authToken, passportCall, authorization } from '../utils.js';
import passport from 'passport';

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


//Comentar todos los metodos excepto 1 
router.get("/", authToken, function(req, res){ //Metodo 1: Usando Authorization Bearer Token
    res.render('profile', {user: req.user});
});

// router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){ //Metodo 2: Usando JWT por Cookie
//     res.render('profile', {user: req.user});
// });

// router.get("/", passportCall('jwt'), function(req, res){ //Metodo 3: Usando passport-JWT por Cookie mediante customCall
//     res.render('profile', {user: req.user});
// });

// router.get("/", authorization('admin'), function(req, res){ //Metodo 4
//     res.render('profile', {user: req.user});
// });

export default router;