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
    scene.isInteractivable = false;

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
                this.newX = this.position.x - 5*(this.startX - e.data.getLocalPosition(this).x)/2;
                this.newY = this.position.y - 5*(this.startY - e.data.getLocalPosition(this).y)/2;
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

        hamburger_menu.parent.removeChild(hamburger_menu);

        var option = setDefault(option,NVE[Prefix]);

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
    NVE.Person = [];
    NVE.CurrentPerson = {};

    NVE.Person.GraphicDesigner = new Person(
        'GD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[11].x,
        window.innerHeight / 2 + circleScene.circlePosition[11].y,
        false,
        0.55,
        50, -40,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'GD');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['GD'].name,
                    NVE['GD'].job,
                    NVE['GD'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('GD');
            }
        }
    );

    GraphicDesignerSleep = new Person(
        'GDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[9].x,
        window.innerHeight / 2 + circleScene.circlePosition[9].y,
        false,
        0.55, -140,
        80,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'GDS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['GDS'].name,
                    NVE['GDS'].job,
                    NVE['GDS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('GDS');
            }
        }
    );

    Model = new Person(
        'MD',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[3].x,
        window.innerHeight / 2 + circleScene.circlePosition[3].y,
        false,
        0.55, -10, -55,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'MD');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['MD'].name,
                    NVE['MD'].job,
                    NVE['MD'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('MD');
            }
        }
    );

    ModelWork = new Person(
        'MDS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[2].x,
        window.innerHeight / 2 + circleScene.circlePosition[2].y,
        false,
        0.55, -10, -40,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'MDS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['MDS'].name,
                    NVE['MDS'].job,
                    NVE['MDS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('MDS');
            }
        }
    );

    Science = new Person(
        'SC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[8].x,
        window.innerHeight / 2 + circleScene.circlePosition[8].y,
        false,
        0.55,
        0, -30,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'SC');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['SC'].name,
                    NVE['SC'].job,
                    NVE['SC'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('SC');
            }
        }
    );

    ScienceSleep = new Person(
        'SCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[7].x,
        window.innerHeight / 2 + circleScene.circlePosition[7].y,
        false,
        0.55, -5, -60,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'SCS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['SCS'].name,
                    NVE['SCS'].job,
                    NVE['SCS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('SCS');
            }
        }
    );

    Sale = new Person(
        'SM',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[10].x,
        window.innerHeight / 2 + circleScene.circlePosition[10].y,
        false,
        0.55, 14, -60,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'SM');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['SM'].name,
                    NVE['SM'].job,
                    NVE['SM'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('SM');
            }
        }
    );

    SaleDinner = new Person(
        'SMS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[4].x,
        window.innerHeight / 2 + circleScene.circlePosition[4].y,
        false,
        0.55,
        20, -55,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'SMS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['SMS'].name,
                    NVE['SMS'].job,
                    NVE['SMS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('SMS');
            }
        }
    );

    Student = new Person(
        'ST',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[1].x,
        window.innerHeight / 2 + circleScene.circlePosition[1].y,
        false,
        0.55, 55, -35,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'ST');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['ST'].name,
                    NVE['ST'].job,
                    NVE['ST'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('ST');
            }
        }
    );

    StudentWake = new Person(
        'STS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[0].x,
        window.innerHeight / 2 + circleScene.circlePosition[0].y,
        false,
        0.55, -60, 25,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'STS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['STS'].name,
                    NVE['STS'].job,
                    NVE['STS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('STS');
            }
        }
    );

    Teacher = new Person(
        'TC',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[5].x,
        window.innerHeight / 2 + circleScene.circlePosition[5].y,
        false,
        0.55, 10, -45,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'TC');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['TC'].name,
                    NVE['TC'].job,
                    NVE['TC'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('TC');
            }
        }
    );

    TeacherCook = new Person(
        'TCS',
        scene_navigation_bound,
        window.innerWidth / 2 + circleScene.circlePosition[6].x,
        window.innerHeight / 2 + circleScene.circlePosition[6].y,
        false,
        0.55, 30, -65,
        {
            onClickTap: fThrottle(function(){
                if (scene.isInteractivable) {
                    PersonFull(this,'TCS');
                }
            },1500),
            onHoverIn: function(){
                // console.log(this);
                this.titleTransitionIn(
                    NVE['TCS'].name,
                    NVE['TCS'].job,
                    NVE['TCS'].time,
                    100,0,300);
            },
            onHoverOut: function(){
                this.titleTransitionOut();
            },
            onCreate: function(){
                NVE.Person.push(this);
                this.createTime('TCS');
            }
        }
    );

    if (browserDetection.isHandheld()) {
        NVE.Person.forEach(function(e){
            e.AnimationIn.play();
        });
    }

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
        window.innerWidth / 2 - 500,
        window.innerHeight / 2 - 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'SCS');
                }
            },1500)
        }
    );

    Flexible = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Flexible.png'].texture,
        resourceTexture[assetsPath + 'Flexible-Color.png'].texture,
        window.innerWidth / 2 - 300,
        window.innerHeight / 2 - 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'GDS',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'GDS');
                }
            },1500)
        }
    );

    Intelligent = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Intelligent.png'].texture,
        resourceTexture[assetsPath + 'Intelligent-Color.png'].texture,
        window.innerWidth / 2 -100,
        window.innerHeight / 2 - 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'SC');
                }
            },1500)
        }
    );

    Productive = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Productive.png'].texture,
        resourceTexture[assetsPath + 'Productive-Color.png'].texture,
        window.innerWidth / 2 + 100,
        window.innerHeight / 2 - 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'GD');
                }
            },1500)
        }
    );

    Stamina = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Stamina.png'].texture,
        resourceTexture[assetsPath + 'Stamina-Color.png'].texture,
        window.innerWidth / 2 + 300,
        window.innerHeight / 2 - 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'STS',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'STS');
                }
            },1500)
        }
    );

    Young = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Young.png'].texture,
        resourceTexture[assetsPath + 'Young-Color.png'].texture,
        window.innerWidth / 2 +500,
        window.innerHeight / 2 - 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'ST',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'ST');
                }
            },1500)
        }
    );


    Health = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Health.png'].texture,
        resourceTexture[assetsPath + 'Health-Color.png'].texture,
        window.innerWidth / 2 + 500,
        window.innerHeight / 2 + 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'MD');
                }
            },1500)
        }
    );

    Organize = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Organize.png'].texture,
        resourceTexture[assetsPath + 'Organize-Color.png'].texture,
        window.innerWidth / 2 + 300,
        window.innerHeight / 2 + 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'TC',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'TC');
                }
            },1500)
        }
    );


    Social = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Social.png'].texture,
        resourceTexture[assetsPath + 'Social-Color.png'].texture,
        window.innerWidth / 2 + 100,
        window.innerHeight / 2 + 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'SMS');
                }
            },1500)
        }
    );


    Satisfy = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Satisfy.png'].texture,
        resourceTexture[assetsPath + 'Satisfy-Color.png'].texture,
        window.innerWidth / 2 - 100,
        window.innerHeight / 2 + 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'TCS',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'TCS');
                }
            },1500)
        }
    );

    Optimistic = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Optimistic.png'].texture,
        resourceTexture[assetsPath + 'Optimistic-Color.png'].texture,
        window.innerWidth / 2 - 300,
        window.innerHeight / 2 + 300,
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
                if (scene.isInteractivable) {
                    PersonFull(this,'SM');
                }
            },1500)
        }
    );

    Proactive = new Thing(
        scene_navigation_center,
        resourceTexture[assetsPath + 'Proactive.png'].texture,
        resourceTexture[assetsPath + 'Proactive-Color.png'].texture,
        window.innerWidth / 2 - 500,
        window.innerHeight / 2 + 300,
        0.4,
        true,
        0,
        {
            onHoverIn: fThrottle(function(){
                this.Person = new Person(
                    'MDS',
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
                if (scene.isInteractivable) {
                    PersonFull(this,'MDS');
                }
            },1500)
        }
    );

    Question_Scene = new PIXI.Container();
    scene.addChild(Question_Scene);

    SelectText = new Text(
        Question_Scene,
        'WELCOME',
        '3d',
        30,
        window.innerWidth/2,
        window.innerHeight/2,
        0.5,0,false
    );

    introOwl = new Text(
        Question_Scene,
        'Do you stay up late at night to finish your work?',
        'normal',
        20,
        window.innerWidth/2,
        window.innerHeight/2-50,
        0.5,0,false
    );

    introOwl.Content.style.wordWrap = true;
    introOwl.Content.style.align = 'center';
    introOwl.Content.style.lineHeight = 30;
    // intro.Content.style.padding = 40;
    // intro.Content.scale.y = ((intro.Content.style.padding/2) + intro.size)/intro.size;
    // intro.Content.position.y += (intro.Content.style.padding/2) + intro.size;
    introOwl.Content.style.wordWrapWidth = 0.7*(window.innerWidth*introOwl.Content.scale.y);

    introOwl.Stage.interactive = true;

    introOwl.Stage.click = introOwl.Stage.tap = function(e) {
        credit_scene.addChild(hamburger_menu);

        TweenMax.to(Question_Scene,1,{alpha:0,onComplete: function(){
            Question_Scene.parent.removeChild(Question_Scene);
        }});
        TweenMax.fromTo([scene_navigation,scene.scale],3,{alpha:0},{alpha:1});
        TweenMax.fromTo(scene.scale, 5, {
            x: 3,
            y: 3
        }, {
            x: 1,
            y: 1,
            ease: Back.easeOut
        });

        OwlArrow.appear.restart(true);
        BirdArrow.appear.restart(true);

        scene.isInteractivable = true;
        Sounds['Appear.mp3'].play();
        NVE.Person.forEach(function(e,index){
            setTimeout(function(){
                e.AnimationIn.play();
            },Math.random()*index*100+1200);
        });
    }


    TweenMax.fromTo(introOwl.Stage,10,{alpha:0},{alpha:1});
    TweenMax.from(introOwl.Stage.scale,10,{x:0.1,y:0.1,ease: Elastic.easeOut});

    introBird = new Text(
        Question_Scene,
        'Or are you the kind of person who gets up early \nfor a fresh start of the day',
        'normal',
        20,
        window.innerWidth/2,
        window.innerHeight/2+50,
        0.5,0,false
    );

    introBird.Content.style.wordWrap = true;
    introBird.Content.style.align = 'center';
    introBird.Content.style.lineHeight = 30;
    // intro.Content.style.padding = 40;
    // intro.Content.scale.y = ((intro.Content.style.padding/2) + intro.size)/intro.size;
    // intro.Content.position.y += (intro.Content.style.padding/2) + intro.size;
    introBird.Content.style.wordWrapWidth = 0.7*(window.innerWidth*introBird.Content.scale.y);

    introBird.Stage.interactive = true;

    introBird.Stage.click = introBird.Stage.tap = function(e) {

        credit_scene.addChild(hamburger_menu);

        TweenMax.to(Question_Scene,1,{alpha:0,onComplete: function(){
            Question_Scene.parent.removeChild(Question_Scene);
        }});
        TweenMax.fromTo([scene_navigation,scene.scale],3,{alpha:0},{alpha:1});
        TweenMax.fromTo(scene.scale, 5, {
            x: 3,
            y: 3
        }, {
            x: 1,
            y: 1,
            ease: Back.easeOut
        });

        OwlArrow.appear.restart(true);
        BirdArrow.appear.restart(true);

        scene.isInteractivable = true;
        Sounds['Appear.mp3'].play();
        if (!browserDetection.isHandheld()) {
            NVE.Person.forEach(function(e,index){
                setTimeout(function(){
                    e.AnimationIn.play();
                },Math.random()*index*500);
            });
        }
    }


    TweenMax.fromTo(introBird.Stage,2,{alpha:0},{alpha:1});
    TweenMax.from(introBird.Stage.scale,5,{x:0.1,y:0.1,ease: Elastic.easeOut});


    // Instruction Scene
    instruction_scene = new PIXI.Container();
    instruction_scene.interactive = false;

    scene_navigation.addChild(instruction_scene);

    OwlArrow = new PIXI.Sprite(resourceTexture[assetsPath+'OwlArrow.png'].texture);
    OwlArrow.anchor.set(0.5);
    OwlArrow.position.set(window.innerWidth/2-200,window.innerHeight/2-150);
    OwlArrow.scale.set(0.5);
    OwlArrow.alpha = 0;

    OwlArrow.appear = new TimelineMax({paused: true,delay:3});
    OwlArrow.appear.add(TweenMax.to(OwlArrow,2,{alpha:1,ease: Sine.easeOut}));
    OwlArrow.appear.add(TweenMax.to(OwlArrow,0.5,{rotation:"+=0.05",ease: Sine.easeInOut,yoyo:true,repeat:20}),0);
    OwlArrow.appear.add(TweenMax.to(OwlArrow,2,{alpha:0,ease: Sine.easeOut}),"-=2");


    BirdArrow = new PIXI.Sprite(resourceTexture[assetsPath+'BirdArrow.png'].texture);
    BirdArrow.anchor.set(0.5);
    BirdArrow.position.set(window.innerWidth/2+200,window.innerHeight/2+150);
    BirdArrow.scale.set(0.5);
    BirdArrow.alpha = 0;

    BirdArrow.appear = new TimelineMax({paused: true,delay:3});

    console.log(BirdArrow.appear);
    BirdArrow.appear.add(TweenMax.to(BirdArrow,2,{alpha:1,ease: Sine.easeOut}));
    BirdArrow.appear.add(TweenMax.to(BirdArrow,0.5,{rotation:"+=0.05",ease: Sine.easeInOut,yoyo:true,repeat:20}),0);
    BirdArrow.appear.add(TweenMax.to(BirdArrow,2,{alpha:0,ease: Sine.easeOut}),"-=2");

    instruction_scene.addChild(OwlArrow);
    instruction_scene.addChild(BirdArrow);

    ClickHere = new PIXI.Sprite(resourceTexture[assetsPath+'ClickHere-Left.png'].texture);
    ClickHere.scale.set(0.5);
    ClickHere.alpha = 0;
    ClickHere.appear = new TimelineMax({paused:true});

    ClickHere.appear.add(TweenMax.fromTo(ClickHere,0.25,{rotation: "-=0.005"},{rotation: "+=0.01",ease:Back.easeInOut,yoyo:true,repeat:-1}));
    ClickHere.appear.add(TweenMax.to(ClickHere,3,{alpha:1}),0);
    ClickHere.appear.add(TweenMax.to(ClickHere,5,{alpha:0}),3);


    stage.addChild(ClickHere);



    // Credit Scene

    credit_scene = new PIXI.Container();
    stage.addChild(credit_scene);

    copyright = new Text(
        credit_scene,
        'Copyright 2016 by UP. Studio 3 Project Assignment. All right reserved. ',
        'normal',
        16,
        window.innerWidth/2,
        window.innerHeight - 50,
        1,
        0,
        false
    );

    copyright.Content.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    copyright.Content.style.fill = 0x333333;
    copyright.Content.style.letterSpacing = 1;
    copyright.Content.style.wordWrap = true;
    copyright.Content.style.wordWrapWidth = window.innerWidth-100;
    copyright.Content.style.align = 'center';
    copyright.Content.style.lineHeight = 28;

    hamburger_menu = new PIXI.Graphics();
    hamburger_menu.beginFill(0x000000,1);
    hamburger_menu.drawRect(0,0,30,5);
    hamburger_menu.drawRect(0,10,30,5);
    hamburger_menu.drawRect(0,20,30,5);
    hamburger_menu.endFill();

    hamburger_menu.beginFill(0xffffff,0.0000001);
    hamburger_menu.drawRect(0,0,30,25);
    hamburger_menu.endFill();

    hamburger_menu.pivot.set(15,2.5);

    hamburger_menu.position.set(window.innerWidth-60,40);

    TweenMax.fromTo(hamburger_menu,3,{alpha:0},{alpha:1});

    hamburger_menu.interactive = true;
    hamburger_menu.buttonMode = true;

    ['click','tap'].forEach(function(e){
        hamburger_menu.on(e,fThrottle(function(ev){
            TweenMax.to(hamburger_menu.scale,0.15,{x: "-=0.2",y:"-=0.2",immediateRender:false,yoyo:true,repeat:1});
        },500));
    });

    credit_content = new PIXI.Container();
    credit_text = new Text(
        credit_content,
        'Thank to \n\n' +
        'Mr Jeffrey Janet & Dr Tamara Jordan \n\n' +
        'in helping me to complete this project.',
        'normal',
        16,
        window.innerWidth/2,
        window.innerHeight/2,
        1,
        0,
        false
    );

    credit_text.Content.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    credit_text.Content.style.fill = 0x333333;
    credit_text.Content.style.letterSpacing = 1;
    credit_text.Content.style.wordWrap = true;
    credit_text.Content.style.wordWrapWidth = window.innerWidth-100;
    credit_text.Content.style.align = 'center';
    credit_text.Content.style.lineHeight = 18;
    credit_content.alpha = 0;

    credit_text.Stage.interactive = false;

    credit_scene.addChild(credit_content);



    ['click','tap'].forEach(function(e){
        hamburger_menu.on(e,fThrottle(function(){
            credit_scene.addChild(credit_content);
            credit_text.Stage.interactive = true;
            TweenMax.to(scene_navigation,2,{alpha:0});
            TweenMax.to(credit_content,2,{alpha:1});
        }),2500);
        credit_text.Stage.on(e,fThrottle(function(){
            credit_scene.removeChild(credit_content);
            TweenMax.to(scene_navigation,2,{alpha:1});
            TweenMax.to(credit_content,2,{alpha:0});
        }),2500);
    });





    
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

    // RIPPLE EFFECT ONLY FOR WEBKIT BROWSER
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
                hamburger_menu.position.set(window.innerWidth-60,40);
                copyright.Stage.position.set(window.innerWidth/2,window.innerHeight - 50);
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

