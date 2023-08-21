var yournametext, yourtitletext, yourlinktext
if (localStorage["language"] == "en") {
    yournametext = "@yourname"
    yourtitletext = "@yourtitle"
    yourlinktext = "@yourlink"
    yourbiotext = "@yourbio"
    yourphonetext = "@yourphone"
    youremailtext = "@youremail"
    yourpasswordtext = "@yourpassword"
    yourgmailtext = "@yourgmail"
    yourmomotext = "@yourmomophone"
    yourzalotext = "@yourzalophone"
    yourwhatsapptext = "@yourwhatsappphone"
}
else if (localStorage["language"] == "vi") {
    yournametext = "@tencuaban"
    yourtitletext = "@tieude"
    yourlinktext = "@link"
    yourbiotext = "@mota"
    yourphonetext = "@sodienthoai"
    youremailtext = "@email"
    yourpasswordtext = "@matkhau"
    yourgmailtext = "@diachigmail"
    yourmomotext = "@sodienthoaimomo"
    yourzalotext = "@sodienthoaizalo"
    yourwhatsapptext = "@sodienthoaiwhatsapp"
}


// style name, inputtitle, inputlink when first loading
window.addEventListener('load', function () {
    let name = document.getElementById("name");
    let bio = document.getElementById("bio");
    let phone = document.getElementById("showcardid-phone");
    let email = document.getElementById("showcardid-email");
    let password = document.getElementById("showcardid-password");
    let inputtitle = this.document.getElementsByClassName("inputtitle");
    let inputlinkcontainer = this.document.getElementsByClassName("linkinput");
    let showLinkcontainer = document.getElementById("link-container");
    let showlink = showLinkcontainer.children;
    let train = document.getElementById("train").value;
    // check if train is notyet (new account), show guides
    if (train=="done"){
        skip();
    }
    else if (train=="notyet"){
        guides();
    }

    password.value = yourpasswordtext;
    if (localStorage["language"] == "en") {
        if (name.value == "@tencuaban") {
            name.value = "@yourname"
        }
        if (bio.value == "@mota") {
            bio.value = "@yourbio"
        }
        if (phone.value == "@sodienthoai") {
            phone.value = "@yourphone"
        }
        if (email.value == "@email") {
            email.value = "@youremail"
        }
        for (let item of inputtitle) {
            if (item.value == "@tieude") {
                item.value = "@yourtitle"
            }
        }
        for (let item of inputlinkcontainer) {
            item.children[2].value = item.children[2].value.replace("@link", "@yourlink")
            item.children[2].value = item.children[2].value.replace("@diachigmail", "@yourgmail")
            item.children[2].value = item.children[2].value.replace("@sodienthoaimomo", "@yourmomophone")
            item.children[2].value = item.children[2].value.replace("@sodienthoaizalo", "@yourzalophone")
            item.children[2].value = item.children[2].value.replace("@sodienthoaiwhatsapp", "@yourwhatsappphone")
        }
        for (let item of showlink) {
            if (item.children[1].innerText == "@tieude") {
                item.children[1].innerText = "@yourtitle"
            }
        }
    }
    else if (localStorage["language"] == "vi") {
        if (name.value == "@yourname") {
            name.value = "@tencuaban"
        }
        if (bio.value == "@yourbio") {
            bio.value = "@mota"
        }
        if (phone.value == "@yourphone") {
            phone.value = "@sodienthoai"
        }
        if (email.value == "@youremail") {
            email.value = "@email"
        }
        for (let item of inputtitle) {
            if (item.value == "@yourtitle") {
                item.value = "@tieude"
            }
        }
        for (let item of inputlinkcontainer) {
            item.children[2].value = item.children[2].value.replace("@yourlink", "@link")
            item.children[2].value = item.children[2].value.replace("@yourgmail", "@diachigmail")
            item.children[2].value = item.children[2].value.replace("@yourmomophone", "@sodienthoaimomo")
            item.children[2].value = item.children[2].value.replace("@yourzalophone", "@sodienthoaizalo")
            item.children[2].value = item.children[2].value.replace("@yourwhatsappphone", "@sodienthoaiwhatsapp")
        }
        for (let item of showlink) {
            if (item.children[1].innerText == "@yourtitle") {
                item.children[1].innerText = "@tieude"
            }
        }
    }
   
    function focusoutfirstloading(input) {
        if (input.value == yournametext || input.value == yourbiotext || input.value == yourtitletext || input.value.includes(yourlinktext) || input.value.includes(yourgmailtext) || input.value.includes(yourmomotext) || input.value.includes(yourzalotext) || input.value.includes(yourwhatsapptext)) {
            input.style.fontStyle = "italic";
            input.style.color = "lightgray";
        }
        else {
            input.style.fontStyle = "normal";
            input.style.color = "black";
        }
    }

    focusoutfirstloading(name)
    focusoutfirstloading(bio)

    for (let i = 0; i < inputtitle.length; i++) {
        focusoutfirstloading(inputtitle[i])
    }
    for (let i = 0; i < inputlinkcontainer.length; i++) {
        const inputlink = inputlinkcontainer[i].children[2];
        focusoutfirstloading(inputlink)
    }

    // align tag p center depend on length of @yourtitle
    for (i = 0; i < showlink.length; i++) {
        const showlinkname = showlink[i].children[1];
        if (inputtitle[i].value.length < 10) {
            showlinkname.style.marginLeft = "15px";
        }
        else if (inputtitle[i].value.length >= 10 && inputtitle[i].value.length < 18) {
            showlinkname.style.marginLeft = "22px";
        }
        else showlinkname.style.marginLeft = "45px";
    }

})

