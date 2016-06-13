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
    yPosHead,
    callback
    ) {

    var PersonObject = this;

    PIXI.Container.call(this);

    callback = typeof callback !== 'undefined' ? callback : {
        onCreate: function(){},
        onClickTap : function(){},
        onHoverIn: function(){},
        onHoverOut: function(){},
        onDestroy: function(){}
    };

    callback.onCreate = typeof callback.onCreate !== 'undefined' ? callback.onCreate.bind(this) : function(){};
    callback.onClickTap = typeof callback.onClickTap !== 'undefined' ? callback.onClickTap.bind(this) : function(){};
    callback.onHoverIn = typeof callback.onHoverIn !== 'undefined' ? callback.onHoverIn.bind(this) : function(){};
    callback.onHoverOut = typeof callback.onHoverOut !== 'undefined' ? callback.onHoverOut.bind(this) : function(){};
    callback.onDestroy = typeof callback.onDestroy !== 'undefined' ? callback.onDestroy.bind(this) : function(){};

    this.callback = callback;

    autoplay = typeof autoplay == 'undefined' ? false : autoplay;
    this.autoplay = autoplay;

    scale = typeof scale == 'undefined' ? 1 : scale;

    Prefix = typeof Prefix == 'undefined' ? 'GD' : Prefix;
    this.Prefix = Prefix;

    xPos = typeof xPos !== 'undefined' ? xPos : window.innerWidth/2;
    yPos = typeof yPos !== 'undefined' ? yPos : window.innerHeight/2;

    xPosHead = typeof xPosHead !== 'undefined' ? xPosHead : 0;
    yPosHead = typeof yPosHead !== 'undefined' ? yPosHead : 0;

    this.xPosHead = xPosHead;
    this.yPosHead = yPosHead;

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
    } else {
        this.ColorBefore.renderable = false;
        this.ColorBefore.visible = false;
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

    if (browserDetection.isHandheld()) {
        this.Sketch.play();
    }

    this.Sketch_TransitionMask = new transitionColor(this.Container,this.Sketch,'cursor',false);

    this.animationSpeed = 1;

    this.Container.addChild(this.ColorBefore);
    this.Container.addChild(this.ColorAfter);
    this.Container.addChild(this.Sketch);

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
    ['click','tap'].forEach(function(e){
        this.Container.on(e,function(){
            callback.onClickTap.apply(this);
        });
    }.bind(this));

    this.Container.on('mouseover',fDebounce(function(e){
        // console.log('Forward');
        TweenMax.to(PersonObject.Container.scale,0.3,{x:"+=0.009",y:"+=0.009",ease: Sine.easeOut,yoyo:true,repeat:1});
        PersonObject.ColorAfter_TransitionMask.play(undefined,this.animationSpeed,undefined);
        PersonObject.Sketch.play();
        callback.onHoverIn.apply(this);
    },200));

    this.Container.on('mouseout',fDebounce(function(e){
        // console.log('Backward');
        PersonObject.ColorAfter_TransitionMask.playReverse(undefined,this.animationSpeed,undefined);
        PersonObject.Sketch.stop();
        callback.onHoverOut.apply(this);
    },200));

    // It is different from bind and call, their role is similar as they
    // specify which is used to be 'this', bind will not run the function
    // but call will run the function immediately

    this.AnimationIn = new TimelineMax({delay: 0.1,paused: true});

    if (browserDetection.isHandheld()) {
        this.AnimationIn.add(
            TweenMax.fromTo(
                [
                    PersonObject.ColorAfter,
                    PersonObject.ColorBefore,
                    PersonObject.Sketch
                ],2,
                {
                    alpha:0
                },
                {
                    alpha:1
                }
            ),0);
    } else {
        this.AnimationIn
            .add(function(){PersonObject.Sketch_TransitionMask.play(0,this.animationSpeed);},0)
            .add(function(){
                PersonObject.ColorBefore_TransitionMask.play(0,0.5);
                PersonObject.ColorBefore_TransitionMask.moving(0);
            },0);
    }

    this.Floating = new TimelineMax({paused:true});
    this.Floating
        .add(TweenMax.to([this.Container.position],Math.random()*2+2,{y: this.Container.position.y+Math.random()*50+50,ease: Sine.easeInOut, repeat:-1, yoyo:true}),1);

    if (autoplay) {
        this.AnimationIn.play();
    }

    this.Stage = new PIXI.Container();
    this.Stage.addChild(this.Container);
    this.addChild(this.Stage);

    this.pivot.set(0,0);
    this.rotation = 0;

    //TweenMax.to(this.Container,10,{rotation:5,repeat:-1});
    //TweenMax.to(this.Stage, 100,{rotation: 500, repeat: -1});

    this.scale.set(scale);
    this.position.set(xPos,yPos);

    DisplayContainer.addChild(this);

    callback.onCreate.apply(this);

}

