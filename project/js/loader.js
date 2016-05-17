var LoadingAnimation = function(DisplayContainer) {

    this.textMargin = 5;

    this.titleSize = 28;
    this.titleFont = 'kg_summer_sunshineregular';
    this.title = new PIXI.Text('Loading',{fontFamily: 'kg_summer_sunshineregular',fontSize: 28});
    this.title.anchor.x = this.title.anchor.y = 0.5;
    this.title.position.x = window.innerWidth/2;
    this.title.position.y = window.innerHeight/2 - this.titleSize/2 - this.textMargin;

    this.progressTextSize = 48;
    this.progressTextFont = 'kg_summer_sunshineregular';
    this.progressText = new PIXI.Text('0%',{fontFamily : 'kg_summer_sunshineregular',fontSize: 48});
    this.progressText.anchor.x = this.progressText.anchor.y = 0.5;
    this.progressText.position.x = window.innerWidth/2;
    this.progressText.position.y = window.innerHeight/2 + this.progressTextSize/2 + this.textMargin;

    this.bg = new PIXI.Sprite.fromImage(assetsPath + 'loading_bg.png');
    this.bg.anchor.set(0.5);
    this.bg.position.set(window.innerWidth/2,window.innerHeight/2);
    this.bg.alpha = 0;
    this.bg.rotation = -0.5;

    this.objects = new PIXI.Container();

    this.objects.addChild(this.bg);
    this.objects.addChild(this.title);
    this.objects.addChild(this.progressText);

    DisplayContainer.addChild(this.objects);

    LoadingAnimation.prototype.relocate = function() {

        this.title.position.x = window.innerWidth/2;
        this.title.position.y = window.innerHeight/2 - this.titleSize/2 - this.textMargin;
        this.progressText.position.x = window.innerWidth/2;
        this.progressText.position.y = window.innerHeight/2 + this.progressTextSize/2 + this.textMargin;

    };

    LoadingAnimation.prototype.loading = function(percent) {

        TweenMax.to(this.bg, 0.2, {alpha: percent/100});

        this.updateCount = typeof this.updateCount == 'undefined' ? 0 : (this.updateCount >= 3 ? 0 : this.updateCount+1 );


        this.title.text = "Loading";

        for (i=0;i<this.updateCount;i++) {

            this.title.text = this.title.text + ".";
            // console.log(this.title.text);

        }

        this.progressText.text = Math.floor(percent)+"%";

    }

    LoadingAnimation.prototype.done = function() {

        DisplayContainer.removeChild(this.objects);

    }


}

/**
 * Created by UP on 5/4/16.
 */

/** REFERENCES
 *
// ctor
var loader = new Loader();

loader
// chainable `add` to enqueue a resource
    .add(name, url, options)

    // chainable `before` to add a middleware that runs for each resource, *before* loading a resource.
    // this is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
    .before(cachingMiddleware);

// chainable `after` to add a middleware that runs for each resource, *after* loading a resource.
// this is useful to implement custom parsing modules (like spritesheet parsers, spine parser, etc).
.after(parsingMiddleware);


// `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
.load(function (loader, resources) {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.
});

// throughout the process multiple events can happen.
loader.on('progress', ...); // called once per loaded/errored file
loader.on('error', ...); // called once per errored file
loader.on('load', ...); // called once per loaded file
loader.on('complete', ...); // called once when the queued resources all load.

**/

var assetsPath = 'assets/images/';

var filesLoader = [

    {
        name: 'bunny',
        url : assetsPath + 'bunny.png'

    },

    {

        name: 'paper',
        url: assetsPath + 'paper.png'

    },

    {
        name: 'cloud',
        url: assetsPath + 'Cloud.png'

    },

    {
        name: 'cloud2',
        url: assetsPath + 'Cloud2.png'

    },

    {
        name: 'glow',
        url: assetsPath + 'glow.png'

    },

    {
        name: 'loading_bg',
        url: assetsPath + 'loading_bg.png'

    }


];

var transitionColorObjectLoader_Water = [];
for (i=0;i<90;i++) {
    transitionColorObjectLoader_Water.push({name: 'transitionColor_Water_'+i, url: 'assets/images/All/Clip/TransitionMask-Color/TransitionMask-Color-'+i+'.jpg'});
}

var transitionColorObjectLoader_Splash = [];
for (i=0;i<90;i++) {
    transitionColorObjectLoader_Splash.push({name: 'transitionColor_Splash_'+i, url: 'assets/images/All/Clip/TransitionMask-Color/TransitionMask-Color-'+i+'.png'});
}

var transitionColorObjectLoader_Cursor = [];
for (i=0;i<90;i++) {
    transitionColorObjectLoader_Cursor.push({name: 'transitionColor_Cursor_'+i, url: 'assets/images/All/Clip/Cursor/Cursor_'+i+'.png'});
}


var designerObjectLoader = [];
for (i=0;i<5;i++) {
    designerObjectLoader.push({name: 'designerSketch_'+i, url: 'assets/images/All/GD-Sketch_0' + i + '.png'});
}

designerObjectLoader.push(
    {
        name: 'designerSketch',
        url: 'assets/images/All/GD-Sketch.png'
    },
    {
        name: 'designerColorBefore',
        url: 'assets/images/All/GD-Color-Before.png'
    },
    {
       name: 'designerColorAfter',
        url: 'assets/images/All/GD-Color-After.png'
    },
    {
        name: 'designerHeadCenter',
        url: 'assets/images/All/GD-Head-Center.png'
    }
    );


var LoadingObject = new LoadingAnimation(stage);

window.addEventListener("resize",function(){LoadingObject.relocate();});

var Loader = new PIXI.loaders.Loader();
var resourceTexture;

Loader
    .add(filesLoader)
    .add(transitionColorObjectLoader_Water)
    .add(transitionColorObjectLoader_Splash)
    .add(transitionColorObjectLoader_Cursor)
    .add(designerObjectLoader)
    .add([
        'assets/images/All/GD-Head-Center.png',
        'assets/images/All/GD-Sketch.png'

    ])
    .on('progress',function(e){

        LoadingObject.loading(e.progress);
        console.log(e);
        console.log(e.progress);

    })
    .once('complete',function(e){

        LoadingObject.done();

    })
    .load(function(loader, resources){

        resourceTexture = resources;
        console.log(resourceTexture);
        init();
        
    });


