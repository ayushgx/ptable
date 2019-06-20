$(document).ready(function () {

const search_nav_trans_dur = parseFloat($('.search-nav').css('transition-duration')) * 1000;
//====================================================================
//function to open and close search-nav
    function open_search_nav(){
        attach_overlay('.search-nav', search_nav_trans_dur)
        $('.ptable-and-top-bar-wrapper').css('filter', 'blur(5px)')
        // $('.ptable-and-top-bar-wrapper').css('overflow', 'hidden')
        $('.search-nav').addClass('active');
    }
    function close_search_nav(){
        $('.search-nav').removeClass('active');
        $('.ptable-and-top-bar-wrapper').css('filter', 'blur(0px)')
        remove_overlay('.search-nav', search_nav_trans_dur)
    }
//====================================================================


    //that green box at the top left
    $('.ptable-and-top-bar-wrapper').dblclick(function () {
        open_search_nav();
    })

    $('.search-nav__close').click(function () {
        close_search_nav();
    })


    $('html').click(function (e) {
        e.stopPropagation();
        $('.material-menu').removeClass("active");
    });

    //why use .each()??
    //we are using each in case of multiple elements with same class/id
    //when tried to select one all with same class gets selected
    $('.material-menu ul li').each(function () {
        var delay = $(this).index() * 30 + 'ms';
        $(this).css({
            '-webkit-transition-delay': delay,
            '-moz-transition-delay': delay,
            '-o-transition-delay': delay,
            'transition-delay': delay
        })
    })

    //both upper and lower .each are pointing to same material menu
    //but we have separated it in order to use material menu somewhere else
    //by giving class "parameter-menu" we declared that "item select and display" functionality is only limited to that class 

    //just to remove previous ix.. class before adding new ix... class    
    var old_color_class = 'i1';
    var new_color_class;
    $('.parameter-menu ul li').each(function () {
        //we are using each in case of multiple divs
        //when tried to select one all with same class gets selected        

        $(this).click(function () {
            var option_text = $(this).children('.material-menu__option-text').text();
            var svg_ico_class = $(this).find('use').attr('xlink:href');
            var color_class = $(this).children('svg').attr('class').split(' ');
            // console.log(color_class[1]);
            // console.log(option_text);
            // console.log(svg_ico_class);
            //[1] because after splitting the required class will be at the last is on index 1(second)
            new_color_class = color_class[color_class.length - 1]; //to select the last class (i1,i2,i3...)

            // console.log(new_color_class + " " + old_color_class);

            $('.search-parameter').children('.search-parameter__choice-value').text(option_text);
            $('.search-parameter').find('.search-parameter__choice-icon').children('use').attr('xlink:href', svg_ico_class);
            $('.search-parameter').children('.search-parameter__choice-icon').removeClass(old_color_class);
            $('.search-parameter').children('.search-parameter__choice-icon').addClass(new_color_class);

            old_color_class = new_color_class;
            // console.log(new_color_class + ' ' + old_color_class);
            //when we have clicked just close the menu
            $('.material-menu').removeClass("active");
        })
    });


    $(".search-parameter").click(function (e) {
        e.stopPropagation();
        $('.material-menu').toggleClass("active");
    });

    $('.material-menu').click(function (e) {
        e.stopPropagation();
    });

    //============================================================================
    // removes nav when clicked outside body
    $('body').on('click', function (event) {
        if (clicked_outside('.search-nav') && clicked_outside('.aa') && $('.search-nav').hasClass('active')) {
            // console.log('lmoa')
            // ... clicked on the 'body', but not inside of search-nav and green-btn (.aa)
            close_search_nav()
        }
    });
    
    // alternate code
    // $('body').click(function(){
    //     if($('.search-nav').hasClass('active')) console.log('lmoa')
    // })
    // $('.search-nav').click(function(e){
    //     e.stopPropagation();
    // })

})