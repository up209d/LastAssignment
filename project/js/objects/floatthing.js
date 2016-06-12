var FloatThing = function(
    DisplayContainer,
    Prefix,
    Count,
    HPadding,
    VPadding
) {
    // this.Container = new PIXI.ParticleContainer(1000,{
    //     scale: true,
    //     position: true,
    //     alpha: true,
    //     rotation: true
    // });
    // this.ContainerBlur = new PIXI.ParticleContainer(1000,{
    //     scale: true,
    //     position: true,
    //     alpha: true,
    //     rotation: true
    // });

    var self = this;

    this.Container = new PIXI.Container(1000,{
        scale: true,
        position: true,
        alpha: true,
        rotation: true
    });

    this.ContainerBlur = new PIXI.Container(1000,{
        scale: true,
        position: true,
        alpha: true,
        rotation: true
    });

    this.BlurFilter = new PIXI.filters.BlurFilter();
    this.BlurFilter.blur = 1;
    this.ColorMatrix = new PIXI.filters.ColorMatrixFilter();

    self.floating = function(e) {
        TweenMax.fromTo(e.position,Math.random()*1.5+1.5,{y:"-=0"},{y: "+="+Math.random()*20,yoyo:true,repeat:-1,ease: Sine.easeInOut});
        TweenMax.fromTo(e,Math.random()*1.5+1.5,{rotation:"-=0"},{rotation: "+="+1/4*Math.sin(Math.random()*4*Math.PI),yoyo:true,repeat:-1,ease: Sine.easeInOut});
    }

    var VerticalStart,HorizontalStart;

    var TextureArray = convertObj(resourceTexture[assetsClipSheetsPath+Prefix+'.json'].textures);

    // console.log(TextureArray);

    for (i=0;i<Count;i++) {

        if (Math.floor(Math.random()*2) == 0) {
            VerticalStart = Math.floor(Math.random()*window.innerHeight);
            if ((VerticalStart<((window.innerHeight-VPadding)/2)) || (VerticalStart>(((window.innerHeight-VPadding)/2)+VPadding))) {
                HorizontalStart = Math.floor(Math.random()*window.innerWidth);
            } else {

                HorizontalStart = Math.floor(Math.random()*((window.innerWidth-HPadding)/2)) + Math.floor(Math.random()*2)*(HPadding+(window.innerWidth-HPadding)/2);
            }
        } else {
            HorizontalStart = Math.floor(Math.random()*window.innerWidth);
            if ((HorizontalStart<((window.innerWidth-HPadding)/2)) || (HorizontalStart>(((window.innerWidth-HPadding)/2)+HPadding))) {
                VerticalStart = Math.floor(Math.random()*window.innerHeight);
            } else {

                VerticalStart = Math.floor(Math.random()*((window.innerHeight-VPadding)/2)) + Math.floor(Math.random()*2)*(VPadding+(window.innerHeight-VPadding)/2);
            }
        }


        var eachSprite = new PIXI.Sprite(TextureArray[Math.floor(Math.random()*TextureArray.length)]);
        eachSprite.anchor.set(0.5);
        eachSprite.position.set(HorizontalStart,VerticalStart);
        eachSprite.scale.set(Math.random()*0.5+1);
        eachSprite.alpha = Math.random()*0.2+0.1;
        self.floating(eachSprite);
        TweenMax.from(eachSprite,Math.random()*2,{alpha:0,delay:Math.random()*5});
        this.ContainerBlur.addChild(eachSprite);
    }

    if (!browserDetection.isHandheld()) {
        if(this.ContainerBlur.filters) {
            this.ContainerBlur.filters.push(this.ColorBeforeFilter);
        } else {
            this.ContainerBlur.filters = [this.BlurFilter];
        }
    }


    for (i=0;i<Count;i++) {

        if (Math.floor(Math.random()*2) == 0) {
            VerticalStart = Math.floor(Math.random()*window.innerHeight);
            if ((VerticalStart<((window.innerHeight-VPadding)/2)) || (VerticalStart>(((window.innerHeight-VPadding)/2)+VPadding))) {
                HorizontalStart = Math.floor(Math.random()*window.innerWidth);
            } else {

                HorizontalStart = Math.floor(Math.random()*((window.innerWidth-HPadding)/2)) + Math.floor(Math.random()*2)*(HPadding+(window.innerWidth-HPadding)/2);
            }
        } else {
            HorizontalStart = Math.floor(Math.random()*window.innerWidth);
            if ((HorizontalStart<((window.innerWidth-HPadding)/2)) || (HorizontalStart>(((window.innerWidth-HPadding)/2)+HPadding))) {
                VerticalStart = Math.floor(Math.random()*window.innerHeight);
            } else {

                VerticalStart = Math.floor(Math.random()*((window.innerHeight-VPadding)/2)) + Math.floor(Math.random()*2)*(VPadding+(window.innerHeight-VPadding)/2);
            }
        }


        var eachSprite = new PIXI.Sprite(TextureArray[Math.floor(Math.random()*TextureArray.length)]);
        eachSprite.anchor.set(0.5);
        eachSprite.position.set(HorizontalStart,VerticalStart);
        eachSprite.scale.set(Math.random()*0.8+0.2);
        eachSprite.alpha = 1;
        eachSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        self.floating(eachSprite);
        TweenMax.from(eachSprite,Math.random()*2,{alpha:0,delay:Math.random()*5});
        this.Container.addChild(eachSprite);
    }

    this.Stage = new PIXI.Container();

    this.Stage.addChild(this.Container);
    this.Stage.addChild(this.ContainerBlur);

    this.allSprites = this.Container.children.concat(this.ContainerBlur.children);

    this.wavingHandler = self.waving.bind(self);

    ['click','touchend'].forEach(function(e){
        window.addEventListener(e,self.wavingHandler);
    });

    DisplayContainer.addChild(this.Stage);
}

