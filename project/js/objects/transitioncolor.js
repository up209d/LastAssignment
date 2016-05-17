var transitionColor = function(stage,object,type) {

    type = typeof type !== "undefined" ? type : 'water';
    console.log(type);

    this.textures = [];

    switch (type) {
        case 'water': {
            for (i=0;i<transitionColorObjectLoader_Water.length;i++) {
                this.textures.push(resourceTexture['transitionColor_Water_'+i].texture);
            }
            break;
        }
        case 'splash': {
            for (i=0;i<transitionColorObjectLoader_Splash.length;i++) {
                this.textures.push(resourceTexture['transitionColor_Splash_'+i].texture);
            }
            break;
        }

        case 'cursor': {
            for (i=0;i<transitionColorObjectLoader_Cursor.length;i++) {
                this.textures.push(resourceTexture['transitionColor_Cursor_'+i].texture);
            }
            break;
        }

        default: {
            for (i=0;i<transitionColorObjectLoader_Water.length;i++) {
                this.textures.push(resourceTexture['transitionColor_Water_'+i].texture);
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


    this.object.animationSpeed = 0.5;
    this.object.loop = false;

    this.object.interactive = true;

    // this.object.on('mousedown',function(e){
    //     e.target.gotoAndPlay(0);
    // });

    this.object.gotoAndPlay(0);

    // Callback each time stop playing
    this.object.onComplete = function(e){this}

}
