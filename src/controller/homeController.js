import pool  from "../configs/connectDB";
import multer from "multer";


let getHomepage = async(req,res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`'); 
    // return res.render("index.ejs",{datacardid: rows});  
    return res.render("userinfo.ejs");
}

let getDetailPage = async(req,res)=>{
    let cardid =req.params.cardid;
    const [user] = await pool.execute(`select * from smartcard where cardid = ?`,[cardid]);
    console.log(user[0]['username'])

    if (user[0]["username"]=="" || user[0]["password"]=="" || user[0]["name"]=="" ){
        return res.render("signup.ejs",{datauser: user});
    }
    else{
        return res.render("usershow.ejs");
    }
 
}

let createNewUser = async (req,res) => {
    let {username, password, name} = req.body;
    await pool.execute("insert into smartcard(username, password, name) values(?,?,?)",[username, password, name]);
    return res.redirect("/:cardid/userinfo");
}

let deleteUser = async (req,res) => {
    let userId = req.body.userId;
    await pool.execute("delete from users where id = ?",[userId]);
    return res.redirect("/");
}

let getEditPage = async (req,res) => {
    let id = req.params.id;
    let [user] = await pool.execute("select * from users where id = ?",[id]);
    return res.render("update.ejs", {dataUser : user[0]});
}

let postUpdateUser = async (req,res) => {
    let cardid =req.params.cardid;
    let {username, password, name} = req.body;
    await pool.execute("update smartcard set username = ?, password = ?, name = ? where cardid = ?",[username,password,name,cardid]);
    return res.render("userinfo.ejs");
}

let getUploadFilePage =async (req,res)=>{
    return res.render("uploadfile.ejs")
}


let handleUploadFile = async (req,res)=>{
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
   
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}

let signin = async(req,res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`'); 
    console.log(rows)
    return res.render("signin.ejs",{datacardid: rows});  

}

// let checkFirsttap = async (req,res)=>{
//     let cardId =req.params.cardid;
//     let [card] = await pool.execute(`select * from users where id = ?`,[cardId]);
//     if (user.username.length!=0){
//         return res.render("username.ejs");
//     }
        // return res.render("signup.ejs");
//     return res.send(JSON.stringify(card));

// }


module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
    getUploadFilePage, handleUploadFile, signin
}