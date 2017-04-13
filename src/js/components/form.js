$(document).ready(function () {
    //validation
       $('.form').validate({
            rules: {
                name:{
                    required: true
                },

                email:{
                    required: true,
                    email: true
                },
                number:{
                    required: true
                },
                type: {
                    required: true
                }
            },
            messages:{
                name:{
                    required: ""
                },

                email:{
                    required: ""

                },
                number: {
                    required: ""
                },
                type: {
                    required: ""
                }

            },
            errorClass: 'input--error',
            validClass: 'input--success',
            errorPlacement: function(error, element) {
                // Don't show error
            },
            onkeyup: false,
            submitHandler: function () {
                sendData();
            }
        });


    //send data
    function sendData() {
        var serverUrl = 'http://localhost:8080/form'; // /opteum-promo/server.php
        var
            name = $('.input[name="name"]', '.form').val(),
            phone = $('.input[name="number"]', '.form').val(),
            url =  location.href,
            time =  Math.round(new Date().getTime() / 1000),
            comment = $('.checkbox:checked', '.form').val(),
            email = $('.input[name="email"]', '.form').val();

        $.ajax({
            url: serverUrl,
            timeout: 30 * 1000,
            type: 'POST',
            dataType: 'json',
            data: {
                "name": name,
                "email": email,
                "phone": phone,
                "url": url,
                "comment": comment,
                "time": time
            },
            cache: false,
            beforeSend: function (jqXHR, settings) {
                $('.form__btn', '.form').prop('disabled', true);

                $('.modal--request').animate(200, function () {
                    $('body').css('overflow','visible');
                    $(this).css('display', 'none');
                    $('.modal-backdrop').fadeOut(100, function () {
                        $(this).remove();
                    });
                });
            },
            success: function (data, textStatus, jqXHR) {
                /*    console.log(data, textStatus, jqXHR);*/
                $('.form__btn', '.form').attr('data-modal', '.modal-success').Modal();

            },
            fail: function (jqXHR, textStatus) {
                console.log('jqXHR, textStatus');
                $('.form__btn', '.form').prop('data-modal', null).attr('data-modal', '.modal-fail').Modal();
            },
            complete: function (jqXHR, textStatus) {
                $('.form').trigger('reset');
                $('.form__btn', '.form').prop('disabled', false);
            }
        });
    }
});