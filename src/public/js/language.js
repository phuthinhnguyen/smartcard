
if (localStorage.getItem("language") == null){
    localStorage["language"]="vi";
}
$(':root').attr('lang', localStorage["language"]);
function eng() {
    localStorage["language"] = "en";
    $(':root').attr('lang', localStorage["language"]);
}
function vi() {
    localStorage["language"] = "vi";
    $(':root').attr('lang', localStorage["language"]);
}
