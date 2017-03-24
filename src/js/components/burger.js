$(document).ready(function () {
    (function () {
        var menuButton = $('.menu-button-js'),
            list = $('.header__menu');
        menuButton.on('click', function (e) {
            e.preventDefault();
            menuButton.toggleClass('is-active');
            list.slideToggle();
        });
    })();
})