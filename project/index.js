function init() {

    console.log('Initing');

    // ---- BEGIN BUNNY ----

    var Bunny = function (DisplayContainer) {
        this.each = new PIXI.Sprite.fromImage('assets/images/bunny.png');
        this.each.anchor.x = 0.5;
        this.each.anchor.y = 0.5;
        this.each.alpha = 0.5;
        this.each.position.x = window.innerWidth / 2;
        this.each.position.y = window.innerHeight / 2;
        this.each.interactive = false;
        DisplayContainer.addChild(this.each);
        Bunny.prototype.rotate = function () {
            this.each.rotation += 0.1;
            this.each.scale.x = this.each.scale.y = (Math.abs(Math.sin(Date.now() * 0.0005) * 1) + 0.5);
        }
    }

    var bunnyPot = new PIXI.Container();
    var bunny = new Bunny(bunnyPot);


    // color.mask = bunny.each;

    function bunnyFollow(eventData) {
        //console.log(eventData);
        var bunnyTimeline = new TimelineMax();
        bunnyTimeline.smoothChildTiming = true;
        bunnyTimeline.to(bunny.each.position, 1.5, {
            x: eventData.clientX,
            y: eventData.clientY,
            immediateRender: false,
            ease: Back.easeOut
        });

        bunnyTimeline.play();
    };

    window.onmousemove = bunnyFollow;

    //bg.bg.on('mousemove',bunnyFollow);
    function animateBunny() {
        requestAnimationFrame(animateBunny);
        bunny.rotate();
        // TweenMax.to(trasitionColorMask.object,0.2,{width:colorA.width,height:colorA.height});
        // TweenMax.to(transitionSketchMask.object,0.2,{width:nocolor.width,height:nocolor.height});
    }

    bunnyPot.interactive = false;


    // In order to click through interactive false Sprite
    // The mother container of them has to be set at
    // interactive false

    stage.addChild(bunnyPot);

    // stage.interactive = true;


    // ---- END BUNNY ----

    circleScene = {
        circleRadius: 1200,
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

    Bg = new Background(scene);
    Bg.bg.width += circleScene.circleRadius*2;
    Bg.bg.height +=  circleScene.circleRadius;

    scene_navigation = new PIXI.Container();
    scene_navigation.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    scene_navigation.position.set(window.innerWidth / 2, window.innerHeight / 2);

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

    scene.on('mousedown', function (e) {
        scene.isDragging = true;
        scene.startX = e.data.getLocalPosition(scene).x;
        scene.startY = e.data.getLocalPosition(scene).y;
    });

    scene.on('touchstart', function (e) {
        scene.isDragging = true;
        scene.startX = e.data.getLocalPosition(scene).x;
        scene.startY = e.data.getLocalPosition(scene).y;
    });

    scene.on('touchmove', scene.moving);

    scene.on('mouseup', function (e) {
        scene.isDragging = false;
        scene.moving(e);
    });

    scene.on('touchend', function (e) {
        scene.isDragging = false;
    });


    GraphicDesigner = new Person(
        'GD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[10].x,
        window.innerHeight / 2 + circleScene.circlePosition[10].y,
        true,
        0.5,
        50, -40,
        {
            onClickTap: fThrottle(function(){
                TweenMax.to(scene_navigation,1,{
                    alpha:0,
                    delay:0.5,
                    onComplete: function(){
                        scene.addChild(this.Stage);
                    }.bind(this)
                });
                Particle = new FloatThing(
                    stage,
                    'stuff',
                    50,
                    window.innerWidth*0.8,
                    window.innerHeight*0.8
                );
            },1500),
            onHover: function(){

            }
        }
    );

    GraphicDesignerSleep = new Person(
        'GDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[8].x,
        window.innerHeight / 2 + circleScene.circlePosition[8].y,
        true,
        0.5, -140,
        80
    );

    Model = new Person(
        'MD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[3].x,
        window.innerHeight / 2 + circleScene.circlePosition[3].y,
        true,
        0.5, -10, -55
    );

    ModelWork = new Person(
        'MDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[7].x,
        window.innerHeight / 2 + circleScene.circlePosition[7].y,
        true,
        0.5, -10, -40
    );

    Science = new Person(
        'SC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[11].x,
        window.innerHeight / 2 + circleScene.circlePosition[11].y,
        true,
        0.5,
        0, -30
    );

    ScienceSleep = new Person(
        'SCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[5].x,
        window.innerHeight / 2 + circleScene.circlePosition[5].y,
        true,
        0.5, -5, -60
    );

    Sale = new Person(
        'SM',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[4].x,
        window.innerHeight / 2 + circleScene.circlePosition[4].y,
        true,
        0.5, 14, -60
    );

    SaleDinner = new Person(
        'SMS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[0].x,
        window.innerHeight / 2 + circleScene.circlePosition[0].y,
        true,
        0.5,
        20, -55
    );

    Student = new Person(
        'ST',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[2].x,
        window.innerHeight / 2 + circleScene.circlePosition[2].y,
        true,
        0.5, 55, -35
    );

    StudentWake = new Person(
        'STS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[1].x,
        window.innerHeight / 2 + circleScene.circlePosition[1].y,
        true,
        0.5, -60, 25
    );

    Teacher = new Person(
        'TC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[6].x,
        window.innerHeight / 2 + circleScene.circlePosition[6].y,
        true,
        0.5, 10, -45
    );

    TeacherCook = new Person(
        'TCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[9].x,
        window.innerHeight / 2 + circleScene.circlePosition[9].y,
        true,
        0.5, 30, -65
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
        0
    );

    Clock = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Flexible.png'].texture,
        resourceTexture[assetsPath + 'Flexible-Color.png'].texture,
        window.innerWidth / 2,
        window.innerHeight / 2 - 200,
        0.4,
        true,
        500
    );

    Intelligent = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Intelligent.png'].texture,
        resourceTexture[assetsPath + 'Intelligent-Color.png'].texture,
        window.innerWidth / 2 + 150,
        window.innerHeight / 2 - 200,
        0.4,
        true,
        1000
    );

    Health = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Health.png'].texture,
        resourceTexture[assetsPath + 'Health-Color.png'].texture,
        window.innerWidth / 2 +150,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        0
    );

    Organize = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Organize.png'].texture,
        resourceTexture[assetsPath + 'Organize-Color.png'].texture,
        window.innerWidth / 2,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        500
    );


    Social = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Social.png'].texture,
        resourceTexture[assetsPath + 'Social-Color.png'].texture,
        window.innerWidth / 2 - 150,
        window.innerHeight / 2 + 200,
        0.4,
        true,
        1000
    );

    intro_p = 'Are you the kind of person who gets up early for a fresh ' +
        'start of the day'

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
        TweenMax.fromTo(scene_navigation_center,2,{alpha:0},{alpha:1});
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
        scene.filters = [DisplacmentFilter];

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

        //console.log(DisplacmentFilter);


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

            TweenMax.ticker.addEventListener('tick', function () {
                if (!stop) {
                    RenderAnimation();
                }
            });


        }, 100);

    }

    window.addEventListener('resize', function () {
        stop = true;
        clearTimeout(updatingRender);
        clearTimeout(updatingObject);
        TweenMax.ticker.removeEventListener('tick');
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