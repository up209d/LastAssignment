var frameCount = 0;

var viewPort = document.getElementById('view-port');

viewPort.width = window.innerWidth;
viewPort.height = window.innerHeight;

var renderer = new PIXI.autoDetectRenderer(
    viewPort.width,
    viewPort.height,
    
    {
        view: viewPort,
        transparent: false,
        backgroundColor: 0x445599
        
    });


window.onresize = function() {
    
    viewPort.width = window.innerWidth;
    viewPort.height = window.innerHeight;
    
}



var Bunny = function(each) {
    
    this.each = new PIXI.Sprite.fromImage('assets/images/bunny.png');
    this.each.anchor.x = 0.5;
    this.each.anchor.y = 0.5;
    this.each.position.x = window.innerWidth/2;
    this.each.position.y = window.innerHeight/2;

        
}

Bunny.prototype.rotate = function() {
    
    this.each.rotation += 0.1;
    
}


var bunny = new Bunny();

var bunnyPot = new PIXI.Container();

bunnyPot.addChild(bunny.each);


function animate() {
    
    requestAnimationFrame(animate);
    frameCount = frameCount > 1000 ? 0 : frameCount+1;
    bunny.rotate();
    renderer.render(bunnyPot);
    
}


var Loader = new PIXI.loaders.Loader();

Loader
    .add('bunny','assets/images/bunny.png')
    .on('progress',function(){})
    .once('complete',animate)
    .load();