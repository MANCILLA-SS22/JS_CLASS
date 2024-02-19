import { Router } from "express";
import studentModel from "../models/student.model.js";

const router = Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/students", async function(req, res){
    const { page, limit } = req.query;

    // const order = "asc" - 1
    const students = await studentModel.paginate(
        {
            group: "1A" // Criterio de busqueda
        },
        {
            page: page || 1,
            limit: limit || 5,
        });

    console.log(students)    
    res.render("students", {students}); // res.json(students);
});

export default router;