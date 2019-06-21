// this file contains all the global functions that might be helpful for the ptable itself

/* function to attach and remove overlay from a particular element
   ===============================================================
    * adds an '#overlay' element as the parent of the passed element
    * duration is the transition time of the overly
    * background is the background color of the overlay with default passed
    * passed element must have z-index specified to fully prevent any abnormal behaviours
    * but works fine without specifing z-index till now... 
*/

function attach_overlay(element, duration, background = 'rgba(0, 0, 0, 0.600)') {
    element_z_index = $(element).css("z-index");
    $(element).wrap("<div id='overlay'></div>");

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
    $('#overlay').fadeIn(duration);
}
/* removes the overlay
   ===================
    * with animation duration and element input
*/
function remove_overlay(element, duration) {
    $('#overlay').fadeOut(2*duration);
    setTimeout(function () {
        $(element).unwrap('#overlay')
    }, duration);
    // $('.ptable-and-top-bar-wrapper').css('overflow', 'auto')
}

//==================================================================================================================
//function that return bool whether we clicked outside a particular element or not
// * used for closing the nav when clicked outside
function clicked_outside(element){
    return (!$(event.target).closest(element).length)
}