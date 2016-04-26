var COLORS = [ '0x694D8B', '0xd83784', '0xd62b2e', '0xe5de3a', '0x74b74a', '0x15a1c5' ];

var renderer;
var stage;
var vizGroup;

function init(){
	stage = new PIXI.Stage(0xf6f6f6);
	renderer = new PIXI.autoDetectRenderer(800, 600,null,false,true);
	$("#visualizer").append(renderer.view);

	vizGroup = new PIXI.DisplayObjectContainer();
	stage.addChild(vizGroup);
	
	initBeast();

	$( window ).resize(onResize);
	$( window ).scroll(onScroll);
	onResize();

	requestAnimFrame(animate);
}

function onScroll(){
	updateViewportRect();
}

function animate() {
	renderer.render(stage);
	requestAnimationFrame( animate );
	
	if(isHomepageActive) {
		drawCurves();
		noiseTime += 0.002;
	}
	
	drawBeast();
}

function onResize(){
	renderer.resize(window.innerWidth,window.innerHeight);
	vizGroup.x = renderer.width/2;
	vizGroup.y = renderer.height/2;

	resizeBeast();
	
	if(isHomepageActive) {
		resizeHomepage();
	}
}

$(function(){
	init();
}); 
