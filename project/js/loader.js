var LoadingAnimation = function(DisplayContainer) {

    this.textMargin = 5;

    if (PixiV4) {

        // FOR V4 FONT
        this.titleSize = 28;
        this.titleFont = 'kg_summer_sunshineregular';
        this.title = new PIXI.Text('Loading',{fontFamily: 'kg_summer_sunshineregular',fontSize: this.titleSize});
        this.title.anchor.x = this.title.anchor.y = 0.5;
        this.title.scale.set(1);
        this.title.position.x = window.innerWidth/2;
        this.title.position.y = window.innerHeight/2 - this.titleSize/2 - this.textMargin;

        this.progressTextSize = 48;
        this.progressTextFont = 'kg_summer_sunshineregular';
        this.progressText = new PIXI.Text('0%',{fontFamily : 'kg_summer_sunshineregular',fontSize: this.progressTextSize});
        this.progressText.anchor.x = this.progressText.anchor.y = 0.5;
        this.progressText.scale.set(1);
        this.progressText.position.x = window.innerWidth/2;
        this.progressText.position.y = window.innerHeight/2 + this.progressTextSize/2 + this.textMargin;


    } else {

        //FOR V3 FONT
        this.titleSize = 56;
        this.titleFont = 'kg_summer_sunshineregular';
        this.title = new PIXI.Text('Loading',{font: this.titleSize + 'px "'+this.titleFont+'"'});
        this.title.anchor.x = this.title.anchor.y = 0.5;
        this.title.position.x = window.innerWidth/2;
        this.title.position.y = window.innerHeight/2 - this.titleSize/2 - this.textMargin;

        this.progressTextSize = 96;
        this.progressText = new PIXI.Text('0%',{font: this.progressTextSize + 'px "'+this.titleFont+'"'});
        this.progressText.anchor.x = this.progressText.anchor.y = 0.5;
        this.progressText.position.x = window.innerWidth/2;
        this.progressText.position.y = window.innerHeight/2 + this.progressTextSize/2 + this.textMargin;

    }

    this.bgPaper = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(assetsPath+'paper.png'),window.innerWidth,window.innerHeight);

    this.bg = new PIXI.Sprite.fromImage(assetsPath + 'loading-bg.png');
    this.bg.anchor.set(0.5);
    this.bg.position.set(window.innerWidth/2,window.innerHeight/2);
    this.bg.alpha = 0;
    this.bg.rotation = 0;
    this.bg.blendMode = PIXI.BLEND_MODES.MULTIPLY;


    this.objects = new PIXI.Container();
    this.objects.addChild(this.bgPaper);
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
var assetsClipPath = 'assets/images/clips/';
var assetsClipSheetsPath = 'assets/images/clipsheets/'

