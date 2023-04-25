let flagshowanimation = true;
// animation when user inputs info
function showanimation(){
    let show = document.getElementById("show");
    let limiter = document.getElementById("limiter");
    let name = document.getElementById("name");
    let linkarea = document.getElementById("link-area");  
    if (flagshowanimation==true){
        if ((name.value!="@yourname" && linkarea.childNodes.length==0) || (name.value=="@yourname" && linkarea.childNodes.length>0)){
            if (window.innerWidth>1500){
                animatein(limiter,show,250);
                
            }
            else if (window.innerWidth<=1500 && window.innerWidth>=1101){
                
               animatein(limiter,show,400)
            }
            else if (window.innerWidth<=1100 && window.innerWidth>=992){
                
                animatein(limiter,show,320)
            }
            else if (window.innerWidth<=991){
                limiter.animate([
                    { marginTop: `${50}px`},
                    { marginTop: `${400}px`},
                  ], {
                    duration: 600,
                  });
        
                show.animate([
                    { height: "0"},
                    { height: "450px"},
                    ], {
                    duration: 500,
                    });  
                show.style.opacity="1";
                show.style.height="500px";
                show.style.marginBottom="30px";
                show.style.marginTop="50px";  
            }
            flagshowanimation=false;
        }
        
    }
    if (name.value=="@yourname" && linkarea.childNodes.length==0 && flagshowanimation==false){
        if (window.innerWidth>1500){
            animateout(limiter,show,250,600);
        }
        else if (window.innerWidth<=1500 && window.innerWidth>=1101){
           animateout(limiter,show,400,300)
        }
        else if (window.innerWidth<=1100 && window.innerWidth>=992){
            animateout(limiter,show,320,200)
        }
        else if (window.innerWidth<=991){
            show.animate([
                { height: "500px"},
                { height: "50px"},
                ], {
                duration: 500,
                });  
            limiter.animate([
                { marginTop: `${400}px`},
                { marginTop: `${50}px`},
                ], {
                duration: 600,
                });
        
            show.style.opacity="0";
            show.style.height="0"; 
            show.style.marginBottom="0";   
            show.style.marginTop="0"; 
        }
        flagshowanimation=true;
    }
}

// event when user click on link
function addlinkfunction(a){
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
    var fragment = create(`<div id="container-showlink"><div class="link"><div class="linklogo"><img src="image/userinfo/${a.innerText.toLowerCase()}.png"></div><div class="linkinput"><div class="linknametitle-wrap"><h5 id="linknametitle">${a.innerText}&nbsp;-&nbsp;</h5><input id="title" class="inputtitle" readonly="true" value="${(name.value=="@yourname") ? "@yourtitle" : name.value}" maxlength="40" size="18" onfocusout="inputtitlefocusout(this)" onkeyup="inputKeyUp(event,this)"></input></div><i class="fas fa-pencil" onclick="editinputtitle(this)"></i><input id="link" readonly="true" value="http://${a.innerText.toLowerCase()}.com/@yourlink" maxlength="100" size="39" onfocusout="inputlinkfocusout(this)" onkeyup="inputKeyUp(event,this)"></input><i class="fas fa-pencil" onclick="editinputlink(this)"></i></div><div class="linktrash"><i class="fas fa-trash" onclick="clicktrash(this)"></i></div><div class="yesno"><i class="fas fa-check" id="yes" onclick="removelink(this)"></i><i class="fas fa-times" id="no" onclick="clickno(this)"></i></div></div></div>`);
    linkarea.insertBefore(fragment, linkarea.childNodes[linkarea.childElementCount]);
    $(".yesno").hide();

    // for showarea
    let showLinkcontainer = document.getElementById("link-container");
    var showFragment = create(`<a class="link" href='#' target="_blank"><img src="image/userinfo/${a.innerText.toLowerCase()}.png" alt=""><p>${name.value}</p></a>`);
    showLinkcontainer.insertBefore(showFragment, showLinkcontainer.childNodes[showLinkcontainer.childElementCount]);
    
    // align tag p center depend on length of @yourtitle
    let showlinkname = showLinkcontainer.childNodes[showLinkcontainer.childElementCount-1].childNodes[1];
    if (name.value.length<10){
        showlinkname.style.marginLeft="15px";
    }
    else if (name.value.length>=10 && name.value.length<18){
        showlinkname.style.marginLeft="22px";
    }
    else showlinkname.style.marginLeft="45px";


    let title = document.querySelectorAll(".inputtitle");
    if (title[linkarea.childElementCount-1].value=="@yourtitle"){
        title[linkarea.childElementCount-1].style.color = "lightgray";
        title[linkarea.childElementCount-1].style.fontStyle = "italic";
    }
    else{
        title[linkarea.childElementCount-1].style.color = "black";
        title[linkarea.childElementCount-1].style.fontStyle = "normal";
    }
    
    showanimation();
}

