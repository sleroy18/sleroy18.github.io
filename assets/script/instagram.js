$(document).ready(function () {
    var userFeed = new Instafeed({
        get: 'user',
        userId: '3070168689',
        accessToken: '3070168689.e5b50d6.cc77dedac6004ad09101714989ebe6bb',
        template: '<li><a href="{{link}}"><img class="instaPic" src="{{image}}" /></a></li>',
        success: function (res, status) {
            console.log(res);
        },
        after: function () {
            setTimeout(function () {
                init();
            }, 100); 
        }
    });
    userFeed.run();
});


var init = function () {
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

//var iFrequency = 5000; // expressed in miliseconds
//var myInterval = 0;

//// STARTS and Resets the loop if any
//function startLoop() {
//    if (myInterval > 0) clearInterval(myInterval);  // stop
//    myInterval = setInterval("doSomething()", iFrequency);  // run
//    console.log("hit 1");
//}

//function doSomething() {
//    console.log("hit 2");
//}