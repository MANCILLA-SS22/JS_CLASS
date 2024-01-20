import { Router } from 'express';
import { authToken, passportCall, authorization } from '../utils.js';
import passport from 'passport';
import { userModel } from '../models/user.model.js';

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
router.get("/", function(req, res){ //Metodo 1: Usando Authorization Bearer Token
    res.render('profile', {user: req.user});
});

router.get("/:userId", authToken, async function(req, res){
    const userId = req.params.userId;
    console.log("URL id", userId)
    try {
        const user = await userModel.findById(userId);    console.log("User id", user)
        if (!user) res.status(202).json({message: "User not found with ID: " + userId});
        res.json(user);
    } catch (error) {
        console.error("Error consultando el usuario con ID: " + userId);
    }
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