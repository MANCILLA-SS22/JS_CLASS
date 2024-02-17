import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/login', passport.authenticate("login", {failureRedirect: "api/auth/fail-failLogin"}), login); 
router.post('/register', passport.authenticate("register", {failureRedirect: "api/auth/fail-register"}), register);

router.get('/github', passport.authenticate("github", { scope: ['user:email'] }), async function(req, res){});  //Este primer link es el que mandamos a llamar desde el front. Al entrar, pasa por el middleware de passport-github, lo ual pedira autorizacion para acceder al perfil. En cuando se pueda acceder al perfil, passport enviara la info hacia el callback especificado. scope: [ 'user:email' ] se usa por defecto al trabajar con passport-github
router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error' }), githubcallback); //Este callback TIENE QUE COINCIDIR con el que fijamos en la app de Hithub. Este se encargara de hacer la redireccion final a la ventana de home, una vez que el login haya logrado establecer la secion.

router.get("/fail-register", failRegister);
router.get("/fail-login", failLogin);
router.get('/logout',  logout);

async function login(req, res){
    try {
        if(!req.user) return res.status(400).json({message: "Invalid credentials"});

        console.log("User found to login:", req.user);    
        const user = req.user;

        req.session.user = { // creamos session con el atributo user con "session" (Metodo 1)
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });

    } catch (error) {
        return res.status(400).send({status: "error", msg: "Usuario existente!"});
    }
};

async function register(req, res){
    console.log("Registrando usuario");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
};

async function githubcallback(req, res){ 
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;  
    res.redirect("/api/products");
}

function logout(req,res){ //http://localhost:5500/api/auth/logout
    req.session.destroy(err =>{
        if(!err){
            return res.status(200).send("deslogueo exitoso");
        } else{
            // res.send("fallo el deslogueo");
            res.redirect("/login");
        }


    });
}

function failRegister(req, res){
    res.status(401).send({ error: "Failed to process register!" });
}

function failLogin(req, res){
    res.status(401).send({ error: "Failed to process login!" });
}

export default router;