function is_touch_device() {
  return (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}
if (!is_touch_device()) {
  document.write('<script type="text/javascript" src="js/desktop.js"><\/script>');
  console.log("you are not using a touch device...");
} else {
  document.write('<script type="text/javascript" src = "js/mobile.js" > < \/script>');
  console.log("you are using a touch device...");
}

$(document).ready(function () {

  $('.top-bar,.period,.group').ripple();

  //disables all the elements except specified as in the arguement
  function disable_elements_except(...categories) {

    ptable_element = $('.ptable-element')
    special_element = $('.ptable-element.special-container')

    if (categories.length != 0) {
      ptable_element.toggleClass('disabled')
      for (var i = 0; i < categories.length; i++) {
        console.log(categories[i]);
        ptable_element.each(function (index, obj) {
          if ($(obj).hasClass(theme_category_variables[categories[i]]) && $(obj).hasClass('disabled'))
            $(obj).toggleClass('disabled')
        })
      }
    } else {
      all_elements_task('disable')
    }
  }

  // function all_elements_task(task) {
  //   var all_elements = $('.ptable-element')
  //   all_elements.each(function (index, obj) {
  //     if (task == 'enable') {
  //       if ($(obj).hasClass('disabled')) {
  //         $(obj).removeClass('disabled')
  //       }
  //     } else if (task == 'disable') {
  //       if (!$(obj).hasClass('disabled')) {
  //         $(obj).addClass('disabled')
  //       }
  //     }

  //   })
  // }

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

  $('.group,.period').mouseenter(function () {

    //if hovered element has class period or group then...
    var class_name = ($(this).attr('class').split(' ')[0] == 'group') ? '.mc-' + $(this).text() : '.mr-' + $(this).text()
    // console.log($(this));
    $(this).addClass('active');
    period_group_highlighter(class_name);

  }).mouseleave(function () {
    $(this).removeClass('active');
    all_elements_task('enable');
  })

  $('.top-bar').click(function () {
    disable_elements_except('lanthanides','halogens')
  });

  $('.ptable-element').mouseenter(function(){

    // 1. get all classes and split
    // 2. class at indes 1 (mr-), 2 (mc-) is required
    // 3. split class name at '-' and get the number required to target the period and group
    // 4. add the required 'period-' and 'group-' prefixes
    var period_class = '.period-' +  $(this).parent('.ptable-element-wrapper').attr('class').split(' ')[1].split('-')[1];
    var group_class = '.group-' + $(this).parent('.ptable-element-wrapper').attr('class').split(' ')[2].split('-')[1];
    // console.log(period_class,group_class);
    $(period_class).addClass('active');
    $(group_class).addClass('active');
  }).mouseleave(function(){
    $('.period').removeClass('active');
    $('.group').removeClass('active');
  })

})