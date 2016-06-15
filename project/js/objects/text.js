/**
 * Created by UP on 5/25/16.
 */
var Text = function(DisplayContainer,content,font,size,xPos,yPos,scale,padding,isMoving) {

    var self = this;

    scale =  typeof scale !== 'undefined' ? scale : 1;
    padding =  typeof padding !== 'undefined' ? padding : 0;

    isMoving = typeof isMoving !== 'undefined' ? isMoving : false;

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


    this.Container = new PIXI.Container();
    this.Stage = new PIXI.Container();

    this.Content = new PIXI.Text(content,{fontFamily: this.font,fontSize: this.size, fill: 0x000000},1.5);
    this.Content.anchor.set(0.5);

    this.Content.style.padding = padding;
    this.Content.scale.y = this.Content.height/(this.Content.height - (this.Content.style.padding*2));

    this.Container.addChild(this.Content);

    this.Stage.addChild(this.Container);

    this.Stage.position.set(xPos,yPos);
    this.Stage.scale.set(scale);

    DisplayContainer.addChild(this.Stage);

}
