const SEARCH_NAV_TRANS_DUR = parseFloat($('.search-nav').css('transition-duration')) * 1000;

//====================================================================
//function to open and close search-nav
function open_search_nav() {
    attach_overlay_and_blur('.search-nav', SEARCH_NAV_TRANS_DUR, '.ptable-and-top-bar-wrapper', 4.6 ) //found in (js/global-functions)
    $('.search-nav').addClass('active');
}

function close_search_nav() {
    $('.search-nav').removeClass('active');
    // parameter 2:  element we need to remove blur form
    remove_overlay_and_blur(SEARCH_NAV_TRANS_DUR, '.ptable-and-top-bar-wrapper')
}
//====================================================================
