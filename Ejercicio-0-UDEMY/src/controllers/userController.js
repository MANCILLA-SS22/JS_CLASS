import { UserModel } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import {catchFunc} from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

function filterObj(obj, ...allowedFields){
    const newObj = {};
    Object.keys(obj).forEach(function(el){
        if(allowedFields.includes(el)){
            newObj[el] = obj[el];
        }
    });

    return newObj;
}

function getMe(req, res, next){
    req.params.id = req.user.id; //getOne uses the ID coming from the parameter in order to get the requested document. But now we need to get the document based on the current user ID. (The ID coming from the currently logged in user).
    next();
}

const updateMe = catchFunc(async function(req, res, next){
    // 1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm) return next(new AppError("This route is not for password updates. Please use /updateMyPassword", 400));
    
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email"); //We can only modify both "name" and "email". Not "role", "password", etc.
    
    // 3) Update the user document
    const updetedUser = await UserModel.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true}); //We can now use findByIdAndUpdate because we're not dealing with passwords but only with non-sensitive data like name or email.
    
    res.status(200).json({
        status: "success", 
        data: {user: updetedUser}
    });
});

const deleteMe = catchFunc(async function(req, res, next){
    await UserModel.findByIdAndUpdate(req.user.id, {active: false});
    res.status(204).json({ status: "success", data: null });
});

function createUser(req, res){
    res.status(500).json({
        status: "error",
        message: "This route is no defined! Please use/signup instead!"
    });
}

const getAllUsers = getAll(UserModel);
const getUser = getOne(UserModel);
const updateUser = updateOne(UserModel);
const deleteUser = deleteOne(UserModel);

//One of the reasons may be validateBeforeSave: false is used in forgotPassword function of authController.js. Here, await user.save({ validateBeforeSave: false }), is used to save resetToken to database. 
//This field do not require any validation because it it generated by the createPasswordResetToken function of userModel.js using crypto npm. It is trusted and user can not have any access to this filed.
//But here in updateMe function user could enter any thing in name and email. For example, user could enter blank name and invalid email address without @ sign. At this situation, if we turn off validation 
//using validateBeforeSave: false , whatever user enters will be saved. So, these fields should be validated before it is saved to database. You could ask userSchema.pre('save', async function(next) {} 
//is used for this purpose, but this schema function works with create and save methods only, not with update method. Therefore, in this situation we can not use validateBeforeSave: false which makes the
//database to accept invalid fields from user.

export {getAllUsers, updateMe, deleteMe, deleteUser, getUser, updateUser, createUser, getMe};