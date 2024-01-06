import express from "express";
import {getAllTours, getTour, postTour, updateTour, deleteTour, checkId, checkBody} from "../controllers/tourController.js"

const router = express.Router();

//Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name 
// of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
router.param("id", checkId); 

router.route("/").get(getAllTours).post(checkBody, postTour); // checkBody is a middleware
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;