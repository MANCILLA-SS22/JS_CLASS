import express from "express";
import {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} from "../controllers/tourController.js"

const router = express.Router();

// router.param("id", checkId); //Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
router.route("/top-5-cheap").get(aliasTopTours).get(getAllTours);
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/").get(getAllTours).post(postTour); // checkBody is a middleware
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;