var filesLoader = [

    // Normal Images Resource
    assetsPath+'Owl.png',
    assetsPath+'Owl-Color.png',
    assetsPath+'OwlText.png',
    assetsPath+'OwlText-Color.png',
    assetsPath+'Bird.png',
    assetsPath+'Bird-Color.png',
    assetsPath+'BirdText.png',
    assetsPath+'BirdText-Color.png',
    assetsPath+'Cloud.png',
    assetsPath+'Flexible-Color.png',
    assetsPath+'Flexible.png',
    assetsPath+'GD-Color-After.png',
    assetsPath+'GD-Color-Before.png',
    assetsPath+'GD-Head-Center-Angry.png',
    assetsPath+'GD-Head-Center-Exp.png',
    assetsPath+'GD-Head-Center-Happy.png',
    assetsPath+'GD-Head-Center.png',
    assetsPath+'GD-Head-Touched-Hard.png',
    assetsPath+'GD-Head-Touched-Light.png',
    assetsPath+'GD-Head-Up-Left.png',
    assetsPath+'GD-Head-Up-Right.png',
    assetsPath+'GD-Sketch-0.png',
    assetsPath+'GD-Sketch-1.png',
    assetsPath+'GD-Sketch-2.png',
    assetsPath+'GD-Sketch.png',
    assetsPath+'GDS-Color-After.png',
    assetsPath+'GDS-Color-Before.png',
    assetsPath+'GDS-Sketch-0.png',
    assetsPath+'GDS-Sketch-1.png',
    assetsPath+'GDS-Sketch-2.png',
    assetsPath+'GDS-Sketch.png',
    assetsPath+'Health-Color.png',
    assetsPath+'Health.png',
    assetsPath+'Intelligent-Color.png',
    assetsPath+'Intelligent.png',
    assetsPath+'MD-Color-After.png',
    assetsPath+'MD-Color-Before.png',
    assetsPath+'MD-Sketch-0.png',
    assetsPath+'MD-Sketch-1.png',
    assetsPath+'MD-Sketch-2.png',
    assetsPath+'MD-Sketch.png',
    assetsPath+'MDS-Color-After.png',
    assetsPath+'MDS-Color-Before.png',
    assetsPath+'MDS-Sketch-0.png',
    assetsPath+'MDS-Sketch-1.png',
    assetsPath+'MDS-Sketch-2.png',
    assetsPath+'MDS-Sketch.png',
    assetsPath+'Organize-Color.png',
    assetsPath+'Organize.png',
    assetsPath+'SC-Color-After.png',
    assetsPath+'SC-Color-Before.png',
    assetsPath+'SC-Sketch-0.png',
    assetsPath+'SC-Sketch-1.png',
    assetsPath+'SC-Sketch-2.png',
    assetsPath+'SC-Sketch.png',
    assetsPath+'SCS-Color-After.png',
    assetsPath+'SCS-Color-Before.png',
    assetsPath+'SCS-Sketch-0.png',
    assetsPath+'SCS-Sketch-1.png',
    assetsPath+'SCS-Sketch-2.png',
    assetsPath+'SCS-Sketch.png',
    assetsPath+'SM-Color-After.png',
    assetsPath+'SM-Color-Before.png',
    assetsPath+'SM-Sketch-0.png',
    assetsPath+'SM-Sketch-1.png',
    assetsPath+'SM-Sketch-2.png',
    assetsPath+'SM-Sketch.png',
    assetsPath+'SMS-Color-After.png',
    assetsPath+'SMS-Color-Before.png',
    assetsPath+'SMS-Sketch-0.png',
    assetsPath+'SMS-Sketch-1.png',
    assetsPath+'SMS-Sketch-2.png',
    assetsPath+'SMS-Sketch.png',
    assetsPath+'ST-Color-After.png',
    assetsPath+'ST-Color-Before.png',
    assetsPath+'ST-Sketch-0.png',
    assetsPath+'ST-Sketch-1.png',
    assetsPath+'ST-Sketch-2.png',
    assetsPath+'ST-Sketch.png',
    assetsPath+'STS-Color-After.png',
    assetsPath+'STS-Color-Before.png',
    assetsPath+'STS-Sketch-0.png',
    assetsPath+'STS-Sketch-1.png',
    assetsPath+'STS-Sketch-2.png',
    assetsPath+'STS-Sketch.png',
    assetsPath+'Social-Color.png',
    assetsPath+'Social.png',
    assetsPath+'Success-Color.png',
    assetsPath+'Success.png',
    assetsPath+'TC-Color-After.png',
    assetsPath+'TC-Color-Before.png',
    assetsPath+'TC-Sketch-0.png',
    assetsPath+'TC-Sketch-1.png',
    assetsPath+'TC-Sketch-2.png',
    assetsPath+'TC-Sketch.png',
    assetsPath+'TCS-Color-After.png',
    assetsPath+'TCS-Color-Before.png',
    assetsPath+'TCS-Sketch-0.png',
    assetsPath+'TCS-Sketch-1.png',
    assetsPath+'TCS-Sketch-2.png',
    assetsPath+'TCS-Sketch.png',
    assetsPath+'bunny.png',
    assetsPath+'clock.png',
    assetsPath+'cloud2.png',
    assetsPath+'glow.png',
    assetsPath+'loading-bg.png',
    assetsPath+'paper.png',
    assetsPath+'paper2.png',
    assetsPath+'paper3.png',
    assetsPath+'ShakingDisplacement.png',
    assetsPath+'ShakingDisplacementAround.png',

    // MovieClip Frames
    assetsClipPath+'Cursor-0.png',
    assetsClipPath+'Cursor-1.png',
    assetsClipPath+'Cursor-10.png',
    assetsClipPath+'Cursor-11.png',
    assetsClipPath+'Cursor-12.png',
    assetsClipPath+'Cursor-13.png',
    assetsClipPath+'Cursor-14.png',
    assetsClipPath+'Cursor-15.png',
    assetsClipPath+'Cursor-16.png',
    assetsClipPath+'Cursor-17.png',
    assetsClipPath+'Cursor-18.png',
    assetsClipPath+'Cursor-19.png',
    assetsClipPath+'Cursor-2.png',
    assetsClipPath+'Cursor-20.png',
    assetsClipPath+'Cursor-21.png',
    assetsClipPath+'Cursor-22.png',
    assetsClipPath+'Cursor-23.png',
    assetsClipPath+'Cursor-24.png',
    assetsClipPath+'Cursor-25.png',
    assetsClipPath+'Cursor-26.png',
    assetsClipPath+'Cursor-27.png',
    assetsClipPath+'Cursor-28.png',
    assetsClipPath+'Cursor-29.png',
    assetsClipPath+'Cursor-3.png',
    assetsClipPath+'Cursor-30.png',
    assetsClipPath+'Cursor-31.png',
    assetsClipPath+'Cursor-32.png',
    assetsClipPath+'Cursor-33.png',
    assetsClipPath+'Cursor-34.png',
    assetsClipPath+'Cursor-35.png',
    assetsClipPath+'Cursor-36.png',
    assetsClipPath+'Cursor-37.png',
    assetsClipPath+'Cursor-38.png',
    assetsClipPath+'Cursor-39.png',
    assetsClipPath+'Cursor-4.png',
    assetsClipPath+'Cursor-40.png',
    assetsClipPath+'Cursor-41.png',
    assetsClipPath+'Cursor-42.png',
    assetsClipPath+'Cursor-43.png',
    assetsClipPath+'Cursor-44.png',
    assetsClipPath+'Cursor-45.png',
    assetsClipPath+'Cursor-46.png',
    assetsClipPath+'Cursor-47.png',
    assetsClipPath+'Cursor-48.png',
    assetsClipPath+'Cursor-49.png',
    assetsClipPath+'Cursor-5.png',
    assetsClipPath+'Cursor-50.png',
    assetsClipPath+'Cursor-51.png',
    assetsClipPath+'Cursor-52.png',
    assetsClipPath+'Cursor-53.png',
    assetsClipPath+'Cursor-54.png',
    assetsClipPath+'Cursor-55.png',
    assetsClipPath+'Cursor-56.png',
    assetsClipPath+'Cursor-57.png',
    assetsClipPath+'Cursor-58.png',
    assetsClipPath+'Cursor-59.png',
    assetsClipPath+'Cursor-6.png',
    assetsClipPath+'Cursor-60.png',
    assetsClipPath+'Cursor-61.png',
    assetsClipPath+'Cursor-62.png',
    assetsClipPath+'Cursor-63.png',
    assetsClipPath+'Cursor-64.png',
    assetsClipPath+'Cursor-65.png',
    assetsClipPath+'Cursor-66.png',
    assetsClipPath+'Cursor-67.png',
    assetsClipPath+'Cursor-68.png',
    assetsClipPath+'Cursor-69.png',
    assetsClipPath+'Cursor-7.png',
    assetsClipPath+'Cursor-70.png',
    assetsClipPath+'Cursor-71.png',
    assetsClipPath+'Cursor-72.png',
    assetsClipPath+'Cursor-73.png',
    assetsClipPath+'Cursor-74.png',
    assetsClipPath+'Cursor-75.png',
    assetsClipPath+'Cursor-76.png',
    assetsClipPath+'Cursor-77.png',
    assetsClipPath+'Cursor-78.png',
    assetsClipPath+'Cursor-79.png',
    assetsClipPath+'Cursor-8.png',
    assetsClipPath+'Cursor-80.png',
    assetsClipPath+'Cursor-81.png',
    assetsClipPath+'Cursor-82.png',
    assetsClipPath+'Cursor-83.png',
    assetsClipPath+'Cursor-84.png',
    assetsClipPath+'Cursor-85.png',
    assetsClipPath+'Cursor-86.png',
    assetsClipPath+'Cursor-87.png',
    assetsClipPath+'Cursor-88.png',
    assetsClipPath+'Cursor-89.png',
    assetsClipPath+'Cursor-9.png',
    assetsClipPath+'Splash-0.png',
    assetsClipPath+'Splash-1.png',
    assetsClipPath+'Splash-10.png',
    assetsClipPath+'Splash-11.png',
    assetsClipPath+'Splash-12.png',
    assetsClipPath+'Splash-13.png',
    assetsClipPath+'Splash-14.png',
    assetsClipPath+'Splash-15.png',
    assetsClipPath+'Splash-16.png',
    assetsClipPath+'Splash-17.png',
    assetsClipPath+'Splash-18.png',
    assetsClipPath+'Splash-19.png',
    assetsClipPath+'Splash-2.png',
    assetsClipPath+'Splash-20.png',
    assetsClipPath+'Splash-21.png',
    assetsClipPath+'Splash-22.png',
    assetsClipPath+'Splash-23.png',
    assetsClipPath+'Splash-24.png',
    assetsClipPath+'Splash-25.png',
    assetsClipPath+'Splash-26.png',
    assetsClipPath+'Splash-27.png',
    assetsClipPath+'Splash-28.png',
    assetsClipPath+'Splash-29.png',
    assetsClipPath+'Splash-3.png',
    assetsClipPath+'Splash-30.png',
    assetsClipPath+'Splash-31.png',
    assetsClipPath+'Splash-32.png',
    assetsClipPath+'Splash-33.png',
    assetsClipPath+'Splash-34.png',
    assetsClipPath+'Splash-35.png',
    assetsClipPath+'Splash-36.png',
    assetsClipPath+'Splash-37.png',
    assetsClipPath+'Splash-38.png',
    assetsClipPath+'Splash-39.png',
    assetsClipPath+'Splash-4.png',
    assetsClipPath+'Splash-40.png',
    assetsClipPath+'Splash-41.png',
    assetsClipPath+'Splash-42.png',
    assetsClipPath+'Splash-43.png',
    assetsClipPath+'Splash-44.png',
    assetsClipPath+'Splash-45.png',
    assetsClipPath+'Splash-46.png',
    assetsClipPath+'Splash-47.png',
    assetsClipPath+'Splash-48.png',
    assetsClipPath+'Splash-49.png',
    assetsClipPath+'Splash-5.png',
    assetsClipPath+'Splash-50.png',
    assetsClipPath+'Splash-51.png',
    assetsClipPath+'Splash-52.png',
    assetsClipPath+'Splash-53.png',
    assetsClipPath+'Splash-54.png',
    assetsClipPath+'Splash-55.png',
    assetsClipPath+'Splash-56.png',
    assetsClipPath+'Splash-57.png',
    assetsClipPath+'Splash-58.png',
    assetsClipPath+'Splash-59.png',
    assetsClipPath+'Splash-6.png',
    assetsClipPath+'Splash-60.png',
    assetsClipPath+'Splash-61.png',
    assetsClipPath+'Splash-62.png',
    assetsClipPath+'Splash-63.png',
    assetsClipPath+'Splash-64.png',
    assetsClipPath+'Splash-65.png',
    assetsClipPath+'Splash-66.png',
    assetsClipPath+'Splash-67.png',
    assetsClipPath+'Splash-68.png',
    assetsClipPath+'Splash-69.png',
    assetsClipPath+'Splash-7.png',
    assetsClipPath+'Splash-70.png',
    assetsClipPath+'Splash-71.png',
    assetsClipPath+'Splash-72.png',
    assetsClipPath+'Splash-73.png',
    assetsClipPath+'Splash-74.png',
    assetsClipPath+'Splash-75.png',
    assetsClipPath+'Splash-76.png',
    assetsClipPath+'Splash-77.png',
    assetsClipPath+'Splash-78.png',
    assetsClipPath+'Splash-79.png',
    assetsClipPath+'Splash-8.png',
    assetsClipPath+'Splash-80.png',
    assetsClipPath+'Splash-81.png',
    assetsClipPath+'Splash-82.png',
    assetsClipPath+'Splash-83.png',
    assetsClipPath+'Splash-84.png',
    assetsClipPath+'Splash-85.png',
    assetsClipPath+'Splash-86.png',
    assetsClipPath+'Splash-87.png',
    assetsClipPath+'Splash-88.png',
    assetsClipPath+'Splash-89.png',
    assetsClipPath+'Splash-9.png',
    assetsClipPath+'Water-0.jpg',
    assetsClipPath+'Water-1.jpg',
    assetsClipPath+'Water-10.jpg',
    assetsClipPath+'Water-11.jpg',
    assetsClipPath+'Water-12.jpg',
    assetsClipPath+'Water-13.jpg',
    assetsClipPath+'Water-14.jpg',
    assetsClipPath+'Water-15.jpg',
    assetsClipPath+'Water-16.jpg',
    assetsClipPath+'Water-17.jpg',
    assetsClipPath+'Water-18.jpg',
    assetsClipPath+'Water-19.jpg',
    assetsClipPath+'Water-2.jpg',
    assetsClipPath+'Water-20.jpg',
    assetsClipPath+'Water-21.jpg',
    assetsClipPath+'Water-22.jpg',
    assetsClipPath+'Water-23.jpg',
    assetsClipPath+'Water-24.jpg',
    assetsClipPath+'Water-25.jpg',
    assetsClipPath+'Water-26.jpg',
    assetsClipPath+'Water-27.jpg',
    assetsClipPath+'Water-28.jpg',
    assetsClipPath+'Water-29.jpg',
    assetsClipPath+'Water-3.jpg',
    assetsClipPath+'Water-30.jpg',
    assetsClipPath+'Water-31.jpg',
    assetsClipPath+'Water-32.jpg',
    assetsClipPath+'Water-33.jpg',
    assetsClipPath+'Water-34.jpg',
    assetsClipPath+'Water-35.jpg',
    assetsClipPath+'Water-36.jpg',
    assetsClipPath+'Water-37.jpg',
    assetsClipPath+'Water-38.jpg',
    assetsClipPath+'Water-39.jpg',
    assetsClipPath+'Water-4.jpg',
    assetsClipPath+'Water-40.jpg',
    assetsClipPath+'Water-41.jpg',
    assetsClipPath+'Water-42.jpg',
    assetsClipPath+'Water-43.jpg',
    assetsClipPath+'Water-44.jpg',
    assetsClipPath+'Water-45.jpg',
    assetsClipPath+'Water-46.jpg',
    assetsClipPath+'Water-47.jpg',
    assetsClipPath+'Water-48.jpg',
    assetsClipPath+'Water-49.jpg',
    assetsClipPath+'Water-5.jpg',
    assetsClipPath+'Water-50.jpg',
    assetsClipPath+'Water-51.jpg',
    assetsClipPath+'Water-52.jpg',
    assetsClipPath+'Water-53.jpg',
    assetsClipPath+'Water-54.jpg',
    assetsClipPath+'Water-55.jpg',
    assetsClipPath+'Water-56.jpg',
    assetsClipPath+'Water-57.jpg',
    assetsClipPath+'Water-58.jpg',
    assetsClipPath+'Water-59.jpg',
    assetsClipPath+'Water-6.jpg',
    assetsClipPath+'Water-60.jpg',
    assetsClipPath+'Water-61.jpg',
    assetsClipPath+'Water-62.jpg',
    assetsClipPath+'Water-63.jpg',
    assetsClipPath+'Water-64.jpg',
    assetsClipPath+'Water-65.jpg',
    assetsClipPath+'Water-66.jpg',
    assetsClipPath+'Water-67.jpg',
    assetsClipPath+'Water-68.jpg',
    assetsClipPath+'Water-69.jpg',
    assetsClipPath+'Water-7.jpg',
    assetsClipPath+'Water-70.jpg',
    assetsClipPath+'Water-71.jpg',
    assetsClipPath+'Water-72.jpg',
    assetsClipPath+'Water-73.jpg',
    assetsClipPath+'Water-74.jpg',
    assetsClipPath+'Water-75.jpg',
    assetsClipPath+'Water-76.jpg',
    assetsClipPath+'Water-77.jpg',
    assetsClipPath+'Water-78.jpg',
    assetsClipPath+'Water-79.jpg',
    assetsClipPath+'Water-8.jpg',
    assetsClipPath+'Water-80.jpg',
    assetsClipPath+'Water-81.jpg',
    assetsClipPath+'Water-82.jpg',
    assetsClipPath+'Water-83.jpg',
    assetsClipPath+'Water-84.jpg',
    assetsClipPath+'Water-85.jpg',
    assetsClipPath+'Water-86.jpg',
    assetsClipPath+'Water-87.jpg',
    assetsClipPath+'Water-88.jpg',
    assetsClipPath+'Water-89.jpg',
    assetsClipPath+'Water-9.jpg',

    //assetsClipSheetsPath+'clips.png',
    'assets/Test/hole.png',
    'assets/Test/diss.jpg',
    'assets/Test/dis.png',
    'assets/Test/dis2.jpg',
    'assets/Test/dis2.jpeg',
    'assets/Test/Dis3.jpg',
    'assets/Test/dis4.jpeg',
    'assets/Test/dis4.png',
    'assets/Test/displacement.jpg',
    'assets/Test/displace.jpg',
    'assets/Test/displace.png',
    'assets/Test/ripple.png',
    'assets/Test/wave.png'

];




