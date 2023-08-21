import { redirect } from "statuses";
import pool from "../configs/connectDB";
import multer from "multer";
const bcrypt = require("bcrypt");
var session = require("express-session");
const flash = require("connect-flash");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "phuthinhnguyen1101@gmail.com",
    pass: "yzrwxkwmjwvyxxwm",
  },
});

const generatePassword = (length, chars) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const integers = "123456789";
const exCharacters = "!@#$%&*";
const createPassword = (length, hasNumbers, hasSymbols) => {
  let chars = alpha;
  if (hasNumbers) {
    chars += integers;
  }
  if (hasSymbols) {
    chars += exCharacters;
  }
  return generatePassword(length, chars);
};


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
  let password = req.body.password;
  delete req.body.name2;
  delete req.body.colortheme;
  delete req.body.train;
  delete req.body.bio;
  delete req.body.phone;
  delete req.body.email;
  delete req.body.password;
  let link = JSON.stringify(req.body);
  if (link == "{}") {
    link = "";
  }

  if (req.file) {
    const avatarsrc = `/image/${req.file.filename}`;
    await pool.execute("update smartcard set avatar = ? where cardid = ?", [
      avatarsrc,
      cardid,
    ]);
  }
  if (password != "") {
    const hash = bcrypt.hashSync(password, 10);
    await pool.execute("update smartcard set password = ? where cardid = ?", [
      hash,
      cardid,
    ]);
  }
  await pool.execute(
    "update smartcard set link = ?, name2 = ?, theme = ?, train = ?, bio = ?, phone = ?, email = ? where cardid = ?",
    [link, name2, colortheme, train, bio, phone, email, cardid]
  );
  res.redirect(`/${cardid}/userinfo`);
};

let signIn = async (req, res) => {
  return res.render("signin.ejs", { messages: req.flash("messages") });
};

let forgotPassword = async (req, res) => {
  return res.render("forgotpassword.ejs", { messages: req.flash("messages") });
};

let userInfo = async (req, res) => {
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

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else res.redirect("/signin");
}

let admin = async (req, res) => {
  return res.render("admin.ejs",{ messages: req.flash("messages") });
};

let addcardidtodatabase = async (req, res) => {
  let cardidgenerated = req.body.cardidgenerated
  if (cardidgenerated!=""){
    await pool.execute("insert into smartcard(cardid) values(?)",[cardidgenerated]);
    req.flash("messages", [
      "Add CardID to database successfully",
      "Thêm CardID vào database thành công",
    ]);
    return res.redirect("/admin")
  }
  else {
    req.flash("messages", [
      "Error of empty CardID",
      "Lỗi do CardID trống",
    ]);
    return res.redirect("/admin")
  }
};


let processLogin = async (req, res) => {
  let username = req.body.username.filter((item) => item != "")[0];
  let password = req.body.pass.filter((item) => item != "")[0];

  const [user] = await pool.execute(
    `select * from smartcard where username = ?`,
    [username]
  );
  if (username=="phuthinhnguyen1101" && password=="Mainhi14071101"){
    req.session.regenerate(function (err) {
      if (err) next(err);
      // store user information in session, typically a user id
      req.session.user = "admin";
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        res.redirect(`/admin`);
      });
    });
  }
  else{
    if (typeof user[0] != "undefined") {
      let cardid = user[0]["cardid"];
      if (bcrypt.compareSync(password, user[0]["password"])) {
        req.session.regenerate(function (err) {
          if (err) next(err);
          // store user information in session, typically a user id
          req.session.user = cardid;
          // save the session before redirection to ensure page
          // load does not happen before session is saved
          req.session.save(function (err) {
            if (err) return next(err);
            res.redirect(`/${cardid}/userinfo`);
          });
        });
      } else {
        req.flash("messages", [
          "Username and password do not match",
          "Tên đăng nhập hoặc mật khẩu không đúng",
        ]);
        return res.redirect("/signin");
      }
    } else {
      req.flash("messages", [
        "Username does not exist",
        "Tên đăng nhập không tồn tại",
      ]);
      return res.redirect("/signin");
    }
  }
 
};

let processForgotPassword = async (req, res) => {
  let cardidinput = req.body.cardid.filter((item) => item != "")[0];
  let emailinput = req.body.email.filter((item) => item != "")[0];

  const [user] = await pool.execute(
    `select * from smartcard where cardid = ?`,
    [cardidinput]
  );
  if (typeof user[0] != "undefined") {
    let email = user[0]["email"];
    if (email == emailinput) {
      const passwordresult = createPassword(8, 123456789, "!@#$%&*");
      const hash = bcrypt.hashSync(passwordresult, 10);
      var mailOptions = {
        from: "phuthinhnguyen1101@gmail.com",
        to: emailinput,
        subject: "Get Reset Password from SMARTCARD",
        html: `<h1>Hi, I am SMARTCARD</h1><p>Your reset password is ${passwordresult}</p>`,
      };
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          req.flash("messages", [`${error}`, `${error}`]);
        } else {
          req.flash("messages", [
            `Reset password has been sent to email ${email}`,
            `Mật khẩu mới đã được gửi tới email ${email}`,
          ]);
          await pool.execute(
            "update smartcard set password = ? where cardid = ?",
            [hash, cardidinput]
          );
          res.redirect("/signin");
        }
      });
    } else {
      req.flash("messages", [
        "Card ID and E-mail do not match",
        "Card ID hoặc E-mail không đúng",
      ]);
      return res.redirect("/forgotPassword");
    }
  } else {
    req.flash("messages", [
      "Card ID and E-mail do not match",
      "Card ID hoặc E-mail không đúng",
    ]);
    return res.redirect("/forgotPassword");
  }
};

let logout = async (req, res) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/signin");
    });
  });
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
  logout,
  forgotPassword,
  processForgotPassword,
  admin,
  addcardidtodatabase,
};
