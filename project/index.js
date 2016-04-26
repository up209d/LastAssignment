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


function animate() {
    requestAnimationFrame(animate);
    frameCount = frameCount > 1000 ? 0 : frameCount+1;    
}


animate();

