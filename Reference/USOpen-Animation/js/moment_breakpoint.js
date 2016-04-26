var breakPointTriangleArray = [];
var breakPointTriangleArray2 = [];
var breakPointMotionArray = [];
var breakPoint3dArray = [];
var breakPoint3dShardArray = [];
var breakPointCoverArray = [];

var breakPointColors = ["0x8cc63f", "0xfdb813"];

//////////////// PARTICLE STUFF /////////////////
var breakPointParticles 	= new ParticleEngine(window.innerWidth, 500);
var breakPointEmitters 	= [];
var breakPointParticleContainer;
var breakPointEm_Triangles
/////////////////////////////////////////////////

function createBreakPoint() {
	momentBreakPoint = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentBreakPoint);
	
	var assetsToLoader = [
		"img/breakpoint/color1shard1.png",
		"img/breakpoint/color1shard2.png",
		"img/breakpoint/color1shard3.png",
		"img/breakpoint/color1shard4.png",
		"img/breakpoint/color1shard5.png",
		"img/breakpoint/color1shard6.png",
		"img/breakpoint/color1shard7.png",
		"img/breakpoint/color1shard8.png",
		"img/breakpoint/color2shard1.png",
		"img/breakpoint/color2shard2.png",
		"img/breakpoint/color2shard3.png",
		"img/breakpoint/explosion1.png",
		"img/breakpoint/explosion2.png",
		"img/breakpoint/explosion3.png",
		"img/breakpoint/explosion4.png",
		"img/breakpoint/explosion5.png",
		"img/breakpoint/explosion6.png",
		"img/breakpoint/explosion7.png",
		"img/breakpoint/explosion8.png",
		"img/breakpoint/explosion9.png",
		"img/breakpoint/explosion10.png",
		"img/breakpoint/explosion11.png",
		"img/breakpoint/explosion12.png",
		"img/breakpoint/explosion13.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		breakPointParticleContainer = new PIXI.DisplayObjectContainer();
		momentBreakPoint.addChild(breakPointParticleContainer);

		breakPointEm_Triangles = new Emitter({
				type		:	"chaos",
				count		:	150,
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	10,
				numSides	:	3,
				warp		: 	20,
				life		: 	500.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.25, 1],
				colors		: 	[breakPointColors[0], breakPointColors[1], 0xffffff],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		breakPointEmitters.push(breakPointEm_Triangles);

		breakPointParticles.addEmitters(breakPointEmitters);

		breakPointParticleContainer.addChild(breakPointEm_Triangles.doc);
		/////////////////////////////////////////////////
		
		// CREATE SOME BACKGROUND MOTION PIECES
		for (var i = 0; i < 45; i++) {
			var breakPointParticleFlying = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,5);
			
			switch (randomParticleType) {
				case 0:
					// OUTLINED CIRCLE
					breakPointParticleFlying.lineStyle(2, breakPointColors[generateRandomNumber(0, 1)], 1);
					breakPointParticleFlying.drawCircle(0, 0, generateRandomNumber(5, 15)); 
					break;
				case 1:
					// FILLED CIRCLE
					breakPointParticleFlying.beginFill(breakPointColors[generateRandomNumber(0, 1)], .5);
					breakPointParticleFlying.drawCircle(0, 0, generateRandomNumber(2, 10));
					break;
				default:
					// TRIANGLE
					breakPointParticleFlying.beginFill(breakPointColors[generateRandomNumber(0,  1)], 1);
					breakPointParticleFlying.moveTo(-25, -25);
					breakPointParticleFlying.lineTo(25, -25);
					breakPointParticleFlying.lineTo(0, 25);
					breakPointParticleFlying.lineTo(-25, -25);
			}
			breakPointParticleFlying.endFill();
			if (matchVizViewConfig.isWebGL) breakPointParticleFlying.blendMode = PIXI.blendModes.MULTIPLY;
			momentBreakPoint.addChild(breakPointParticleFlying);
			breakPointMotionArray.push(breakPointParticleFlying);
		}
		
		// COLOR 1 SHARDS
		breakPointColor1ShardTexture1 = PIXI.Texture.fromImage("img/breakpoint/color1shard1.png");
		breakPointColor1Shard1 = new PIXI.Sprite(breakPointColor1ShardTexture1);
		breakPointColor1Shard1.anchor.x = 0.5;
		breakPointColor1Shard1.anchor.y = 0.5;
		breakPointColor1Shard1.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard1.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard1);
		
		breakPointColor1ShardTexture2 = PIXI.Texture.fromImage("img/breakpoint/color1shard2.png");
		breakPointColor1Shard2 = new PIXI.Sprite(breakPointColor1ShardTexture2);
		breakPointColor1Shard2.anchor.x = 0.5;
		breakPointColor1Shard2.anchor.y = 0.5;
		breakPointColor1Shard2.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard2.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard2);
		
		breakPointColor1ShardTexture3 = PIXI.Texture.fromImage("img/breakpoint/color1shard3.png");
		breakPointColor1Shard3 = new PIXI.Sprite(breakPointColor1ShardTexture3);
		breakPointColor1Shard3.anchor.x = 0.5;
		breakPointColor1Shard3.anchor.y = 0.5;
		breakPointColor1Shard3.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard3.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard3);
		
		breakPointColor1ShardTexture4 = PIXI.Texture.fromImage("img/breakpoint/color1shard4.png");
		breakPointColor1Shard4 = new PIXI.Sprite(breakPointColor1ShardTexture4);
		breakPointColor1Shard4.anchor.x = 0.5;
		breakPointColor1Shard4.anchor.y = 0.5;
		breakPointColor1Shard4.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard4.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard4);
		
		breakPointColor1ShardTexture5 = PIXI.Texture.fromImage("img/breakpoint/color1shard5.png");
		breakPointColor1Shard5 = new PIXI.Sprite(breakPointColor1ShardTexture5);
		breakPointColor1Shard5.anchor.x = 0.5;
		breakPointColor1Shard5.anchor.y = 0.5;
		breakPointColor1Shard5.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard5.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard5);
		
		breakPointColor1ShardTexture6 = PIXI.Texture.fromImage("img/breakpoint/color1shard6.png");
		breakPointColor1Shard6 = new PIXI.Sprite(breakPointColor1ShardTexture6);
		breakPointColor1Shard6.anchor.x = 0.5;
		breakPointColor1Shard6.anchor.y = 0.5;
		breakPointColor1Shard6.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard6.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard6);
		
		breakPointColor1ShardTexture7 = PIXI.Texture.fromImage("img/breakpoint/color1shard7.png");
		breakPointColor1Shard7 = new PIXI.Sprite(breakPointColor1ShardTexture7);
		breakPointColor1Shard7.anchor.x = 0.5;
		breakPointColor1Shard7.anchor.y = 0.5;
		breakPointColor1Shard7.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard7.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard7);
		
		breakPointColor1ShardTexture8 = PIXI.Texture.fromImage("img/breakpoint/color1shard8.png");
		breakPointColor1Shard8 = new PIXI.Sprite(breakPointColor1ShardTexture8);
		breakPointColor1Shard8.anchor.x = 0.5;
		breakPointColor1Shard8.anchor.y = 0.5;
		breakPointColor1Shard8.tint = breakPointColors[0];
		if (matchVizViewConfig.isWebGL) breakPointColor1Shard8.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor1Shard8);
		
		// COLOR 2 SHARDS
		breakPointColor2ShardTexture1 = PIXI.Texture.fromImage("img/breakpoint/color2shard1.png");
		breakPointColor2Shard1 = new PIXI.Sprite(breakPointColor2ShardTexture1);
		breakPointColor2Shard1.anchor.x = 0.5;
		breakPointColor2Shard1.anchor.y = 0.5;
		breakPointColor2Shard1.tint = breakPointColors[1];
		if (matchVizViewConfig.isWebGL) breakPointColor2Shard1.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor2Shard1);
		
		breakPointColor2ShardTexture2 = PIXI.Texture.fromImage("img/breakpoint/color2shard2.png");
		breakPointColor2Shard2 = new PIXI.Sprite(breakPointColor2ShardTexture2);
		breakPointColor2Shard2.anchor.x = 0.5;
		breakPointColor2Shard2.anchor.y = 0.5;
		breakPointColor2Shard2.tint = breakPointColors[1];
		if (matchVizViewConfig.isWebGL) breakPointColor2Shard2.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor2Shard2);
		
		breakPointColor2ShardTexture3 = PIXI.Texture.fromImage("img/breakpoint/color2shard3.png");
		breakPointColor2Shard3 = new PIXI.Sprite(breakPointColor2ShardTexture3);
		breakPointColor2Shard3.anchor.x = 0.5;
		breakPointColor2Shard3.anchor.y = 0.5;
		breakPointColor2Shard3.tint = breakPointColors[1];
		if (matchVizViewConfig.isWebGL) breakPointColor2Shard3.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointColor2Shard3);
		
		breakPointFloor = new PIXI.Graphics();
		breakPointFloor.beginFill(breakPointColors[1], 1);
		breakPointFloor.drawRect(0, 0, 600, 16);
		breakPointFloor.endFill();
		breakPointFloor.pivot.x = 300;
		breakPointFloor.pivot.y = 8;
		if (matchVizViewConfig.isWebGL) breakPointFloor.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointFloor);
		
		breakPointBall1 = new PIXI.Graphics();
		breakPointBall1.beginFill(0x96d34d, 1);
		breakPointBall1.drawCircle(0, 0, 100);
		breakPointBall1.endFill();
		if (matchVizViewConfig.isWebGL) breakPointBall1.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointBall1);
		
		breakPointBall2 = new PIXI.Graphics();
		breakPointBall2.beginFill(0x75be34, .2);
		breakPointBall2.drawCircle(0, 0, 80);
		breakPointBall2.endFill();
		if (matchVizViewConfig.isWebGL) breakPointBall2.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointBall2);
		
		breakPointBall3 = new PIXI.Graphics();
		breakPointBall3.beginFill(0x5caa20, .2);
		breakPointBall3.drawCircle(0, 0, 60);
		breakPointBall3.endFill();
		if (matchVizViewConfig.isWebGL) breakPointBall3.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointBall3);
		
		breakPointBall4 = new PIXI.Graphics();
		breakPointBall4.beginFill(0x5caa20, .2);
		breakPointBall4.drawCircle(0, 0, 40);
		breakPointBall4.endFill();
		if (matchVizViewConfig.isWebGL) breakPointBall4.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointBall4);
		
		breakPointBall5 = new PIXI.Graphics();
		breakPointBall5.beginFill(0x96d34d, 1);
		breakPointBall5.drawCircle(0, 0, 100);
		breakPointBall5.endFill();
		if (matchVizViewConfig.isWebGL) breakPointBall5.blendMode = PIXI.blendModes.MULTIPLY;
		momentBreakPoint.addChild(breakPointBall5);
		
		// CREATE SOME TRIANGLE EXPLOSION PIECES
		for (var i = 0; i < 30; i++) {
			var breakPointParticleTri = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,1);
			switch (randomParticleType) {
				case 0:
					breakPointParticleTri.beginFill(breakPointColors[1], 1);
					break;
				default:
					breakPointParticleTri.beginFill(breakPointColors[0], 1);
			}
			breakPointParticleTri.moveTo(-25, -25);
			breakPointParticleTri.lineTo(25, -25);
			breakPointParticleTri.lineTo(0, 25);
			breakPointParticleTri.lineTo(-25, -25);
			breakPointParticleTri.endFill();
			if (matchVizViewConfig.isWebGL) breakPointParticleTri.blendMode = PIXI.blendModes.MULTIPLY;
			momentBreakPoint.addChild(breakPointParticleTri);
			breakPointTriangleArray.push(breakPointParticleTri);
			
			var breakPointParticleTri2 = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,1);
			switch (randomParticleType) {
				case 0:
					breakPointParticleTri2.beginFill(breakPointColors[1], 1);
					break;
				default:
					breakPointParticleTri2.beginFill(breakPointColors[0], 1);
			}
			breakPointParticleTri2.moveTo(-25, -25);
			breakPointParticleTri2.lineTo(25, -25);
			breakPointParticleTri2.lineTo(0, 25);
			breakPointParticleTri2.lineTo(-25, -25);
			breakPointParticleTri2.endFill();
			if (matchVizViewConfig.isWebGL) breakPointParticleTri2.blendMode = PIXI.blendModes.MULTIPLY;
			momentBreakPoint.addChild(breakPointParticleTri2);
			breakPointTriangleArray2.push(breakPointParticleTri2);
		}
		
		// TEXT
		breakPointTitle1 = new PIXI.Text("BREAK", { font: "110px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		breakPointTitle1.position.x = 0;
		breakPointTitle1.position.y = -55;
		breakPointTitle1.anchor.x = 0.5;
		breakPointTitle1.anchor.y = 0.5;
		momentBreakPoint.addChild(breakPointTitle1);
		
		breakPointTitle2 = new PIXI.Text("POINT", { font: "110px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		breakPointTitle2.position.x = 0;
		breakPointTitle2.position.y = 15;
		breakPointTitle2.anchor.x = 0.5;
		breakPointTitle2.anchor.y = 0.5;
		momentBreakPoint.addChild(breakPointTitle2);
		
		// CREATE SOME 3D PIECES AND CONTAINERS
		for (var i = 0; i < 13; i++) {
			var breakPointExplosionContainer = new PIXI.DisplayObjectContainer();
			var breakPointExplosionTexture = PIXI.Texture.fromImage("img/breakpoint/explosion" + i + ".png");
			var breakPointExplosion = new PIXI.Sprite(breakPointExplosionTexture);
			breakPointExplosion.anchor.x = 0.5;
			breakPointExplosion.anchor.y = 0.5;
			breakPointExplosion.tint = breakPointColors[1];
			if (matchVizViewConfig.isWebGL) breakPointExplosion.blendMode = PIXI.blendModes.MULTIPLY;
			breakPointExplosionContainer.addChild(breakPointExplosion);
			momentBreakPoint.addChild(breakPointExplosionContainer);
	
			breakPoint3dArray.push(breakPointExplosionContainer);
			breakPoint3dShardArray.push(breakPointExplosion);
		}
			
		$('#icon_breakpoint').click(function(){
			if (momentBreakPoint.visible == false) explodeBreakPoint();
			return false;
		});
		
		TweenMax.to($('#icon_breakpoint'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentBreakPoint.visible = false;
}

function redrawBreakPoint() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		breakPointColors = ["0x8cc63f", "0xfdb813"];
	} else {
		breakPointColors = ["0xfdb813", "0x8cc63f"];
	}
	
	// COLOR 1 SHARDS
	breakPointColor1Shard1.tint = breakPointColors[0];
	breakPointColor1Shard2.tint = breakPointColors[0];
	breakPointColor1Shard3.tint = breakPointColors[0];
	breakPointColor1Shard4.tint = breakPointColors[0];
	breakPointColor1Shard5.tint = breakPointColors[0];
	breakPointColor1Shard6.tint = breakPointColors[0];
	breakPointColor1Shard7.tint = breakPointColors[0];
	breakPointColor1Shard8.tint = breakPointColors[0];
	// COLOR 2 SHARDS
	breakPointColor2Shard1.tint = breakPointColors[1];
	breakPointColor2Shard2.tint = breakPointColors[1];
	breakPointColor2Shard3.tint = breakPointColors[1];
}

function explodeBreakPoint() {
	hideMoments();
	
	redrawBreakPoint();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < breakPointEmitters.length ) {
		em = breakPointEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(breakPointParticles);

	/////////////////////////////////////////////////
	
	breakPointAnimationIn =  new TimelineMax({ paused: true });

	//////////////// PARTICLE STUFF /////////////////
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointParticleContainer, 1, { alpha: 0 }, { alpha: 1 }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointEm_Triangles.doc, 1.5, { x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 }, { x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1 , ease: Quart.easeOut }), 2.75);
	/////////////////////////////////////////////////
	
	// PARTICLE SPACE FIELD 
	for (var i = 0; i < breakPointMotionArray.length; i++) {
		var particle = breakPointMotionArray[i],
			tempWidth = window.innerWidth/2 - 200,
			destinationX = generateRandomNumber(150, tempWidth),
			destinationY = generateRandomNumber(-1000, -2000),
			tempScale = generateRandomNumber(1, 5),
			tempRotation =  generateRandomNumber(-5, 5),
			tempDelay = (i * .05);
		if ( i%2 == 0) {
			destinationX = -destinationX;
		}
		breakPointAnimationIn.add(TweenMax.fromTo( particle, .5,{ x: destinationX, y: 1500, scaleX: tempScale, scaleY: tempScale, alpha: 1, rotation: 0 },{ x: destinationX, y: destinationY, scaleX: tempScale, scaleY: tempScale, rotation: tempRotation, alpha: 1, delay: tempDelay, ease: Linear.easeNone }), 0);
	}
	
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall1, 3.0,{ x: 0 },{ x: 5, ease: RoughEase.ease.config({ strength: 3, points: 50}) }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall2, 3.0,{ x: 0 },{ x: 10, ease: RoughEase.ease.config({ strength: 3, points: 50}) }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall3, 3.0,{ x: 0 },{ x: 15, ease: RoughEase.ease.config({ strength: 3, points: 50}) }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall4, 3.0,{ x: 0 },{ x: 20, ease: RoughEase.ease.config({ strength: 3, points: 50}) }), 0);
	
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall1, .5,{ y: -500, alpha: 0 },{ y: 80, alpha: 1, ease: Strong.easeOut }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall2, .6,{ y: -500, alpha: 0 },{ y: 60, alpha: 1, ease: Strong.easeOut }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall3, .7,{ y: -500, alpha: 0 },{ y: 40, alpha: 1, ease: Strong.easeOut }), 0);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall4, .8,{ y: -500, alpha: 0 },{ y: 20, alpha: 1, ease: Strong.easeOut }), 0);
	
	breakPointAnimationIn.add(TweenMax.to( breakPointBall1, 2.0,{ y: -1000, ease: Expo.easeIn }), .5);
	breakPointAnimationIn.add(TweenMax.to( breakPointBall2, 2.0,{ y: -1200, ease: Expo.easeIn }), .5);
	breakPointAnimationIn.add(TweenMax.to( breakPointBall3, 2.0,{ y: -1400, ease: Expo.easeIn }), .5);
	breakPointAnimationIn.add(TweenMax.to( breakPointBall4, 2.0,{ y: -1600, ease: Expo.easeIn }), .5);
	
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointFloor, 1,{ y: 500, scaleX: 0, alpha: 0 },{ y: 100, scaleX: 1, alpha: 1, ease: Strong.easeInOut }), 2);
	
	var tempHeight = window.innerHeight/2 + 200;
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall5, .5,{ y: -tempHeight },{ y: 0, ease: Strong.easeIn }), 2.25);
	
	// HIDE THE FLOOR AND SQUISHED BALL
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointBall5, .01,{ alpha: 1 },{ alpha: 0, ease: Strong.easeIn }), 2.75);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointFloor, .01,{ alpha: 1 },{ alpha: 0, ease: Strong.easeIn }), 2.75);
	
	// PARTICLE EXPLOSION 1 
	for (var i = 0; i < breakPointTriangleArray.length; i++) {
		var particle = breakPointTriangleArray[i],
			destinationX = generateRandomNumber(-200, 200),
			destinationY = generateRandomNumber(-300, -350), // WHERE THE PIECES FLY
			destinationX2 = generateRandomNumber(-500, 500),
			destinationY2 = generateRandomNumber(-200, 200), // WHERE THE PIECES DROP
			scale = generateRandomNumber(1, 5) * .1,
			rotation =  generateRandomNumber(-20, 20),
			duration = 1 + (i * .02);
			
		breakPointAnimationIn.add(TweenMax.fromTo( particle, 1.25,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 1, rotation: 0 },{ x: destinationX2, y: destinationY2, scaleX: scale, scaleY: scale, rotation: rotation, alpha: 0, ease: Power4.easeOut }), 2.65);
	}
	
	// PARTICLE EXPLOSIONS  2
	for (var i = 0; i < breakPointTriangleArray2.length; i++) {
		var particle = breakPointTriangleArray2[i],
			destinationX = generateRandomNumber(-200, 200),
			destinationY = generateRandomNumber(-200, 200), // WHERE THE PIECES DROP
			scale = generateRandomNumber(1, 5) * .1,
			rotation =  generateRandomNumber(-20, 20),
			duration = 1 + (i * .02);
		breakPointAnimationIn.add(TweenMax.fromTo( particle, duration,{ x: destinationX, y: -1000, scaleX: scale, scaleY: scale, alpha: 0, rotation: rotation },{ x: destinationX, y: destinationY, scaleX: scale, scaleY: scale, alpha: 1, rotation: rotation, ease: Bounce.easeInOut }), 2.75);
	}
	
	// 3D EXPLOSIONS 
	for (var i = 0; i < 13; i++) {
		var tempWidth = window.innerWidth/2,
			destinationX = generateRandomNumber(-tempWidth, tempWidth),
			destinationY = generateRandomNumber(100, -350); // WHERE THE PIECES FLY
		if ( i%2 == 0) {
			destinationX = -destinationX;
		}
		//breakPointAnimationIn.add(TweenMax.fromTo( breakPoint3dArray[i], 2.0,{ x: 0, y: 100, scaleX: 1, scaleY: 0, alpha: 1 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: .25, alpha: 0, ease: Expo.easeOut }), 2.75);
		breakPointAnimationIn.add(TweenMax.fromTo( breakPoint3dArray[i], 2.0,{ x: 0,scaleX: 0, scaleY: 0},{ x: destinationX, scaleX: .5, scaleY: .25, ease: Expo.easeOut }), 2.75);
		breakPointAnimationIn.add(TweenMax.fromTo( breakPoint3dArray[i], .5,{ y: 100 },{ y: destinationY, ease: Circ.easeOut }), 2.75);
		breakPointAnimationIn.add(TweenMax.fromTo( breakPoint3dArray[i], 0.5,{ y: destinationY, alpha: 1 },{ y: 100, alpha: 0, ease: Quad.easeIn }, "-=.1"), 3.25);
		breakPointAnimationIn.add(TweenMax.fromTo( breakPoint3dShardArray[i], 3.0,{ rotation: 0 },{ rotation: 10, ease: Expo.easeOut }), 2.75);
	}

	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard1, 1.0,{ x: -20, y: -1000, alpha: 0 },{ x: -10, y: 130, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard2, 1.1,{ x: -35, y: -1000, alpha: 00 },{ x: -35, y: 80, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard3, 1.2,{ x: 30, y: -1000, alpha: 0 },{ x: 30, y: 70, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard4, 1.3,{ x: 0, y: -1000, alpha: 0 },{ x: 0, y: 70, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard5, 1.4,{ x: 0, y: -1000, alpha: 0 },{ x: 0, y: 20, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard6, 1.5,{ x: 0, y: -1000, alpha: 0 },{ x: 0, y: -30, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard7, 1.6,{ x: 55, y: -1000, alpha: 0 },{ x: 55, y: -110, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor1Shard8, 1.7,{ x: -75, y: -1000, alpha: 0 },{ x: -75, y: -110, alpha: 1, ease: Bounce.easeInOut }), 2.25);
	
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor2Shard1, 1.0,{ x: -20, y: -2000, alpha: 0 },{ x: 0, y: 75, alpha: 1, ease: Expo.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor2Shard2, 1.1,{ x: -120, y: -2000, alpha: 0 },{ x: -120, y: -80, alpha: 1, ease: Expo.easeInOut }), 2.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointColor2Shard3, 1.2,{ x: 120, y: -2000, alpha: 0 },{ x: 120, y: -100, alpha: 1, ease: Expo.easeInOut }), 2.25);
	
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointTitle1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: -80, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3.25);
	breakPointAnimationIn.add(TweenMax.fromTo( breakPointTitle2, 1.1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3.25);
	
	breakPointAnimationIn.timeScale(1.35);
	breakPointAnimationIn.play();
	
	momentBreakPoint.visible = true;
	
	animationTimer = setTimeout(destroyBreakPoint,6000);
}

function destroyBreakPoint() {
	
	breakPointAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	breakPointAnimationOut.add(TweenMax.to( breakPointParticleContainer, 1.0, { alpha: 0 }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointEm_Triangles.doc, 1.0, { x: 0, y: 1000, ease: Expo.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard1, 1.0,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard2, 1.1,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard3, 1.2,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard4, 1.3,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard5, 1.4,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard6, 1.5,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard7, 1.6,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor1Shard8, 1.7,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	
	breakPointAnimationOut.add(TweenMax.to( breakPointColor2Shard1, 1.0,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor2Shard2, 1.1,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointColor2Shard3, 1.2,{ x: 0, y: 1000, alpha: 0, ease: Expo.easeInOut }), 0);
	
	breakPointAnimationOut.add(TweenMax.to( breakPointTitle1, .9,{ x: 0, y: 300, alpha: 0, ease: Expo.easeInOut }), 0);
	breakPointAnimationOut.add(TweenMax.to( breakPointTitle2, .8,{ x: 0, y: 300, alpha: 0, ease: Expo.easeInOut }), 0);
	
	for (var i = 0; i < breakPointTriangleArray2.length; i++) {
		var circle = breakPointTriangleArray2[i];
		var duration = 1 + (i * .02);
		breakPointAnimationOut.add(TweenMax.to( circle, (duration),{ y: 500, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	breakPointAnimationOut.timeScale(1);
	breakPointAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);	
}