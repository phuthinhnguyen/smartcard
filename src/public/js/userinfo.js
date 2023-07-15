// style name, inputtitle, inputlink when first loading
window.addEventListener('load', function () {
    let name = document.getElementById("name")
    let inputtitle = this.document.getElementsByClassName("inputtitle")
    let inputlinkcontainer = this.document.getElementsByClassName("linkinput")

    function focusoutfirstloading(input) {
        if (input.value == "@yourname" || input.value == "@yourtitle" || input.value.includes("@yourlink")) {
            input.style.fontStyle = "italic";
            input.style.color = "lightgray";
        }
        else {
            input.style.fontStyle = "normal";
            input.style.color = "black";
        }
    }
    focusoutfirstloading(name)
    for (let i = 0; i < inputtitle.length; i++) {
        focusoutfirstloading(inputtitle[i])
    }
    for (let i = 0; i < inputlinkcontainer.length; i++) {
        const inputlink = inputlinkcontainer[i].children[2];
        focusoutfirstloading(inputlink)
    }

    // align tag p center depend on length of @yourtitle
    let showLinkcontainer = document.getElementById("link-container");
    let showlink = showLinkcontainer.children;
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

    // showanimation()
})


let flagshowanimation = true;
// animation when user inputs info
function showanimation() {
    let show = document.getElementById("show");
    let limiter = document.getElementById("limiter");
    let name = document.getElementById("name");
    let linkarea = document.getElementById("link-area");

    if (flagshowanimation == true) {
        if ((name.value != "@yourname" && linkarea.children.length == 0) || (name.value == "@yourname" && linkarea.children.length > 0) || (name.value != "@yourname" && linkarea.children.length > 0)) {
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
    if (name.value == "@yourname" && linkarea.children.length == 0 && flagshowanimation == false) {
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
        var fragment = create(`<div id="container-showlink"><input name="linktype" type="hidden" value="${a.innerText}"></input><div class="link"><div class="linklogo"><img src="/image/userinfo/${a.innerText.toLowerCase()}.png"></div><div class="linkinput"><div class="linknametitle-wrap"><h5 id="linknametitle">${a.innerText}&nbsp;-&nbsp;</h5><input id="title" name="inputtitle" class="inputtitle" readonly="true" value="${(name.value == "@yourname") ? "@yourtitle" : name.value}" maxlength="40" size="18" onfocusout="inputtitlefocusout(this)" onkeyup="inputKeyUp(event,this)" onkeypress="return event.keyCode != 13;"></input></div><i class="fas fa-pencil" onclick="editinputtitle(this)"></i><input id="link" name="inputlink" readonly="true" value="http://${a.innerText.toLowerCase()}.com/@yourlink" maxlength="100" size="39" onfocusout="inputlinkfocusout(this)" onkeyup="inputKeyUp(event,this)" onkeypress="return event.keyCode != 13;"></input><i class="fas fa-pencil" onclick="editinputlink(this)"></i></div><div class="linktrash"><i class="fas fa-trash" onclick="clicktrash(this)"></i></div><div class="yesno"><i class="fas fa-check" id="yes" onclick="removelink(this)"></i><i class="fas fa-times" id="no" onclick="clickno(this)"></i></div></div></div>`);
        // linkarea.insertBefore(fragment, linkarea.childNodes[linkarea.childElementCount]);
        linkarea.appendChild(fragment)
        $(".yesno").hide();

        // for showarea
        let showLinkcontainer = document.getElementById("link-container");
        var showFragment = create(`<a class="link" href='#' target="_blank"><img src="/image/userinfo/${a.innerText.toLowerCase()}.png" alt=""><p>${name.value != "@yourname" ? name.value : "@yourtitle"}</p></a>`);
        // showLinkcontainer.insertBefore(showFragment, showLinkcontainer.childNodes[showLinkcontainer.childElementCount]);
        showLinkcontainer.appendChild(showFragment)

        // align tag p center depend on length of @yourtitle
        // let showlinkname = showLinkcontainer.childNodes[showLinkcontainer.childElementCount - 1].childNodes[1];
        let showlinkname = showLinkcontainer.children[showLinkcontainer.childElementCount - 1].children[1];
        if (name.value.length < 10) {
            showlinkname.style.marginLeft = "15px";
        }
        else if (name.value.length >= 10 && name.value.length < 18) {
            showlinkname.style.marginLeft = "22px";
        }
        else showlinkname.style.marginLeft = "45px";


        let title = document.querySelectorAll(".inputtitle");
        if (title[linkarea.childElementCount - 1].value == "@yourtitle") {
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

// function linkoptionfocusout() {
//     console.log("sdf")
// }

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
    // linkarea.removeChild(linkarea.childNodes[index]);
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
    // let z =a.previousElementSibling.childNodes[1];
    let z = a.previousElementSibling.children[1];
    z.readOnly = "";
    if (z.value == "@yourtitle") {
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
    if (z.value.indexOf("@yourlink") > 0) {
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
    if (z.value == "@yourname") {
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
    }
}

// when user focus out input for title
function inputtitlefocusout(a) {
    let z = a.parentElement.nextElementSibling;
    a.readOnly = "true";
    z.style.display = "inline";
    // for title
    if (a.value == "") {
        a.value = "@yourtitle";
    }
    if (a.value == "@yourtitle") {
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
    // let showlinkname = showLinkcontainer.childNodes[index].childNodes[1];
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
    // let linknametitle = a.previousElementSibling.previousElementSibling.childNodes[0];
    let linknametitle = a.previousElementSibling.previousElementSibling.children[0];

    a.readOnly = "true";
    z.style.display = "inline";
    // for link
    if (a.value == "") {
        a.value = `http://${linknametitle.innerText.replace(/\s/g, "").replace("-", "").toLowerCase()}.com/@yourlink`;
    }

    if (a.value == `http://${linknametitle.innerText.replace(/\s/g, "").replace("-", "").toLowerCase()}.com/@yourlink`) {
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
    // let showlinkname = showLinkcontainer.childNodes[index];
    let showlinkname = showLinkcontainer.children[index];
    showlinkname.setAttribute("href", `${a.value}`);

}

// when user focus out input for name
function inputnamefocusout(a) {
    let z = a.nextElementSibling;
    a.readOnly = "true";
    if (a.value == "") {
        a.value = "@yourname";
    }
    if (a.value == "@yourname") {
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


function animatein(a, b, marginleft) {
    // let logo = document.getElementById("logo");
    // logo.style.marginLeft="250px";
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

setTimeout(guides, 1);

function skip() {
    let body = document.getElementById("body");
    body.style.opacity = "1";
    let guides = document.getElementById("guides");
    guides.style.display = "none";
    let limiter = document.getElementById("limiter");
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
            // { marginLeft: "30%"},
            // { marginLeft: "70%"},
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
            // { marginLeft: "30%"},
            // { marginLeft: "70%"},
            // { marginLeft: "25%"},
            // { marginLeft: "20%"},
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

function guidesgo() {
    let welcome = document.getElementById("welcome");
    let body = document.getElementById("body");
    let uploadavatar = document.getElementById("uploadavatar");
    let uploadavatarresponsive = document.getElementById("uploadavatar-responsive");
    let changename = document.getElementById("changename");
    let changenameresponsive = document.getElementById("changename-responsive");
    let nexttoaddlink = document.getElementById("nexttoaddlink");
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

function nextoaddlink() {
    let uploadavatar = document.getElementById("uploadavatar");
    let uploadavatarresponsive = document.getElementById("uploadavatar-responsive");
    let changename = document.getElementById("changename");
    let changenameresponsive = document.getElementById("changename-responsive");
    let nexttoaddlink = document.getElementById("nexttoaddlink");
    let addlink = document.getElementById("addlink");
    let addlinkresponsive = document.getElementById("addlink-responsive");
    let nexttolinkcontainer = document.getElementById("nexttolinkcontainer");
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

function nexttolinkcontainer() {
    let linkoption = document.getElementsByClassName("link-option");
    addlinkfunction(linkoption[0].children[0]);
    let addlink = document.getElementById("addlink");
    let addlinkresponsive = document.getElementById("addlink-responsive");
    let nexttolinkcontainer = document.getElementById("nexttolinkcontainer");
    let edittitle = document.getElementById("edittitle");
    let edittitleresponsive = document.getElementById("edittitle-responsive");
    let editlink = document.getElementById("editlink");
    let editlinkresponsive = document.getElementById("editlink-responsive");
    let preview = document.getElementById("preview");
    let done = document.getElementById("done");
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

    // window.location.href="/upload-profile-pic";
    // const data = document.getElementById("profile_pic").value
    // let file = new File([data], "img.jpg", { type: "image/jpeg", lastModified: new Date().getTime() });
    // let dataTransfer = new DataTransfer();
    // dataTransfer.items.add(file);
    // fileInput.files = dataTransfer.files;
    // document.getElementById("profile_pic").files = dataTransfer.files;
}

