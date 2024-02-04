import { UserModel } from "../models/userModel.js";
import catchFunc from "../utils/catchAsync.js";

const getAllUsers = catchFunc(async function(req, res, next){
    const users = await UserModel.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {users}
    });
});

function createUser(req, res){
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    });    
};

function getUser(req, res){
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    });
};

function updateUser(req, res){
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    });
};

function deleteUser(req, res){
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    }); 
};

export {getAllUsers, createUser, getUser, updateUser, deleteUser};