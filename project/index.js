function init() {

    var scene = new PIXI.Container();

    bg = new Background(stage);

    FullScreenNoise = new PIXI.Container();
    FullScreenNoise.interactive = false;
    TVNoiseText = new TVNoise(FullScreenNoise,30,window.innerWidth,window.innerHeight);


    var Bunny = function(DisplayContainer) {
        this.each = new PIXI.Sprite.fromImage('assets/images/bunny.png');
        this.each.anchor.x = 0.5;
        this.each.anchor.y = 0.5;
        this.each.alpha = 1;
        this.each.position.x = window.innerWidth/2;
        this.each.position.y = window.innerHeight/2;
        this.each.interactive = false;
        DisplayContainer.addChild(this.each);
        Bunny.prototype.rotate = function() {
            this.each.rotation += 0.1;
            this.each.scale.x = this.each.scale.y = (Math.abs(Math.sin(Date.now()*0.0005)*2)+1.5);
        }
    }

    var bunnyPot = new PIXI.Container();
    bunnyPot.interactive = false;
    var bunny = new Bunny(bunnyPot);


    // color.mask = bunny.each;

    function bunnyFollow(eventData) {
        //console.log(eventData);
        var bunnyTimeline = new TimelineMax();
        bunnyTimeline.smoothChildTiming = true;
        bunnyTimeline.to(bunny.each.position,2,{x:eventData.clientX,y:eventData.clientY,ease: Back.easeOut});

        bunnyTimeline.play();
    }

    window.onmousemove = bunnyFollow;

    //bg.bg.on('mousemove',bunnyFollow);
    function animateBunny() {
        requestAnimationFrame(animateBunny);
        bunny.rotate();
        // TweenMax.to(trasitionColorMask.object,0.2,{width:colorA.width,height:colorA.height});
        // TweenMax.to(transitionSketchMask.object,0.2,{width:nocolor.width,height:nocolor.height});
    }

    GraphicDesigner =  new Person(
        'GD',
        scene,
        300,
        300,
        true
    );

    GraphicDesignerSleep =  new Person(
        'GDS',
        scene,
        800,
        300,
        true
    );

    Model =  new Person(
        'MD',
        scene,
        1300,
        300,
        true
    );

    ModelWork =  new Person(
        'MDS',
        scene,
        1800,
        300,
        true
    );

    Science =  new Person(
        'SC',
        scene,
        300,
        600,
        true
    );

    ScienceSleep =  new Person(
        'SCS',
        scene,
        800,
        600,
        true
    );

    Sale =  new Person(
        'SM',
        scene,
        1300,
        600,
        true
    );

    SaleDinner =  new Person(
        'SMS',
        scene,
        1800,
        600,
        true
    );

    Student =  new Person(
        'ST',
        scene,
        300,
        900,
        true
    );

    StudentWake =  new Person(
        'STS',
        scene,
        800,
        900,
        true
    );

    Teacher =  new Person(
        'TC',
        scene,
        1300,
        900,
        true
    );

    TeacherCook =  new Person(
        'TCS',
        scene,
        1800,
        900,
        true
    );

    // TVNoiseText.noiseAnimations.forEach(
    //     function(e){
    //         e.forEach(function(e){
    //             e.blendMode = PIXI.BLEND_MODES.SCREEN;
    //         });
    //     }
    // );

    // var Sketch = function(DisplayContainer,TextureSketch,TextureColor,TextureMaskColor,AnimationSpeed) {
    //     this.textures = [];
    //     this.currentFrame = 0;
    //     for (i=0;i<=2;i++) {
    //         this.textures.push(PIXI.Texture.fromImage('assets/images/Sketch/Sketch_0000' + i + '.png'));
    //     }
    //     this.movie = new PIXI.extras.MovieClip(this.textures);
    //     this.movie.anchor.set(0.5);
    //     this.movie.position.set(window.innerWidth/2,window.innerHeight/2);
    //     DisplayContainer.addChild(this.movie);
    //     Sketch.prototype.playing = function() {
    //         this.movie.gotoAndStop(this.currentFrame);
    //         this.currentFrame++;
    //         //console.log(this.currentFrame);
    //     }
    // }
    //
    //
    //
    // var colorA = new PIXI.Sprite(resourceTexture.designerColorAfter.texture);
    // colorA.anchor.set(0.5);
    // colorA.position.set(window.innerWidth/2,window.innerHeight/2);
    // colorA.scale.set(0.75);
    // colorA.alpha = 0.9;
    // stage.addChild(colorA);
    //
    //
    // var color = new PIXI.Sprite(resourceTexture.designerColorBefore.texture);
    // color.anchor.set(0.5);
    // color.position.set(window.innerWidth/2,window.innerHeight/2);
    // color.scale.set(0.75);
    // color.alpha = 0.9;
    // stage.addChild(color);
    //
    // var nocolor = new PIXI.Sprite(resourceTexture.designerSketch.texture);
    // nocolor.anchor.set(0.5);
    // nocolor.position.set(window.innerWidth/2,window.innerHeight/2);
    // nocolor.scale.set(0.75);
    // stage.addChild(nocolor);
    //
    // // var head = new PIXI.Sprite(resourceTexture.designerHeadCenter.texture);
    // // head.scale.set(0.5);
    // // head.anchor.set(0.5,1);
    // // head.position.set(window.innerWidth/2+65,window.innerHeight/2-50);
    // // head.rotation = -0.05;
    // // TweenMax.to(head,2,{rotation: 0.05,repeat: -1,yoyo: true, ease: Cubic.easeInOut});
    // // stage.addChild(head);
    //
    // var transitionSketchMask = new transitionColor(stage,nocolor,'splash');
    // transitionSketchMask.object.animationSpeed = 0.85;
    // //transitionSketchMask.object.gotoAndStop(transitionSketchMask.object.totalFrames-1);
    //
    // var trasitionColorMask = new transitionColor(stage,colorA,'water');
    //
    //     trasitionColorMask.object.on('mousedown',function(e){
    //         trasitionColorMask.object.gotoAndPlay(0);
    //         transitionSketchMask.object.gotoAndPlay(0);
    //     });
    //
    // trasitionColorMask.object.on('touchstart',function(e){
    //     trasitionColorMask.object.gotoAndPlay(0);
    //     transitionSketchMask.object.gotoAndPlay(0);
    // });

    // TweenMax.to(colorA.scale,5,{x:1,y:1,ease: Back.easeOut});
    // TweenMax.to(nocolor.scale,5,{x:1,y:1,ease: Back.easeOut});



    // var underDis = new PIXI.Container();
    // var picture = new PIXI.Sprite.fromImage('assets/images/All/GD-Color-Before.png');
    // underDis.addChild(picture);
    // stage.addChild(underDis);
    //
    // var displacement = new PIXI.Sprite.fromImage('assets/images/Test/dis.png');
    // var displacementFilter = new PIXI.filters.DisplacementFilter(displacement);
    //
    //
    // GraphicDesigner.Container.filters = [displacementFilter];
    //
    //
    // console.log(GraphicDesigner);
    //
    // stage.addChild(displacement);
    //
    // function filterRun() {
    //
    //     requestAnimationFrame(filterRun);
    //     displacement.position.x += 10;
    //
    // }
    //
    // filterRun();
    //
    // underDis.mask = bunny.each;


    scene.interactive = true;
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

        newX = scene.position.x + e.data.originalEvent.movementX*5;
        newY = scene.position.y + e.data.originalEvent.movementY*5;

        TweenMax.to(scene.position,0.25,{
            x:newX,
            y:newY,
            ease: Sine.easeOut,
            onComplete: function(){
                if (newX<0) {
                    TweenMax.to(scene.position,0.5,{x:0,ease: Sine.easeOut});
                }
            }
        });


    }

    scene.on('mousedown',function(e){
        //console.log(e.data.originalEvent.movementX);
        scene.on('mousemove',scene.moving);

        scene.on('mouseup',function(e){
            scene.off('mousemove',scene.moving);
        });

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

   //TweenMax.to(scene,10,{rotation:1000,repeat:0});

    var updatingRender,updatingObject;

    function UpdateOnResizing() {
        stop = false;
        updatingRender = setTimeout(function() {
            viewPort.width = window.innerWidth;
            viewPort.height = window.innerHeight;

            renderer = PIXI.autoDetectRenderer(
                viewPort.width,
                viewPort.height,

                {
                    view: viewPort,
                    transparent: false,
                    backgroundColor: 0x445599

                });
            CenterPosition.update();
            //console.log (renderer);

            updatingObject = setTimeout(function() {
                TVNoiseText.update(window.innerWidth,window.innerHeight);
                //sketch.movie.position.set(window.innerWidth/2,window.innerHeight/2);
            },250);


        },100);

    }

    window.addEventListener ('resize', function(){
        stop =  true;
        clearTimeout(updatingRender);
        clearTimeout(updatingObject);
        UpdateOnResizing();
    });

    var xxx=0;

    //animateCloud();
    animateBunny();

}