function init() {
    bg = new Background(stage);
    TVNoiseText = new TVNoise();


    for (i=0;i<=10;i++) {
        for(j=0;j<=10;j++) {
            stage.addChild(TVNoiseText.noiseAnimations[i][j]);
        }
    }



    var Sketch = function(DisplayContainer,TextureSketch,TextureColor,TextureMaskColor,AnimationSpeed) {
        this.textures = [];
        this.currentFrame = 0;
        for (i=0;i<=2;i++) {
            this.textures.push(PIXI.Texture.fromImage('assets/images/Sketch/Sketch_0000' + i + '.png'));
        }
        this.movie = new PIXI.extras.MovieClip(this.textures);
        this.movie.anchor.set(0.5);
        this.movie.position.set(window.innerWidth/2,window.innerHeight/2);
        DisplayContainer.addChild(this.movie);
        Sketch.prototype.playing = function() {
            this.movie.gotoAndStop(this.currentFrame);
            this.currentFrame++;
            //console.log(this.currentFrame);
        }
    }



    var colorA = new PIXI.Sprite(resourceTexture.designerColorAfter.texture);
    colorA.anchor.set(0.5);
    colorA.position.set(window.innerWidth/2,window.innerHeight/2);
    colorA.scale.set(0.75);
    colorA.alpha = 0.9;
    stage.addChild(colorA);


    var color = new PIXI.Sprite(resourceTexture.designerColorBefore.texture);
    color.anchor.set(0.5);
    color.position.set(window.innerWidth/2,window.innerHeight/2);
    color.scale.set(0.75);
    color.alpha = 0.9;
    stage.addChild(color);

    var nocolor = new PIXI.Sprite(resourceTexture.designerSketch.texture);
    nocolor.anchor.set(0.5);
    nocolor.position.set(window.innerWidth/2,window.innerHeight/2);
    nocolor.scale.set(0.75);
    stage.addChild(nocolor);

    // var head = new PIXI.Sprite(resourceTexture.designerHeadCenter.texture);
    // head.scale.set(0.5);
    // head.anchor.set(0.5,1);
    // head.position.set(window.innerWidth/2+65,window.innerHeight/2-50);
    // head.rotation = -0.05;
    // TweenMax.to(head,2,{rotation: 0.05,repeat: -1,yoyo: true, ease: Cubic.easeInOut});
    // stage.addChild(head);

    var transitionSketchMask = new transitionColor(stage,nocolor,'splash');
    transitionSketchMask.object.animationSpeed = 0.85;
    //transitionSketchMask.object.gotoAndStop(transitionSketchMask.object.totalFrames-1);

    var trasitionColorMask = new transitionColor(stage,colorA,'water');

        trasitionColorMask.object.on('mousedown',function(e){
            trasitionColorMask.object.gotoAndPlay(0);
            transitionSketchMask.object.gotoAndPlay(0);
        });

    trasitionColorMask.object.on('touchstart',function(e){
        trasitionColorMask.object.gotoAndPlay(0);
        transitionSketchMask.object.gotoAndPlay(0);
    });

    // TweenMax.to(colorA.scale,5,{x:1,y:1,ease: Back.easeOut});
    // TweenMax.to(nocolor.scale,5,{x:1,y:1,ease: Back.easeOut});

    var Bunny = function(DisplayContainer) {
        this.each = new PIXI.Sprite.fromImage('assets/images/bunny.png');
        this.each.anchor.x = 0.6;
        this.each.anchor.y = 0.6;
        this.each.alpha = 1;
        this.each.position.x = window.innerWidth/2;
        this.each.position.y = window.innerHeight/2;
        DisplayContainer.addChild(this.each);
        Bunny.prototype.rotate = function() {
            this.each.rotation += 0.01;
            this.each.scale.x = this.each.scale.y = (Math.abs(Math.sin(Date.now()*0.0005)*2)+1.5);
        }
    }

    var bunnyPot = new PIXI.Container();
    var bunny = new Bunny(bunnyPot);

    color.mask = bunny.each;

    function bunnyFollow(eventData) {
        //console.log(eventData);
        var bunnyTimeline = new TimelineMax();
        TweenMax.to(bunny.each.position,0.5,{x:eventData.clientX,y:eventData.clientY});

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
    stage.addChild(bunnyPot);


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
                TVNoiseText.update();
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

    TVNoiseText.noising();
    //animateCloud();
    animateBunny();

}