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
  var i,j;
  // injecting periods/groups numbers
  for(i=1;i<18;i++) $('.ptable-groups').append('<div class="group">'+i+'</div>');
  for(i=1;i<8;i++) $('.ptable-periods').append('<div class="period">'+i+'</div>');

  //injecting ptable
  var element_name = 'Antimony';
  var element_num = 51;
  var element_symbol = 'Sb';
  var radioactive = true;

  var ptable_grid = "";

  for (var i = 1; i <= 11; i++) {
    ptable_grid += '<div class="ptable-row">';
    for (var j = 1; j <= 18; j++) {
      ptable_grid += '<div class="ptable-element-wrapper">';
      //each element
      ptable_grid += '<div class="ptable-element"><div class="ptable-element__top-wrapper">';
      ptable_grid += '<div class="ptable-element__atomic-num">' + element_num + '</div>';
      ptable_grid += '<div class="ptable-element__radioactive"></div></div>';
      ptable_grid += '<div class="ptable-element__element-symbol">' + element_symbol + '</div>';
      ptable_grid += '<div class="ptable-element__element-name">' + element_name + '</div></div>';

      ptable_grid += '</div>';
    }
    ptable_grid += '</div>';
  }
  $('.ptable').append(ptable_grid);
  if (radioactive) $('.ptable-element__radioactive').addClass('show');

  // $('.ptable-row').each(function () {
  //   $('.ptable-element-wrapper').each(function () {
  //     $(this).click(function(){
  //       console.log($(this).find('>.ptable-element__element-name'));
  //     })
  //   })
  // })

  

})