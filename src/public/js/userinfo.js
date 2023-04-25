
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
    var fragment = create(`<div id="container-showlink"><div class="link"><div class="linklogo"><img src="image/userinfo/${a.innerText.toLowerCase()}.png"></div><div class="linkinput"><input readonly="true" value="${a.innerText} - ${name.value}" maxlength="40" size="22" onfocusout="inputtitlefocusout(this)"></input><i class="fas fa-pencil" onclick="edit(this)"></i><br><input readonly="true" value="http://${a.innerText.toLowerCase()}.com/yourname" size="30" onfocusout="inputlinkfocusout(this)"></input><i class="fas fa-pencil" onclick="edit(this)"></i></div><div class="linktrash"><i class="fas fa-trash" onclick="clicktrash(this)"></i></div><div class="yesno"><i class="fas fa-check" id="yes" onclick="removelink(this)"></i><i class="fas fa-times" id="no" onclick="clickno(this)"></i></div></div></div>`);
    linkarea.insertBefore(fragment, linkarea.childNodes[linkarea.childElementCount]);
    $(".yesno").hide();

    // for showarea
    let showLinkcontainer = document.getElementById("link-container");
    var showFragment = create(`<a class="link" href='#' target="_blank"><img src="image/userinfo/${a.innerText.toLowerCase()}.png" alt=""><p>${name.value}</p></a>`);
    showLinkcontainer.insertBefore(showFragment, showLinkcontainer.childNodes[showLinkcontainer.childElementCount])
}

function removelink(a){
    // for linkarea
    let linkarea = document.getElementById("link-area");
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    linkarea.removeChild(linkarea.childNodes[index]);

    // for showarea
    let showLinkcontainer = document.getElementById("link-container");
    showLinkcontainer.removeChild(showLinkcontainer.childNodes[index]);
}

function clicktrash(a){
    let z = a.parentElement.nextElementSibling;
    let yesno = document.getElementsByClassName("yesno");
    for (item of yesno){
        item.style.display="none";
    }
    z.style.display="flex";
}

function clickno(a){
    let z = a.parentElement;
    z.style.display="none";
}

function edit(a){
    let z =a.previousElementSibling;
    z.readOnly="";
    z.value=z.value.replace("@yourname","").replace("yourname","");
    z.setSelectionRange(z.value.length, z.value.length);
    z.focus();
    a.style.display="none";
}

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

function inputtitlefocusout(a){
    let z =a.nextElementSibling;
    a.readOnly="true";
    z.style.display="inline";
    // for title
    let checkstringafterdash = [...a.value][a.value.indexOf(" - ")+3];
    if ((a.value=="") || (typeof checkstringafterdash=="undefined")){
        a.value+="@yourname";
    }
    let linkarea = document.getElementById("link-area");  
    let showLinkcontainer = document.getElementById("link-container");  
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.childNodes[index].childNodes[1];
    showlinkname.innerText =a.value.slice(a.value.indexOf(" - ")+3,);
   
}
function inputlinkfocusout(a){
    let z =a.nextElementSibling;
    a.readOnly="true";
    z.style.display="inline";
    // for link
    let indexofcom = a.value.indexOf(".com/");
    let checkstringaftercom = [...a.value][indexofcom+5];
    if (typeof checkstringaftercom=="undefined"){
        a.value+="yourname";
    }
    let linkarea = document.getElementById("link-area");  
    let showLinkcontainer = document.getElementById("link-container");  
    const index = Array.from(linkarea.children).indexOf(a.parentElement.parentElement.parentElement);
    let showlinkname = showLinkcontainer.childNodes[index];
    showlinkname.setAttribute("href",`${a.value}`);
    
}
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
        document.getElementById("name-show").innerText=a.value;
    }
    z.style.display="inline";

}
$(document).ready(function(){
    $(".link-option").hide();
    $("#addlink-btn").click(function name(params) {
        $(".link-option").slideToggle();
    })
    // $("#trash").click(function name(params) {
    //     $(this).parent().next(".yesno").slideToggle();
    // })
    // $("#no").click(function name(params) {
    //     $(this).parent(".yesno").slideToggle();
    // })
    // $("#edit").click(function name(params) {
    //     $(this).prev().prop("disabled", !$(this).prev().prop("disabled"));
    //     $(this).hide();
    //     // $(this).prev().val("sdf");
    // })
    // $(".link").focusout(function name(params) {
    //     // $("#edit").pre().prop("disabled");
    //     $("#edit").show();
    // })
});

