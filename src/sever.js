// const express =require("express")
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./route/web";
import initAPIRoute from "./route/api"
// import connection from "./configs/connectDB";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init webroute
initWebroute(app)

// init api route
initAPIRoute(app)

app.listen(port,()=>console.log("ok"))