let flagshowanimation = true;
// animation when user inputs info
function showanimation() {
    let show = document.getElementById("show");
    let limiter = document.getElementById("limiter");
    let name = document.getElementById("name");
    let linkarea = document.getElementById("link-area");

    if (flagshowanimation == true) {
        if ((name.value != yournametext && linkarea.children.length == 0) || (name.value == yournametext && linkarea.children.length > 0) || (name.value != yournametext && linkarea.children.length > 0)) {
            if (window.innerWidth > 1500) {
                animatein(limiter, show, 250);

            }
            else if (window.innerWidth <= 1500 && window.innerWidth >= 1101) {

                animatein(limiter, show, 400)
            }
            else if (window.innerWidth <= 1100 && window.innerWidth >= 992) {

                animatein(limiter, show, 320)
            }
            else if (window.innerWidth <= 991) {
                limiter.animate([
                    { marginTop: `${50}px` },
                    { marginTop: `${400}px` },
                ], {
                    duration: 600,
                });

                show.animate([
                    { height: "0" },
                    { height: "450px" },
                ], {
                    duration: 500,
                });
                show.style.opacity = "1";
                show.style.height = "500px";
                show.style.marginBottom = "30px";
                show.style.marginTop = "50px";
            }
            flagshowanimation = false;

        }

    }
    if (name.value == yournametext && linkarea.children.length == 0 && flagshowanimation == false) {
        if (window.innerWidth > 1500) {
            animateout(limiter, show, 250, 600);
        }
        else if (window.innerWidth <= 1500 && window.innerWidth >= 1101) {
            animateout(limiter, show, 400, 300)
        }
        else if (window.innerWidth <= 1100 && window.innerWidth >= 992) {
            animateout(limiter, show, 320, 200)
        }
        else if (window.innerWidth <= 991) {
            show.animate([
                { height: "500px" },
                { height: "50px" },
            ], {
                duration: 500,
            });
            limiter.animate([
                { marginTop: `${400}px` },
                { marginTop: `${50}px` },
            ], {
                duration: 600,
            });

            show.style.opacity = "0";
            show.style.height = "0";
            show.style.marginBottom = "0";
            show.style.marginTop = "0";
        }
        flagshowanimation = true;
    }
}

