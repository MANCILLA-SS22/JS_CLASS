import express from "express";
import {getAllUsers, updateMe, deleteMe} from "../controllers/userController.js";
import {signup, login, forgotPassword, resetPassword, updatePassword, protect} from "../controllers/authController.js";

const router = express.Router();

router.param("id", function(req, res, next, val){ //Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
    console.log(`Tour id is: ${val}`);
    next();
});

router.route("/").get(getAllUsers)/* .post(createUser) */;
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);


export default router;