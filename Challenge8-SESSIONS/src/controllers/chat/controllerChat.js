import { Router } from "express";
const router = Router();

router.get("/", function(request, response){
    response.render("chat")
});

export default router;