// event when user click on link
function addlinkfunction(a) {

    // check if link name exists in linkarea
    let linkarray = []
    let linknametitlewrap = document.querySelectorAll(".linknametitle-wrap")
    for (item of linknametitlewrap) {
        const linkname = item.children[0].innerText.replace("-", "").trim();
        linkarray.push(linkname)
    }
    if (linkarray.indexOf(a.innerText) == -1) {
        // for linkarea
        let linkarea = document.getElementById("link-area");
        let name = document.getElementById("name");
        function create(htmlStr) {
            var frag = document.createDocumentFragment(),
                temp = document.createElement('div');
            temp.innerHTML = htmlStr;
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            return frag;
        }
        var fragment = create(`<div id="container-showlink"><input name="linktype" type="hidden" value="${a.innerText}"></input><div class="link"><div class="linklogo"><img src="/image/userinfo/${a.innerText.toLowerCase()}.png"></div><div class="linkinput"><div class="linknametitle-wrap"><h5 id="linknametitle">${a.innerText}&nbsp;-&nbsp;</h5><input id="title" name="inputtitle" class="inputtitle" readonly="true" value="${(name.value == yournametext) ? yourtitletext : name.value}" maxlength="40" size="18" onfocusout="inputtitlefocusout(this)" onkeyup="inputKeyUp(event,this)" onkeypress="return event.keyCode != 13;"></input></div><i class="fas fa-pencil" onclick="editinputtitle(this)"></i><input id="link" name="inputlink" readonly="true" value="http://${a.innerText.toLowerCase()}.com/${yourlinktext}" maxlength="100" size="39" onfocusout="inputlinkfocusout(this)" onkeyup="inputKeyUp(event,this)" onkeypress="return event.keyCode != 13;"></input><i class="fas fa-pencil" onclick="editinputlink(this)"></i></div><div class="linktrash"><i class="fas fa-trash" onclick="clicktrash(this)"></i></div><div class="yesno"><i class="fas fa-check" id="yes" onclick="removelink(this)"></i><i class="fas fa-times" id="no" onclick="clickno(this)"></i></div></div></div>`);
        linkarea.appendChild(fragment)
        $(".yesno").hide();
        let link = document.querySelectorAll("#link")[document.querySelectorAll("#link").length-1]
        if (link.value.indexOf("gmail")>-1){
            link.value = yourgmailtext
        }
        else if (link.value.indexOf("momo")>-1){
            link.value = yourmomotext
        }
        else if (link.value.indexOf("zalo")>-1){
            link.value = yourzalotext
        }
        else if (link.value.indexOf("whatsapp")>-1){
            link.value = yourwhatsapptext
        }

        // for showarea
        let showLinkcontainer = document.getElementById("link-container");
        var showFragment = create(`<a class="link" href='#' target="_blank"><img src="/image/userinfo/${a.innerText.toLowerCase()}.png" alt=""><p>${name.value != yournametext ? name.value : yourtitletext}</p></a>`);
        showLinkcontainer.appendChild(showFragment)

        // align tag p center depend on length of @yourtitle
        let showlinkname = showLinkcontainer.children[showLinkcontainer.childElementCount - 1].children[1];
        if (name.value.length < 10) {
            showlinkname.style.marginLeft = "15px";
        }
        else if (name.value.length >= 10 && name.value.length < 18) {
            showlinkname.style.marginLeft = "22px";
        }
        else showlinkname.style.marginLeft = "45px";


        let title = document.querySelectorAll(".inputtitle");
        if (title[linkarea.childElementCount - 1].value == yourtitletext) {
            title[linkarea.childElementCount - 1].style.color = "lightgray";
            title[linkarea.childElementCount - 1].style.fontStyle = "italic";
        }
        else {
            title[linkarea.childElementCount - 1].style.color = "black";
            title[linkarea.childElementCount - 1].style.fontStyle = "normal";
        }

        showanimation();
    }
    else {
        document.getElementById("limiter").style.opacity="0.3";
        $('.toast-container-res').css("visibility", "visible");
        $('.toast').toast("show")
       
    }
}


