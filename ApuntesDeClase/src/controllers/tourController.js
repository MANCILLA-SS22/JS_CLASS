import fs from "fs";
import {__dirname} from "../utils.js";

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

function checkId(req, res, next, val){
    const {id} = req.params;
    console.log(`Tour id is: ${val}`);
    if(+id > tours.length){
        return res.status(404).json({
            status: "fail", 
            message: "Invalid ID"
        });
    };
    next();
};

function checkBody(req, res, next){ //middleware
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({status: "fail", message: "Missing name or price"});
    }

    next();
}

function getAllTours(req, res){
    res.status(200).json({
        status: "success",
        requestedAt: req.requstTime, 
        results: tours.length,
        data: {tours}
    });
}

function getTour(req, res){
    const {id} = req.params;
    const tour = tours.find(event => event.id === +id);
    res.status(200).json({
        status: "success", 
        data: {tour}
    });
}

function postTour(req, res){
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, "\t"), function(err){
        res.status(201).json({
            status: "success",
            data: {tour: newTour}
        });
    });
}

function updateTour(req, res){    
    res.status(200).json({
        data: "<Updated tour here..>"
    });
};

function deleteTour(req, res){
    res.status(204).json({
        status: "success", 
        data: null
    });
};

export {getAllTours, getTour, postTour, updateTour, deleteTour, checkId, checkBody}