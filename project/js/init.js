// Init JS File is used to create variable with non DOM on HTML
// Just Window and Document

// Polyfill Animation Request
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

    browserDetection = new MobileDetect(window.navigator.userAgent);
    console.log(browserDetection);

    browserDetection.isHandheld = function() {
        if (browserDetection.mobile() || browserDetection.phone() || browserDetection.tablet()) {
            return true;
        } else {
            return false;
        }
    }

}());

TweenMax.lagSmoothing(1000,16);

var PixiV4 = true;

var CenterPoint = function() {

    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;

}

CenterPoint.prototype.update = function() {
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
}

// Global ROOT Object
var NVE = NVE || {}; // NVE == Night Owl vs. Early Bird

// Root Container
var stage = new PIXI.Container();
stage.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
stage.position.set(window.innerWidth / 2, window.innerHeight / 2);


var frameCount = 0;

var viewPort = document.getElementById('view-port');

viewPort.width = window.innerWidth;
viewPort.height = window.innerHeight;

var renderer = new PIXI.autoDetectRenderer(
    viewPort.width,
    viewPort.height,

    {
        view: viewPort,
        transparent: false,
        backgroundColor: 0xffffff,
        autoResize: false,
        resolution: 1,
        antialias: true

    });

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;

var CenterPosition = new CenterPoint();


//Normal Native Ticker at 60fps
// var stop = false;
// function RenderAnimation() {
//
//     requestAnimationFrame(RenderAnimation);
//     frameCount = frameCount > 1000000 ? 0 : frameCount+1;
//     //console.log(frameCount)
//     if (!stop) {
//         renderer.render(stage);
//     }
//     // console.log(1000/(performance.now() - xxx));
//     // xxx = performance.now();
// }

// Throttle back to 30 fps for animation stable
var fps = 60;
var stop = true;
TweenMax.ticker.fps(fps);
TweenMax.ticker.addEventListener('tick', function(){
    if (!stop) {
        RenderAnimation();
    }
});

function RenderAnimation() {
    frameCount = frameCount > 1000000 ? 0 : frameCount+1;
    //console.log(frameCount)
    renderer.render(stage);
    // console.log(1000/(performance.now() - xxx));
    // xxx = performance.now();
}


WebFont.load({
    custom:{
        families: ['kg_summer_sunshineregular','kg_first_time_in_foreverRg','always_foreverbold','dk_pimpernelregular'],
        urls: ['./assets/fonts/webfonts/stylesheet.css']

    },
    active: function(){
        console.log('All Fonts Loaded!');
        stop = false;
    },
    loading: function(){
        console.log('Loading Custom Fonts ...');
    }
});


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }.call(this);
};

function fDebounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
};

// Throttle use for  limit the function call
// Once the function call the next coming function is bypass by wait=true;
// So the next coming functions can only run when the previous
// function run after a certain time of timeout

// It s different from debounce that in debounce when the next function is triggered
// the previous one which is waiting in the timeout queue will be cancelled and the next function
// will add again to the timeout queue to wait for running

// in brief, throttle run func right away and prevent next func make them do nothing until time up
// while debounce wait amount of time to run func, every time new func jump in, debounce will cancel the old one
// and start wait for the new func again

function fThrottle(func, delay) {
    var wait = false;
    return function() {
        var context = this, args = arguments;
        if (!wait) {
            func.apply(context, args);
            wait = true;
            setTimeout(function(){
                wait = false;
            },delay)
        }
    }
}

// fDelay call delay value dynamically by the func's first param it applies
// exp: self.show = fDelay(function(delay){});

function fDelay(func, immediate) {
    var timeout;
    immediate = typeof immediate !== 'undefined' ? immediate : false;
    return function() {
        var context = this, args = arguments;
        args[0] = typeof args[0] !== 'undefined' ? args[0] : 100;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, args[0]);
        if (callNow) func.apply(context, args);
    }
};



// EXP this.object.playFromTo(frame,this.object.totalFrames-1,1,0);

PIXI.extras.MovieClip.prototype.playFromTo = function (beginFrame,endFrame,speed,delay) {

    speed = typeof speed !== 'undefined' ? speed : 1;
    delay = typeof delay !== 'undefined' ? delay : 0;
    beginFrame = typeof beginFrame !== 'undefined' ? beginFrame : 0;
    endFrame = typeof endFrame !== 'undefined' ? endFrame : movieClip.totalFrames;

    var self = this;

    this.tween = {
        value: beginFrame
    }

    if (typeof this.tweenHandle !== 'undefined') {
        this.tweenHandle.pause();
    }

    this.tweenHandle = new TweenMax.fromTo(this.tween,Math.abs((endFrame-beginFrame)/(fps*speed)),
        {   value: beginFrame   },
        {   value: endFrame     ,
            ease: Linear.easeNone,
            immediateRender: false,
            onUpdate: function(){
                this.gotoAndStop(Math.ceil(this.tween.value));
            }.bind(this),
            delay: delay/1000
        });

}


function convertObj(Obj) {
    var result = [];
    for (var value in Obj) {
        if (Obj.hasOwnProperty(value)) {
            result.push(Obj[value]);
        }
    }
    return result;
}