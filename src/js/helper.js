$(function () {
  
    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#navbar-main'),
            distance = navbar.offset().top,
        $window = $(window);

    $window.scroll(function() {
        if ($window.scrollTop() >= distance) {
            navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
            $("body").css("padding-top", "70px");
        } else {
            navbar.removeClass('navbar-fixed-top');
            $("body").css("padding-top", "0px");
        }
    });
    $('#carousel-example-generic').carousel();//    { interval: 500 });
    // Set active nav
    (function() {
        function getCurrentPage (pathname) {
            var path = pathname.split("/");
            return path[path.length - 1];
        }
        var currentPage = getCurrentPage(window.location.pathname);
        $(".nav.navbar-nav li a").each(function(idx, el) { 
            if (getCurrentPage(el.href) === currentPage) {
                $(el).addClass("active"); 
            }
        });
    })();

  (function() {
    var cx = '004576430191563835920:f9mttg0yyja';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();

});