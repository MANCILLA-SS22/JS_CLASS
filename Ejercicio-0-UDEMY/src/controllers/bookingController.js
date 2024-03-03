import Stripe from "stripe";
import { TourModel } from "../models/tours.model.js";
import {catchFunc} from "../utils/catchAsync.js";
// import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";
// import { AppError } from "../utils/appError.js";

const getCheckoutSession = catchFunc(async function(req, res, next){
    // 1) Get the currently booked tour
    const tour = await TourModel.findById(req.params.tourId);

    // 2) Create checkout session
    const stripe = Stripe(process.env.SECRET_KEY_STRIPE); //This will return an object
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], //"card" stands for credit card
        expand: ['line_items'],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/`, //This is the url where the user goes as soon as a credit card has been successfully charged
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // //This is the url where the user goes if they choose to cancel the current payment 
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        
        line_items: [{
            quantity: 1,
            price_data: {
                currency: 'usd',
                unit_amount: tour.price * 100,
                product_data: {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                },
            },
        }],
    });

    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session
    });

})

export {getCheckoutSession};