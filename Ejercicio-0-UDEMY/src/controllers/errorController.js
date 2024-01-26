import AppError from "../utils/appError.js";

function errorFunction(err, req, res, next){ //Express recognizes an error handling middleware by working with 4 parameters
    console.log(err); //err.stack shows where the error is happening. The "err" parameter receives the error handling coming from the next() funcion in the middleware app.use("*")
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res);
        
    }else if(process.env.NODE_ENV === "production"){
        let error = {...err};
        if(error.name === "CastError") error = handleCastErrorDb(error);
        if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        if(error.name === "ValidationError") error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }
}

function sendErrorDev(err, res){
    res.status(err.statusCode).json({status: err.status, message: err.message, stack: err.stack, err:err});
}

function sendErrorProd(err, res){
    if(err.isOperational){
        return res.status(err.statusCode).json({status: err.status, message: err.message});
    }else{
        console.error("Error 💣", err)
        return res.status("error").json({message: "Something went very wrong!"})
    }
}

function handleCastErrorDb(err){
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err){
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

function handleValidationErrorDB(err){
    const errors = Object.values(err.errors).map(event => event.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400)
}

export default errorFunction;