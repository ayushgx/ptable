//======================================================================================
//=========== GLOBAL FUNCTIONS

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


//======================================================================================
//=========== PTABLE FUNCTIONS

// => disables all the elements except specified as in the arguement <=
//   * example disable_elements_except('element_category_1', 'element_category_2',... )
//   * where categories like: halogens, alkali_metals,... etc
function disable_elements_except() {

    ptable_element = $('.ptable-element')
    special_element = $('.ptable-element.special-container')

    if (arguments.length != 0) {
        ptable_element.addClass('disabled')
        for (var i = 0; i < arguments.length; i++) {
            var key = arguments[i];
            ptable_element.each(function (index, obj) {
                //in here keyword arguments will have null value for this 'each' function... thats why we used key variable.
                if ($(obj).hasClass(cat_name_to_theme_id[key]) && $(obj).hasClass('disabled'))
                    $(obj).removeClass('disabled')
            })
        }
    } else {
        all_elements_task('disable')
    }
}
	//enable/disable arguement as bulk task
	function all_elements_task(task) {
		var obj = $('.ptable-element')
		if (task == 'enable') {
			$(obj).removeClass('disabled')
		} else if (task == 'disable') {
			$(obj).addClass('disabled')
		}
	}