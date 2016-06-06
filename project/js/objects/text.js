/**
 * Created by UP on 5/25/16.
 */
var Text = function(DisplayContainer,content,font,size,xPos,yPos,scale,letterspacing) {

    var self = this;

    scale =  typeof scale !== 'undefined' ? scale : 1;

    this.size = size;
    
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
            this.font = 'kg_first_time_in_foreverRg';
            break;
        }
        default: {
            this.font = 'dk_pimpernelregular';
            break;
        }
    }


    switch (letterspacing) {
        case 'wide': {
            this.charcode = 8202;
            content = content.split('').join(String.fromCharCode(this.charcode));
            break;
        }

        case 'wider': {
            this.charcode = 8201;
            content = content.split('').join(String.fromCharCode(this.charcode));
            break;
        }

        case 'widest': {
            this.charcode = 8195;
            content = content.split('').join(String.fromCharCode(this.charcode));
            break;
        }

        default: {
            break;
        }
    }



    this.Container = new PIXI.Container();
    this.Stage = new PIXI.Container();

    this.Content = new PIXI.Text(content,{fontFamily: this.font,fontSize: this.size},1.5);
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
    TweenMax.fromTo(this.DisplacementFilter.scale,1/6,{x:scale*1,y:scale*1},{x:scale*5,y:scale*5,ease:SteppedEase.config(3),yoyo:true,repeat:-1,delay:Math.abs(Math.random()*0.5+0.3)});
    //console.log(this.DisplacementFilter);
    this.DisplacementFilter.glShaderKey += Math.floor(Math.random()*100000+5000);


    if (!browserDetection.isHandheld()) {
        this.Container.filters = [this.DisplacementFilter];
    } else {
        this.DisplacementSprite.renderable = false;
        this.DisplacementSprite.visible = false;
    }

    this.Stage.addChild(this.DisplacementSprite);
    this.Stage.addChild(this.Container);


    this.Stage.position.set(xPos,yPos);
    this.Stage.scale.set(scale);

    DisplayContainer.addChild(this.Stage);

}