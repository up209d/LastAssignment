function init() {

    console.log('Initing');

    // ---- BEGIN BUNNY ----

    var Bunny = function (DisplayContainer)
    {
        PIXI.Sprite.call(this,PIXI.Texture.fromImage('assets/images/bunny.png'));
        // console.log(this);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.alpha = 0.5;
        this.position.x = window.innerWidth / 2;
        this.position.y = window.innerHeight / 2;
        this.interactive = false;
        DisplayContainer.addChild(this);
    }

    Bunny.prototype = Object.create(PIXI.Sprite.prototype);
    Bunny.prototype.constructor = Bunny;

    Bunny.prototype.rotate = function () {
        this.rotation += 0.1;
        this.scale.x = this.scale.y = (Math.abs(Math.sin(Date.now() * 0.0005) * 1) + 0.5);
    }

    var bunnyPot = new PIXI.Container();
    bunnyPot.interactive = false;

    var bunny = new Bunny(bunnyPot);

    // color.mask = bunny.each;

    function bunnyFollow(eventData) {
        eventData.clientX = typeof eventData.clientX !== 'undefined' ? eventData.clientX : eventData.changedTouches[0].clientX;
        eventData.clientY = typeof eventData.clientY !== 'undefined' ? eventData.clientY : eventData.changedTouches[0].clientY;
        var bunnyTimeline = new TimelineMax();
        bunnyTimeline.smoothChildTiming = true;
        bunnyTimeline.to(bunny.position, 1.5, {
            x: eventData.clientX,
            y: eventData.clientY,
            immediateRender: false,
            ease: Back.easeOut
        });
        bunnyTimeline.play();
    };

    window.onmousemove = bunnyFollow;
    window.ontouchend = bunnyFollow;

    //bg.bg.on('mousemove',bunnyFollow);
    function animateBunny() {
        requestAnimationFrame(animateBunny);
        bunny.rotate();
        // TweenMax.to(trasitionColorMask.object,0.2,{width:colorA.width,height:colorA.height});
        // TweenMax.to(transitionSketchMask.object,0.2,{width:nocolor.width,height:nocolor.height});
    }


    // In order to click through interactive false Sprite
    // The mother container of them has to be set at
    // interactive false

    // stage.interactive = true;

    // ---- END BUNNY ----

    circleScene = {
        circleRadius: 1000,
        circlePI: 3.14,
        circlePosition: []
    }

    for (i = 0; i < 12; i++) {
        circleScene.circlePosition.push({
            x: Math.round(Math.cos(circleScene.circlePI * (i / 6)) * circleScene.circleRadius),
            y: Math.round(Math.sin(circleScene.circlePI * (i / 6)) * circleScene.circleRadius)
        });
    }

    scene = new PIXI.Container();

    scene.draggable = true;

    // ['mousedown'].forEach(function(e){
    //     scene.on(e,fThrottle(function(event){
    //         console.log(event.target);
    //         if (event.target) {
    //             Sounds['Click.mp3'].play();
    //         }
    //     },100));
    // });

    Bg = new Background(scene);
    Bg.bg.width += circleScene.circleRadius*2;
    Bg.bg.height +=  circleScene.circleRadius;

    scene_navigation = new PIXI.Container();
    scene_navigation.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    scene_navigation.position.set(window.innerWidth / 2, window.innerHeight / 2);

    // For very big and complex Scene with many things inside,
    // The lag for very first rendering is inevitable
    // in PIXI alpha=0 might has some kind of renderable = false
    // for performance efficence, but when you animate the alpha,
    // the lag will be significant, so set alpha to not 0 to force the renderer
    // render that silently so when we animate alpha it will be no longer lag
    scene_navigation.alpha = 0.000000001;

    scene_navigation_center = new PIXI.Container();
    scene_navigation_center.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    scene_navigation_center.position.set(window.innerWidth / 2, window.innerHeight / 2);

    scene_navigation_bound = new PIXI.Container();
    scene_navigation_bound.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    scene_navigation_bound.position.set(window.innerWidth / 2, window.innerHeight / 2);

    scene_navigation.addChild(scene_navigation_bound);
    scene_navigation.addChild(scene_navigation_center);
    scene.addChild(scene_navigation);

    stage.addChild(scene);
    stage.addChild(bunnyPot);
    stage.interactive = false;

    scene.interactive = true;
    scene.buttonMode = true;
    scene.defaultCursor = 'pointer';
    scene.isDragging = false;

    scene.boundArea = {
        top: (circleScene.circleRadius + window.innerHeight / 2),
        right: window.innerWidth / 2 - circleScene.circleRadius,
        bottom: window.innerHeight / 2 - circleScene.circleRadius,
        left: (circleScene.circleRadius + window.innerWidth / 2)
    };

    // Pivot value is not depend on any width and height of container
    // it s simple value that for container rotate around
    // when it set to x y value so the container position now start from that point
    // container itself doesnt have width and height, so it s always full window width height
    // pivot 0 0 will be the 0 0 position of window.
    // pivot half screen so the container will move back to half screen offset
    // that why we have to set position is half screen move forward to compensate.
    scene.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    scene.position.set(window.innerWidth / 2, window.innerHeight / 2);
    scene.scale.set(3);
    // Test Pivot Rotation Point
    //TweenMax.to(scene_navigation_center,100,{rotation:1000,repeat:0});
    //TweenMax.to(stage,100,{rotation:1000,repeat:0});

    scene.moving = function (e) {

        if (this.isDragging) {

            if (e.type == 'mousemove') {
                // this.newX = this.position.x + e.data.originalEvent.movementX * 10;
                // this.newY = this.position.y + e.data.originalEvent.movementY * 10;
                this.newX = this.position.x - (this.startX - e.data.getLocalPosition(this).x)/2;
                this.newY = this.position.y - (this.startY - e.data.getLocalPosition(this).y)/2;
            } else if (e.type == 'touchmove') {
                this.newX = this.position.x - (this.startX - e.data.getLocalPosition(this).x);
                this.newY = this.position.y - (this.startY - e.data.getLocalPosition(this).y);
            } else {
                this.newX = this.position.x;
                this.newY = this.position.y;
            }

            // console.log(this.newX+'---'+this.newY);

            if (typeof this.tweenHandle !== 'undefined') {
                this.tweenHandle.paused();
            }

            this.tweenHandle = TweenMax.to([this.position], 1, {
                x: this.newX,
                y: this.newY,
                immediateRender: false,
                ease: Sine.easeOut,
                onUpdate: debounce(function () {
                    if (!this.isDragging) {
                        if (this.newX < this.boundArea.right) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position, 2, {
                                x: this.boundArea.right,
                                ease: Back.easeOut,
                                immediateRender: false
                            });
                        }
                        if (this.newX > this.boundArea.left) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position, 2, {
                                x: this.boundArea.left,
                                ease: Back.easeOut,
                                immediateRender: false
                            });
                        }
                        if (this.newY > this.boundArea.top) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position, 2, {
                                y: this.boundArea.top,
                                ease: Back.easeOut,
                                immediateRender: false
                            });
                        }
                        if (this.newY < this.boundArea.bottom) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position, 2, {
                                y: this.boundArea.bottom,
                                ease: Back.easeOut,
                                immediateRender: false
                            });
                        }
                    }
                }.bind(this), 150)
            });

        } else {

            if (this.position.x < this.boundArea.right) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position, 2, {
                    x: this.boundArea.right,
                    ease: Back.easeOut,
                    immediateRender: false
                });
            }
            if (this.position.x > this.boundArea.left) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position, 2, {
                    x: this.boundArea.left,
                    ease: Back.easeOut,
                    immediateRender: false
                });
            }
            if (this.position.y > this.boundArea.top) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position, 2, {
                    y: this.boundArea.top,
                    ease: Back.easeOut,
                    immediateRender: false
                });
            }
            if (this.position.y < this.boundArea.bottom) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position, 2, {
                    y: this.boundArea.bottom,
                    ease: Back.easeOut,
                    immediateRender: false
                });
            }

        }

    }

    scene.on('mousemove', scene.moving);

    ['mousedown','touchstart'].forEach(function(ev){
        scene.on(ev, function (e) {
            if (scene.draggable) {
                scene.isDragging = true;
                scene.startX = e.data.getLocalPosition(scene).x;
                scene.startY = e.data.getLocalPosition(scene).y;
            }
        });
    });

    scene.on('touchmove', scene.moving);

    scene.on('mouseup', function (e) {
        scene.isDragging = false;
        scene.moving(e);
    });

    scene.on('touchend', function (e) {
        scene.isDragging = false;
    });

    PersonFull = fThrottle(function(ParentObject,Prefix) {

        Prefix = setDefault(Prefix,'GD');

        this.data = {
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
                type: 'Flexible',
                name: 'Adam Owlen',
                content: 'Adam Owlen is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '2:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                name: 'Adam Owlen',
                content: 'Adam Owlen, A graphic designer, his time is flexible as he is a freelancer designer. He choose to sleep in the morning and stay awake in the night. He feels more productive and easier to releaser his creativity out.\n\nSleeping in the morning is also his favorite, as almost all of his activities are in the night',
                time: '12:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                name: 'Lilo Erida',
                content: 'Lilo Erida is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '6:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Health',
                name: 'Lilo Erida',
                content: 'Lilo Erida is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '5:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Health',
                name: 'Gow Maren',
                content: 'Gow Maren is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '8:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Health',
                name: 'Gow Maren',
                content: 'Gow Maren is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '9:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                name: 'Leo Wilson',
                content: 'Leo Wilson is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '11:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Intelligent',
                name: 'Leo Wilson',
                content: 'Leo Wilson is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '11:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Social',
                name: 'Alen Billy',
                content: 'Alen Billy is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '10:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Organize',
                name: 'Alen Billy',
                content: 'Alen Billy is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '7:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Organize',
                name: 'Niva Melon',
                content: 'Niva Melon is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '4:00 AM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
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
                type: 'Organize',
                name: 'Niva Melon',
                content: 'Niva Melon is a typical night owl. He s working mainly as a freelancer graphic designers. So actually he can control his time to work as long as the product will be finished before deadline. ' +
                '\n\nHe choose his working time in the night, because it is the time that he is most productive at.',
                time: '2:00 PM',
                backgroundContent: 'Adam Owlen is working in front of his desktop in his private room.\nHe is concentrating with his design.',
                particle : 'decor',
                particleCount : 200,
                particleScreenProption: 0.2
            }
        }

        var option = setDefault(option,this.data[Prefix]);

        Sounds['Appear.mp3'].play();

        TweenMax.to(scene_navigation,1,{
            alpha:0,
            delay:0.5,
            onComplete: function(){
                scene_navigation.renderable=false;
                scene_navigation.visible=false;
                scene.removeChild(scene_navigation);
            }.bind(Person)
        });

        scene.draggable = false;

        ParentObject.Full = new Person(
            option.Prefix,
            stage,
            window.innerWidth/2,
            window.innerHeight/2-100,
            false,
            0.8,option.HeadPos.x,option.HeadPos.y,
            {
                onClickTap: fThrottle(function(){
                    // Do smt
                },1500),
                onHoverOut: fThrottle(function(){
                    this.Sketch.play();
                },1500),
                onCreate: function(){
                    GraphicDesignerHead = new PersonHead(this,option.HeadPivot,option.HeadPos.rotation);
                    GraphicDesignerDetail = new PersonDetail(
                        {
                            personObject: this,
                            type: option.type,
                            name: option.name,
                            content: option.content,
                            time: option.time,
                            backgroundContent: option.backgroundContent
                        }
                    );

                    TweenMax.from(this.position,1.5,{y:"-=2000",ease: Back.easeOut});

                    TweenMax.delayedCall(0.5,function(){
                        GraphicDesignerHead.show();
                    });

                    TweenMax.delayedCall(0.5,function(){
                        this.AnimationIn.play();
                        this.Sketch.play();
                        this.animationSpeed = 0.5;
                    }.bind(this));

                },
                onDestroy: function(){
                    scene.addChild(scene_navigation);
                    scene_navigation.renderable=true;
                    scene_navigation.visible=true;
                    TweenMax.to(scene_navigation,1,{
                        alpha:1,
                        delay:0.5
                    });
                    scene.draggable = true;
                    if (Particle) {
                        Particle.removeAll();
                    }
                }
            }
        );

        Particle = new FloatThing(
            stage,
            option.particle,
            option.particleCount,
            window.innerWidth*(1-option.particleScreenProption),
            window.innerHeight*(1-option.particleScreenProption)
        );

    },3000);

    // PersonFull(stage,'GDS');


    GraphicDesigner = new Person(
        'GD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[10].x,
        window.innerHeight / 2 + circleScene.circlePosition[10].y,
        true,
        0.55,
        50, -40,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'GD');
            },1500),
            onHoverIn: fThrottle(function(){
                if (!this.PersonText) {
                    this.PersonText = new Text(
                        this.Container,
                        'Adam Owlen',
                        'title',
                        120,
                        0,
                        400,
                        1,
                        0,
                        false
                    );
                }
                TweenMax.set(this.PersonText.Stage,{alpha:0});
                TweenMax.from(this.PersonText.Stage.position,0.5,{y:"-=200"});
                TweenMax.to(this.PersonText.Stage,0.5,{alpha:1});
            },200),
            onHoverOut: fThrottle(function(){
                if (this.PersonText) {
                    TweenMax.to(this.PersonText.Stage.position,0.5,{y:"-=200"});
                    TweenMax.to(this.PersonText.Stage,1,{alpha:0});
                }
            },200)
        }
    );

    GraphicDesignerSleep = new Person(
        'GDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[8].x,
        window.innerHeight / 2 + circleScene.circlePosition[8].y,
        true,
        0.55, -140,
        80,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'GDS');
            },1500)
        }
    );

    Model = new Person(
        'MD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[3].x,
        window.innerHeight / 2 + circleScene.circlePosition[3].y,
        true,
        0.55, -10, -55,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'MD');
            },1500)
        }
    );

    ModelWork = new Person(
        'MDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[7].x,
        window.innerHeight / 2 + circleScene.circlePosition[7].y,
        true,
        0.55, -10, -40,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'MDS');
            },1500)
        }
    );

    Science = new Person(
        'SC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[11].x,
        window.innerHeight / 2 + circleScene.circlePosition[11].y,
        true,
        0.55,
        0, -30,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'SC');
            },1500)
        }
    );

    ScienceSleep = new Person(
        'SCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[5].x,
        window.innerHeight / 2 + circleScene.circlePosition[5].y,
        true,
        0.55, -5, -60,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'SCS');
            },1500)
        }
    );

    Sale = new Person(
        'SM',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[4].x,
        window.innerHeight / 2 + circleScene.circlePosition[4].y,
        true,
        0.55, 14, -60,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'SM');
            },1500)
        }
    );

    SaleDinner = new Person(
        'SMS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[0].x,
        window.innerHeight / 2 + circleScene.circlePosition[0].y,
        true,
        0.55,
        20, -55,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'SMS');
            },1500)
        }
    );

    Student = new Person(
        'ST',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[2].x,
        window.innerHeight / 2 + circleScene.circlePosition[2].y,
        true,
        0.55, 55, -35,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'ST');
            },1500)
        }
    );

    StudentWake = new Person(
        'STS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[1].x,
        window.innerHeight / 2 + circleScene.circlePosition[1].y,
        true,
        0.55, -60, 25,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'STS');
            },1500)
        }
    );

    Teacher = new Person(
        'TC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[6].x,
        window.innerHeight / 2 + circleScene.circlePosition[6].y,
        true,
        0.55, 10, -45,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'TC');
            },1500)
        }
    );

    TeacherCook = new Person(
        'TCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[9].x,
        window.innerHeight / 2 + circleScene.circlePosition[9].y,
        true,
        0.55, 30, -65,
        {
            onClickTap: fThrottle(function(){
                PersonFull(this,'TCS');
            },1500)
        }
    );


    vs = new Text(
        scene_navigation_center,
        'vs.',
        '3d',
        66,
        window.innerWidth / 2,
        window.innerHeight / 2,
        0.75
    );

    OwlText = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'OwlText.png'].texture,
        resourceTexture[assetsPath + 'OwlText-Color.png'].texture,
        window.innerWidth / 2 - 400,
        window.innerHeight / 2 + 20,
        0.75,
        true,
        0
    );


    Owl = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Owl.png'].texture,
        resourceTexture[assetsPath + 'Owl-Color.png'].texture,
        window.innerWidth / 2 - 500,
        window.innerHeight / 2 -120,
        0.75,
        true,
        0
    );


    BirdText = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'BirdText.png'].texture,
        resourceTexture[assetsPath + 'BirdText-Color.png'].texture,
        window.innerWidth / 2 + 400,
        window.innerHeight / 2 + 20,
        0.75,
        true,
        0
    );


    Bird = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Bird.png'].texture,
        resourceTexture[assetsPath + 'Bird-Color.png'].texture,
        window.innerWidth / 2 + 500,
        window.innerHeight / 2 - 100,
        0.75,
        true,
        0
    );

    Success = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Success.png'].texture,
        resourceTexture[assetsPath + 'Success-Color.png'].texture,
        window.innerWidth / 2 -150,
        window.innerHeight / 2 - 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'SCS',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'SCS');
            },1500)
        }
    );

    Flexible = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Flexible.png'].texture,
        resourceTexture[assetsPath + 'Flexible-Color.png'].texture,
        window.innerWidth / 2,
        window.innerHeight / 2 - 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'GD',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'GD');
            },1500)
        }
    );

    Intelligent = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Intelligent.png'].texture,
        resourceTexture[assetsPath + 'Intelligent-Color.png'].texture,
        window.innerWidth / 2 + 150,
        window.innerHeight / 2 - 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'SC',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'SC');
            },1500)
        }
    );

    Health = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Health.png'].texture,
        resourceTexture[assetsPath + 'Health-Color.png'].texture,
        window.innerWidth / 2 +150,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'MD',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'MD');
            },1500)
        }
    );

    Organize = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Organize.png'].texture,
        resourceTexture[assetsPath + 'Organize-Color.png'].texture,
        window.innerWidth / 2,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'SMS',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'SMS');
            },1500)
        }
    );


    Social = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Social.png'].texture,
        resourceTexture[assetsPath + 'Social-Color.png'].texture,
        window.innerWidth / 2 - 150,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'SM',
                    this.Stage,
                    0,
                    0,
                    true,
                    0.75, -140,
                    80,
                    {
                        onCreate: function(){
                            this.AnimationIn.play();
                        }
                    }
                );
                TweenMax.to(this.Container,1,{alpha:0});
            },500),
            onHoverOut: fThrottle(function(){
                TweenMax.to(this.Container,0.5,{alpha:1});
                if(this.Person) {
                    this.Person.renderable = false;
                    this.Person.visible = false;
                    this.Stage.removeChild(this.Person);
                }
            },100),
            onClickTap: fThrottle(function(){
                PersonFull(this,'SM');
            },1500)
        }
    );


    intro_p = 'Are you the kind of person who gets up early for a fresh ' +
        'start of the day'

    // intro_p = " ";

    intro_p2 = 'or do you stay up late at night to ' +
        'finish your work?'

    intro = new Text(
        scene,
        intro_p,
        'normal',
        80,
        window.innerWidth/2,
        window.innerHeight/2,
        0.15
    );

    intro.Content.style.wordWrap = true;
    intro.Content.style.align = 'center';
    intro.Content.style.lineHeight = 100;
    // intro.Content.style.padding = 40;
    // intro.Content.scale.y = ((intro.Content.style.padding/2) + intro.size)/intro.size;
    // intro.Content.position.y += (intro.Content.style.padding/2) + intro.size;
    intro.Content.style.wordWrapWidth = 0.7*(window.innerWidth*intro.Content.scale.y);

    intro.Stage.interactive = true;

    intro.Stage.click = intro.Stage.tap = function(e) {
        TweenMax.to(e.target,1,{alpha:0,onComplete: function(){
            this.parent.removeChild(this);
        }.bind(this)});
        TweenMax.fromTo(scene_navigation,3,{alpha:0},{alpha:1});
        TweenMax.fromTo(scene.scale, 5, {
            x: 3,
            y: 3
        }, {
            x: 1,
            y: 1,
            ease: Back.easeOut
        });
    }

    intro.mask = new transitionColor(intro.Container,intro.Content,'water',true);
    intro.mask.object.animationSpeed = 0.5;

    intro.mask.interactive = false;
    intro.mask.object.interactive = false;

    TweenMax.fromTo(intro.Stage,2,{alpha:0},{alpha:1});
    TweenMax.from(intro.Stage.scale,5,{x:0.1,y:0.1,ease: Elastic.easeOut});


    if (browserDetection.is("WebKit")) {
        testCont =  new PIXI.Container();

        DisSprite =  new PIXI.Sprite(resourceTexture['assets/Test/ripple.png'].texture);


        Skt = new PIXI.Sprite(resourceTexture[assetsPath+'GDS-Color-After.png'].texture);

        DisplacmentFilter = new PIXI.filters.DisplacementFilter(DisSprite);
        DisplacmentFilter.scale.set(0);

        Skt.filters = [DisplacmentFilter];
        stage.filters = [DisplacmentFilter];

        Skt.anchor.set(0.5);
        Skt.position.set(window.innerWidth/2,window.innerHeight/2);

        DisSprite.anchor.set(0.5);
        DisSprite.position.set(window.innerWidth/2,window.innerHeight/2);
        DisSprite.scale.set(1);
        //DisplacmentFilter.scale.set(10);
        // TweenMax.fromTo(DisplacmentFilter.scale,1,{x:0,y:0},{x:50,y:50,ease: Sine.easeInOut,repeat:-1,yoyo:true});
        // TweenMax.fromTo(DisSprite.scale,2,{x:0,y:0},{x:3,y:3,repeat:-1,ease: Sine.easeOut});
        //TweenMax.to(Skt.position,1,{x:window.innerWidth/2-200,y:window.innerHeight/2-200,reapeat:-1})

        ['click','touchend'].forEach(function(each){
            window.addEventListener(each,function(e){
                //console.log(e);
                // Sounds['Water.mp3'].play();
                var posX = typeof e.clientX !== 'undefined' ? e.clientX : typeof e.changedTouches[0].clientX !== 'undefined' ? e.changedTouches[0].clientX : 0;
                var posY = typeof e.clientY !== 'undefined' ? e.clientY : typeof e.changedTouches[0].clientY !== 'undefined' ? e.changedTouches[0].clientY : 0;
                DisSprite.position.set(posX,posY);
                TweenMax.fromTo(DisplacmentFilter.scale,0.5,{x:0,y:0},{x:30,y:30,ease: Sine.easeIn,repeat:1,yoyo:true});
                TweenMax.fromTo(DisSprite.scale,1,{x:0.1,y:0.1},{x:1.0,y:1.0,repeat:0,ease: Sine.easeOut});
            });
        });

        DisplacmentFilter.padding = 200;
        //Quick Hack fix bug for v4
        DisplacmentFilter.glShaderKey = 6789;

        // console.log(DisplacmentFilter);


        function DisSpriteRotation() {

            requestAnimationFrame(DisSpriteRotation);
            //DisSprite.rotation += 0.05;

        }

        DisSpriteRotation();

        testCont.addChild(DisSprite);
        //testCont.addChild(Skt);
        stage.addChild(testCont);
    }

    
    // testSprite = new PIXI.Sprite(resourceTexture['assets/Test/ripple.png'].texture);
    // testSprite.anchor.set(0);
    // testSprite.position.set(0);
    //
    // stage.addChild(testSprite);
    //
    // testTexture = new PIXI.Texture(
    //     resourceTexture['assets/images/clipsheets/clips.png'].texture
    // );
    //
    // testMask = new PIXI.Sprite(testTexture);
    // testMask.scale.set(2.5);
    // testMask.alpha = 1;
    // testMask.position.set(0,0);
    //
    // testSprite.mask = testMask;
    //
    // col_count = 20;
    // row_count = 14;
    //
    // frameWidth = 200*testMask.scale.x;
    // frameHeight = 200*testMask.scale.y;
    //
    // testTimeline = new TimelineMax({
    //     repeat: -1
    // });
    //
    //
    // stepEase = new SteppedEase(col_count-1);
    //
    // for (i=0;i<row_count;i++) {
    //     testTimeline.add(
    //         TweenMax.fromTo(testMask.position,
    //             1/4,
    //             {
    //                 x:0*testMask.scale.x,
    //                 y:-frameHeight*i
    //             },
    //             {
    //                 x:-frameWidth*(col_count-1),
    //                 y:-frameHeight*i,
    //                 immediateRender: false,
    //                 ease: stepEase
    //             })
    //     );
    // }
    //
    //
    // stage.addChild(testMask);

    //TVNoiseText = new TilingTVNoise(stage, 22, window.innerWidth, window.innerHeight);

    var updatingRender, updatingObject;

    rendering = function(){
        if (!stop) {
            RenderAnimation();
        }
    }

    function UpdateOnResizing() {
        updatingRender = setTimeout(function () {
            viewPort.width = window.innerWidth;
            viewPort.height = window.innerHeight;

            newRenderer = PIXI.autoDetectRenderer(
                viewPort.width,
                viewPort.height,

                {
                    view: viewPort,
                    transparent: false,
                    backgroundColor: 0xffffff,
                    autoResize: false,
                    resolution: 1

                });

            renderer = newRenderer;

            CenterPosition.update();
            //console.log (renderer);

            updatingObject = setTimeout(function () {
                //TVNoiseText.update(window.innerWidth, window.innerHeight);
                stop = false;
            }, 500);

            TweenMax.ticker.addEventListener('tick', rendering);


        }, 100);

    }

    window.addEventListener('resize', function () {
        stop = true;
        clearTimeout(updatingRender);
        clearTimeout(updatingObject);
        if (rendering) {
            TweenMax.ticker.removeEventListener('tick',rendering);
        }
        UpdateOnResizing();
    });

    //animateCloud();
    animateBunny();

    console.log('Inited');
}







