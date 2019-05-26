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
  for(i=1;i<=18;i++) $('.ptable-groups').append('<div class="group">'+i+'</div>');
  for(i=1;i<=8;i++) $('.ptable-periods').append('<div class="period">'+i+'</div>');  

})