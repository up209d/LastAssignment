var transitionColor = function(DisplayContainer,object,type,autoplay,timeout) {

    var self = this;

    //console.log('Now creating mask');
    autoplay = typeof autoplay !== 'undefined' ? autoplay : true;

    timeout = typeof timeout !== 'undefined' ? timeout : 0;

    type = typeof type !== "undefined" ? type : 'water';
    //console.log(type);

    this.textures = [];

    switch (type) {
        case 'water': {
            for (i=0;i<90;i++) {
                this.textures.push(resourceTexture[assetsClipPath+'Water-'+i+'.jpg'].texture);
            }
            break;
        }

        case 'splash': {
            for (i=0;i<90;i++) {
                this.textures.push(resourceTexture[assetsClipPath+'Splash-'+i+'.png'].texture);
            }
            break;
        }

        case 'cursor': {
            //console.log('Here');
            for (i=0;i<90;i++) {
                this.textures.push(resourceTexture[assetsClipPath+'Cursor-'+i+'.png'].texture);
            }
            break;
        }

        default: {
            for (i=0;i<90;i++) {
                this.textures.push(resourceTexture[assetsClipPath+'Cursor-'+i+'.png'].texture);
            }
            break;
        }
    }


    // this.texture = PIXI.Texture(resourceTexture[assetsClipSheetsPath+'clips.png'].texture.baseTexture);
    // this.frameOriginWidth = 200;
    // this.frameOriginHeight = 200;
    // this.frameCols = 20;
    // this.frameRows = 14;

    // this.mask = new PIXI.Sprite(resourceTexture[assetsClipSheetsPath+'clips.png'].texture);
    // this.mask.anchor.set(0);
    // // this.mask.alpha = 0.1;
    //
    // if (object.width>object.height) {
    //     this.mask.scale.set(object.width/this.frameOriginWidth);
    // } else {
    //     this.mask.scale.set(object.height/this.frameOriginHeight);
    // }
    //
    // // Pivot doesnt affected by scale
    // this.mask.pivot.set(this.frameOriginWidth/2,this.frameOriginHeight/2);
    //
    // this.Timeline = new TimelineMax({
    //     repeat: -1
    // });
    //
    //
    // this.stepEase = new SteppedEase(this.frameCols-1);
    //
    // for (i=0;i<this.frameRows;i++) {
    //     this.Timeline.add(
    //         TweenMax.fromTo(this.mask.position,
    //             1/4,
    //             {
    //                 x:0*this.mask.scale.x,
    //                 y:-this.frameOriginHeight*this.mask.scale.y*i
    //             },
    //             {
    //                 x:-this.frameOriginWidth*this.mask.scale.x*(this.frameCols-1),
    //                 y:-this.frameOriginHeight*this.mask.scale.y*i,
    //                 immediateRender: false,
    //                 ease: this.stepEase
    //             })
    //     );
    // }

    // DisplayContainer.addChild(this.mask);

    // object.mask = this.mask;


    this.object = new PIXI.extras.MovieClip(this.textures);
    this.maskFilter = new PIXI.SpriteMaskFilter(this.object);
    // console.log(object);
    this.object.anchor.set(0.5);
    //this.object.position.set(object.position.x-(object.width*object.anchor.x)+(object.width/2),object.position.y-(object.height*object.anchor.y)+(object.height/2));

    if (object.width>object.height) {
        this.object.scale.set(object.width/this.object.width);
    } else {
        this.object.scale.set(object.height/this.object.height);
    }


    this.object.renderable = false;
    DisplayContainer.addChild(this.object);



    if (browserDetection.isHandheld()) {
        this.object.visible = false;
    } else {
        object.mask = this.object;
    }

    this.object.animationSpeed = 1;
    this.object.loop = false;
    this.object.gotoAndStop(0);

    this.object.interactive = true;

    // this.object.on('mousedown',function(e){
    //     e.target.gotoAndPlay(0);
    // });

    if (autoplay) {
        setTimeout(function(){
            self.object.gotoAndPlay(0);
        },timeout);
    }


    // Callback each time stop playing
    this.object.onComplete = function(e){this}

    transitionColor.prototype.play = function(frame,speed,delay) {
        frame = typeof frame == 'undefined' ? this.object.currentFrame : frame > this.object.totalFrames ? this.object.totalFrames : frame;
        //console.log(frame);
        speed = typeof speed !== 'undefined' ? speed : 1;
        delay = typeof delay !== 'undefined' ? delay : 0;
        this.object.playFromTo(frame,this.object.totalFrames-1,speed,delay);
    }

    transitionColor.prototype.playReverse = function(frame,speed,delay) {
        frame = typeof frame == 'undefined' ? this.object.currentFrame : frame < 0 ? 0 : frame;
        //console.log(frame);
        speed = typeof speed !== 'undefined' ? speed : 1;
        delay = typeof delay !== 'undefined' ? delay : 0;
        this.object.playFromTo(frame,0,speed,delay);
    }

    transitionColor.prototype.moving = function() {
        TweenMax.fromTo(this.object.scale,4,{x: "-=0.05",y: "-=0.05"},{x: "+=0.5",y: "+=0.5",yoyo: true,repeat:-1});
        TweenMax.to(this.object,150,{rotation: "+="+2*Math.PI,ease: Power0.easeNone,repeat:-1,immediateRender: false});
    }



}