function linkoptionfocusout(){
    console.log("sdf")
}

// click on trash icon
function clicktrash(a){
    let z = a.parentElement.nextElementSibling;
    let yesno = document.getElementsByClassName("yesno");
    for (item of yesno){
        item.style.display="none";
    }
    z.style.display="flex";
}

// click on yes icon
function removelink(a){
    // for linkarea
    let linkarea = document.getElementById("link-area");
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    linkarea.removeChild(linkarea.childNodes[index]);

    // for showarea
    let showLinkcontainer = document.getElementById("link-container");
    showLinkcontainer.removeChild(showLinkcontainer.childNodes[index]);

    showanimation();
}

// click on no icon
function clickno(a){
    let z = a.parentElement;
    z.style.display="none";
}

// click on edit icon for title
function editinputtitle(a){
    let z =a.previousElementSibling.childNodes[1];
    z.readOnly="";
    if (z.value=="@yourtitle"){
        z.value="";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display="none";
}

// click on edit icon for link
function editinputlink(a){
    let z =a.previousElementSibling;
    z.readOnly="";
    if (z.value.indexOf("@yourlink")>0){
        z.value="";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display="none";
}


// click on edit icon for name
function editname(a){
    let z =a.previousElementSibling;
    z.readOnly="";
    if (z.value=="@yourname"){
        z.value="";
    }
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display="none";
    
}
// event when user input then hit Enter
function inputKeyUp(e,a) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
        if (a.id=="name"){
           inputnamefocusout(a);
        }
        else if (a.id=="title"){
            inputtitlefocusout(a);
        }
        else if (a.id=="link"){
            inputlinkfocusout(a);
        }
        
    }
}

// when user focus out input for title
function inputtitlefocusout(a){
    let z =a.parentElement.nextElementSibling;
    a.readOnly="true";
    z.style.display="inline";
    // for title
    if (a.value==""){
        a.value="@yourtitle";
    }
    if (a.value=="@yourtitle"){
        a.style.color = "lightgray";
        a.style.fontStyle = "italic";
    }
    else {
        a.style.fontStyle="normal";
        a.style.color="black";
    }
    let linkarea = document.getElementById("link-area");  
    let showLinkcontainer = document.getElementById("link-container");  
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.childNodes[index].childNodes[1];
    showlinkname.innerText =a.value;
    
    // align tag p center depend on length of @yourtitle
    if (a.value.length<10){
        showlinkname.style.marginLeft="15px";
    }
    else if (a.value.length>=10 && a.value.length<18){
        showlinkname.style.marginLeft="22px";
    }
    else showlinkname.style.marginLeft="45px";
}

