function showpassword(index) {
    const input = document.getElementsByClassName("password")[index];
    const showhidepassword = document.getElementsByClassName("showhidepassword")[index];
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        if (index==0){
            showhidepassword.innerText = "Hide password";
        }
        else showhidepassword.innerText = "Ẩn mật khẩu";
       
    } else {
        input.setAttribute("type", "password");
        if (index==0){
            showhidepassword.innerText = "Show password";
        }
        else showhidepassword.innerText = "Hiện mật khẩu";
    }
}

