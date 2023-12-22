import { Router } from "express";
import studentModel from "../models/students.model.js";

const router = Router();

router.get("/", function(req, res){
    res.render("indexPagination");
});

router.get("/students", async function(req, res){
    const { page, limit } = req.query;

    // const order = "asc" - 1
    const students = await studentModel.paginate(
        {
            // group: "1A" // Criterio de busqueda
        },
        {
            page: page || 1,
            limit: limit || 10,
        });

    console.log(students)    
    res.render("students", {students}); // res.json(students);
});

export default router;