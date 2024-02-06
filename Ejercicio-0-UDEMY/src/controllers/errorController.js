import {AppError} from "../utils/appError.js";

//If any of the funcions 
function globalErrorHandler(err, req, res, next){ //Express recognizes an error handling middleware by working with 4 parameters
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    // console.log("Error -->" ,err); //err.stack shows where the error is happening. The "err" parameter receives the error handling coming from, let's say, catchFunc() function. 

    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res);
        
    }else if(process.env.NODE_ENV === "production"){
        // let error = {...err};                         // Option 1
        // let error = { ...err, name: err.name };       // Option 2
        // let error = JSON.parse(JSON.stringify(err));  // Option 3
        // let error = Object.assign({}, err);           // Option 4
        let error = Object.create(err);                  // Option 5
        console.log("Object error: ", error);

        if(error.name === "CastError") error = handleCastErrorDb(error);
        if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        if(error.name === "ValidationError") error = handleValidationErrorDB(error);
        if(error.name === "JsonWebTokenError") error = handleError();
        if(error.name === "TokenExpiredError: jwt expired") error = handleJWTexpired();

        sendErrorProd(error, res);
    }


    function sendErrorDev(err, res){
        return res.status(err.statusCode).json({status: err.status, error: err, message: err.message, stack: err.stack});
    }
    
    function sendErrorProd(err, res){
        console.log(err)
        if(err.isOperational){
            res.status(err.statusCode).json({status: err.status, message: err.message});
        }else{
            console.error("Error 💣", err)
            res.status(500).json({status: 'error', message: "Something went very wrong!"})
        }
    }
    
    function handleCastErrorDb(err){
        const message = `Invalid ${err.path}: ${err.value}`;
        return new AppError(message, 400);
    }
    
    function handleDuplicateFieldsDB(err){
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // "errmsg" is equal to "message". To prove this, look at the JSON message in postman
        // const value = err.keyValue.name;                    // This is equal to the line above.
        const message = `Duplicate field value: ${value}. Please use another value!`;
        return new AppError(message, 400);
    }
    
    function handleValidationErrorDB(err){
        const errors = Object.values(err.errors).map(event => event.message);
        const message = `Invalid input data. ${errors.join(". ")}`;
        return new AppError(message, 400)
    }    

    function handleError(){
        new AppError("Invalid token. Please login again!", 401);
    }

    function handleJWTexpired(){
        new AppError("Your token has expired. Please log in again!", 401)
    }

}

export {globalErrorHandler}