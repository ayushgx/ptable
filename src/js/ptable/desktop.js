if (!is_touch_device()) {
  $(document).ready(function () {
    var viewport = document.querySelector(".ptable-wrapper__ptable");
    var content = document.querySelector(".inner-scroll-wrapper");

    var groups = $(".ptable-groups");
    var periods = $(".ptable-periods");

    var sb = new ScrollBooster({
      viewport: viewport,
      content: content,
      bounce: true,
      bounceForce: .1,
      textSelection: false,
      friction: 0.14,
      emulateScroll: true,

      onUpdate: function (data) {
        content.scrollLeft = data.position.x ;
        content.scrollTop = data.position.y ;

        // console.log(-data.position.x.toFixed(2) ,-data.position.y.toFixed(2) )

        content.style.transform = `translate(${-data.position.x}px,  ${-data.position.y}px)`;

        groups.css('transform', `translateX(${-data.position.x}px )`);
        periods.css('transform', `translateY(${-data.position.y}px )`);

      },
    });

    //adding overlay scrollbars
    $('.ptable-wrapper__ptable').overlayScrollbars({
      className: "os-theme-dark"
    });

    //prevent click while dragging ptable
    //idea is to find initial and final position of mouse during mousedown and mouseup events;
    //if there is no significance difference b/w positions then simply register the click.
    const DRAG_CLICK_THRESHOLD = 5;

    let ptable_element;
    $('.ptable-element').each(function(index, obj){
      ptable_element = $(obj);
      let x1, y1, x2, y2;
      ptable_element.mousedown(function(e) {
          x1 = e.pageX;
          y1 = e.pageY;
          // alert($(this).find('.ptable-element__element-name').text());
        })
        .mouseup(function(e) {
          e.preventDefault();
          x2 = e.pageX;
          y2 = e.pageY;
          // console.log('diff', 'x', Math.abs(x1 - x2), 'y', Math.abs(y1 - y2))
          if (Math.abs(x1 - x2) <= DRAG_CLICK_THRESHOLD && Math.abs(y1 - y2) <= DRAG_CLICK_THRESHOLD && !ptable_element.hasClass('disabled')) {
            console.log($(obj).find('.ptable-element__element-name').text());
          }
        })
    })

  })
}


//agupta73046