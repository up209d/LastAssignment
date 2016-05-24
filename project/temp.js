var underDis = new PIXI.Container();
var picture = new PIXI.Sprite.fromImage('assets/images/GD-Color-Before.png');
underDis.addChild(picture);

stage.addChild(underDis);

var displacement = new PIXI.extras.MovieClip([PIXI.Texture.fromImage(assetsPath+'ShakingDisplacement.png'),PIXI.Texture.fromImage('assets/Test/displace.jpg')]);
var displacementFilter = new PIXI.filters.DisplacementFilter(displacement);

displacementFilter.scale.x = 0;
displacementFilter.scale.y = 0;

picture.filters = [displacementFilter];

stage.addChild(picture);

var mask = new transitionColor(stage, picture, 'water');

stage.addChild(displacement);

//TweenMax.to(displacement.position,2,{x : 200,y :200, ease: Sine.easeInOut,yoyo: true,repeat:-1});

mask.object.interactive = true;

mask.object.on('mousedown',function(){
    console.log('Down');
    TweenMax.fromTo(this.scale,0.25,{x:0,y:0},{x : 20,y :20, ease: Sine.easeOut,yoyo: true,repeat:1});
}.bind(displacementFilter));

// function filterRun() {
//
//     requestAnimationFrame(filterRun);
//
// }
//
// filterRun();

underDis.mask = bunny.each;

