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
            ptable_element.each(function(index, obj) {
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