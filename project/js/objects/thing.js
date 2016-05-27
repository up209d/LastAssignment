/**
 * Created by UP on 5/22/16.
 */

var Thing = function(DisplayContainer,Sketch,Color,xPos,yPos,scale, autoplay, delayTime) {

    var self = this;

    scale = typeof scale !== 'undefined' ? scale : 1;
    autoplay = typeof autoplay !== 'undefined' ? autoplay : true;
    delayTime = typeof delayTime !== 'undefined' ? delayTime : 0;

    this.Container = new PIXI.Container();

    this.Sketch = new PIXI.Sprite(Sketch);
    this.Sketch.anchor.set(0.5);
    this.Sketch.position.set(xPos,yPos);
    TweenMax.fromTo(this.Sketch,1,{alpha:0},{alpha:1,ease: Sine.easeOut});

    this.Color = new PIXI.Sprite(Color);
    this.Color.anchor.set(0.5);
    this.Color.position.set(xPos,yPos);


    this.ColorMask = new transitionColor(this.Container,this.Color,'water',false);
    this.SketchMask = new transitionColor(this.Container,this.Sketch,'water',false);
    this.SketchMask.object.animationSpeed = 1;
    //console.log(this.ColorMaskSketch);

    this.Container.addChild(this.Color);
    this.Container.addChild(this.Sketch);

    this.DisplacementSprite = new PIXI.Sprite(resourceTexture[assetsPath+'ShakingDisplacement.png'].texture);
    this.DisplacementSprite.anchor.set(0.5);
    this.DisplacementSprite.position.set(0,0);

    if (this.Sketch.width>this.Sketch.height) {
        this.DisplacementSprite.width = this.DisplacementSprite.height = this.Sketch.width;
    } else {
        this.DisplacementSprite.width = this.DisplacementSprite.height = this.Sketch.height;
    }


    this.DisplacementFilter = new PIXI.filters.DisplacementFilter(this.DisplacementSprite);
    this.DisplacementFilter.padding = 100;
    TweenMax.fromTo(this.DisplacementFilter.scale,1/15,{x:scale*0.5,y:scale*0.5},{x:scale*6,y:scale*6,ease:SteppedEase.config(1),yoyo:true,repeat:-1});
    //console.log(this.DisplacementFilter);
    this.DisplacementFilter.glShaderKey += Math.floor(Math.random()*100000+5000);

    this.DisplacementSpriteAround = new PIXI.Sprite(resourceTexture[assetsPath+'ShakingDisplacementAround.png'].texture);
    this.DisplacementSpriteAround.anchor.set(0.5);
    this.DisplacementSpriteAround.position.set(xPos,yPos);
    this.DisplacementSpriteAround.alpha = 0.5;

    if (this.Sketch.width>=this.Sketch.height) {

        this.DisplacementSpriteAround.scale.set(this.Sketch.width/this.DisplacementSpriteAround.width);

    } else {

        this.DisplacementSpriteAround.scale.set(this.Sketch.height/this.DisplacementSpriteAround.height);

    }

    this.DisplacementFilterAround = new PIXI.filters.DisplacementFilter(this.DisplacementSpriteAround);
    this.DisplacementFilterAround.padding = 100;
    TweenMax.fromTo(this.DisplacementFilterAround.scale,1/(Math.random()*4+2),{x:scale*0.5,y:scale*0.5},{x:scale*5,y:scale*5,ease:SteppedEase.config(1),yoyo:true,repeat:-1});
    //console.log(this.DisplacementFilterAround);
    this.DisplacementFilterAround.glShaderKey += Math.floor(Math.random()*1000+500);


    this.Container.filters = [this.DisplacementFilter];
    this.Sketch.filters = [this.DisplacementFilterAround];

    // this.ColorFilter =  new PIXI.filters.ColorMatrixFilter();
    //
    // this.Color.filters = [this.ColorFilter];
    //
    // console.log(this.ColorFilter.matrix);

    // Any function with this ColorMatrix Filter
    // The value run from -1 to 1

    // Matrix 5 x 4

    //   R G B A O
    //R  1
    //G    1
    //B      1
    //A       1

    // Can change any state by access to matrix[0 to 19] here
    this.Stage = new PIXI.Container();

    this.Stage.addChild(this.Container);
    this.Stage.addChild(this.DisplacementSprite);
    this.Stage.addChild(this.DisplacementSpriteAround);

    this.Stage.pivot.set(xPos,yPos);
    this.Stage.position.set(xPos,yPos);
    this.Stage.scale.set(scale);

    Thing.prototype.show = function(delay) {
        delay = typeof delay !== 'undefined' ? delay : 0;

        debounce(function(){

            this.ColorMask.object.gotoAndStop(0);
            this.SketchMask.object.gotoAndStop(0);

            debounce(function(){
                this.ColorMask.object.gotoAndPlay(0);
            }.bind(this),500);

            debounce(function(){
                this.SketchMask.object.gotoAndPlay(0);
            }.bind(this),0);

        }.bind(this),delay);
    }

    if (autoplay) {
        this.show(delayTime);
    }


    this.Stage.interactive = true;
    this.Stage.on('mousedown',function(){this.show();}.bind(this));
    DisplayContainer.addChild(this.Stage);


}