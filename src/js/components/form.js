$(document).ready(function () {
    //validation
    $('.form--request').validate({
        rules: {
            name: {
                required: true
            },

            email: {
                required: true,
                email: true
            },
            number: {
                required: true
            },
            type: {
                required: true
            },
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

    $('.form--payment').validate({
        rules: {
            service:{
                required: true
            },
        },
        messages:{
            service: {
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

        }
    });

    $('#payment_types').validate({
        rules: {
            payment:{
                required: true
            }
        },
        messages:{
            payment: {
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

        }
    });

    //send data
    function sendData() {
        var serverUrl = '/opteum-promo/data/server.php'; // /opteum-promo/server.php
        var
            name = $('.input[name="name"]', '.form').val(),
            phone = $('.input[name="number"]', '.form').val(),
            url =  location.href,
            time =  Math.round(new Date().getTime() / 1000),
            typeClient = $('.checkbox:checked', '.form').val(),
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
                "typeClient": typeClient,
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