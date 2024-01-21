import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/", async function(req, res){
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({message: "Error", error});
    }
});

router.post("/", async function(req, res){
    try {
        const user = req.body;
        const response = await userModel.create(user);
        res.json({
            message: "OK",
            response,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error",
            error,
        });
    }
});

router.put("/:id", async function(req, res){
    try {
        const { id } = req.params;
        const user = await userModel.find({ _id: id }); //usamos _id porque mongodb lo genera de esa manera, con guin bajo
        
        if (!user) return res.json({ message: "User not found" });
        
        const newUser = req.body;
        const response = await userModel.updateOne({ _id: id }, newUser);   console.log(response);

        if (response.modifiedCount === 0) return res.json({ error: "User not updated" });
        res.json({ message: "Updated", response });

    }catch (error) {
        console.log(error);
        res.json({message: "Error",error,});
    }
});

router.delete("/:id", async function(req, res){
    try {
        const { id } = req.params;
        const response = await userModel.findByIdAndDelete({ _id: id });
        if (!response) return res.json({ error: "User not found" });   console.log(response);
        res.json({response});

    }catch (error) {
        console.log(error);
        res.json({message: "Error",error});
    }
});

router.get("/:id", async function(req, res){
    try {
        const { id } = req.params;
        const user = await userModel.find({ _id: id });     
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json({message: "Error",error,});
    }
})

export default router;