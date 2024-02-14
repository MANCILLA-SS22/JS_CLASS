import express from "express";
import {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} from "../controllers/tourController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import reviewController from "../controllers/reviewController.js";

const router = express.Router();

// router.param("id", checkId); //Param Middleware is a middleware that only runs for certain parameters (when we have a certain parameter in our URL). Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. This name "id" depends on the name param we're going to check. In this case, ":/id".
router.route("/top-5-cheap").get(aliasTopTours).get(getAllTours);
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/").get(protect, getAllTours).post(postTour); // checkBody is a middleware
router.route("/:id").get(getTour).patch(updateTour).delete(protect, restrictTo("admin", "lead-guide"), deleteTour);


export default router; //3:05