Person.prototype = Object.create(PIXI.Container.prototype);
Person.prototype.constructor = Person;

var PersonHead;
PersonHead = function (PersonObject,
                       emotionsOffset,
                       rotation
                       ) {

    PIXI.Container.call(this);

    var self = this;
    PersonObject.PersonHead = this;

    emotionsOffset = typeof emotionsOffset !== 'undefined' ?

    {
        normal: {
            x: typeof emotionsOffset.normal !== 'undefined' ? emotionsOffset.normal.x : 0,
            y: typeof emotionsOffset.normal !== 'undefined' ? emotionsOffset.normal.y : 0
        },
        touched: {
            x: typeof emotionsOffset.touched !== 'undefined' ? emotionsOffset.touched.x : 0,
            y: typeof emotionsOffset.touched !== 'undefined' ? emotionsOffset.touched.y : 0
        },
        upLeft: {
            x: typeof emotionsOffset.upLeft !== 'undefined' ? emotionsOffset.upLeft.x : 0,
            y: typeof emotionsOffset.upLeft !== 'undefined' ? emotionsOffset.upLeft.y : 0
        },
        up: {
            x: typeof emotionsOffset.up !== 'undefined' ? emotionsOffset.up.x : 0,
            y: typeof emotionsOffset.up !== 'undefined' ? emotionsOffset.up.y : 0
        },
        upRight: {
            x: typeof emotionsOffset.upRight !== 'undefined' ? emotionsOffset.upRight.x : 0,
            y: typeof emotionsOffset.upRight !== 'undefined' ? emotionsOffset.upRight.y : 0
        },
        downLeft: {
            x: typeof emotionsOffset.downLeft !== 'undefined' ? emotionsOffset.downLeft.x : 0,
            y: typeof emotionsOffset.downLeft !== 'undefined' ? emotionsOffset.downLeft.y : 0
        },
        down: {
            x: typeof emotionsOffset.down !== 'undefined' ? emotionsOffset.down.x : 0,
            y: typeof emotionsOffset.down !== 'undefined' ? emotionsOffset.down.y : 0
        },
        downRight: {
            x: typeof emotionsOffset.downRight !== 'undefined' ? emotionsOffset.downRight.x : 0,
            y: typeof emotionsOffset.downRight !== 'undefined' ? emotionsOffset.downRight.y : 0
        },
        left: {
            x: typeof emotionsOffset.left !== 'undefined' ? emotionsOffset.left.x : 0,
            y: typeof emotionsOffset.left !== 'undefined' ? emotionsOffset.left.y : 0
        },
        right: {
            x: typeof emotionsOffset.right !== 'undefined' ? emotionsOffset.right.x : 0,
            y: typeof emotionsOffset.right !== 'undefined' ? emotionsOffset.right.y : 0
        }
    }
        :
    {

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

    rotation = typeof rotation !== 'undefined' ? rotation : 0;

    // Set for test
    // PersonObject.Prefix = 'GD';

    PersonObject.Emotions = {
        normal: resourceTexture[assetsPath + PersonObject.Prefix + '-Normal.png'].texture,
        touched: resourceTexture[assetsPath + PersonObject.Prefix + '-Touched.png'].texture,
        upLeft: resourceTexture[assetsPath + PersonObject.Prefix + '-Up-Left.png'].texture,
        up: resourceTexture[assetsPath + PersonObject.Prefix + '-Up.png'].texture,
        upRight: resourceTexture[assetsPath + PersonObject.Prefix + '-Up-Right.png'].texture,
        downLeft: resourceTexture[assetsPath + PersonObject.Prefix + '-Down-Left.png'].texture,
        down: resourceTexture[assetsPath + PersonObject.Prefix + '-Down.png'].texture,
        downRight: resourceTexture[assetsPath + PersonObject.Prefix + '-Down-Right.png'].texture,
        left: resourceTexture[assetsPath + PersonObject.Prefix + '-Left.png'].texture,
        right: resourceTexture[assetsPath + PersonObject.Prefix + '-Right.png'].texture
    }

    PersonObject.Head = new PIXI.Sprite(PersonObject.Emotions.normal);
    PersonObject.Head.anchor.set(0.5, 1);
    PersonObject.Head.position.set(PersonObject.xPosHead, PersonObject.yPosHead);
    PersonObject.Head.pivot.set(emotionsOffset.normal.x, emotionsOffset.normal.y);
    PersonObject.Head.scale.set(0.5);
    PersonObject.Head.rotation = rotation;
    PersonObject.Head.alpha = 0;

    PersonObject.PersonHead.addChild(PersonObject.Head);

    PersonObject.Container.addChild(PersonObject.PersonHead);
    PersonObject.Head.interactive = true;


    self.show = function(){
        TweenMax.delayedCall(1, function () {
            PersonObject.ColorAfter_TransitionMask.play();
            PersonObject.Sketch.play();
        });

        TweenMax.delayedCall(0, function () {
            TweenMax.to(PersonObject.Head, 1, {alpha: 1, ease: Sine.easeOut});
            TweenMax.to(PersonObject.Head.scale, 3, {x: 0.8, y: 0.8, ease: Elastic.easeOut});
            TweenMax.fromTo(PersonObject.Head, 1,
                {
                    rotation: "-=0.1"
                },
                {
                    rotation: "+=0.2",
                    ease: Sine.easeInOut,
                    repeat: -1,
                    // repeatDelay:1,
                    yoyo: true,
                    delay: 0.2
                });
        });
    }

    // Animation In Person Color and Sketch
    if (PersonObject.autoplay) {
        self.show();
    }

    self.changeable = true;

    ['click', 'tap'].forEach(function (e) {
        PersonObject.Head.on(e, fThrottle(function (e) {
            Sounds['Click.mp3'].play();
            self.changeable = false;

            if (self.rumble.rumbling) {
                self.rumble.rumbling.paused(true);
                TweenMax.set(PersonObject.Head.position,{
                    x:self.originXPos,
                    y:self.originYPos
                });
            }

            if (PersonObject.isPlayingMusic) {
                Sounds['Dance.mp3'].stop();
                PersonObject.isPlayingMusic = false;
            }

            PersonObject.Head.texture = PersonObject.Emotions.touched;
            PersonObject.Head.pivot.set(emotionsOffset['touched'].x, emotionsOffset['touched'].y);
            self.changeEmotion(2000, 'normal');
        }, 500));
    });

    // console.log(PersonObject.Head);

    ['mousemove','touchend','touchmove'].forEach(function(ev){
        window.addEventListener(ev, fThrottle(function (e) {

            e.clientX = typeof e.clientX !== 'undefined' ? e.clientX : e.changedTouches[0].clientX;
            e.clientY = typeof e.clientY !== 'undefined' ? e.clientY : e.changedTouches[0].clientY;

            distanceX = PersonObject.Head.worldTransform.tx - e.clientX;
            distanceY = PersonObject.Head.worldTransform.ty - e.clientY;

            // console.log(PersonObject.Head.worldTransform.tx+'---'+PersonObject.Head.worldTransform.ty);

            angle = 180-Math.atan2(distanceY, distanceX)*(180/Math.PI);

            //angle = Math.floor(67.5 + Math.atan(distanceY/distanceX)*(180/Math.PI));
            //console.log(angle);

            if (self.changeable) {
                if ((distanceX<=-200 || distanceX>=200) || (distanceY<=-200 || distanceY>=200)) {

                    if ((angle > 0 && angle <= 22.5) || (angle>337.5 && angle <= 360)) {
                        self.changeEmotion(0,'right');
                    }

                    if (angle > 22.5 && angle <= 67.5) {
                        self.changeEmotion(0,'upRight');
                    }

                    if (angle > 67.5 && angle <= 112.5) {
                        self.changeEmotion(0,'up');
                    }

                    if (angle > 112.5 && angle <= 157.5) {
                        self.changeEmotion(0,'upLeft');
                    }

                    if (angle > 157.5 && angle <= 202.5) {
                        self.changeEmotion(0,'left');
                    }

                    if (angle > 202.5 && angle <= 247.5) {
                        self.changeEmotion(0,'downLeft');
                    }

                    if (angle > 247.5 && angle <= 292.5) {
                        self.changeEmotion(0,'down');
                    }

                    if (angle > 292.5 && angle <= 337.5) {
                        self.changeEmotion(0,'downRight');
                    }
                } else {
                    self.changeEmotion(0,'normal');
                }
            }

        },100));
    });

    self.changeEmotion = fDelay(function (delay, emotion) {
        emotion = typeof emotion !== 'undefined' ? emotion : 'normal';
        PersonObject.Head.texture = PersonObject.Emotions[emotion];
        PersonObject.Head.pivot.set(emotionsOffset[emotion].x, emotionsOffset[emotion].y);
        self.changeable = true;
    });

    self.rumble = function(){

        if (!self.rumble.rumbling) {
            self.originXPos =  PersonObject.Head.position.x;
            self.originYPos =  PersonObject.Head.position.y;
        }

        self.rumble.rumbling = TweenMax.fromTo(PersonObject.Head.position,0.2,{
            x:self.originXPos-3,
            y:self.originYPos-3
        },{
            x:self.originXPos+6,
            y:self.originYPos+6,
            immediateRender: false,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        });

    };

};

PersonHead.prototype = Object.create(PIXI.Container.prototype);
PersonHead.prototype.constructor = PersonHead;

var PersonDetail = function(object)

    {

        var self = this;

        object = {
            personObject : object.personObject,
            type : typeof object.type !== 'undefined' ? object.type : 'Personal Topic',
            name : typeof object.name !== 'undefined' ? object.name : 'Personal Name',
            content : typeof object.content !== 'undefined' ? object.content : 'Personal Profile Details',
            time : typeof object.time !== 'undefined' ? object.time : '0:00 AM',
            backgroundContent : typeof object.backgroundContent !== 'undefined' ? object.backgroundContent : 'Personal Background Detail'
        };

        PIXI.Container.call(this);

        //console.log(object.personObject);

        this.type = new Thing(
            this,
            resourceTexture[assetsPath + object.type + '.png'].texture,
            resourceTexture[assetsPath + object.type + '-Color.png'].texture,
            50,
            -330,
            0.75,
            false,
            1,
            {
                onCreate: fDebounce(function(){
                    this.zoomInRight.play(0)
                    this.show.play(0);
                },1000),
                onClickTap: fThrottle(function() {

                    Sounds['Click.mp3'].play();

                    if (!object.personObject.isPlayingMusic) {
                        Sounds['Dance.mp3'].play();
                        object.personObject.isPlayingMusic = true;
                    }

                    TweenMax.to(this.Stage.scale,0.15,{x:"-=0.1",y:"-=0.1",yoyo:true,repeat:1});
                    TweenMax.to(this.Stage,0.15,{rotation:"+=0.1",yoyo:true,repeat:1});

                    if (object.personObject.PersonHead) {
                        object.personObject.PersonHead.rumble();
                    }

                },500)
            });

        this.name = new Text(
            this,
            object.name,
            'title',
            120,
            0,
            -150,
            1,
            0,
            false
        );

        this.name.Content.anchor.set(0,0.5);
        this.name.Content.style.letterSpacing = 3;

        this.content = new Text(
            this,
            object.content,
            'content',
            30,
            0,
            -75,
            1,
            10,
            false
        );

        this.content.Content.anchor.set(0,0);
        this.content.Content.style.wordWrap = true;
        this.content.Content.style.wordWrapWidth = 500;
        this.content.Content.style.lineHeight = 44;
        this.content.Content.style.letterSpacing = 2;

        // Reset Padding Ratio
        this.content.Content.scale.y = this.content.Content.height/(this.content.Content.height - (this.content.Content.style.padding*2));

        this.time = new Text(
            this,
            object.time,
            '3d',
            77,
            0,
            400,
            1,
            0,
            false
        );

        var wtColon = this.time.Content.text;
        var wtoutColon = this.time.Content.text.replace(/\:/," ");

        Clock_Blink = new TimelineMax({
            repeat:-1,
            repeatDelay:0.5,
            paused: true,
            onRepeat: function(){
                this.time.Content.text = this.time.Content.text == wtColon ? wtoutColon : wtColon;
            }.bind(this)
        });

        this.time.Content.interactive = true;
        this.time.Content.on('mouseover',fThrottle(function(){
            Clock_Blink.paused(false);
        }.bind(this)),100);
        this.time.Content.on('mouseout',fThrottle(function(){
            Clock_Blink.paused(true);
            this.time.Content.text = this.time.Content.text == wtoutColon ? wtColon : wtColon;
        }.bind(this)),100);


        this.backgroundContent = new Text(
            this,
            object.backgroundContent,
            'content',
            30,
            0,
            500,
            1,
            10,
            false
        );

        this.backgroundContent.Content.style.align = 'center';
        this.backgroundContent.Content.style.wordWrap = true;
        this.backgroundContent.Content.style.wordWrapWidth = window.innerWidth;
        this.backgroundContent.Content.style.lineHeight = 44;
        this.backgroundContent.Content.style.letterSpacing = 2;

        // Reset Padding Ratio
        this.backgroundContent.Content.anchor.set(0.5,0);
        this.backgroundContent.Content.scale.y = this.backgroundContent.Content.height/(this.backgroundContent.Content.height - (this.backgroundContent.Content.style.padding*2));

        this.Close = new PIXI.Sprite(resourceTexture[assetsPath+'Close.png'].texture);
        this.Close.scale.set(0.75);
        this.Close.anchor.set(0.5);
        this.Close.position.set(0,this.backgroundContent.Stage.position.y+this.backgroundContent.Content.height);
        object.personObject.addChild(this.Close);
        this.Close.interactive = true;

        ['click','tap'].forEach(function(e){
            this.Close.on(e,fThrottle(function(ev){
                Sounds['Click.mp3'].play();

                if (object.personObject.isPlayingMusic) {
                    Sounds['Dance.mp3'].stop();
                    object.personObject.isPlayingMusic = false;
                }

                object.personObject.callback.onDestroy.apply(this);
                TweenMax.to(object.personObject.position,0.5,{y:"-=2000",ease: Back.easeIn});
                TweenMax.to(object.personObject,1,{alpha:0,onComplete:function(){

                }.bind(this)});
                setTimeout(function(){
                    object.personObject.renderable = false;
                    object.personObject.visible = false;
                    object.personObject.parent.removeChild(object.personObject);
                }.bind(this),1000);

            }.bind(this),3000));
        }.bind(this));

        this.Close.on('mouseover',fThrottle(function(){
            TweenMax.to(this.Close.scale,0.125,{x:"+=0.1",y:"+=0.1",ease: Sine.easeOut, repeat:1, yoyo:true});
        }.bind(this),250));

        this.show = new TimelineMax({paused:true});

        this.show.add(TweenMax.from(this.name.Container.position,1,{x:"+=200",ease:Sine.easeOut}),0);
        this.show.add(TweenMax.from(this.name.Container,2,{alpha:0}),0);
        this.show.add(TweenMax.from(this.content.Container.position,1,{x:"+=200",ease:Sine.easeOut}),0.5);
        this.show.add(TweenMax.from(this.content.Container,2,{alpha:0}),0.5);
        this.show.add(TweenMax.from(this.time.Container.position,1,{x:"+=200",ease:Sine.easeOut}),1);
        this.show.add(TweenMax.from(this.time.Container,2,{alpha:0}),1);
        this.show.add(TweenMax.from(this.backgroundContent.Container.position,1,{x:"+=200",ease:Sine.easeOut}),1.5);
        this.show.add(TweenMax.from(this.backgroundContent.Container,2,{alpha:0}),1.5);
        this.show.add(TweenMax.from(this.Close.scale,0.5,{x:0,y:0,ease:Back.easeOut}),2);
        this.show.play(0);

        object.personObject.Stage.position.set(-object.personObject.Stage.width/2+50,0);
        object.personObject.addChild(this);



    };

PersonDetail.prototype = Object.create(PIXI.Container.prototype);
PersonDetail.prototype.constructor = PersonDetail;