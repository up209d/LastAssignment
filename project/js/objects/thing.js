/**
 * Created by UP on 5/22/16.
 */

var Thing = function(DisplayContainer,Sketch,Color,xPos,yPos,scale) {

    var self = this;

    scale = typeof scale !== 'undefined' ? scale : 1;

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
    //console.log(this.ColorMaskSketch);

    this.Container.addChild(this.Color);
    this.Container.addChild(this.Sketch);

    this.DisplacementSprite = new PIXI.extras.TilingSprite(resourceTexture[assetsPath+'ShakingDisplacement.png'].texture,this.Sketch.width,this.Sketch.height);
    this.DisplacementSprite.anchor.set(0.5);
    this.DisplacementSprite.position.set(xPos,yPos);
    this.DisplacementSprite.scale.set(1);
    console.log(this.DisplacementSprite);

    this.DisplacementFilter = new PIXI.filters.DisplacementFilter(this.DisplacementSprite);
    this.DisplacementFilter.padding = 10;
    TweenMax.fromTo(this.DisplacementFilter.scale,1/8,{x:scale*1,y:scale*1},{x:scale*5,y:scale*5,ease:SteppedEase.config(1),yoyo:true,repeat:-1});
    console.log(this.DisplacementFilter);

    this.Container.filters = [this.DisplacementFilter];

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

    this.Stage.pivot.set(xPos,yPos);
    this.Stage.position.set(xPos,yPos);
    this.Stage.scale.set(scale);


    var showTimeout;

    Thing.prototype.show = function(delay) {
        delay = typeof delay !== 'undefined' ? delay : 0;
        debounce(function(){

            debounce(function(){
                this.ColorMask.object.gotoAndPlay(0);
            }.bind(this),1500);

            debounce(function(){
                this.SketchMask.object.gotoAndPlay(0);
            }.bind(this),500);

        }.bind(this),delay);
    }

    this.show();

    DisplayContainer.addChild(this.Stage);

}