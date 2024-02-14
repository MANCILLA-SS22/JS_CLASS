import { ReviewModel } from "../models/reviewModel.js";
import {catchFunc} from "../utils/catchAsync.js";

const getAllReviews = catchFunc(async function(req, res, next){
    const reviews = await ReviewModel.find();

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {reviews}
    });
});

const createReview = catchFunc(async function(req, res, next){
    const reviews = await ReviewModel.create(req.body);
    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {reviews}
    });
});


export {getAllReviews, createReview}