function func1(x, y) {
    Clock.ColorFilter.matrix[0] = x / 2000;
    console.log(x / 2000);
}

function func2(x, y) {
    Clock.ColorFilter.matrix[1] = x / 2000;
    console.log(x / 2000);
}

function func3(x, y) {
    Clock.ColorFilter.matrix[2] = x / 2000;
    console.log(x / 2000);
}

function func4(x, y) {
    Clock.ColorFilter.matrix[3] = x / 2000;
    console.log(x / 2000);
}

function func5(x, y) {
    Clock.ColorFilter.matrix[4] = x / 2000;
    console.log(x / 2000);
}

function func6(x, y) {
    Clock.ColorFilter.matrix[5] = x / 2000;
    console.log(x / 2000);
}

function func7(x, y) {
    Clock.ColorFilter.matrix[6] = x / 2000;
    console.log(x / 2000);
}

function func8(x, y) {
    Clock.ColorFilter.matrix[7] = x / 2000;
    console.log(x / 2000);
}

function func9(x, y) {
    Clock.ColorFilter.matrix[8] = x / 2000;
    console.log(x / 2000);
}

function func10(x, y) {
    Clock.ColorFilter.matrix[9] = x / 2000;
    console.log(x / 2000);
}

function func11(x, y) {
    Clock.ColorFilter.matrix[10] = x / 2000;
    console.log(x / 2000);
}

function func12(x, y) {
    Clock.ColorFilter.matrix[11] = x / 2000;
    console.log(x / 2000);
}

function func13(x, y) {
    Clock.ColorFilter.matrix[12] = x / 2000;
    console.log(x / 2000);
}

function func14(x, y) {
    Clock.ColorFilter.matrix[13] = x / 2000;
    console.log(x / 2000);
}

function func15(x, y) {
    Clock.ColorFilter.matrix[14] = x / 2000;
    console.log(x / 2000);
}

function func16(x, y) {
    Clock.ColorFilter.matrix[15] = x / 2000;
    console.log(x / 2000);
}

function func17(x, y) {
    Clock.ColorFilter.matrix[16] = x / 2000;
    console.log(x / 2000);
}

function func18(x, y) {
    Clock.ColorFilter.matrix[17] = x / 2000;
    console.log(x / 2000);
}

function func19(x, y) {
    Clock.ColorFilter.matrix[18] = x / 2000;
    console.log(x / 2000);
}

function func20(x, y) {
    Clock.ColorFilter.matrix[19] = x / 2000;
    console.log(x / 2000);
}