var LoadingObject = new LoadingAnimation(stage);

window.addEventListener("resize",function(){LoadingObject.relocate();});

var Loader = new PIXI.loaders.Loader();
var resourceTexture;

Loader
    .add(filesLoader)
    .on('progress',function(e){
        LoadingObject.loading(e.progress);
        //console.log(e);
        //console.log(e.progress);
    })
    .once('complete',function(e){
        LoadingObject.done();
    })
    .load(function(loader, resources){
        resourceTexture = resources;
        console.log('Resource Texture: ');
        console.log(resourceTexture);
        init();
    });


// var filesLoader = [
//
//     {
//         name: 'bunny',
//         url : assetsPath + 'bunny.png'
//
//     },
//
//     {
//
//         name: 'paper',
//         url: assetsPath + 'paper.png'
//
//     },
//
//     {
//         name: 'cloud',
//         url: assetsPath + 'Cloud.png'
//
//     },
//
//     {
//         name: 'cloud2',
//         url: assetsPath + 'Cloud2.png'
//
//     },
//
//     {
//         name: 'glow',
//         url: assetsPath + 'glow.png'
//
//     },
//
//     {
//         name: 'loading_bg',
//         url: assetsPath + 'loading_bg.png'
//
//     }
//
//
// ];
//
// var transitionColorObjectLoader_Water = [];
// for (i=0;i<90;i++) {
//     transitionColorObjectLoader_Water.push({name: 'transitionColor_Water_'+i, url: 'assets/images/All/Clip/TransitionMask-Color/TransitionMask-Color-'+i+'.jpg'});
// }
//
// var transitionColorObjectLoader_Splash = [];
// for (i=0;i<90;i++) {
//     transitionColorObjectLoader_Splash.push({name: 'transitionColor_Splash_'+i, url: 'assets/images/All/Clip/TransitionMask-Color/TransitionMask-Color-'+i+'.png'});
// }
//
// var transitionColorObjectLoader_Cursor = [];
// for (i=0;i<90;i++) {
//     transitionColorObjectLoader_Cursor.push({name: 'transitionColor_Cursor_'+i, url: 'assets/images/All/Clip/Cursor/Cursor_'+i+'.png'});
// }
//
//
// var designerObjectLoader = [];
// for (i=0;i<3;i++) {
//     designerObjectLoader.push({name: 'designerSketch_'+i, url: 'assets/images/All/GD-Sketch_' + i + '.png'});
// }
//
// designerObjectLoader.push(
//     {
//         name: 'designerSketch',
//         url: 'assets/images/All/GD-Sketch.png'
//     },
//     {
//         name: 'designerColorBefore',
//         url: 'assets/images/All/GD-Color-Before.png'
//     },
//     {
//        name: 'designerColorAfter',
//         url: 'assets/images/All/GD-Color-After.png'
//     },
//     {
//         name: 'designerHeadCenter',
//         url: 'assets/images/All/GD-Head-Center.png'
//     },
//     {
//         name: 'designerHeadTouchedLight',
//         url: 'assets/images/All/GD-Head-Touched-Light.png'
//     },
//     {
//         name: 'designerHeadTouchedHard',
//         url: 'assets/images/All/GD-Head-Touched-Hard.png'
//     },
//     {
//         name: 'designerHeadAngry',
//         url: 'assets/images/All/GD-Head-Center-Angry.png'
//     },
//     {
//         name: 'designerHeadUpLeft',
//         url: 'assets/images/All/GD-Head-Up-Left.png'
//     },
//     {
//         name: 'designerHeadUpRight',
//         url: 'assets/images/All/GD-Head-Up-Right.png'
//     },
//     {
//         name: 'designerHeadHappy',
//         url: 'assets/images/All/GD-Head-Center-Happy.png'
//     }
//
//     );