FloatThing.prototype.waving = fThrottle(
    function(event){
        event.clientX = typeof event.clientX !== 'undefined' ? event.clientX : event.changedTouches[0].clientX;
        event.clientY = typeof event.clientY !== 'undefined' ? event.clientY : event.changedTouches[0].clientY;
        this.allSprites.forEach(function(child){
            if ((child.position.x>(event.clientX-200)) && (child.position.x<(event.clientX+200))) {
                if ((child.position.y>(event.clientY-200)) && (child.position.y<(event.clientY+200))) {
                    TweenMax.to(child.scale,0.5,{
                        x: "+=0.3",
                        y: "+=0.3",
                        //delay: (Math.abs(child.position.y-event.clientY)/200)*0.5,
                        immediateRender: false,
                        yoyo: true,
                        repeat: 1,
                        ease: Back.easeInOut
                    });

                    var currentPosition = {
                        x: child.position.x,
                        y: child.position.y
                    }

                    TweenMax.to(child.position,0.5,{
                        x: "+="+((child.position.x-event.clientX)/200)*200,
                        y: "+="+((child.position.y-event.clientY)/200)*200,
                        delay: (Math.abs(child.position.x-event.clientX)/200)*0.5,
                        immediateRender: false,
                        ease: Sine.easeOut,
                        onComplete: function(){
                            TweenMax.to(child,2,{
                                x: currentPosition.x,
                                y: currentPosition.y,
                                immediateRender: false,
                                ease: Back.easeOut.config(0.5)
                                //onComplete: self.floating(child)
                            })
                        }
                    });
                }
            }
        });
    },1000);

FloatThing.prototype.removeAll = function() {
    var self = this;
    ['click','touchend'].forEach(function(e){
        window.removeEventListener(e,self.wavingHandler);
    });
    try {
        this.allSprites.forEach(function(e){
            for (var o in e) {
                TweenMax.killTweensOf([e,e.position,e.scale,e.anchor,e.pivot]);
            }
            e.parent.removeChild(e);
            e.destroy(false);
        });
        TweenMax.killTweensOf([this.Stage,this.Container,this.ContainerBlur]);
        this.Stage.parent.removeChild(this.Stage);
        this.Stage.renderable = false;
        this.Stage.visible = false;
        this.Stage.destroy(true);
    } catch (e) {
        console.log(e);
    }
}