$(document).ready(function () {
    (function () {
        var menuButton = $('.menu-button-js'),
            list = $('.header__menu');

        $(window).resize(function () {
            if ($(window).width() >= '768'){
                list.css('display','flex');
            }else {
                list.css('display','none');
                menuButton.removeClass('is-active');
            }
        });
        menuButton.on('click', function (e) {
            e.preventDefault();
            menuButton.toggleClass('is-active');
            list.slideToggle();
        });
    })();
})