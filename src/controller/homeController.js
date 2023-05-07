import pool  from "../configs/connectDB";
import multer from "multer";
const bcrypt = require('bcrypt');

let getHomepage = async(req,res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`'); 
    return res.render("index.ejs",{datacardid: rows});  
    // return res.render("userinfo.ejs")
}

let cardId = async(req,res)=>{
    let cardid =req.params.cardid;
    const [user] = await pool.execute(`select * from smartcard where cardid = ?`,[cardid]);

    if (user[0]["username"]=="" || user[0]["password"]=="" || user[0]["name"]=="" ){
        return res.render("signup.ejs",{datauser: user});
    }
    else{
        return res.render("usershow.ejs");
    }
 
}

// let createNewUser = async (req,res) => {
//     let {username, password, name} = req.body;
//     await pool.execute("insert into smartcard(username, password, name) values(?,?,?)",[username, password, name]);
//     return res.redirect("/:cardid/userinfo");
// }

// let deleteUser = async (req,res) => {
//     let userId = req.body.userId;
//     await pool.execute("delete from users where id = ?",[userId]);
//     return res.redirect("/");
// }

// let getEditPage = async (req,res) => {
//     let id = req.params.id;
//     let [user] = await pool.execute("select * from users where id = ?",[id]);
//     return res.render("update.ejs", {dataUser : user[0]});
// }

// let signUp = async (req,res) => {
//     let cardid =req.params.cardid;
//     let {username, password, name} = req.body;
//     const hash = bcrypt.hashSync(password, 10);
//     await pool.execute("update smartcard set username = ?, password = ?, name = ? where cardid = ?",[username,hash,name,cardid]);
//     return res.render("signin.ejs");
// }


let processSignUp = async (req,res) => {
    let cardid =req.params.cardid;
    let {username, password, name} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await pool.execute("update smartcard set username = ?, password = ?, name = ? where cardid = ?",[username,hash,name,cardid]);
    return res.redirect("/signin");
}

// let getUploadFilePage =async (req,res)=>{
//     return res.render("uploadfile.ejs")
// }


// let handleUploadFile = async (req,res)=>{
//     if (req.fileValidationError) {
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.file) {
//         return res.send('Please select an image to upload');
//     }
   
//     // Display uploaded image for user validation
//     res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
// }

let signIn = async(req,res) =>{
    // const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`'); 
    // console.log(rows)
    // return res.render("signin.ejs",{datacardid: rows});  
    return res.render("signin.ejs");
}

let userInfo = async(req,res) =>{
    // const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`'); 
    // console.log(rows)
    // return res.render("signin.ejs",{datacardid: rows});  
    return res.render("userinfo.ejs");
}

let processLogin = async(req,res) =>{
    let username = req.body.username;
    let password = req.body.pass;
    console.log(username)
    console.log(password)
    const [user] = await pool.execute(`select * from smartcard where username = ?`,[username]);

    if (typeof user[0] != "undefined"){
        let cardid = user[0]["cardid"];
        if (bcrypt.compareSync(password, user[0]['password'])){
            console.log("dung password")
            res.render("userinfo.ejs");
        }
        else{
            console.log("sai password")
            res.redirect("/signin")
        }
    }
    else{
        console.log("username khong ton tai");
    }
}

module.exports = {
    getHomepage, cardId, userInfo, signIn, processLogin, processSignUp
}