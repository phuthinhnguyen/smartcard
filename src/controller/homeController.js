import { redirect } from "statuses";
import pool from "../configs/connectDB";
import multer from "multer";
const bcrypt = require("bcrypt");
var session = require('express-session')

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
  let data = {};
  data.cardid = user[0].cardid;
  data.name1 = user[0].name1;
  data.name2 = user[0].name2;
  data.avatar = user[0].avatar;
  data.bio = user[0].bio;
  data.phone = user[0].phone;
  data.email = user[0].email;
  if (user[0].theme != "initial") {
    if (
      user[0].theme == "rgb(234, 222, 217)" ||
      user[0].theme == "rgb(198, 175, 196)" ||
      user[0].theme == "rgb(228, 224, 212)"
    ) {
      data.colortheme = `background-color: ${user[0].theme};color:black`;
    } else data.colortheme = `background-color: ${user[0].theme};color:white`;
  } else
    data.colortheme =
      "background-image: url('image/index/bg-01.jpg');color:white";
  if (user[0].link != "") {
    var link = JSON.parse(user[0].link);
    if (typeof link.linktype == "string") {
      data.link = {
        linktype: [link.linktype],
        inputtitle: [link.inputtitle],
        inputlink: [link.inputlink],
      };
    } else data.link = link;
  } else data.link = user[0].link;
  if (
    user[0]["username"] == "" ||
    user[0]["password"] == "" ||
    user[0]["name1"] == ""
  ) {
    return res.render("signup.ejs", { datauser: user });
  } else {
    return res.render("usershow.ejs", { datauser: data });
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

  let usernamefilter = username.filter((item) => item != "")[0];
  let passwordfilter = password.filter((item) => item != "")[0];
  let namefilter = name.filter((item) => item != "")[0];

  const hash = bcrypt.hashSync(passwordfilter, 10);
  await pool.execute(
    "update smartcard set username = ?, password = ?, name1 = ? where cardid = ?",
    [usernamefilter, hash, namefilter, cardid]
  );
  return res.redirect("/signin");
};

let handleUploadFile = async (req, res) => {
  let cardid = req.params.cardid;
  let name2 = req.body.name2;
  let colortheme = req.body.colortheme;
  let train = req.body.train;
  let bio = req.body.bio;
  let phone = req.body.phone;
  let email = req.body.email;
  delete req.body.name2;
  delete req.body.colortheme;
  delete req.body.train;
  delete req.body.bio;
  delete req.body.phone;
  delete req.body.email;
  let link = JSON.stringify(req.body);
  if (link == "{}") {
    link = "";
  }

  // if (req.fileValidationError) {
  //   return res.send(req.fileValidationError);
  // }
  // else if (!req.file) {
  //   // return res.send("Please select an image to upload");
  //   pass
  // }
  if (req.file) {
    const avatarsrc = `/image/${req.file.filename}`;
    await pool.execute("update smartcard set avatar = ? where cardid = ?", [
      avatarsrc,
      cardid,
    ]);
  }

  await pool.execute(
    "update smartcard set link = ?, name2 = ?, theme = ?, train = ?, bio = ?, phone = ?, email = ? where cardid = ?",
    [link, name2, colortheme, train, bio, phone, email, cardid]
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
  data.colortheme = user[0].theme;
  data.train = user[0].train;
  data.bio = user[0].bio;
  data.phone = user[0].phone;
  data.email = user[0].email;
  if (user[0].link != "") {
    var link = JSON.parse(user[0].link);
    if (typeof link.linktype == "string") {
      data.link = {
        linktype: [link.linktype],
        inputtitle: [link.inputtitle],
        inputlink: [link.inputlink],
      };
    } else data.link = link;
  } else data.link = user[0].link;
  if (typeof user[0] != "undefined") {
    return res.render("userinfo.ejs", { datauser: data });
  } else {
    console.log("khong");
  }
};


function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.redirect('/signin')
}

let processLogin = async (req, res) => {
  let username = req.body.username.filter((item) => item != "")[0];
  let password = req.body.pass.filter((item) => item != "")[0];

  const [user] = await pool.execute(
    `select * from smartcard where username = ?`,
    [username]
  );
  if (typeof user[0] != "undefined") {
    let cardid = user[0]["cardid"];
    if (bcrypt.compareSync(password, user[0]["password"])) {
      req.session.regenerate(function (err) {
        if (err) next(err)
        // store user information in session, typically a user id
        req.session.user =cardid;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect(`/${cardid}/userinfo`);
        })
      })
    } 
    else 
    {
      return res.redirect("/signin");
    }
  } else {
    console.log("username khong ton tai");
  }
};

// let userinfosave = async (req, res) => {
//   let cardid = req.params.cardid;
//   let profile_pic = req.body.profile_pic;
//   await pool.execute("update smartcard set avatar = ? where cardid = ?", [
//     profile_pic,
//     cardid,
//   ]);
// };
let logout = async (req, res) => {
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/signin')
    })
  })
};
module.exports = {
  getHomepage,
  cardId,
  userInfo,
  signIn,
  processLogin,
  processSignUp,
  handleUploadFile,
  isAuthenticated,
  logout
};
