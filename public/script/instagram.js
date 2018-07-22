$(document).ready(function () {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 30, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        opacity: 0.25, // Opacity of the lines
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '42%', // Left position relative to parent
        shadow: 'none', // Box-shadow for the lines
        position: 'absolute', // Element positioning
    };

    var target = document.getElementById('scroller');
    var spinner = new Spinner(opts).spin(target);
    spinner.el.id = "spinner";
    target.appendChild(spinner.el);
    var userFeed = new Instafeed({
        get: 'user',
        userId: '3070168689',
        accessToken: '3070168689.e5b50d6.cc77dedac6004ad09101714989ebe6bb',
        template: '<li><a href="{{link}}"><img class="instaPic" src="{{image}}" /></a></li>',
        after: function () {
            setTimeout(function () {
                init();
            }, 100);
        }
    });
    userFeed.run();
});


var init = function () {
    document.getElementById("spinner").remove();
    document.getElementById("innerScroll").style.display ="block";
    var scroller = $('#scroller div.innerScrollArea');
    var scrollerContent = scroller.children('ul');
    scrollerContent.children().clone().appendTo(scrollerContent);
    var curX = 0;
    scrollerContent.children().each(function () {
        var $this = $(this);
        $this.css('left', curX);
        curX += $this.outerWidth(true);
    });
    var fullW = curX / 2;
    var viewportW = scroller.width();

    // Scrolling speed management
    var controller = { curSpeed: 0, fullSpeed: 1 };
    var $controller = $(controller);
    var tweenToNewSpeed = function (newSpeed, duration) {
        if (duration === undefined)
            duration = 600;
        $controller.stop(true).animate({ curSpeed: newSpeed }, duration);
    };

    // Pause on hover
    scroller.hover(function () {
        tweenToNewSpeed(0);
    }, function () {
        tweenToNewSpeed(controller.fullSpeed);
    });

    // Scrolling management; start the automatical scrolling
    var doScroll = function () {
        var curX = scroller.scrollLeft();
        var newX = curX + controller.curSpeed;
        if (curX == 180) {
            $('#instafeed li').first().clone().appendTo(scrollerContent);
            $('#instafeed li').first().remove();
            $('#instafeed').children().each(function (index, value) {
                var $this = $(this);
                $this.css('left', 180 * index);
                curX += $this.outerWidth(true);
            });
            newX = 0;
        }
        scroller.scrollLeft(newX);
    };
    setInterval(doScroll, 20);
    tweenToNewSpeed(controller.fullSpeed);
}