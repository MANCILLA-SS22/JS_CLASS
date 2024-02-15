import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitiza from "express-mongo-sanitize"
import xss from "xss-clean";
import hpp from "hpp"
import tourRouter from "./router/tour.routes.js";
import userRouter from "./router/user.routes.js";
import reviewRouter from "./router/review.routes.js"
import {__dirname} from "./utils.js"; // --> C:\Users\xxelt\OneDrive\Documentos\PROYECTOS_PERSONALES\JavaScript\ApuntesDeClase\
import {AppError} from "./utils/appError.js";
import {globalErrorHandler} from "./controllers/errorController.js";

const app = express();

if(process.env.NODE_ENV === "development"){ //process.env.NODE_ENV === "development" or app.get('env') are the same. //In express, app.get('env') returns 'development' if NODE_ENV is not defined in "config.env". So you don't need the line to test its existence and set default.
    // console.log("1")
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    limit: 100,
    windowMs: 3600*1000, //This would allow 100 request from the same IP in one hour.
    message: "Too many request from this IP, please ty again in an hour!"
});

function requestTime(req, res, next){
    req.requstTime = new Date().toISOString(); //We can define any property on the "req" object. 
    next();
}

function all(req, res, next){  
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}

//GLOBAL MIDDLEWARES
app.use(helmet())
app.use("/api", limiter); //We want to limit access to our API route. So, we write "api" as a path because we want to affect the next routes that start with "api". In this case "/api/v1/tours" and "/api/v1/users"
app.use(express.static(`${__dirname}/public`)); //Serving static files
app.use(express.json({limit: "10kb"})); //Body parser, reading data from body into req.body
app.use(mongoSanitiza()); //Data sanitization against NoSQL query injection
app.use(xss()); //Data sanitization against XSS
app.use(hpp()); //Prevent parameter pollution (use '{{URL}}api/v1/tours?sort=duration&sort=price' in postman. This will take only the last parameter. In this case, sort=price)
app.use(requestTime); //Test middleware
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("*", all); //This middleware stands for the error handdling process. It'll be executed ONLY if the route in the line 28 are typed wronlgy. For example: /api/tours, /api/v1/tourss, etc. If the route in the line 28 is typed rigthly (/api/v1/tours) and the enpoint wrongly (for example, router.route("/:id")), then app.use("*") won't be executed but the app.use(globalErrorHandler);
app.use(globalErrorHandler);

export default app;