import pool from "../configs/connectDB";
import multer from "multer";
const bcrypt = require("bcrypt");

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `smartcard`");
  return res.render("index.ejs", { datacardid: rows });
};

let cardId = async (req, res) => {
  let cardid = req.params.cardid;
  const [user] = await pool.execute(
    `select * from smartcard where cardid = ?`,
    [cardid]
  );
  if (
    user[0]["username"] == "" ||
    user[0]["password"] == "" ||
    user[0]["name1"] == ""
  ) {
    return res.render("signup.ejs", { datauser: user });
  } else {
    return res.render("usershow.ejs");
  }
};

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

let processSignUp = async (req, res) => {
  let cardid = req.params.cardid;
  let { username, password, name } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  await pool.execute(
    "update smartcard set username = ?, password = ?, name1 = ? where cardid = ?",
    [username, hash, name, cardid]
  );
  return res.redirect("/signin");
};

// let getUploadFilePage =async (req,res)=>{
//     return res.render("uploadfile.ejs")
// }

let handleUploadFile = async (req, res) => {
  let cardid = req.params.cardid;
  let name2 = req.body.name2;
  delete req.body.name2;
  let link = JSON.stringify(req.body);
  if (link=="{}"){
    link=""
  }
  console.log(link)

  // if (req.fileValidationError) {
  //   return res.send(req.fileValidationError);
  // }
  // else if (!req.file) {
  //   // return res.send("Please select an image to upload");
  //   pass
  // }
  if (req.file){
    const avatarsrc = `/image/${req.file.filename}`;
    await pool.execute(
      "update smartcard set avatar = ? where cardid = ?",
      [avatarsrc, cardid]
    );
  }

  await pool.execute(
    "update smartcard set link = ?, name2 = ? where cardid = ?",
    [link,name2, cardid]
  );
  res.redirect(`/${cardid}/userinfo`);
  // res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
};

let signIn = async (req, res) => {
  // const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`');
  // console.log(rows)
  // return res.render("signin.ejs",{datacardid: rows});
  return res.render("signin.ejs");
};

let userInfo = async (req, res) => {
  // const [rows, fields] = await pool.execute('SELECT * FROM `smartcard`');
  // console.log(rows)
  // return res.render("signin.ejs",{datacardid: rows});
  let cardid = req.params.cardid;
  const [user] = await pool.execute(
    `select * from smartcard where cardid = ?`,
    [cardid]
  );
  let data = {};
  data.cardid = user[0].cardid;  
  data.name1 = user[0].name1;  
  data.name2 = user[0].name2;  
  data.avatar = user[0].avatar;  
  if (user[0].link!="") {
    var link = JSON.parse(user[0].link)
    if (typeof(link.linktype)=="string"){
      data.link = {linktype:[link.linktype],inputtitle:[link.inputtitle],inputlink:[link.inputlink]}
    }
    else data.link=link;
  }
  else data.link=user[0].link;
  console.log(data)
  if (typeof user[0] != "undefined") {
    return res.render("userinfo.ejs", { datauser: data });
  } else {
    console.log("khong");
  }
};

let processLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.pass;
  const [user] = await pool.execute(
    `select * from smartcard where username = ?`,
    [username]
  );
  if (typeof user[0] != "undefined") {
    let cardid = user[0]["cardid"];
    if (bcrypt.compareSync(password, user[0]["password"])) {
      return res.redirect(`/${cardid}/userinfo`);
    } else {
      return res.redirect("/signin");
    }
  } else {
    console.log("username khong ton tai");
  }
};

let userinfosave = async (req, res) => {
  let cardid = req.params.cardid;
  let profile_pic = req.body.profile_pic;
  await pool.execute("update smartcard set avatar = ? where cardid = ?", [
    profile_pic,
    cardid,
  ]);
};

module.exports = {
  getHomepage,
  cardId,
  userInfo,
  signIn,
  processLogin,
  processSignUp,
  handleUploadFile,
  userinfosave,
};
