//======================================================================================
//=========== GLOBAL FUNCTIONS

const IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

/* function to attach and remove overlay from a particular element
   ===============================================================
    * duration is the transition time of the overly
    * background is the background color of the overlay with default passed
    * passed element must have z-index specified to fully prevent any abnormal behaviours
    * but works fine without specifing z-index till now... 
*/

function attach_overlay(element, duration=400, background = 'rgba(0, 0, 0, 0.600)') {
    element_z_index = $(element).css("z-index");

    // $(element).wrap("<div id='overlay'></div>");
    //    document.write("");

    $('#overlay').css({
        'z-index': element_z_index - 1,
        'display': 'none',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'background': background
    })
    //delay is for improving performance
    $('#overlay').delay(52).fadeIn(duration);

}

function attach_overlay_and_blur(element, duration, blur_element, blur_magnitude, background = 'rgba(0, 0, 0, 0.600)') {

    attach_overlay(element, duration, background)
    //due to issues with filter blur animation in firefox
    if (!IS_FIREFOX) setTimeout(function(){$(blur_element).css('filter', `blur(${blur_magnitude}px)`)}, 50)

}

/* removes the overlay
   ===================
    * with animation duration and element input
*/
function remove_overlay(duration) {
    $('#overlay').fadeOut(duration);
}

function remove_overlay_and_blur(duration, element) {
    remove_overlay(duration)
    $(element).css('filter', 'blur(0px)')
}
//==================================================================================================================
//function that return bool whether we clicked outside a particular element or not
// * used for closing the nav when clicked outside
// * this function should only be used in the click function of the body elements
function clicked_outside(element) {
    return (!$(event.target).closest(element).length)
}