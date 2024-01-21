import { Router } from "express";
const router = Router();

router.get("/", function(request, response){
    response.render("form", {
        title: "Ejercicio",
        name: "German",
        fileCss: "styles.css",
    });
});


export default router;
