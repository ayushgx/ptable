$(document).ready(function(){

    $('#button-hamburger').click(function(e){
        e.stopPropagation();
        attach_overlay_and_blur('.general-nav',300,'.ptable-and-top-bar-wrapper', 4.6)
        $('.general-nav').addClass('active');
    })

    $('body').on('click', function (event) {
        if (clicked_outside('.general-nav') && $('.general-nav').hasClass('active')) {
            $('.general-nav').removeClass('active');
            remove_overlay_and_blur(300, '.ptable-and-top-bar-wrapper')
        } 
    });


})