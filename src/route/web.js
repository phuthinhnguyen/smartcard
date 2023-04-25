import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter:imageFilter});

const initWebroute = (app) =>{
    route.get("/", homeController.getHomepage);
    route.get("/signin", homeController.signin);
    route.get("/:cardid", homeController.getDetailPage);
    // route.post("/create-new-user", homeController.createNewUser);
    // route.post("/delete-user", homeController.deleteUser);
    // route.get("/edit-user/:id", homeController.getEditPage);
    route.post("/:cardid/userinfo",homeController.postUpdateUser);
    // route.get("/upload",homeController.getUploadFilePage);
    // route.post("/upload-profile-pic",upload.single("profile_pic"),homeController.handleUploadFile)
    // route.get("/about",(rep,res)=>{
    //     res.send("i am thinh")
    // })
    // route.get("/:cardid", homeController.checkFirsttap);
    return app.use("/",route)
}
export default initWebroute;