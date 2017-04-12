$(document).ready(function () {
    (function ($) {
        $.fn.Modal = function () {
            return this.each(function () {
                var $this = $(this);

                var modal = $(this).data('modal'),
                    backdropEl = '<div class="modal-backdrop"></div>';

                $(modal).after(backdropEl); //добавить элемент стенку
                $('.modal-backdrop').fadeIn(100, function () {
                    $(modal).css('display', 'block').animate({opacity: 1}, 100); //анимация
                    $('body').css('overflow','hidden');
                });

                $('.modal__close,.modal-backdrop').on('click', function () {
                    $(modal).animate(200, function () {
                        $('body').css('overflow','visible');
                        $(this).css('display', 'none');
                        $('.modal-backdrop').fadeOut(100, function () {
                            $(this).remove();
                        });
                    });
                });

            })
        }
    })($)
})