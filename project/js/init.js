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

NVE = {
    Normal: {
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: 0,
                y: 0
            },
            upLeft: {
                x: 0,
                y: 0
            },
            up: {
                x: 0,
                y: 0
            },
            upRight: {
                x: 0,
                y: 0
            },
            downLeft: {
                x: 0,
                y: 0
            },
            down: {
                x: 0,
                y: 0
            },
            downRight: {
                x: 0,
                y: 0
            },
            left: {
                x: 0,
                y: 0
            },
            right: {
                x: 0,
                y: 0
            }
        }
    },
    GD: {
        Prefix: 'GD',
        HeadPos: {
            x:45,y:-35,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 20,
                y: -30
            },
            touched: {
                x: 10,
                y: 10
            },
            upLeft: {
                x: -20,
                y: 5
            },
            up: {
                x: 0,
                y: 0
            },
            upRight: {
                x: 0,
                y: 0
            },
            downLeft: {
                x: 30,
                y: -80
            },
            down: {
                x: 20,
                y: -80
            },
            downRight: {
                x: -30,
                y: -80
            },
            left: {
                x: 20,
                y: -20
            },
            right: {
                x: -20,
                y: 0
            }
        },
        type: 'Productive',
        kind: 'Owl',
        job: 'Graphic Designer',
        name: 'Adam Owlen',
        content: 'Adam Owlen chooses his working time in the night, because it is the time that he is most productive at. He feel that it is easier for him research, concentrating, and making something new. \n\nCompared with early birds, he requires less sleep during the whole day.',
        time: '2:00 AM',
        backgroundContent: 'The world outside is very quiet. Adam Owlen is working in front of his desktop in his private room.  \nHe is concentrating with his design project. He gets some coffee to keep him energetic.',
        particle : 'stuffs',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    GDS: {
        Prefix: 'GDS',
        HeadPos: {
            x:-110,y:80,rotation:-Math.PI/5
        },
        HeadPivot:{
            normal: {
                x: 100,
                y: -80
            },
            touched: {
                x: 20,
                y: -30
            },
            upLeft: {
                x: 0,
                y: 0
            },
            up: {
                x: 0,
                y: 0
            },
            upRight: {
                x: -40,
                y: -10
            },
            downLeft: {
                x: 80,
                y: -60
            },
            down: {
                x: 40,
                y: -30
            },
            downRight: {
                x: -30,
                y: -60
            },
            left: {
                x: 40,
                y: -30
            },
            right: {
                x: -30,
                y: 0
            }
        },
        type: 'Flexible',
        kind: 'Owl',
        job: 'Graphic Designer',
        name: 'Adam Owlen',
        content: 'Adam Owlen is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. \n\nIt is much more flexible than the officer worker s timetable.',
        time: '12:00 PM',
        backgroundContent: 'The alarm clock is alarming. It seem to be set the notification at 9AM so it might have alarmed for 3 hours. \nAdam Owlen had no response to the alarming sound.',
        particle : 'space',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    MD: {
        Prefix: 'MD',
        HeadPos: {
            x:-10,y:-60,rotation:0
        },
        HeadPivot:{
            normal: {
                x: -10,
                y: -5
            },
            touched: {
                x: -40,
                y: -10
            },
            upLeft: {
                x: -45,
                y: 0
            },
            up: {
                x: -25,
                y: 5
            },
            upRight: {
                x: -10,
                y: 0
            },
            downLeft: {
                x: -10,
                y: -10
            },
            down: {
                x: -30,
                y: -20
            },
            downRight: {
                x: -20,
                y: -20
            },
            left: {
                x: -20,
                y: -5
            },
            right: {
                x: -10,
                y: -10
            }
        },
        type: 'Health',
        kind: 'Bird',
        job: 'A Model',
        name: 'Lilo Erida',
        content: 'Early birds have a healthy and organized way of living. They are more likely to exercise, eat healthy, drink lots of water, as compared to night owls.  \n\nEarly birds typically picture a life of good health and energy.',
        time: '6:00 AM',
        backgroundContent: 'Doing some exercise is on her everyday schedule. \nBecause she needs to keep good body shape when in front of the camera and have a healthy body to deal with the full timetable.',
        particle : 'park',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    MDS: {
        Prefix: 'MDS',
        HeadPos: {
            x:-30,y:-70,rotation:0
        },
        HeadPivot:{
            normal: {
                x: -70,
                y: -40
            },
            touched: {
                x: -70,
                y: -40
            },
            upLeft: {
                x: -40,
                y: -40
            },
            up: {
                x: -40,
                y: -40
            },
            upRight: {
                x: -40,
                y: -40
            },
            downLeft: {
                x: -40,
                y: -40
            },
            down: {
                x: -40,
                y: -40
            },
            downRight: {
                x: -40,
                y: -40
            },
            left: {
                x: -40,
                y: -40
            },
            right: {
                x: -40,
                y: -40
            }
        },
        type: 'Proactive',
        kind: 'Bird',
        job: 'A Model',
        name: 'Lilo Erida',
        content: 'Recent studies show that morning people anticipate problems and try their best to minimize them, meaning they are proactive. \n\nEarly birds are practical and are more likely to set goals and accomplish them, and have a clearer mind than night owls.',
        time: '5:00 PM',
        backgroundContent: 'Lilo Erida is being taken photography in studio. It is her 3rd case of the day. \nShe is still with sweet and charming smile and changing many poses. The photographer is very satisfied with her performance.',
        particle : 'stuffs',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    TC: {
        Prefix: 'TC',
        HeadPos: {
            x:-20,y:-40,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: 0,
                y: 0
            },
            upLeft: {
                x: 0,
                y: 5
            },
            up: {
                x: 0,
                y: 5
            },
            upRight: {
                x: 0,
                y: 5
            },
            downLeft: {
                x: 20,
                y: 0
            },
            down: {
                x: 0,
                y: -20
            },
            downRight: {
                x: -20,
                y: -20
            },
            left: {
                x: 0,
                y: 0
            },
            right: {
                x: 0,
                y: 0
            }
        },
        type: 'Organize',
        kind: 'Bird',
        job: 'A Teacher',
        name: 'Gow Maren',
        content: 'Night owls may be more intelligent, but early birds have a much organized life. \n\nThis is because everything takes place during the day, from school to college, to university, to work. And this gives early birds an advantage over their late-rising counterparts.',
        time: '8:00 AM',
        backgroundContent: 'Gow Maren starts her routine life as usual. She is teaching in the first class of the day. \nShe feels quite annoyed and the class is so silent because of her attitude.',
        particle : 'school',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    TCS: {
        Prefix: 'TCS',
        HeadPos: {
            x:35,y:-70,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: -10,
                y: -10
            },
            upLeft: {
                x: 0,
                y: 5
            },
            up: {
                x: 0,
                y: 5
            },
            upRight: {
                x: 0,
                y: 5
            },
            downLeft: {
                x: 10,
                y: -25
            },
            down: {
                x: 0,
                y: -30
            },
            downRight: {
                x: 0,
                y: -25
            },
            left: {
                x: 0,
                y: -5
            },
            right: {
                x: 0,
                y: -5
            }
        },
        type: 'Satisfy',
        kind: 'Bird',
        job: 'A Teacher',
        name: 'Gow Maren',
        content: 'People who stay up late at night usually lack quality sleep, and suffer from ‘social jet lag’, which means they tend to socialize less, thus leading to depression. \n\nIn short, you cannot be a night owl in an early bird world and not expect to feel down, tired and depressed.',
        time: '9:00 PM',
        backgroundContent: 'Although she is very tired after the school time, she still needs to make food for her husband and daughter. \nHowever, sitting around the table and having meal with family members  makes her feel satisfied.',
        particle : 'cook',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    SC: {
        Prefix: 'SC',
        HeadPos: {
            x:0,y:-40,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: -40,
                y: -10
            },
            upLeft: {
                x: -30,
                y: -10
            },
            up: {
                x: -10,
                y: 0
            },
            upRight: {
                x: 0,
                y: 0
            },
            downLeft: {
                x: 30,
                y: -55
            },
            down: {
                x: -35,
                y: -85
            },
            downRight: {
                x: -65,
                y: -45
            },
            left: {
                x: -10,
                y: -20
            },
            right: {
                x: -30,
                y: -20
            }
        },
        type: 'Intelligent',
        job: 'A Scientist',
        kind: 'Owl',
        name: 'Leo Wilson',
        content: 'Leo Wilson is an intelligent scientist with very high IQ. He only focuses on his experiment and he doesn’t care about anything else. He often works from late afternoon to mid-night. \n\nSometimes, he even doesn’t care about sleeping for few days.',
        time: '11:00 PM',
        backgroundContent: 'In his lab, Leo Wilson is still conducting the experiment in order to get much specimen. \nHe needs more data to support his research. He really devotes a lot to proving the formulas on the blackboard.',
        particle : 'school',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    SCS: {
        Prefix: 'SCS',
        HeadPos: {
            x:10,y:-60,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: 20,
                y: -10
            },
            upLeft: {
                x: 0,
                y: 20
            },
            up: {
                x: 0,
                y: 10
            },
            upRight: {
                x: 40,
                y: 20
            },
            downLeft: {
                x: 70,
                y: -80
            },
            down: {
                x: 10,
                y: -90
            },
            downRight: {
                x: -70,
                y: -60
            },
            left: {
                x: 50,
                y: -20
            },
            right: {
                x: -20,
                y: -20
            }
        },
        type: 'Success',
        job: 'A Scientist',
        kind: 'Owl',
        name: 'Leo Wilson',
        content: 'Leo Wilson spent years and years on his study and research. Now Leo is a professor in a famous university. And Leo Wilson is also quite well-known in his researching area. \n\nHis accomplishments earns respect for him.',
        time: '10:00 AM',
        backgroundContent: 'Leo Wilson is now in the conference, waiting for his 3rd Medicine Nobel Prize. He seem to fall asleep during the talk show. \nThe whole night research made him almost exhausted and too hard to keep awake at that time.',
        particle : 'space',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    SM: {
        Prefix: 'SM',
        HeadPos: {
            x:15,y:-60,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: -10,
                y: -10
            },
            upLeft: {
                x: 10,
                y: 10
            },
            up: {
                x: 10,
                y: 5
            },
            upRight: {
                x: 0,
                y: 10
            },
            downLeft: {
                x: 70,
                y: -80
            },
            down: {
                x: -20,
                y: -50
            },
            downRight: {
                x: -40,
                y: -60
            },
            left: {
                x: 30,
                y: -10
            },
            right: {
                x: -20,
                y: -20
            }
        },
        type: 'Optimistic',
        job: 'A Saleman',
        kind: 'Bird',
        name: 'Alen Billy',
        content: 'Chronic sleep deprivation has some pretty real effects on the brain. \n\nIn addition, studies show that night owl university students have lower overall grades and are less optimistic and proactive than morning people.',
        time: '1:00 PM',
        backgroundContent: 'Alen Billy just took a train to go to work. Now he is talking with the customer with his smile. \nHe has kind of confidence that he is quite qualified for this work. It seems he could sale a lot of cars today. ',
        particle : 'social',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    SMS: {
        Prefix: 'SMS',
        HeadPos: {
            x:10,y:-40,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: -20,
                y: 20
            },
            upLeft: {
                x: 0,
                y: 20
            },
            up: {
                x: -10,
                y: 40
            },
            upRight: {
                x: -20,
                y: 30
            },
            downLeft: {
                x: 70,
                y: -80
            },
            down: {
                x: -10,
                y: -70
            },
            downRight: {
                x: -90,
                y: -60
            },
            left: {
                x: 50,
                y: -20
            },
            right: {
                x: -50,
                y: -10
            }
        },
        type: 'Social',
        job: 'A Saleman',
        kind: 'Bird',
        name: 'Alen Billy',
        content: 'Early birds tend to display more positive social traits, such as being proactive and optimistic, and are less prone to depression or addictions to nicotine, alcohol, and food. \n\nThese traits are actually seen in the brain, particularly in white matter.',
        time: '7:00 PM',
        backgroundContent: 'Alen Billy is having dinner with his friends in a good restaurant. The atmosphere is quite romantic. \nHe is talking about his future plan about career promotion, his car and the engagement.',
        particle : 'stuffs',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    ST: {
        Prefix: 'ST',
        HeadPos: {
            x:60,y:0,rotation:0
        },
        HeadPivot:{
            normal: {
                x: 0,
                y: 0
            },
            touched: {
                x: 0,
                y: 40
            },
            upLeft: {
                x: 0,
                y: 20
            },
            up: {
                x: 0,
                y: 20
            },
            upRight: {
                x: 0,
                y: 20
            },
            downLeft: {
                x: 0,
                y: 0
            },
            down: {
                x: 20,
                y: 0
            },
            downRight: {
                x: 0,
                y: 0
            },
            left: {
                x: 10,
                y: -10
            },
            right: {
                x: 0,
                y: 20
            }
        },
        type: 'Stamina',
        job: 'A Student',
        kind: 'Owl',
        name: 'Niva Melon',
        content: 'Your optimal hours might depend on your age. Older people are more likely to be early birds while younger people tend to enjoy late night bedtimes. \n\nScientists found that this could be due to circadian clocks of skin cells and circadian genes.',
        time: '4:00 AM',
        backgroundContent: 'As the assignment deadline is 10AM so Niva Melon is now still in library working with her laptop, researching and writing. \nThe table is a little messy, however, she is very enjoy and creactive. Maybe Niva Melon will study until the deadline.',
        particle : 'school',
        particleCount : 50,
        particleScreenProption: 0.2
    },
    STS: {
        Prefix: 'STS',
        HeadPos: {
            x:-60,y:0,rotation:0
        },
        HeadPivot:{
            normal: {
                x: -50,
                y: -50
            },
            touched: {
                x: -40,
                y: -40
            },
            upLeft: {
                x: -100,
                y: -250
            },
            up: {
                x: 40,
                y: -70
            },
            upRight: {
                x: 50,
                y: -220
            },
            downLeft: {
                x: -140,
                y: -120
            },
            down: {
                x: -20,
                y: -120
            },
            downRight: {
                x: -40,
                y: -80
            },
            left: {
                x: -50,
                y: -140
            },
            right: {
                x: 0,
                y: -80
            }
        },
        type: 'Young',
        job: 'A Student',
        kind: 'Owl',
        name: 'Niva Melon',
        content: 'Night owls can remain focused on tasks longer than people who wake up early in the morning. \n\nWhile early birds buckle under sleep pressure and leave their tasks for the morning, night owls stay alert long into the night and focus more on completing their tasks.',
        time: '3:00 PM',
        backgroundContent: 'Niva Melon has just waken up with a frown on face and is trying get out of bed. \nShe submitted her assignment in time and return home got some rest but she have to attend the class on 3pm.',
        particle : 'decor',
        particleCount : 200,
        particleScreenProption: 0.2
    }
}

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
        forceFXAA: true,
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

// The Proper way to use debounce is use it with the delayTime is
// the total time until the last animation delay is actived
// for exp: x animation in 2s from the beginning after that y start ani at 3s
// so debounce timeout should be 3 as 3s is the moment all the action inside
// are triggered, so the will be no conflick if the function in debounce be called again

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

// debounce can use like abc = fDebounce(function(){},time)
// or anyClass.abc = fDebounce ...
// then call abc(); or anyClass.abc();
// Another way is attach directly to event
// exp: window.addEvent...(click,debounce(function(){...},time));

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

// The use of debounce and throttle is very important and flexible
// For example: debounce is target for prevent function recall conflick

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

['scroll','mousewheel','DOMMouseScroll'].forEach(function(e){
    window.addEventListener(e,function(ev){
        ev.preventDefault();
    });
});

// Set Default Value for avoid undefined params in function
// ObjIn = setDefault(ObjIn,DefaultObj);
function setDefault(ObjIn,DefaultObj) {
    ObjIn = typeof ObjIn !== 'undefined' ? ObjIn : DefaultObj;
    for (var k in DefaultObj) {
        if (!ObjIn.hasOwnProperty(k)) {
            ObjIn[k] = DefaultObj[k];
        }
    }

    return ObjIn;
}

function resetTweenOf(o){
    if (typeof o == 'object') {
        TweenMax.killTweensOf(o);
    }
};