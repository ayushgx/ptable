if (is_touch_device()) {
    $(document).ready(function () {

        var groups = document.querySelector(".ptable-groups");
        var periods = document.querySelector(".ptable-periods");
        var top_bar_height = $('.top-bar').height();


        var period_group_size = $('.ptable-periods-wrapper').width();

        var ptable_grid = $('.ptable');
        offset = ptable_grid.offset()
        ptableOffsetTop = offset.top - $(document).scrollTop();
        ptableOffsetLeft = offset.left - $(document).scrollLeft();

        $('.ptable-wrapper__ptable').scroll(function () {
            var ptable_grid = $('.ptable');
            offset = ptable_grid.offset()
            ptableOffsetTop = offset.top - $(document).scrollTop();
            ptableOffsetLeft = offset.left - $(document).scrollLeft();

            groups.style.left = (ptableOffsetLeft - period_group_size) + "px";
            periods.style.top = (ptableOffsetTop - period_group_size - top_bar_height) + "px";
        })
        //in mobile we do not use scrollbooster therefore, we do not need special click function
        $('.ptable-element').each(function (index, obj) {
            $(this).click(function () {
                // if(!$(this).hasClass('disabled'))
                // alert($(this).find('.ptable-element__element-name').text());
            })
        })


    })
}