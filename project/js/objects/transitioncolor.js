var transitionColor = function(stage,object,type,autoplay,timeout) {

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
    
    this.object = new PIXI.extras.MovieClip(this.textures);

    this.object.anchor.set(0.5);
    this.object.position.set(object.position.x-(object.width*object.anchor.x)+(object.width/2),object.position.y-(object.height*object.anchor.y)+(object.height/2));

    if (object.width>object.height) {
        this.object.scale.set(object.width/this.object.width);
    } else {
        this.object.scale.set(object.height/this.object.height);
    }
    
    stage.addChild(this.object);

    object.mask = this.object;


    this.object.animationSpeed = 0.75;
    this.object.loop = false;
    this.object.gotoAndStop(0);

    this.object.interactive = true;

    // this.object.on('mousedown',function(e){
    //     e.target.gotoAndPlay(0);
    // });

    if (autoplay) {
        setTimeout(function(){self.object.gotoAndPlay(0);},timeout);
    }


    // Callback each time stop playing
    this.object.onComplete = function(e){this}

    transitionColor.prototype.play = function(frame) {
        frame = typeof frame == 'undefined' ? 0 : frame > this.object.totalFrames ? this.object.totalFrames : frame;
        //console.log(frame);
        this.object.gotoAndPlay(frame);
    }

}
