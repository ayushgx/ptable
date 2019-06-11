function is_touch_device() {
  return (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}
if (!is_touch_device()) {
$(document).ready(function () {
  var viewport = document.querySelector(".ptable-wrapper__ptable");
  var content = document.querySelector(".inner-scroll-wrapper");

  var groups = document.querySelector(".ptable-groups");
  var periods = document.querySelector(".ptable-periods");

  var period_group_size = $('.ptable-groups-wrapper').height();
  var top_bar_height = $('.top-bar').height();

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
    emulateScroll: true,

    onUpdate: function (data) {

      content.scrollLeft = data.position.x;
      content.scrollTop = data.position.y;

      content.style.transform = `translate(${-data.position.x}px,  ${-data.position.y}px)`;

      let ptable_grid = $('.ptable');
      offset = ptable_grid.offset()
      ptableOffsetTop = offset.top - $(document).scrollTop();
      ptableOffsetLeft = offset.left - $(document).scrollLeft();

      groups.style.left = (ptableOffsetLeft - period_group_size) + "px";
      periods.style.top = (ptableOffsetTop - period_group_size - top_bar_height) + "px";

    },
  });

  //adding overlay-scroll libray
  $('.ptable-wrapper__ptable').overlayScrollbars({
    className: "os-theme-dark",
    resize: "none",
    sizeAutoCapable: true,
    clipAlways: true,
    normalizeRTL: true,
    paddingAbsolute: false,
    autoUpdate: null,
    autoUpdateInterval: 33,
    nativeScrollbarsOverlaid: {
      showNativeScrollbars: false,
      initialize: true
    },
    overflowBehavior: {
      x: "scroll",
      y: "scroll"
    },
    scrollbars: {
      visibility: "auto",
      autoHide: "never",
      autoHideDelay: 800,
      dragScrolling: true,
      clickScrolling: false,
      touchSupport: true,
      snapHandle: false
    },
    textarea: {
      dynWidth: false,
      dynHeight: false,
      inheritedAttrs: ["style", "class"]
    },
    callbacks: {
      onInitialized: null,
      onInitializationWithdrawn: null,
      onDestroyed: null,
      onScrollStart: null,
      onScroll: null,
      onScrollStop: null,
      onOverflowChanged: null,
      onOverflowAmountChanged: null,
      onDirectionChanged: null,
      onContentSizeChanged: null,
      onHostSizeChanged: null,
      onUpdated: null
    }
  });

  //prevent click while dragging ptable
  //idea is to find initial and final position of mouse during mousedown and mouseup events;
  //if there is no significance difference b/w positions then simply register the click.
  const drag_click_threshold = 5;
  $('.ptable-element').each(function (index, obj) {
    let ptable_element = $(obj);
    let x1, y1, x2, y2;
    ptable_element.mousedown(function (e) {
      x1 = e.pageX;
      y1 = e.pageY;
      // alert($(this).find('.ptable-element__element-name').text());
    })
    ptable_element.mouseup(function (e) {
      x2 = e.pageX;
      y2 = e.pageY;
      // console.log('diff', 'x', Math.abs(x1 - x2), 'y', Math.abs(y1 - y2))
      if (Math.abs(x1 - x2) <= drag_click_threshold && Math.abs(y1 - y2) <= drag_click_threshold && !ptable_element.hasClass('disabled')) {
        // alert($(this).find('.ptable-element__element-name').text());
      }
    })
  })
})}