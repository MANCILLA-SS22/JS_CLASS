import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import catchFunc from "../utils/catchAsync.js";

function signToken(id){
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}); //That's the object that is the data, the payload that we want to put in our JWT
    // node -e "console.log(require('crypto').randomBytes(64).toString('hex'));" // (quick and easy way to generate JWT secret)
}

const signup = catchFunc(async function(req, res, next){  //http://localhost:5500/api/v1/user
    // const newUser = await UserModel.create({ //That's the way we can avoid someone to add new parameters as a role. With that being set up, we'll only store the following 4 parameters into the database
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // });

    const newUser = await UserModel.create(req.body);
    const token = signToken(newUser._id);
    res.status(201).json({ status: "success", token,data: {user: newUser} })
});

const login = catchFunc(async function(req, res, next){
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if(!email || !password) return next(new AppError("Please provide email and password!", 400));

    // 2) Check if user exists && password is correct;
    const user = await UserModel.findOne({email}).select("+password"); console.log(user);
    const correct = await user.correctPassword(password, user.password); //The function "userSchema.methods.correctPassword" in userModel.js is an instanced method. So therefore it's available on all the user documents.
    if(!user || !correct) return next(new AppError("Incorrect email or password!", 401));

    // 3) If everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token: token
    });
})

export {signup, login};