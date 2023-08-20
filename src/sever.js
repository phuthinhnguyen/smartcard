import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./route/web";
import initAPIRoute from "./route/api"
var session = require('express-session')
const flash = require('connect-flash')
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
app.use(flash());


// setup view engine
configViewEngine(app);

// init webroute
initWebroute(app)

// init api route
initAPIRoute(app)

app.listen(port,()=>console.log("ok"))