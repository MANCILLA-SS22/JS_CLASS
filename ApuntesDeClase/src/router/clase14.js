import { Router } from "express";

const router = Router();

router.get("/", function(req, res){
    res.render("home", {fileCss: "styles.css"});
});

export default router;