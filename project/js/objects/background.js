var Background = function(DisplayContainer) {

    this.paper = resourceTexture[assetsPath+'paper.png'].texture;
    
    this.bg = new PIXI.extras.TilingSprite(this.paper,window.innerWidth,window.innerHeight);
    this.bg.anchor.x = 0.5;
    this.bg.anchor.y = 0.5;

    this.bg.width = window.innerWidth*8;
    this.bg.height =  window.innerHeight*8;

    this.bg.position.x = window.innerWidth/2;
    this.bg.position.y = window.innerHeight/2;
    this.bg.interactive = true;

    this.bgContainer = new PIXI.Container();
    this.bgContainer.addChild(this.bg);

    //DisplayContainer.addChildAt(this.bgContainer,0);
    DisplayContainer.addChild(this.bgContainer);

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

    this.bg.on('mousemove',function(eventData){
        object.bgMoving(eventData);
    });

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


