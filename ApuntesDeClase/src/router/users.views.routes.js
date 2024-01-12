import { Router } from 'express';

const router = Router();


router.get("/login", function(req, res){
    res.render('login')
})

router.get("/register", function(req, res){
    res.render('register')
})

router.get("/", function(req, res){
    res.render('profile', {user: req.session.user});
})

export default router;