// Init JS File is used to create variable with non DOM on HTML
// Just Window and Document
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
        backgroundColor: 0xffffff

    });


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
var stop = true;
TweenMax.ticker.fps(60);
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
        families: ['kg_summer_sunshineregular','always_foreverbold','dk_pimpernelregular'],
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
