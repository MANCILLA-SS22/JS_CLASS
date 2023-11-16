import { Router } from "express";

const userRouter = Router();
const users = [];

userRouter.get("/", function(request, response){
    response.json({
        users: users
    })
});

userRouter.post("/", function(request, response){
    const {username, email} = request.body;

    users.push({
        username: username,
        email: email,
    });

    response.json({
        user: {
        username: username,
        email: email,
        }
    })
});

export default userRouter;