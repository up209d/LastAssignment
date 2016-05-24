function init() {

    console.log('Initing');

    var scene = new PIXI.Container();

    bg = new Background(stage);

    FullScreenNoise = new PIXI.Container();
    TVNoiseText = new TVNoise(FullScreenNoise,33,window.innerWidth,window.innerHeight);


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
    // Test Pivot Rotation Point
    // TweenMax.to(scene,10,{rotation:1000,repeat:0});

    // testCont =  new PIXI.Container();
    //
    // DisSprite =  new PIXI.Sprite(resourceTexture['assets/Test/wave.png'].texture);
    //
    //
    // Skt = new PIXI.Sprite(resourceTexture[assetsPath+'GDS-Color-After.png'].texture);
    //
    // DisplacmentFilter = new PIXI.filters.DisplacementFilter(DisSprite);
    // DisplacmentFilter.scale.set(0);
    //
    // Skt.filters = [DisplacmentFilter];
    // bg.bgContainer.filters = [DisplacmentFilter];
    //
    // Skt.anchor.set(0.5);
    // Skt.position.set(window.innerWidth/2,window.innerHeight/2);
    //
    // DisSprite.anchor.set(0.5);
    // DisSprite.position.set(window.innerWidth/2,window.innerHeight/2);
    // DisSprite.scale.set(1);
    //
    // //DisplacmentFilter.scale.set(10);
    // TweenMax.to(DisplacmentFilter.scale,2,{x:100,y:100,ease: Sine.easeOut,yoyo:true,repeat:-1});
    // TweenMax.to(DisSprite.scale,4,{x:50,y:50,repeat:-1,ease: Back.easeOut});
    // //TweenMax.to(Skt.position,1,{x:window.innerWidth/2-200,y:window.innerHeight/2-200,reapeat:-1})
    //
    // DisplacmentFilter.padding = 200;
    //
    //
    // function DisSpriteRotation() {
    //
    //     requestAnimationFrame(DisSpriteRotation);
    //     //DisSprite.rotation += 0.05;
    //
    // }
    //
    // DisSpriteRotation();
    //
    // testCont.addChild(DisSprite);
    // testCont.addChild(Skt);
    //stage.addChild(testCont);


    Clock = new Thing(

        stage,
        resourceTexture[assetsPath+'Flexible.png'].texture,
        resourceTexture[assetsPath+'Flexible-Color.png'].texture,
        window.innerWidth/2,
        window.innerHeight/2,
        0.5
    );


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


