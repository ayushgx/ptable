$(document).ready(function () {
  var viewport = document.querySelector(".ptable-wrapper__ptable");
  var content = document.querySelector(".inner-scroll-wrapper");

  var groups = document.querySelector(".ptable-groups");
  var periods = document.querySelector(".ptable-periods");

  var period_group_size = $('.ptable-groups-wrapper').height();

  $('.aaa').click(function () {
    alert('yoyoyoyoyoyoyoyo');
  })

  var ptable_grid = $('.ptable');
  offset = ptable_grid.offset()
  ptableOffsetTop = offset.top - $(document).scrollTop();
  ptableOffsetLeft = offset.left - $(document).scrollLeft();

  var sb = new ScrollBooster({
    viewport: viewport,
    content: content,
    bounce: true,
    bounceForce: .1,
    textSelection: false,
    friction: 0.14,
    emulateScroll: false,

    onUpdate: function (data) {

      content.scrollLeft = data.position.x;
      content.scrollTop = data.position.y;

      content.style.transform = `translate(${-data.position.x}px,  ${-data.position.y}px)`;

      var ptable_grid = $('.ptable');
      offset = ptable_grid.offset()
      ptableOffsetTop = offset.top - $(document).scrollTop();
      ptableOffsetLeft = offset.left - $(document).scrollLeft();

      groups.style.left = (ptableOffsetLeft - period_group_size) + "px";
      periods.style.top = (ptableOffsetTop - period_group_size) + "px";

    },
  });
})