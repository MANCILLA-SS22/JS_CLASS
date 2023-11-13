// const express = require("express");
import express from "express";
const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello world from express!</h1>");
});

app.listen(8080, () => console.log("Sever listenint on port 8080!"));