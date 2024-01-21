import { Router } from "express";

const router = Router();

router.get("/", function(req, res){
    res.render("home", {"fileCss": "styles.css"});
});

router.get("/realtimeposts", function(req, res){
    res.render("posts", {"fileCss": "styles.css"});
});

export default router;