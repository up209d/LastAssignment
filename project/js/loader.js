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
    this.bg.alpha = 0.9;

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

        this.updateCount = typeof this.updateCount == 'undefined' ? 0 : (this.updateCount >= 3 ? 0 : this.updateCount+1 );


        this.title.text = "Loading";

        for (i=0;i<this.updateCount;i++) {

            this.title.text = this.title.text + ".";
            // console.log(this.title.text);

        }

        this.progressText.text = Math.floor(percent)+"%";

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

var designerObjectLoader = [];
for (i=0;i<=9;i++) {
    designerObjectLoader.push({name: 'designerSketch_'+i, url: 'assets/images/Sketch/Sketch_0000' + i + '.png'});
}

designerObjectLoader.push(
    {
        name: 'designerColorBefore',
        url: 'assets/images/Sketch/Sketch_00000.png'

    });

designerObjectLoader.push({

    name: 'designerColorAfter',
    url: 'assets/images/Sketch/Sketch_00000.png'

});

var LoadingObject = new LoadingAnimation(stage);

window.addEventListener("resize",function(){LoadingObject.relocate();});

var Loader = new PIXI.loaders.Loader();
var resourceTexture;

Loader
    .add(filesLoader)
    .add(designerObjectLoader)
    .on('progress',function(e){

        LoadingObject.loading(e.progress);
        console.log(e.progress);

    })
    .once('complete',function(e){

        // console.log(e);

    })
    .load(function(loader, resources){

        resourceTexture = resources;
        console.log(resourceTexture);
        init();
        
    });


