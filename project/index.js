function init() {

    console.log('Initing');

    var scene = new PIXI.Container();

    Bg = new Background(scene);

    FullScreenNoise = new PIXI.Container();
    TVNoiseText = new TVNoise(FullScreenNoise,33,window.innerWidth,window.innerHeight);


    var Bunny = function(DisplayContainer) {
        this.each = new PIXI.Sprite.fromImage('assets/images/bunny.png');
        this.each.anchor.x = 0.5;
        this.each.anchor.y = 0.5;
        this.each.alpha = 0.5;
        this.each.position.x = window.innerWidth/2;
        this.each.position.y = window.innerHeight/2;
        this.each.interactive = false;
        DisplayContainer.addChild(this.each);
        Bunny.prototype.rotate = function() {
            this.each.rotation += 0.1;
            this.each.scale.x = this.each.scale.y = (Math.abs(Math.sin(Date.now()*0.0005)*1)+0.5);
        }
    }

    var bunnyPot = new PIXI.Container();
    var bunny = new Bunny(bunnyPot);


    // color.mask = bunny.each;

    function bunnyFollow(eventData) {
        //console.log(eventData);
        var bunnyTimeline = new TimelineMax();
        bunnyTimeline.smoothChildTiming = true;
        bunnyTimeline.to(bunny.each.position,0.5,{x:eventData.clientX,y:eventData.clientY,ease: Back.easeOut});

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

    circleScene = {
        circleRadius: 1200,
        circlePI: 3.14,
        circlePosition: []
    }
    

    for (i=0;i<12;i++) {
        circleScene.circlePosition.push({
            x: Math.round(Math.cos(circleScene.circlePI*(i/6))*circleScene.circleRadius),
            y: Math.round(Math.sin(circleScene.circlePI*(i/6))*circleScene.circleRadius)
        });
    }

    GraphicDesigner =  new Person(
        'GD',
        scene,
        window.innerWidth/2+circleScene.circlePosition[10].x,
        window.innerHeight/2+circleScene.circlePosition[10].y,
        true
    );

    GraphicDesignerSleep =  new Person(
        'GDS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[8].x,
        window.innerHeight/2+circleScene.circlePosition[8].y,
        true
    );

    Model =  new Person(
        'MD',
        scene,
        window.innerWidth/2+circleScene.circlePosition[3].x,
        window.innerHeight/2+circleScene.circlePosition[3].y,
        true
    );

    ModelWork =  new Person(
        'MDS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[7].x,
        window.innerHeight/2+circleScene.circlePosition[7].y,
        true
    );

    Science =  new Person(
        'SC',
        scene,
        window.innerWidth/2+circleScene.circlePosition[11].x,
        window.innerHeight/2+circleScene.circlePosition[11].y,
        true
    );

    ScienceSleep =  new Person(
        'SCS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[5].x,
        window.innerHeight/2+circleScene.circlePosition[5].y,
        true
    );

    Sale =  new Person(
        'SM',
        scene,
        window.innerWidth/2+circleScene.circlePosition[4].x,
        window.innerHeight/2+circleScene.circlePosition[4].y,
        true
    );

    SaleDinner =  new Person(
        'SMS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[0].x,
        window.innerHeight/2+circleScene.circlePosition[0].y,
        true
    );

    Student =  new Person(
        'ST',
        scene,
        window.innerWidth/2+circleScene.circlePosition[2].x,
        window.innerHeight/2+circleScene.circlePosition[2].y,
        true
    );

    StudentWake =  new Person(
        'STS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[1].x,
        window.innerHeight/2+circleScene.circlePosition[1].y,
        true
    );

    Teacher =  new Person(
        'TC',
        scene,
        window.innerWidth/2+circleScene.circlePosition[6].x,
        window.innerHeight/2+circleScene.circlePosition[6].y,
        true
    );

    TeacherCook =  new Person(
        'TCS',
        scene,
        window.innerWidth/2+circleScene.circlePosition[9].x,
        window.innerHeight/2+circleScene.circlePosition[9].y,
        true
    );

    TweenMax.to(circleScene,10,{circleRadius: 1200, onUpdate: function(){

        for (i=0;i<12;i++) {
            circleScene.circlePosition[i].x = Math.round(Math.cos(circleScene.circlePI*(i/6))*circleScene.circleRadius);
            circleScene.circlePosition[i].y = Math.round(Math.sin(circleScene.circlePI*(i/6))*circleScene.circleRadius);
        }

    }});

    scene.interactive = true;
    scene.isDragging = false;
    scene.boundArea = {
        top: (circleScene.circleRadius+window.innerHeight/2),
        right: window.innerWidth/2 - circleScene.circleRadius,
        bottom: window.innerHeight/2 - circleScene.circleRadius,
        left: (circleScene.circleRadius+window.innerWidth/2)
    };
    bunnyPot.interactive = false;
    FullScreenNoise.interactive = false;

    // In order to click through interactive false Sprite
    // The mother container of them has to be set at
    // interactive false

    stage.interactive = false;

    stage.addChild(scene);
    stage.addChild(bunnyPot);
    stage.addChild(FullScreenNoise);


    // stage.interactive = true;
    //
    scene.moving = function(e){

        if (this.isDragging) {

            this.newX = scene.position.x + e.data.originalEvent.movementX*20;
            this.newY = scene.position.y + e.data.originalEvent.movementY*20;

            if (typeof this.tweenHandle !== 'undefined') {
                this.tweenHandle.paused();
            }

            this.tweenHandle = TweenMax.to(this.position,1.5,{
                x:this.newX,
                y:this.newY,
                ease: Sine.easeOut,
                onUpdate: debounce(function(){
                    if (!this.isDragging) {
                        if (this.newX<this.boundArea.right) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position,0.5,{x:this.boundArea.right,ease: Back.easeOut});
                        }
                        if (this.newX>this.boundArea.left) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position,0.5,{x:this.boundArea.left,ease: Back.easeOut});
                        }
                        if (this.newY>this.boundArea.top) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position,0.5,{y:this.boundArea.top,ease: Back.easeOut});
                        }
                        if (this.newY<this.boundArea.bottom) {
                            this.tweenHandle.pause();
                            this.tweenHandle = new TweenMax.to(this.position,0.5,{y:this.boundArea.bottom,ease: Back.easeOut});
                        }
                    }
                }.bind(this),150)
            });

        } else {

            if (this.position.x<this.boundArea.right) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position,1,{x:this.boundArea.right,ease: Back.easeOut});
            }
            if (this.position.x>this.boundArea.left) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position,1,{x:this.boundArea.left,ease: Back.easeOut});
            }
            if (this.position.y>this.boundArea.top) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position,1,{y:this.boundArea.top,ease: Back.easeOut});
            }
            if (this.position.y<this.boundArea.bottom) {
                this.tweenHandle.pause();
                this.tweenHandle = new TweenMax.to(this.position,1,{y:this.boundArea.bottom,ease: Back.easeOut});
            }

        }

    }

    scene.on('mousemove',scene.moving);

    scene.on('mousedown',function(e){
        scene.isDragging = true;
    });

    scene.on('mouseup',function(e){
        scene.isDragging = false;
        scene.moving();
    });
    

    // Pivot value is not depend on any width and height of container
    // it s simple value that for container rotate around
    // when it set to x y value so the container position now start from that point
    // container itself doesnt have width and height, so it s always full window width height
    // pivot 0 0 will be the 0 0 position of window.
    // pivot half screen so the container will move back to half screen offset
    // that why we have to set position is half screen move forward to compensate.
    scene.pivot.set(window.innerWidth/2,window.innerHeight/2);
    scene.position.set(window.innerWidth/2,window.innerHeight/2);
    scene.scale.set(1);
    // Test Pivot Rotation Point
    //TweenMax.to(scene,10,{rotation:1000,repeat:0});

    vs = new Text(
        scene,
        'vs.',
        '3d',
        80,
        window.innerWidth/2,
        window.innerHeight/2,
        0.5
    );

    nightOwlText = new Text(
        scene,
        'Night Owl',
        '3d',
        140,
        window.innerWidth/2-300,
        window.innerHeight/2-100,
        0.5
    );

    earlyBirdText = new Text(
        scene,
        'Early Bird',
        '3d',
        140,
        window.innerWidth/2+300,
        window.innerHeight/2+100,
        0.5
    );


    Success = new Thing(
        scene,
        resourceTexture[assetsPath+'Success.png'].texture,
        resourceTexture[assetsPath+'Success-Color.png'].texture,
        window.innerWidth/2+150,
        window.innerHeight/2-150,
        0.5,
        true,
        0
    );

    Clock = new Thing(

        scene,
        resourceTexture[assetsPath+'Flexible.png'].texture,
        resourceTexture[assetsPath+'Flexible-Color.png'].texture,
        window.innerWidth/2+300,
        window.innerHeight/2-150,
        0.5,
        true,
        500
    );

    Intelligent = new Thing(
        scene,
        resourceTexture[assetsPath+'Intelligent.png'].texture,
        resourceTexture[assetsPath+'Intelligent-Color.png'].texture,
        window.innerWidth/2+450,
        window.innerHeight/2-150,
        0.5,
        true,
        1000
    );

    Health = new Thing(
        scene,
        resourceTexture[assetsPath+'Health.png'].texture,
        resourceTexture[assetsPath+'Health-Color.png'].texture,
        window.innerWidth/2-150,
        window.innerHeight/2+150,
        0.5,
        true,
        0
    );

    Organize = new Thing(
        scene,
        resourceTexture[assetsPath+'Organize.png'].texture,
        resourceTexture[assetsPath+'Organize-Color.png'].texture,
        window.innerWidth/2-300,
        window.innerHeight/2+150,
        0.5,
        true,
        500
    );


    Social = new Thing(
        scene,
        resourceTexture[assetsPath+'Social.png'].texture,
        resourceTexture[assetsPath+'Social-Color.png'].texture,
        window.innerWidth/2-450,
        window.innerHeight/2+150,
        0.5,
        true,
        1000
    );

    





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

    window.addEventListener('click',function(e){
        //console.log(e);
        DisSprite.position.set(e.clientX,e.clientY);
        TweenMax.fromTo(DisplacmentFilter.scale,0.5,{x:0,y:0},{x:30,y:30,ease: Sine.easeIn,repeat:1,yoyo:true});
        TweenMax.fromTo(DisSprite.scale,1,{x:0.1,y:0.1},{x:1.0,y:1.0,repeat:0,ease: Sine.easeOut});
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





    var updatingRender,updatingObject;

    function UpdateOnResizing() {
        updatingRender = setTimeout(function() {
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

            updatingObject = setTimeout(function() {
                TVNoiseText.update(window.innerWidth,window.innerHeight);
                stop = false;
            },500);

            TweenMax.ticker.addEventListener('tick', function(){
                if (!stop) {
                    RenderAnimation();
                }
            });


        },100);

    }

    window.addEventListener ('resize', function(){
        stop =  true;
        clearTimeout(updatingRender);
        clearTimeout(updatingObject);
        TweenMax.ticker.removeEventListener('tick');
        UpdateOnResizing();
    });

    //animateCloud();
    animateBunny();

    console.log('Inited');
}







function func1(x,y) {
    Clock.ColorFilter.matrix[0] = x/2000;
    console.log(x/2000);
}

function func2(x,y) {
    Clock.ColorFilter.matrix[1] = x/2000;
    console.log(x/2000);
}

function func3(x,y) {
    Clock.ColorFilter.matrix[2] = x/2000;
    console.log(x/2000);
}

function func4(x,y) {
    Clock.ColorFilter.matrix[3] = x/2000;
    console.log(x/2000);
}

function func5(x,y) {
    Clock.ColorFilter.matrix[4] = x/2000;
    console.log(x/2000);
}

function func6(x,y) {
    Clock.ColorFilter.matrix[5] = x/2000;
    console.log(x/2000);
}

function func7(x,y) {
    Clock.ColorFilter.matrix[6] = x/2000;
    console.log(x/2000);
}

function func8(x,y) {
    Clock.ColorFilter.matrix[7] = x/2000;
    console.log(x/2000);
}

function func9(x,y) {
    Clock.ColorFilter.matrix[8] = x/2000;
    console.log(x/2000);
}

function func10(x,y) {
    Clock.ColorFilter.matrix[9] = x/2000;
    console.log(x/2000);
}

function func11(x,y) {
    Clock.ColorFilter.matrix[10] = x/2000;
    console.log(x/2000);
}

function func12(x,y) {
    Clock.ColorFilter.matrix[11] = x/2000;
    console.log(x/2000);
}

function func13(x,y) {
    Clock.ColorFilter.matrix[12] = x/2000;
    console.log(x/2000);
}

function func14(x,y) {
    Clock.ColorFilter.matrix[13] = x/2000;
    console.log(x/2000);
}

function func15(x,y) {
    Clock.ColorFilter.matrix[14] = x/2000;
    console.log(x/2000);
}

function func16(x,y) {
    Clock.ColorFilter.matrix[15] = x/2000;
    console.log(x/2000);
}

function func17(x,y) {
    Clock.ColorFilter.matrix[16] = x/2000;
    console.log(x/2000);
}

function func18(x,y) {
    Clock.ColorFilter.matrix[17] = x/2000;
    console.log(x/2000);
}

function func19(x,y) {
    Clock.ColorFilter.matrix[18] = x/2000;
    console.log(x/2000);
}

function func20(x,y) {
    Clock.ColorFilter.matrix[19] = x/2000;
    console.log(x/2000);
}


