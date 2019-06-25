$(document).ready(function () {
    setTimeout(function () {
        $('.periodic-table-loader').fadeOut(200);
    },3500)
    //==================================
    //  adding overlay-scroll libray
    //==================================
    $('.snv-search-results__list').overlayScrollbars({});
    $('.snv-cols-wrapper').overlayScrollbars({
        className: "os-theme-light"
    });
    //one instance is present in the desktop.js file
})