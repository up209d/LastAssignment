/**
 * Created by UP on 5/25/16.
 */
var Text = function(DisplayContainer,content,font,size,xPos,yPos,scale) {

    var self = this;

    scale =  typeof scale !== 'undefined' ? scale : 1;

    switch (font) {
        case '3d': {
            this.font = 'kg_summer_sunshineregular';
            break;
        }
        case 'title':
        {
            this.font = 'always_foreverbold';
            break;
        }
        case 'normal': {
            this.font = 'dk_pimpernelregular';
            break;
        }
        default: {
            this.font = 'kg_summer_sunshineregular';
            break;
        }
    }


    this.Container = new PIXI.Container();
    this.Stage = new PIXI.Container();

    this.Content = new PIXI.Text(content,{fontFamily: this.font,fontSize: size});
    this.Content.anchor.set(0.5);

    this.Container.addChild(this.Content);

    this.DisplacementSprite = new PIXI.Sprite(resourceTexture[assetsPath+'ShakingDisplacement.png'].texture);
    this.DisplacementSprite.anchor.set(0.5);
    this.DisplacementSprite.position.set(0,0);
    
    if (this.Content.width>this.Content.height) {
        this.DisplacementSprite.width = this.DisplacementSprite.height = this.Content.width;
    } else {
        this.DisplacementSprite.width = this.DisplacementSprite.height = this.Content.height;
    }



    this.DisplacementFilter = new PIXI.filters.DisplacementFilter(this.DisplacementSprite);
    this.DisplacementFilter.padding = 100;
    TweenMax.fromTo(this.DisplacementFilter.scale,1/8,{x:scale*1,y:scale*1},{x:scale*8,y:scale*8,ease:SteppedEase.config(3),yoyo:true,repeat:-1,delay:Math.abs(Math.random()*0.5+0.3)});
    //console.log(this.DisplacementFilter);
    this.DisplacementFilter.glShaderKey += Math.floor(Math.random()*100000+5000);

    this.Container.filters = [this.DisplacementFilter];

    this.Stage.addChild(this.Container);
    this.Stage.addChild(this.DisplacementSprite);

    this.Stage.position.set(xPos,yPos);
    this.Stage.scale.set(scale);

    DisplayContainer.addChild(this.Stage);

}