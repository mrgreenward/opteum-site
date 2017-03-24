$(document).ready(function () {
    (function ($) {
        $.fn.DropDown = function () {
            var self = this,
                root = $(this).parents('.dropdown-menu');

            var list = ('.dropdown-list'),
                dropdownMenu = ('.dropdown-menu');

            this.onCloseMenu = function () {
                $('.arrow-down', root).removeClass('arrow-up');
                $(list).slideUp('fast');
            };
            this.onOpenMenu = function () {
                $('.arrow-down', root).toggleClass('arrow-up');
                $(list, root).slideToggle('fast');
            };
            this.on('click', function () {
                self.onCloseMenu();
                root = $(this).parents('.dropdown-menu');
                if ($(list, root).css('display') === 'none') {
                    self.onOpenMenu()
                } else {
                    self.onCloseMenu()
                }
            });
            this.onItemClick = function () {
                $('.dropdown-list__item', root).on('click', function () {
                    self.onCloseMenu();
                });
            };
            this.onOutClick = function () {
                $(document).on('click', function (e) {
                    if (!(self.is(e.target) && self.has(e.target).length === 0)) {
                        self.onCloseMenu();
                    }
                }); //click out this element
            };
            this.onItemClick();
            this.onOutClick();
        };
        return this
    })($);
});