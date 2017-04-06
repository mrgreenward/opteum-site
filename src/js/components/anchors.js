/**
 * Created by mngr03 on 03.04.2017.
 */

$(document).ready(function() {
    $('.nav-anchor[href^="#"]').click(function(){
        var el = $(this).attr('href');
        if (el === '#form' && $('form').is($(el)) === false){ // если на странице нет формы, то не переностить туда якорь
            return false
        }else
        {
            $('body, html').animate({
                scrollTop: $(el).offset().top + (-100)}, 1000);
            return false;
        }
    });
});