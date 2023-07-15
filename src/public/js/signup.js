
(function ($) {
    "use strict";


    /*==================================================================
   [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
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

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        // if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        //     if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        //         return false;
        //     }
        // }
        if ($(input).val().trim() == '') {
            return false;
        }
        else {
            if ($(input).val().trim().length < 10) {
                $(input).parent().attr('data-validate', 'Min length: 10 characters');
                return false;
            }
            else if ($(input).val().trim().length > 30) {
                $(input).parent().attr('data-validate', 'Max length: 30 characters');
                return false;
            }
            else if ($(input).attr('name') == 'password') {
                console.log($(input).val())
                if ($(input).val().trim().match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{10,30}$/) == null) {
                    $(input).parent().attr('data-validate', 'Must contain uppercase letters and digits');
                    return false;
                }
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



})(jQuery);