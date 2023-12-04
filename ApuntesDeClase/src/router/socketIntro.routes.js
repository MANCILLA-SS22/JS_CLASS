import { Router } from "express";

const router = Router();

const users = [];

router.get("/", function(request, response){
    response.render("current", {
        title: "Ejercicio",
        name: "German",
        fileCss: "styles.css",
    });
});

router.get("/form", (request, response) => {
    response.render("formSocket", {
        title: "Form example",
        fileCss: "styles.css",
    });
});

router.post("/user", (request, response) => {
    const { name, age } = request.body;
    users.push({
        name,
        age,
    });
});

export default router;
