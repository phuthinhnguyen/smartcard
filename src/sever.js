// const express =require("express")
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./route/web";
import initAPIRoute from "./route/api"
// import connection from "./configs/connectDB";
var session = require('express-session')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  
// setup view engine
configViewEngine(app);

// init webroute
initWebroute(app)

// init api route
initAPIRoute(app)

app.listen(port,()=>console.log("ok"))