// when user focus out input for link
function inputlinkfocusout(a){
    let z =a.nextElementSibling;
    let linknametitle = a.previousElementSibling.previousElementSibling.childNodes[0];
    console.log(linknametitle.innerText)
    a.readOnly="true";
    z.style.display="inline";
    // for link
    if (a.value==""){
        a.value=`http://${linknametitle.innerText.replace(/\s/g,"").replace("-","").toLowerCase()}.com/@yourlink`;
    }
    console.log(a.value)
    if (a.value==`http://${linknametitle.innerText.replace(/\s/g,"").replace("-","").toLowerCase()}.com/@yourlink`){
        a.style.color = "rgb(185, 185, 185)";
        a.style.fontStyle = "italic";
    }
    else {
        a.style.fontStyle="normal";
        a.style.color="black";
    }
    let linkarea = document.getElementById("link-area");  
    let showLinkcontainer = document.getElementById("link-container");  
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.childNodes[index];
    showlinkname.setAttribute("href",`${a.value}`);
    
}

// when user focus out input for name
function inputnamefocusout(a){
    let z =a.nextElementSibling;
    a.readOnly="true";
    if (a.value==""){
        a.value="@yourname";
    }
    if (a.value=="@yourname"){
        a.style.fontStyle="italic";
        a.style.color="lightgray";
    }
    else{
        a.style.fontStyle="normal";
        a.style.color="black";
    }
    document.getElementById("name-show").innerText=a.value;
    z.style.display="inline";

    showanimation();
}


function animatein(a,b,marginleft){
    // let logo = document.getElementById("logo");
    // logo.style.marginLeft="250px";
    a.animate([
        { marginLeft: `${marginleft/10}px`},
        { marginLeft: `${marginleft/1}px`},
      ], {
        duration: 600,
      });
      a.style.marginLeft=`${marginleft}px`;
    b.animate([
        { opacity: "0"},
        { opacity: "0.1"},
        { opacity: "0.7"},
        { opacity: "1"},
      ], {
        duration: 900,
      });
      b.style.opacity="1";
      b.style.height="500px";
}

function animateout(a,b,marginleft,dur){
    b.animate([
        { opacity: "1"},
        { opacity: "0"},
      ], {
        duration: dur,
      });
    b.style.opacity="0";
    a.animate([
        { marginLeft: `${marginleft/1}px`},
        { marginLeft: `${marginleft/5}px`},
        { marginLeft: `${marginleft/1000}px`},
        { margin: "auto"}
      ], {
        duration: 2000,
      });
      a.style.margin="auto";
}

// event to show content when user click on icon
let iconclicksave;
function iconclick(a,b){
    if (iconclicksave!=a) {
        $("#show-card-id").hide();
        $("#show-contact").hide();
        $("#show-change-theme").hide(); 
        b.slideToggle();
    }
    else{
        b.slideToggle();
    }
    iconclicksave=a;
}

// event when user click on color from changetheme
function changecolortheme(a){
    const getcolor = a.style.backgroundColor;
    let wrapshow = document.getElementById("wrap");
    wrapshow.style.backgroundColor=`${getcolor}`;
}

$(document).ready(function(){
    $("#cardid-icon").click(function name(params) {
       iconclick(this,$("#show-card-id"));
    })
    $("#contact-icon").click(function name(params) {
        iconclick(this,$("#show-contact"));
    })
    $("#change-theme-icon").click(function name(params) {
        iconclick(this,$("#show-change-theme"));
    })
    $(".link-option").hide();

    $("#addlink-btn").click(function name(params) {
        // if (linkoptionindex==true){
            $(".link-option").slideDown();
            
            // if (linkoptionindex==true){
            //     $(".link-option").slideToggle();
            // }
            $(".link-option").focus();
        // }   
    })
    let linkoptionindex=true
    $(".link-option").children().click(function name(params) {
       
    })
    $(".link-option, .link-option *").blur(function(e){
        // if(!$(e.relatedTarget).is(".link-option, .link-option *")){
            $(".link-option").slideUp();
            // linkoptionindex=false;
        // }
        // if($(e.relatedTarget).is("#addlink-btn")){
        //     console.log("sdfsdf")
        // }
    });
});

function submit_form(event,form){
    event.preventDefault();
}