// click on trash icon
function clicktrash(a) {
    let z = a.parentElement.nextElementSibling;
    let yesno = document.getElementsByClassName("yesno");
    for (item of yesno) {
        item.style.display = "none";
    }
    z.style.display = "flex";
}

// click on yes icon
function removelink(a) {
    // for linkarea
    let linkarea = document.getElementById("link-area");
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    linkarea.removeChild(linkarea.children[index]);

    // for showarea
    let showLinkcontainer = document.getElementById("link-container");
    showLinkcontainer.removeChild(showLinkcontainer.children[index]);

    showanimation();
}

// click on no icon
function clickno(a) {
    let z = a.parentElement;
    z.style.display = "none";
}

// click on edit icon for title
function editinputtitle(a) {
    let z = a.previousElementSibling.children[1];
    z.readOnly = "";
    if (z.value == yourtitletext) {
        z.value = "";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display = "none";
}

// click on edit icon for link
function editinputlink(a) {
    let z = a.previousElementSibling;
    z.readOnly = "";
    if ((z.value.indexOf(yourlinktext) > 0) || (z.value.indexOf(yourgmailtext) > -1) || (z.value.indexOf(yourmomotext) > -1) || (z.value.indexOf(yourzalotext) > -1) || (z.value.indexOf(yourwhatsapptext) > -1)) {
        z.value = "";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display = "none";
}


// click on edit icon for name
function editname(a) {
    let z = a.previousElementSibling;
    z.readOnly = "";
    if (z.value == yournametext) {
        z.value = "";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display = "none";
}

// click on edit icon for bio
function editbio(a) {
    let z = a.previousElementSibling;
    z.readOnly = "";
    if (z.value == yourbiotext) {
        z.value = "";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display = "none";
}

// event when user input then hit Enter
function inputKeyUp(e, a) {
    e.which = e.which || e.keyCode;
    if (e.which == 13) {
        if (a.id == "name") {
            inputnamefocusout(a);
        }
        else if (a.id == "title") {
            inputtitlefocusout(a);
        }
        else if (a.id == "link") {
            inputlinkfocusout(a);
        }
        else if (a.id == "bio") {
            inputbiofocusout(a);
        }
    }
}

// when user focus out input for title
function inputtitlefocusout(a) {
    let z = a.parentElement.nextElementSibling;
    a.readOnly = "true";
    z.style.display = "inline";
    // for title
    if (a.value == "") {
        a.value = yourtitletext;
    }
    if (a.value == yourtitletext) {
        a.style.color = "lightgray";
        a.style.fontStyle = "italic";
    }
    else {
        a.style.fontStyle = "normal";
        a.style.color = "black";
    }
    let linkarea = document.getElementById("link-area");
    let showLinkcontainer = document.getElementById("link-container");
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.children[index].children[1];
    showlinkname.innerText = a.value;

    // align tag p center depend on length of @yourtitle
    if (a.value.length < 10) {
        showlinkname.style.marginLeft = "15px";
    }
    else if (a.value.length >= 10 && a.value.length < 18) {
        showlinkname.style.marginLeft = "22px";
    }
    else showlinkname.style.marginLeft = "45px";
}

// when user focus out input for link
function inputlinkfocusout(a) {
    let z = a.nextElementSibling;
    let linknametitle = a.previousElementSibling.previousElementSibling.children[0];

    a.readOnly = "true";
    z.style.display = "inline";
    // for link
    if (a.value == "") {
        if (linknametitle.innerText.indexOf("Gmail")>-1){
            a.value=yourgmailtext
        }
        else if (linknametitle.innerText.indexOf("Momo")>-1){
            a.value=yourmomotext
        }
        else if (linknametitle.innerText.indexOf("Zalo")>-1){
            a.value=yourzalotext
        }
        else if (linknametitle.innerText.indexOf("WhatsApp")>-1){
            a.value=yourwhatsapptext
        }
        else
        {
            a.value = `http://${linknametitle.innerText.replace(/\s/g, "").replace("-", "").toLowerCase()}.com/${yourlinktext}`;
        }
    }

    if (a.value == `http://${linknametitle.innerText.replace(/\s/g, "").replace("-", "").toLowerCase()}.com/${yourlinktext}` || (a.value==yourgmailtext) || (a.value==yourmomotext) || (a.value==yourzalotext) || (a.value==yourwhatsapptext)) {
        a.style.color = "rgb(185, 185, 185)";
        a.style.fontStyle = "italic";
    }
    else {
        a.style.fontStyle = "normal";
        a.style.color = "black";
    }
    let linkarea = document.getElementById("link-area");
    let showLinkcontainer = document.getElementById("link-container");
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.children[index];
    showlinkname.setAttribute("href", `${a.value}`);

}

// when user focus out input for name
function inputnamefocusout(a) {
    let z = a.nextElementSibling;
    a.readOnly = "true";
    if (a.value == "") {
        a.value = yournametext;
    }
    if (a.value == yournametext) {
        a.style.fontStyle = "italic";
        a.style.color = "lightgray";
    }
    else {
        a.style.fontStyle = "normal";
        a.style.color = "black";
    }
    document.getElementById("name-show").innerText = a.value;
    z.style.display = "inline";

    showanimation();
}

// when user focus out input for bio
function inputbiofocusout(a) {
    let z = a.nextElementSibling;
    a.readOnly = "true";
    if (a.value == "") {
        a.value = yourbiotext;
    }
    if (a.value == yourbiotext) {
        a.style.fontStyle = "italic";
        a.style.color = "lightgray";
    }
    else {
        a.style.fontStyle = "normal";
        a.style.color = "black";
    }
    document.getElementById("bio-show").innerText = a.value;
    z.style.display = "inline";

    showanimation();
}

function changephone(){
    let phone = document.getElementById("phone");
    let showcardidphone =document.getElementById("showcardid-phone");
    if (showcardidphone.value == ""){
        showcardidphone.value = yourphonetext;
    }
    phone.value=showcardidphone.value; 
}

function changeemail(){
    let email = document.getElementById("email");
    let showcardidemail =document.getElementById("showcardid-email");
    if (showcardidemail.value == ""){
        showcardidemail.value = youremailtext;
    }
    email.value=showcardidemail.value;
}

function changepassword(){
    let password = document.getElementById("password");
    let showcardidpassword =document.getElementById("showcardid-password");
    if (showcardidpassword.value == ""){
        showcardidpassword.value = yourpasswordtext;
    }
    if (showcardidpassword.value == "@yourpassword" || showcardidpassword.value == "@matkhau"){
        password.value="";
    }
    else  password.value=showcardidpassword.value;
}

function animatein(a, b, marginleft) {
    a.animate([
        { marginLeft: `${marginleft / 10}px` },
        { marginLeft: `${marginleft / 1}px` },
    ], {
        duration: 600,
    });
    a.style.marginLeft = `${marginleft}px`;
    b.animate([
        { opacity: "0" },
        { opacity: "0.1" },
        { opacity: "0.7" },
        { opacity: "1" },
    ], {
        duration: 900,
    });
    b.style.opacity = "1";
    b.style.height = "500px";
}

function animateout(a, b, marginleft, dur) {
    b.animate([
        { opacity: "1" },
        { opacity: "0" },
    ], {
        duration: dur,
    });
    b.style.opacity = "0";
    a.animate([
        { marginLeft: `${marginleft / 1}px` },
        { marginLeft: `${marginleft / 5}px` },
        { marginLeft: `${marginleft / 1000}px` },
        { margin: "auto" }
    ], {
        duration: 2000,
    });
    a.style.margin = "auto";
}

// event to show content when user click on icon
let iconclicksave;
function iconclick(a, b) {
    if (iconclicksave != a) {
        $("#show-card-id").hide();
        $("#show-contact").hide();
        $("#show-change-theme").hide();
        b.slideToggle();
    }
    else {
        b.slideToggle();
    }
    iconclicksave = a;
}

// event when user click on color from changetheme
function changecolortheme(a) {
    const getcolor = a.style.backgroundColor;
    let wrapshow = document.getElementById("wrap");
    wrapshow.style.backgroundColor = `${getcolor}`;
    let colortheme = document.getElementById("colortheme");
    colortheme.value = getcolor;
    showanimation();
}

$(document).ready(function () {
    $("#cardid-icon").click(function name(params) {
        iconclick(this, $("#show-card-id"));
    })
    $("#contact-icon").click(function name(params) {
        iconclick(this, $("#show-contact"));
    })
    $("#change-theme-icon").click(function name(params) {
        iconclick(this, $("#show-change-theme"));
    })
    $(".link-option").hide();

    $("#addlink-btn").click(function name(params) {
        $(".link-option").slideToggle();
    })
    $(document).click(function (event) {
        if (!$(event.target).closest("#addlink-btn").length) {
            $(".link-option").slideUp();
        }
    });

});

function guides() {
    if (window.innerWidth > 991) {
        let body = document.getElementById("body");
        let guides = document.getElementById("guides");
        guides.animate([
            { top: "100%" },
            { opacity: "0.1" },
            { opacity: "0.7" },
            { opacity: "1" },
        ], {
            duration: 1000,
        });
    }
    else skip();
}


function skip() {
    let body = document.getElementById("body");
    body.style.opacity = "1";
    let guides = document.getElementById("guides");
    guides.style.display = "none";
    let limiter = document.getElementById("limiter");
    let train = document.getElementById("train")
    train.value="done";

    if (window.innerWidth > 991) {
        limiter.animate([
            { marginLeft: "20%" },
            { marginLeft: "10%" },
            { marginLeft: "2%" },
            { marginLeft: "0%" },
            { margin: "auto" }
        ], {
            duration: 2000,
        });
    }
    else if (window.innerWidth <= 991 && window.innerWidth > 700) {
        limiter.animate([
            { marginLeft: "25%" },
            { marginLeft: "20%" },
            { marginLeft: "15%" },
            { margin: "auto" }
        ], {
            duration: 2000,
        });
    }
    else {
        limiter.animate([
            { marginLeft: "5%" },
            { marginLeft: "3%" },
            { marginLeft: "1%" },
            { margin: "auto" }
        ], {
            duration: 2000,
        });
    }
    limiter.style.margin = "auto";
}

function guidesgo(num) {
    let welcome = document.getElementById("welcome");
    let body = document.getElementById("body");
    let uploadavatar = document.getElementById("uploadavatar");
    let uploadavatarresponsive = document.getElementById("uploadavatar-responsive");
    let changename = document.getElementById("changename");
    let changenameresponsive = document.getElementById("changename-responsive");
    let nexttoaddlink = document.getElementsByClassName("nexttoaddlink")[num];

    welcome.style.display = "none";
    welcome.animate([
        { top: "50%" },
        { top: "100%" },
    ], {
        duration: 500,
    });
    body.animate([
        { opacity: "0.1" },
        { opacity: "0.8" },
    ], {
        duration: 500,
    });
    body.style.opacity = "1";


    if (window.innerWidth > 1300) {
        uploadavatar.animate([
            { top: "0" },
            { top: "50%" },
        ], {
            duration: 500,
        });
        uploadavatar.style.display = "flex";
        changename.animate([
            { top: "0" },
            { top: "60%" },
        ], {
            duration: 1000,
        });
        changename.style.display = "flex";
    }
    else {
        uploadavatarresponsive.animate([
            { top: "0" },
            { top: "50%" },
        ], {
            duration: 500,
        });
        uploadavatarresponsive.style.display = "flex";
        changenameresponsive.animate([
            { top: "0" },
            { top: "60%" },
        ], {
            duration: 1000,
        });
        changenameresponsive.style.display = "flex";
    }

    nexttoaddlink.animate([
        { opacity: "0" },
        { opacity: "0" },
        { opacity: "0.9" },
    ], {
        duration: 1500,
    });

    nexttoaddlink.style.display = "block";
}

function nextoaddlink(num) {
    let uploadavatar = document.getElementById("uploadavatar");
    let uploadavatarresponsive = document.getElementById("uploadavatar-responsive");
    let changename = document.getElementById("changename");
    let changenameresponsive = document.getElementById("changename-responsive");
    let addlink = document.getElementById("addlink");
    let addlinkresponsive = document.getElementById("addlink-responsive");
    let nexttolinkcontainer = document.getElementsByClassName("nexttolinkcontainer")[num];
    let nexttoaddlink = document.getElementsByClassName("nexttoaddlink")[num];

    uploadavatar.style.display = "none";
    uploadavatarresponsive.style.display = "none";
    changename.style.display = "none";
    changenameresponsive.style.display = "none";
    nexttoaddlink.style.display = "none";
    if (window.innerWidth > 1400) {
        addlink.animate([
            { top: "0" },
            { top: "60%" },
        ], {
            duration: 1000,
        });
        addlink.style.display = "flex";
    }
    else {
        addlinkresponsive.animate([
            { top: "0" },
            { top: "60%" },
        ], {
            duration: 1000,
        });
        addlinkresponsive.style.display = "block";
    }
    nexttolinkcontainer.animate([
        { opacity: "0" },
        { opacity: "0" },
        { opacity: "0.9" },
    ], {
        duration: 1800,
    });
    nexttolinkcontainer.style.display = "block";
    $(".link-option").slideDown();
}

function nexttolinkcontainer(num) {
    let linkoption = document.getElementsByClassName("link-option");
    addlinkfunction(linkoption[0].children[0]);
    let addlink = document.getElementById("addlink");
    let addlinkresponsive = document.getElementById("addlink-responsive");
    let edittitle = document.getElementById("edittitle");
    let edittitleresponsive = document.getElementById("edittitle-responsive");
    let editlink = document.getElementById("editlink");
    let editlinkresponsive = document.getElementById("editlink-responsive");
    let preview = document.getElementById("preview");
    let done = document.getElementsByClassName("done")[num];
    let nexttolinkcontainer = document.getElementsByClassName("nexttolinkcontainer")[num];

    addlink.style.display = "none";
    addlinkresponsive.style.display = "none";
    nexttolinkcontainer.style.display = "none";
    if (window.innerWidth > 1500) {
        edittitle.animate([
            { top: "0" },
            { top: "77%" },
        ], {
            duration: 1000,
        });
        edittitle.style.display = "flex";
        editlink.animate([
            { top: "0" },
            { top: "78%" },
        ], {
            duration: 1500,
        });
        editlink.style.display = "flex";
        preview.style.left = "calc(15% + 130px)";
    }
    else {
        edittitleresponsive.animate([
            { top: "0" },
            { top: "77%" },
        ], {
            duration: 1000,
        });
        edittitleresponsive.style.display = "flex";
        editlinkresponsive.animate([
            { top: "0" },
            { top: "78%" },
        ], {
            duration: 1500,
        });
        editlinkresponsive.style.display = "flex";
        done.style.left = "calc(50% - 100px)";
        done.style.top = "700px";
        if (window.innerWidth > 1200) {
            preview.style.left = "calc(15% + 100px)";
        }
        else if (window.innerWidth <= 1200 && window.innerWidth > 1100) {
            preview.style.left = "calc(15% + 60px)";
        }
        else if (window.innerWidth <= 1100) {
            preview.style.left = "calc(15% + 30px)";
        }

    }
    preview.animate([
        { top: "0" },
        { top: "22%" },
    ], {
        duration: 1500,
    });
    preview.style.display = "block";
    done.animate([
        { opacity: "0" },
        { opacity: "0" },
        { opacity: "0.9" },
    ], {
        duration: 1800,
    });
    done.style.display = "block";

}

function done() {
    skip();
    let yes = document.getElementById("yes");
    removelink(yes);
}

function submit_form(event, form) {
    event.preventDefault();
}

