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

$(document).ready(function(){
  var ptable_grid = "";
  for(var i=1;i<=11;i++){
    ptable_grid+='<div class="ptable-row">';
    for(var j=1;j<=18;j++){
      ptable_grid+='<div class="ptable-element"></div>';
    }
    ptable_grid+='</div>';
  }
  $('.ptable').append(ptable_grid);
})