//
// var designerSleepObjectLoader = [];
// for (i=0;i<3;i++) {
//     designerSleepObjectLoader.push({name: 'designerSleepSketch_'+i, url: 'assets/images/All/GDS-Sketch_' + i + '.png'});
// }
//
// var ModelObjectLoader = [];
// for (i=0;i<3;i++) {
//     ModelObjectLoader.push({name: 'ModelSketch_'+i, url: 'assets/images/All/MD-Sketch_' + i + '.png'});
// }
//
// var ModelWorkObjectLoader = [];
// for (i=0;i<3;i++) {
//     ModelWorkObjectLoader.push({name: 'ModelWorkSketch_'+i, url: 'assets/images/All/MDS-Sketch_' + i + '.png'});
// }
//
// var ScienceObjectLoader = [];
// for (i=0;i<3;i++) {
//     ScienceObjectLoader.push({name: 'ScienceSketch_'+i, url: 'assets/images/All/SC-Sketch_' + i + '.png'});
// }
//
// var ScienceSleepObjectLoader = [];
// for (i=0;i<3;i++) {
//     ScienceSleepObjectLoader.push({name: 'ScienceSleepSketch_'+i, url: 'assets/images/All/SCS-Sketch_' + i + '.png'});
// }
//
// var SaleObjectLoader = [];
// for (i=0;i<3;i++) {
//     SaleObjectLoader.push({name: 'SaleSketch_'+i, url: 'assets/images/All/SM-Sketch_' + i + '.png'});
// }
//
// var SaleDinnerObjectLoader = [];
// for (i=0;i<3;i++) {
//     SaleDinnerObjectLoader.push({name: 'SaleDinnerSketch_'+i, url: 'assets/images/All/SMS-Sketch_' + i + '.png'});
// }
//
// var StudentObjectLoader = [];
// for (i=0;i<3;i++) {
//     StudentObjectLoader.push({name: 'StudentSketch_'+i, url: 'assets/images/All/ST-Sketch_' + i + '.png'});
// }
//
// var StudentWakeObjectLoader = [];
// for (i=0;i<3;i++) {
//     StudentWakeObjectLoader.push({name: 'StudentWakeSketch_'+i, url: 'assets/images/All/STS-Sketch_' + i + '.png'});
// }
//
// var TeacherObjectLoader = [];
// for (i=0;i<3;i++) {
//     TeacherObjectLoader.push({name: 'TeacherSketch_'+i, url: 'assets/images/All/TC-Sketch_' + i + '.png'});
// }
//
// var TeacherCookObjectLoader = [];
// for (i=0;i<3;i++) {
//     TeacherCookObjectLoader.push({name: 'TeacherCookSketch_'+i, url: 'assets/images/All/TCS-Sketch_' + i + '.png'});
// }
