
// (function ($) {
//     "use strict";


//      /*==================================================================
//     [ Focus input ]*/
//     $('.input100').each(function(){
//         $(this).on('blur', function(){
//             if($(this).val().trim() != "") {
//                 $(this).addClass('has-val');
//             }
//             else {
//                 $(this).removeClass('has-val');
//             }
//         })    
//     })
  
  
//     /*==================================================================
//     [ Validate ]*/
//     var input = $('.validate-input .input100');

//     $('.validate-form').on('submit',function(){
//         var check = true;

//         for(var i=0; i<input.length; i++) {
//             if(validate(input[i]) == false){
//                 showValidate(input[i]);
//                 check=false;
//             }
//         }
//         if (check==false){
//             return check;
//         }
//         else {
//             console.log("eeeee");
//             alert("Sdf")
//             window.location.href="https://www.google.com/";
//             }
//         // return check;
//     });


//     $('.validate-form .input100').each(function(){
//         $(this).focus(function(){
//            hideValidate(this);
//         });
//     });

//     function validate (input) {
//         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         }
//         else {
//             if($(input).val().trim() == ''){
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }
// })(jQuery);

 /*==================================================================
[ Focus input ]*/
$('.input100').each(function(){
    $(this).on('blur', function(){
        if($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })    
})


/*==================================================================
[ Validate ]*/
var input = $('.validate-input .input100');

$('.validate-form').on('submit',function(){
    var check = true;

    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }
    if (check==false){
        return check;
    }
    else {
        console.log("eeeee");
        alert("Sdf")
        window.location.href="https://www.google.com/";
        }
    // return check;
});


$('.validate-form .input100').each(function(){
    $(this).focus(function(){
        hideValidate(this);
    });
});

function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

var username=["a","b","c","phuthinhnguyen1101"]
var password=["1","2","3","Mainhi14071101"]
var inputcheck = document.getElementsByClassName("input100");
function submit_form(e,form){
    e.preventDefault();
    var check = true;

    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }

    if (check==true){
        let usernameitem=username.indexOf(inputcheck[0].value);
        console.log(usernameitem)
        if (usernameitem!=-1){
            if (password[usernameitem]==inputcheck[1].value){
                alert("Sign in thanh cong")
                window.location.href="https://www.w3schools.com/"
                console.log(password[usernameitem])
            }
            else alert("Username va password khong chinh xac")
        }
        else alert("Username khong ton tai")   
    }
    else return check
   
}