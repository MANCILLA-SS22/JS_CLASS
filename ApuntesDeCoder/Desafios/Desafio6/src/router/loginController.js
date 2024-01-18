import { Router } from "express";

const router = Router();

// function publicAccess(req, res, next){
//     if (req.session.user === true){
//         return res.redirect("/api/products");
//     }else{
//         next();
//     }
// }

router.get("/login", /* publicAccess */ function(request, response){
    response.render("login")
});

router.get("/register", /* publicAccess */ function(request, response){
    response.render("register")
});

export default router;