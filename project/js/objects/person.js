/**
 * Created by UP on 5/18/16.
 */

var Person = function(
    Prefix,
    DisplayContainer,
    xPos,
    yPos,
    autoplay,
    scale,
    xPosHead,
    yPosHead
    ) {

    var PersonObject = this;

    autoplay = typeof autoplay == 'undefined' ? false : autoplay;

    scale = typeof scale == 'undefined' ? 1 : scale;

    Prefix = typeof Prefix == 'undefined' ? 'GD' : Prefix;

    xPos = typeof xPos !== 'undefined' ? xPos : window.innerWidth/2;
    yPos = typeof yPos !== 'undefined' ? yPos : window.innerHeight/2;

    xPosHead = typeof xPosHead !== 'undefined' ? xPosHead : 0;
    yPosHead = typeof yPosHead !== 'undefined' ? yPosHead : 0;

    this.Container = new PIXI.Container();

    // All Sprite in this Container with position x y = 0
    // So they all depend on the poisition of the container
    // position x y = 0 mean they all appear at the middle point of the container
    this.ColorBefore = new PIXI.Sprite(resourceTexture[assetsPath+Prefix+'-Color-Before.png'].texture);
    this.ColorBefore.anchor.set(0.5);
    this.ColorBefore.position.set(0,0);
    this.ColorBefore.scale.set(1);
    this.ColorBefore.alpha = 0.25;

    this.ColorBefore_TransitionMask = new transitionColor(this.Container,this.ColorBefore,'cursor',false);

    this.ColorBeforeFilter = new PIXI.filters.ColorMatrixFilter();

    // * * *
    // Any Sprite with Mask we cannot use normal filter for Sprite anymore
    // But we can use blendMode for the filter apply to the masked Sprite
    // like ColorMatrixFilter.blendMode so we can use blendMode easily

    this.ColorBeforeFilter.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    this.ColorBeforeFilter.matrix = [
        0.25,0.25,0.25,0,0,
        0.25,0.25,0.25,0,0,
        0.25,0.25,0.25,0,0,
          0,  0,  0,1,0
    ];

    if (!browserDetection.isHandheld()) {
        if(this.ColorBefore.filters) {
            this.ColorBefore.filters.push(this.ColorBeforeFilter);
        } else {
            this.ColorBefore.filters = [this.ColorBeforeFilter];
        }
    }

    this.ColorAfter = new PIXI.Sprite(resourceTexture[assetsPath+Prefix+'-Color-Before.png'].texture);
    this.ColorAfter.anchor.set(0.5);
    this.ColorAfter.position.set(0,0);
    this.ColorAfter.scale.set(1);
    this.ColorAfter.alpha = 1;

    this.ColorAfterFilter = new PIXI.filters.ColorMatrixFilter();
    this.ColorAfterFilter.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    this.ColorAfterFilter.matrix = [
        1,0,0,0,0,
        0,1,0,0,0,
        0,0,1,0,0,
        0,0,0,1,0
    ];

    if (!browserDetection.isHandheld()) {
        if(this.ColorAfter.filters) {
            this.ColorAfter.filters.push(this.ColorAfterFilter);
        } else {
            this.ColorAfter.filters = [this.ColorAfterFilter];
        }
    } else {
        this.ColorAfter.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    }

    this.ColorAfter_TransitionMask = new transitionColor(this.Container,this.ColorAfter,'water',false);

    this.Sketch = new PIXI.extras.MovieClip([
        resourceTexture[assetsPath+Prefix+'-Sketch-0.png'].texture,
        resourceTexture[assetsPath+Prefix+'-Sketch-1.png'].texture,
        resourceTexture[assetsPath+Prefix+'-Sketch-2.png'].texture
    ]);
    this.Sketch.animationSpeed = 0.25;
    this.Sketch.anchor.set(0.5);
    this.Sketch.position.set(0,0);
    this.Sketch.scale.set(1);
    this.Sketch.alpha = 1;
    this.Sketch.loop = true;
    this.Sketch.stop();

    this.Sketch_TransitionMask = new transitionColor(this.Container,this.Sketch,'cursor',false);

    Prefix = 'GD';

    this.Emotions = {
        normal        :   resourceTexture[assetsPath+Prefix+'-Head-Center.png'].texture,
        angry         :   resourceTexture[assetsPath+Prefix+'-Head-Center-Angry.png'].texture,
        happy         :   resourceTexture[assetsPath+Prefix+'-Head-Center-Happy.png'].texture,
        touchedhard   :   resourceTexture[assetsPath+Prefix+'-Head-Touched-Hard.png'].texture,
        touchedlight  :   resourceTexture[assetsPath+Prefix+'-Head-Touched-Light.png'].texture,
        upleft        :   resourceTexture[assetsPath+Prefix+'-Head-Up-Left.png'].texture,
        upright       :   resourceTexture[assetsPath+Prefix+'-Head-Up-Right.png'].texture
    }

    this.Head = new PIXI.Sprite(this.Emotions.normal);
    this.Head.anchor.set(0.5,1);
    this.Head.position.set(xPosHead,yPosHead);
    this.Head.scale.set(0);
    this.Head.alpha = 1;

    PersonObject.Head.interactive = true;

    PersonObject.Head.on('mousedown',function(e){
        //console.log();
        debounce(function(){
            PersonObject.Head.texture = PersonObject.Emotions.touchedlight;
        },250);
    });

    // console.log(PersonObject.Head);
    //
    // PersonObject.Head.on('mousedown',function(e){
    //     //console.log();
    //     PersonObject.Head.texture = PersonObject.Emotions.touchedlight;
    // });
    //
    // PersonObject.Head.on('touchstart',function(e){
    //     //console.log();
    //     PersonObject.Head.texture = PersonObject.Emotions.touchedlight;
    // });
    // PersonObject.Head.on('mouseup',function(e){
    //     //console.log();
    //     PersonObject.Head.texture = PersonObject.Emotions.normal;
    // });
    // PersonObject.Head.on('touchend',function(e){
    //     //console.log();
    //     PersonObject.Head.texture = PersonObject.Emotions.normal;
    // });
    //
    // window.addEventListener('mousemove',function(e){
    //     console.log(e);
    // });


    this.Container.addChild(this.ColorBefore);
    this.Container.addChild(this.ColorAfter);
    this.Container.addChild(this.Sketch);
    //PersonObject.Container.addChild(PersonObject.Head);


    // Pivot has the negative value as the x position and y position
    // while position positive value is move to right bottom
    // in pivot that value move backward to left top
    // pivot -300 -300 similar to position 300 300
    // For Container the anchor point is determine by pivot, pivot 0,0 mean it
    // will rotate at the point 0,0 of screen, so because all of child sprite inside
    // this container has the anchor point 0.5 and position 0 0 so when rotate the
    // container, all the sprite inside will rotate around the point 0,0
    // Since the width height of Container determined by the Sprites Child inside
    // And the scale and the rotation will base on pivot value
    // which is the anchor point not in percentage like normal
    // but with absolute value of pixel

    this.Container.interactive = true;

    // Function.prototype.bind() use to specify which object will be used
    // as this in the function, so if you want any object use as this in the
    // function just use .bind(objectYouWant) to do that
    // in this case below this.Container without bind will be use as 'this' in the
    // event function, but when we bind(this)(this here mean 'this person')
    // so the 'whole person object' will be use as 'this' in the function
    this.Container.on('mousedown',function(e){
        debounce(function(){
            PersonObject.ColorAfter_TransitionMask.playReverse();
            PersonObject.ColorAfter_TransitionMask.playReverse();
            PersonObject.ColorAfter_TransitionMask.playReverse();
            // TweenMax.fromTo([PersonObject.Head.scale],1,{x:0.5,y:0.5},{x:1,y:1,ease: Back.easeOut,
            //     onStart:function(){
            //         PersonObject.Container.addChild(PersonObject.Head);
            //     }},0);
            // TweenMax.fromTo([PersonObject.Head],0.5,{alpha:0},{alpha: 1, ease: Sine.easeOut},0);
            // TweenMax.fromTo([PersonObject.Head],2,{rotation:-0.05},{rotation: 0.05, ease: Sine.easeInOut, delay:0,yoyo: true, repeat:-1},0);
            // //console.log(PersonObject.Container);
        },500);

    }.bind(this));

    this.Container.on('mouseover',fDebounce(function(e){

        //console.log('Forward');
        TweenMax.fromTo(PersonObject.Container.scale,0.3,{x:"+=0",y:"+=0"},{x:"+=0.009",y:"+=0.009",ease: Sine.easeOut,yoyo:true,repeat:1});
        PersonObject.ColorAfter_TransitionMask.play();
        PersonObject.Sketch.play();

    },200));

    this.Container.on('mouseout',fDebounce(function(e){

        //console.log('Backward');

        PersonObject.ColorAfter_TransitionMask.playReverse();
        PersonObject.Sketch.stop();

        // TweenMax.fromTo([PersonObject.Head.scale],0.5,{x:1,y:1},{x:0.5,y:0.5,delay:0.25,ease: Sine.easeOut,
        //     onComplete:function(){
        //         PersonObject.Container.removeChild(PersonObject.Head);
        //     }},0);
        // TweenMax.fromTo([PersonObject.Head],0.5,{alpha:1},{alpha: 0,delay:0.25, ease: Sine.easeOut},0);

    },200));

    // It is different from bind and call, their role is similar as they
    // specify which is used to be 'this', bind will not run the function
    // but call will run the function immediately

    this.AnimationIn = new TimelineMax({delay: 0.5,paused: true});
    this.AnimationIn
        .add(function(){PersonObject.Sketch_TransitionMask.play(0);},0)
        .add(function(){
            PersonObject.ColorBefore_TransitionMask.play(0);
            PersonObject.ColorBefore_TransitionMask.moving(0);
        },0)
        //.add(TweenMax.fromTo([this.Head.scale],1,{x:0,y:0},{x:1,y:1,ease: Back.easeOut},0),0)
        //.add(TweenMax.fromTo([this.Head],2,{rotation:-0.05},{rotation: 0.05, ease: Sine.easeInOut, delay:0,yoyo: true, repeat:-1}),0);

    this.Floating = new TimelineMax({paused:true});
    this.Floating
        .add(TweenMax.to([this.Container.position],Math.random()*2+2,{y: this.Container.position.y+Math.random()*50+50,ease: Sine.easeInOut, repeat:-1, yoyo:true}),1);


    if (autoplay) {
        this.AnimationIn.play();
        //this.Floating.play();
        //console.log(this.Container.position.y);
    }

    this.Stage = new PIXI.Container();
    this.Stage.pivot.set(0,0);
    this.Stage.rotation = 0;
    //TweenMax.to(this.Container,10,{rotation:5,repeat:-1});
    this.Stage.scale.set(scale);
    //TweenMax.to(this.Container, 100,{rotation: 500, repeat: -1});
    this.Stage.position.set(xPos,yPos);

    this.Stage.addChild(this.Container);
    DisplayContainer.addChild(this.Stage);

}