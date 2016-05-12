function init() {
    bg = new Background(stage);
    TVNoiseText = new TVNoise();

    var Bunny = function() {

        this.each = new PIXI.Sprite.fromImage('assets/images/glow.png');
        this.each.anchor.x = 0.5;
        this.each.anchor.y = 0.5;
        this.each.position.x = window.innerWidth/2;
        this.each.position.y = window.innerHeight/2;

        Bunny.prototype.rotate = function() {

            this.each.rotation += 0.1;
            this.each.scale.x = this.each.scale.y = (Math.abs(Math.sin(Date.now()*0.0005))+1)+1;

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

    var sketch = new Sketch(stage);
    sketch.movie.animationSpeed = 0.18;
    sketch.movie.play();


    var bunny = new Bunny();

    var bunnyPot = new PIXI.Container();
    bunnyPot.addChild(bunny.each);

    function bunnyFollow(eventData) {
        var bunnyTimeline = new TimelineMax();
        bunnyTimeline.to(bunny.each.position,1,{x:eventData.data.global.x,y:eventData.data.global.y});
        bunnyTimeline.play();
        // console.log(eventData.data.global);
    }

    //bg.bg.on('mousemove',bunnyFollow);
    function animateBunny() {
        requestAnimationFrame(animateBunny);
        bunny.rotate();
    }
    stage.addChild(bunnyPot);
    // stage.addChild(MaskContainer);
    for (i=0;i<=10;i++) {
        for(j=0;j<=10;j++) {
            stage.addChild(TVNoiseText.noiseAnimations[i][j]);
        }
    }
    LoadingObject.bg.mask = bunny.each;


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
                sketch.movie.position.set(window.innerWidth/2,window.innerHeight/2);
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
    //animateBunny();

}