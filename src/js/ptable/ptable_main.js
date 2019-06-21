function is_touch_device() {
	return (('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0));
}
$(document).ready(function () {

	//dynamically adjust the ptable wrapper height wrt top-bar height
	// var top_bar_height = $('.top-bar').height()
	// $('.ptable-wrapper').css('height' , window.innerHeight - top_bar_height)


	// => disables all the elements except specified as in the arguement <=
	//   * example disable_elements_except('element_category_1', 'element_category_2',... )
	//   * where categories like: halogens, alkali_metals,... etc
	function disable_elements_except() {

		ptable_element = $('.ptable-element')
		special_element = $('.ptable-element.special-container')

		if (arguments.length != 0) {
			ptable_element.toggleClass('disabled')
			for (var i = 0; i < arguments.length; i++) {
				var key = arguments[i];
				ptable_element.each(function (index, obj) {
					//in here keyword arguments will have null value for this 'each' function... thats why we used key variable.
					if ($(obj).hasClass(cat_name_to_theme_id[key]) && $(obj).hasClass('disabled'))
						$(obj).toggleClass('disabled')
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

	//enables only the given class name as argument
	function period_group_highlighter(val) {
		var element = $(val).find('.ptable-element,:not(.special-container)');
		//enable all elements initially
		all_elements_task('disable');
		element.removeClass('disabled')
	}
	var count = 0;
	$('.group,.period').mouseenter(function () {

		//if hovered element has class period or group then...
		//                just to check if on what type of element, the mouse has entered group or period.
		var class_name = ($(this).attr('class').split(' ')[0] == 'group') ? '.mc-' + $(this).find('.group__info-1').text() : '.mr-' + $(this).text()
		// console.log($(this));
		$(this).addClass('active');
		period_group_highlighter(class_name);

	})
	// .click(function () {
	// 	count++;
	// })
	.mouseleave(function () {
		// if (count % 2 == 0) {
		$(this).removeClass('active');
		all_elements_task('enable');
		// }
	})

	$('.top-bar').click(function () {
		disable_elements_except('lanthanides', 'halogens')
	});


	$('.ptable-element').mouseenter(function () {

		// 1. get all classes and split
		// 2. class at index 1 (mr-), 2 (mc-) is required
		// 3. split class name at '-' and get the number required to target the period and group
		// 4. add the required 'period-' and 'group-' prefixes
		var period_class = '.period-' + $(this).parent('.ptable-element-wrapper').attr('class').split(' ')[1].split('-')[1];
		var group_class = '.group-' + $(this).parent('.ptable-element-wrapper').attr('class').split(' ')[2].split('-')[1];
		// console.log(group_class, period_class);
		$(period_class).addClass('active');
		$(group_class).addClass('active');
	}).mouseleave(function () {
		$('.period').removeClass('active');
		$('.group').removeClass('active');
	})

})