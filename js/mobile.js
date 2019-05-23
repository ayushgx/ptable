$('.ptable-wrapper__ptable').attr("data-simplebar", '');

$(document).ready(function () {

    var groups = document.querySelector(".ptable-groups");
    var periods = document.querySelector(".ptable-periods");

    var period_group_size = $('.ptable-groups-wrapper').height();

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
        periods.style.top = (ptableOffsetTop - period_group_size) + "px";
    })

    $('.aaa').click(function () {
        alert('yoyoyoyoyoyoyoyo');
    })
})