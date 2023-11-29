import { Router } from "express";

const router = Router();

const users = [];

router.get("/", function(request, response){
    response.render("index", {
        title: "Ejercicio",
        name: "German",
        fileCss: "styles.css",
    });
});

router.get("/form", (req, res) => {
    res.render("formSocket", {
        title: "Form example",
        fileCss: "styles.css",
    });
});

router.post("/user", (req, res) => {
    const { name, age } = req.body;
    users.push({
        name,
        age,
    });
});

router.get("/register", function(request, response){
    response.render("register", {
        title: "Register example",
        fileCss: "styles.css",
    });
});

router.post("/user_email", function(request, response){
    const { name, email, password } = request.body;
    users.push({
        name,
        email,
        password,
    });

    console.log(users);

    response.render("register_success", {
        user: {
            name,
            email,
        },
        
        title: "Register success",
        fileCss: "styles.css",
    });
});

export default router;
