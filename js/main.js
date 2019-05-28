function is_touch_device() {
  return (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}
if (!is_touch_device()) {
  document.write('<script type="text/javascript" src="js/desktop.js"><\/script>');
  console.log("you are not using a touch device...");
} else {
  document.write('<script type="text/javascript" src="js/mobile.js"><\/script>');

  console.log("you are using a touch device...");

}

//enable/disable arguement as bulk task
function all_elements_task(task) {
  var all_elements = $('.ptable-element')
  all_elements.each(function (index, obj) {
    if (task == 'enable') {
      if ($(obj).hasClass('disabled')) {
        $(obj).removeClass('disabled')
      }
    } else if (task == 'disable') {
      if (!$(obj).hasClass('disabled')) {
        $(obj).addClass('disabled')
      }
    }

  })
}

$(document).ready(function () {

  $('.top-bar,.period,.group').ripple();






























  // //disables all the elements except specified as in the arguement
  // function disable_elements_except(...categories) {

  //   ptable_element = $('.ptable-element')
  //   special_element = $('.ptable-element.special-container')

  //   if (categories.length != 0) {
  //     ptable_element.toggleClass('disabled')
  //     for (var i = 0; i < categories.length; i++) {
  //       console.log(categories[i]);
  //       ptable_element.each(function (index, obj) {
  //         if ($(obj).hasClass(theme_category_variables[categories[i]]) && $(obj).hasClass('disabled'))
  //           $(obj).toggleClass('disabled')
  //       })
  //     }
  //   } else {
  //     all_elements_task('disable')
  //   }
  // }



  //theme
  // separate toggle functions
  // if clicked any other div break toggle
  // thats why we need toggle

  //two functions calling each other (toggling)
  var x;

  function disable_elements_except(click_class_name, ...categories) {
    click_class_name = '.' + click_class_name;

    ptable_element = $('.ptable-element')
    special_element = $('.ptable-element.special-container')

    $('.top-bar').clickToggle(
      function () {
        console.log('a')
      },
      function () {
        console.log('b')
      }
    )
  }


















  // var val_old;

  // function fun(val) {

  //   console.log(val);

  //   var element = $(val).find('.ptable-element');
  //   var all_elements = $('.ptable-element')

  //   if(val === val_old) {
  //     all_elements.removeClass('disabled')
  //     return
  //   }


  //   //to disable previously enabled element
  //   $(val_old).find('.ptable-element').addClass('disabled')



  //   if (!element.hasClass('disabled')) {
  //     all_elements.toggleClass('disabled')
  //     element.toggleClass('disabled');
  //   } else {
  //     element.toggleClass('disabled');
  //   }
  //   // element.click(function(){  })

  //   // $('.inner-scroll-wrapper').click(function () {
  //   //   $('.ptable-element').toggleClass('disabled')
  //   // })


  //   //refreshing the value of previous element
  //   val_old = val
  // }

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






  // $('.group').click(function(){
  //   var val = '.col-'+$(this).text();
  //   console.log(val);
  //   // console.log($('.ptable-element-wrapper').find('.col-1').addClass('disabled'))
  //   $('ptable-element-wrapper').each(function(index,obj){
  //     if($(obj).hasClass('col-1')){
  //       console.log($(obj).find('.ptable-element'))
  //     }
  //   })
  // })
  $('.top-bar').click(function () {
    var x = $(this).attr('class').split(' ')[0]
    disable_elements_except(x, 'alkali_metals', 'transition_metals', 'other_non_metals')
  });

})