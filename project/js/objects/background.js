var Background = function(DisplayContainer) {

    var self = this;

    this.paper = resourceTexture[assetsPath+'paper.png'].texture;

    this.bg = new PIXI.extras.TilingSprite(this.paper,window.innerWidth*4,window.innerHeight*4);
    this.bg.anchor.x = 0.5;
    this.bg.anchor.y = 0.5;
    //this.bg.alpha = 0.05;

    this.bg.width = window.innerWidth*8;
    this.bg.height =  window.innerHeight*4;

    this.bg.position.x = window.innerWidth/2;
    this.bg.position.y = window.innerHeight/2;
    this.bg.interactive = true;

    this.bgContainer = new PIXI.Container();
    this.bgContainer.addChild(this.bg);

    // this.bgDisplacementSprite = new PIXI.Sprite(resourceTexture['assets/Test/dis2.jpeg'].texture);
    // this.bgDisplacementSprite.anchor.set(0.5);
    // this.bgDisplacementSprite.scale.set(15);
    // this.bgDisplacementSprite.position.set(window.innerWidth/2,window.innerHeight/2);
    //
    // this.bgDisplacementFilter = new PIXI.filters.DisplacementFilter(this.bgDisplacementSprite);
    // this.bgDisplacementFilter.glShaderKey += Math.floor(Math.random()*100000+5000);
    // this.bgDisplacementFilter.scale.set(50);
    //
    // this.bg.filters = [this.bgDisplacementFilter];
    //
    // this.bgDisplacementFilter.scale.set(10);
    //
    // TweenMax.fromTo(this.bgDisplacementFilter.scale,1,{x:0,y:0},{x:20,y:20,ease: Sine.easeInOut,repeat:-1,yoyo:true});
    // TweenMax.fromTo(this.bgDisplacementSprite.position,20,{x:0,y:0},{x:1000,y:1000,repeat:-1,ease: Sine.easeOut,yoyo:true});
    //

    //DisplayContainer.addChildAt(this.bgContainer,0);
    this.Stage = new PIXI.Container();
    this.Stage.addChild(this.bgContainer);
    // this.Stage.addChild(this.bgDisplacementSprite);

    DisplayContainer.addChild(this.Stage);

    Background.prototype.bgMoving = function(eventData) {

        // console.log(eventData.data.global.x)

        posX = this.bg.position.x + (window.innerWidth/2 - eventData.data.global.x)*0.1;
        // posX = (posX < (window.innerWidth/2 + -0.1*window.innerWidth/2) ? (window.innerWidth/2 + -0.1*window.innerWidth/2) : ((posX > (window.innerWidth/2 + 0.1*window.innerWidth/2)) ? (window.innerWidth/2 + 0.1*window.innerWidth/2)) : posX);

        posX = (posX < (window.innerWidth/2 + -0.1*window.innerWidth/2)) ? (window.innerWidth/2 + -0.1*window.innerWidth/2) : posX > (window.innerWidth/2 + 0.1*window.innerWidth/2) ? (window.innerWidth/2 + 0.1*window.innerWidth/2) : posX ;

        posY = this.bg.position.y + (window.innerHeight/2 - eventData.data.global.y)*0.1;

        posY = (posY < (window.innerHeight/2 + -0.1*window.innerHeight/2)) ? (window.innerHeight/2 + -0.1*window.innerHeight/2) : posY > (window.innerHeight/2 + 0.1*window.innerHeight/2) ? (window.innerHeight/2 + 0.1*window.innerHeight/2) : posY ;

        // console.log(posX+'---'+posY);

        TweenMax.to(this.bg.position, 20, {x: posX,y: posY,ease: Expo.easeOut});

    };

    object = this;

    // this.bg.on('mousemove',function(eventData){
    //     object.bgMoving(eventData);
    // });

    // this.bg
    //     .on('mousedown',function(){
    //
    // })
    //     .on('mouseup',function(){
    //
    //         this.bg
    //             .off('mousemove',function(e){});
    //
    // });


}


