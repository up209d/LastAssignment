var deuceRect2Array = [];
var deuceRect1Array = [];
var deuceRectArray = [];
var deuceVortexArray = [];
var deuceExplosionArray = [];

var deuceColors = ["0xd9182d", "0x00b2ef"];

var tempHeight = window.innerHeight + 800;

//////////////// PARTICLE STUFF /////////////////
var deuceParticles 	= new ParticleEngine(window.innerWidth, 500);
var deuceEmitters 	= [];
var deuceParticleContainer;
var deuceEm_TennisBall,
	deuceEm_Shard1,
	deuceEm_Shard2
/////////////////////////////////////////////////

function createDeuce() {
	momentDeuce = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentDeuce);
	
	var assetsToLoader = [
		"img/deuce/lightning-red.png",
		"img/deuce/lightning-blue.png",
		"img/deuce/circle-red.png",
		"img/deuce/circle-blue.png",
		"img/deuce/streak-red.png",
		"img/deuce/streak-blue.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		deuceParticleContainer = new PIXI.DisplayObjectContainer();
		momentDeuce.addChild(deuceParticleContainer);
		
		deuceEm_TennisBall = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/ball-white.png", 
				life		: 	800.0,
				spin		: 	[-0.03, 0.03],
				speed		: 	[1, 3],
				scale		: 	[0.1,0.2],
				colors		: 	[deuceColors[0], deuceColors[1], 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		deuceEm_Shard1 = new Emitter({
				type		:	"linear",
				count		:	35,
				angle		:	135 
			},
			{ 	type 		:	DoubleParticle, 
				image		:	"img/common/shard-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.05,0.7],
				colors		: 	[deuceColors[0], deuceColors[1]],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		deuceEm_Shard2 = new Emitter({
				type		:	"linear",
				count		:	35,
				angle		:	-45 
			},
			{ 	type 		:	DoubleParticle, 
				image		:	"img/common/shard-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.05,0.7],
				colors		: 	[deuceColors[0], deuceColors[1]],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		deuceEmitters.push(deuceEm_TennisBall);
		deuceEmitters.push(deuceEm_Shard1);
		deuceEmitters.push(deuceEm_Shard2);

		deuceParticles.addEmitters(deuceEmitters);

		deuceParticleContainer.addChild(deuceEm_TennisBall.doc);
		deuceParticleContainer.addChild(deuceEm_Shard1.doc);
		deuceParticleContainer.addChild(deuceEm_Shard2.doc);
		/////////////////////////////////////////////////
		
		deuceScoreSquare1 = new PIXI.Graphics();
		deuceScoreSquare1.pivot.x = 125;
		deuceScoreSquare1.pivot.y = 125;
		if (matchVizViewConfig.isWebGL) deuceScoreSquare1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceScoreSquare1);
		
		deuceScoreSquare2 = new PIXI.Graphics();
		deuceScoreSquare2.pivot.x = 125;
		deuceScoreSquare2.pivot.y = 125;
		if (matchVizViewConfig.isWebGL) deuceScoreSquare2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceScoreSquare2);
		
		// DIVDER GUNSHOT CUTOUT
		deuceDividerWhite = new PIXI.Graphics();
		deuceDividerWhite.beginFill(0xffffff, 1);
		deuceDividerWhite.drawRect(0, 0, 250, 10);
		deuceDividerWhite.endFill();
		deuceDividerWhite.pivot.x = 125;
		deuceDividerWhite.pivot.y = 5;
		deuceDividerWhite.rotation = -45 * toRAD;
		momentDeuce.addChild(deuceDividerWhite);
		
		// DIVDER GUNSHOT
		deuceBullet = new PIXI.Graphics();
		deuceBullet.beginFill(deuceColors[0], 1);
		deuceBullet.drawRect(0, 0, 1200, 10);
		deuceBullet.endFill();
		deuceBullet.pivot.x = 600;
		deuceBullet.pivot.y = 5;
		deuceBullet.rotation = -45 * toRAD;
		if (matchVizViewConfig.isWebGL) deuceBullet.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceBullet);
		
		// DIVDERS
		deuceDivider1 = new PIXI.Graphics();
		deuceDivider1.beginFill(deuceColors[1], 1);
		//deuceDivider1.drawRect(0, 0, 1200, 10);
		deuceDivider1.drawRect(0, 0, tempHeight, 10);
		deuceDivider1.endFill();
		//deuceDivider1.pivot.x = 600;
		deuceDivider1.pivot.x = tempHeight/2;
		deuceDivider1.pivot.y = 5;
		deuceDivider1.rotation = -45 * toRAD;
		if (matchVizViewConfig.isWebGL) deuceDivider1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceDivider1);
		
		deuceDivider2 = new PIXI.Graphics();
		deuceDivider2.beginFill(deuceColors[0], 1);
		//deuceDivider2.drawRect(0, 0, 1200, 10);
		deuceDivider2.drawRect(0, 0, tempHeight, 10);
		deuceDivider2.endFill();
		//deuceDivider2.pivot.x = 600;
		deuceDivider2.pivot.x = tempHeight/2;
		deuceDivider2.pivot.y = 5;
		deuceDivider2.rotation = -45 * toRAD;
		if (matchVizViewConfig.isWebGL) deuceDivider2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceDivider2);
			
		// CREATE SOME RECTANGLES
		for (var i = 0; i < 3; i++) {
			deuceRect1 = new PIXI.Graphics();
			deuceRect1.pivot.x = 25;
			deuceRect1.pivot.y = 25;
			if (matchVizViewConfig.isWebGL) deuceRect1.blendMode = PIXI.blendModes.MULTIPLY;
			momentDeuce.addChild(deuceRect1);
			deuceRect1Array.push(deuceRect1);
			
			deuceRect2 = new PIXI.Graphics();
			deuceRect2.pivot.x = 25;
			deuceRect2.pivot.y = 25;
			if (matchVizViewConfig.isWebGL) deuceRect2.blendMode = PIXI.blendModes.MULTIPLY;
			momentDeuce.addChild(deuceRect2);
			deuceRect2Array.push(deuceRect2);
		}
		
		// LIGHTNING SHARD
		deuceTextureLightning1 = PIXI.Texture.fromImage("img/deuce/lightning1.png");
		deuceLightning1_1 = new PIXI.Sprite(deuceTextureLightning1);
		deuceLightning1_1.anchor.x = 0.5;
		deuceLightning1_1.anchor.y = 0.5;
		deuceLightning1_1.position.x = -30;
		deuceLightning1_1.position.y = 60;
		deuceLightning1_1.tint = deuceColors[0];
		if (matchVizViewConfig.isWebGL) deuceLightning1_1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceLightning1_1);
		
		deuceLightning1_2 = new PIXI.Sprite(deuceTextureLightning1);
		deuceLightning1_2.anchor.x = 0.5;
		deuceLightning1_2.anchor.y = 0.5;
		deuceLightning1_2.position.x = 5;
		deuceLightning1_2.position.y = 5;
		deuceLightning1_2.tint = deuceColors[0];
		if (matchVizViewConfig.isWebGL) deuceLightning1_2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceLightning1_2);
	
		deuceTextureLightning2 = PIXI.Texture.fromImage("img/deuce/lightning2.png");
		deuceLightning2_1 = new PIXI.Sprite(deuceTextureLightning2);
		deuceLightning2_1.anchor.x = 0.5;
		deuceLightning2_1.anchor.y = 0.5;
		deuceLightning2_1.position.x = 30;
		deuceLightning2_1.position.y = -60;
		deuceLightning2_1.tint = deuceColors[1];
		if (matchVizViewConfig.isWebGL) deuceLightning2_1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceLightning2_1);
		
		deuceLightning2_2 = new PIXI.Sprite(deuceTextureLightning2);
		deuceLightning2_2.anchor.x = 0.5;
		deuceLightning2_2.anchor.y = 0.5;
		deuceLightning2_2.position.x = -5;
		deuceLightning2_2.position.y = -5;
		deuceLightning2_2.tint = deuceColors[1];
		if (matchVizViewConfig.isWebGL) deuceLightning2_2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceLightning2_2);
		
		//STREAKS
		deuceTextureStreak1 = PIXI.Texture.fromImage("img/deuce/streak1.png");
		deuceTextureStreak2 = PIXI.Texture.fromImage("img/deuce/streak2.png");
		
		deuceStreak1_1 = new PIXI.Sprite(deuceTextureStreak1);
		deuceStreak1_1.anchor.x = 0.5;
		deuceStreak1_1.anchor.y = 0.5;
		deuceStreak1_1.tint = deuceColors[0];
		if (matchVizViewConfig.isWebGL) deuceStreak1_1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceStreak1_1);
		
		deuceStreak1_2 = new PIXI.Sprite(deuceTextureStreak2);
		deuceStreak1_2.anchor.x = 0.5;
		deuceStreak1_2.anchor.y = 0.5;
		deuceStreak1_2.tint = deuceColors[1];
		if (matchVizViewConfig.isWebGL) deuceStreak1_2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceStreak1_2);
	
		deuceStreak2_1 = new PIXI.Sprite(deuceTextureStreak1);
		deuceStreak2_1.anchor.x = 0.5;
		deuceStreak2_1.anchor.y = 0.5;
		deuceStreak2_1.rotation = 180 * toRAD;
		deuceStreak2_1.tint = deuceColors[0];
		if (matchVizViewConfig.isWebGL) deuceStreak2_1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceStreak2_1);
	
		deuceStreak2_2 = new PIXI.Sprite(deuceTextureStreak2);
		deuceStreak2_2.anchor.x = 0.5;
		deuceStreak2_2.anchor.y = 0.5;
		deuceStreak2_2.rotation = 180 * toRAD;
		deuceStreak2_2.tint = deuceColors[1];
		if (matchVizViewConfig.isWebGL) deuceStreak2_2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDeuce.addChild(deuceStreak2_2);
		
		// CREATE SOME RECTANGLES
		for (var i = 0; i < 12; i++) {
			deuceRect1 = new PIXI.Graphics();
			if (i === 3 || i === 8) {
				deuceRect1.beginFill(deuceColors[1], 1);
			} else {
				deuceRect1.beginFill(deuceColors[0], 1);
			}
			//deuceRect1.drawRect(0, 0, 1200, 500);
			deuceRect1.drawRect(0, 0, tempHeight, 500);
			deuceRect1.endFill();
			//deuceRect1.pivot.x = 600;
			deuceRect1.pivot.x = tempHeight/2;
			deuceRect1.pivot.y = 250;
			if (matchVizViewConfig.isWebGL) deuceRect1.blendMode = PIXI.blendModes.MULTIPLY;
			momentDeuce.addChild(deuceRect1);
			deuceRectArray.push(deuceRect1);
		}
		
		
		// CREATE SOME EXPLOSION PIECES
		for (var i = 0; i < 20; i++) {
			var deuceParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,5);
			
			switch (randomParticleType) {
				case 0:
					deuceParticle.lineStyle(2, deuceColors[0], 1);
					deuceParticle.drawCircle(0, 0, generateRandomNumber(5, 15)); 
					break;
				default:
					deuceParticle.beginFill(deuceColors[0], .5);
					deuceParticle.drawCircle(0, 0, generateRandomNumber(2, 10));
			}
			deuceParticle.endFill();
			if (matchVizViewConfig.isWebGL) deuceParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentDeuce.addChild(deuceParticle);
			deuceExplosionArray.push(deuceParticle);
		}
		
		// TEXT
		deuceScore1 = new PIXI.Text("40", { font: "200px Knockout47", fill: "#ffffff" });
		deuceScore1.position.x = 0;
		deuceScore1.position.y = 0;
		deuceScore1.anchor.x = 0.5;
		deuceScore1.anchor.y = 0.5;
		momentDeuce.addChild(deuceScore1);
		
		deuceScore2 = new PIXI.Text("40", { font: "200px Knockout47", fill: "#ffffff" });
		deuceScore2.position.x = 0;
		deuceScore2.position.y = 0;
		deuceScore2.anchor.x = 0.5;
		deuceScore2.anchor.y = 0.5;
		momentDeuce.addChild(deuceScore2);
		
		deuceTitle = new PIXI.Text("DEUCE", { font: "70px Knockout47", fill: "#ffffff" });
		deuceTitle.position.x = 0;
		deuceTitle.position.y = 0;
		deuceTitle.anchor.x = 0.5;
		deuceTitle.anchor.y = 0.5;
		deuceTitle.rotation = -45 * toRAD;
		momentDeuce.addChild(deuceTitle);
		
		$('#icon_deuce').click(function(){
			if (momentDeuce.visible == false) explodeDeuce();
			return false;
		});
		
		TweenMax.to($('#icon_deuce'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}

	momentDeuce.visible = false;
}

function redrawDeuce() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		deuceColors = ["0x00b2ef", "0xd9182d"];
	} else {
		deuceColors = ["0xd9182d", "0x00b2ef"];
	}
	deuceScoreSquare1.clear();
	deuceScoreSquare1.beginFill(deuceColors[0], 1);
	deuceScoreSquare1.drawRect(0, 0, 250, 250);
	deuceScoreSquare1.endFill();
	
	deuceScoreSquare2.clear();
	deuceScoreSquare2.beginFill(deuceColors[1], 1);
	deuceScoreSquare2.drawRect(0, 0, 250, 250);
	deuceScoreSquare2.endFill();
	
	// CREATE SOME RECTANGLES
	for (var i = 0; i < 3; i++) {
		deuceRect1Array[i].clear();
		deuceRect1Array[i].beginFill(deuceColors[0], 1);
		deuceRect1Array[i].drawRect(0, 0, 50, 50);
		deuceRect1Array[i].endFill();
		
		deuceRect2Array[i].clear();
		deuceRect2Array[i].beginFill(deuceColors[1], 1);
		deuceRect2Array[i].drawRect(0, 0, 50, 50);
		deuceRect2Array[i].endFill();
	}
	
	deuceStreak1_1.tint = deuceColors[0];
	deuceStreak1_2.tint = deuceColors[1];
	deuceStreak2_1.tint = deuceColors[0];
	deuceStreak2_2.tint = deuceColors[1];
	
	deuceLightning1_1.tint = deuceColors[0];
	deuceLightning1_2.tint = deuceColors[0];
	deuceLightning2_1.tint = deuceColors[1];
	deuceLightning2_2.tint = deuceColors[1];
}

function explodeDeuce() {
	hideMoments();
	
	redrawDeuce();
	
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < deuceEmitters.length ) {
		em = deuceEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(deuceParticles);

	/////////////////////////////////////////////////
	
	deuceAnimationIn =  new TimelineMax({ paused: true });

	//////////////// PARTICLE STUFF /////////////////
	deuceAnimationIn.add(TweenMax.fromTo( deuceParticleContainer, 1, { alpha: 0}, { alpha: 1, ease: Expo.easeOut }), 0);
	deuceAnimationIn.add(TweenMax.fromTo( deuceEm_TennisBall.doc, 1, { scaleX: 0.0, scaleY: 0.0}, { scaleX: 1.0, scaleY: 1.0, ease: Quart.easeInOut }), 0.75);
	deuceAnimationIn.add(TweenMax.fromTo( deuceEm_Shard1.doc, 0.8,{ x:  1200, y:-1200, alpha: 0}, { x: 0, y:0, alpha: 1, ease: Quart.easeInOut }), 0);
	deuceAnimationIn.add(TweenMax.fromTo( deuceEm_Shard2.doc, 0.8,{ x: -1200,  y: 1200, alpha: 0}, { x: 0, y:0, alpha: 1, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	// RESET SOME THINGS
	deuceAnimationIn.add(TweenMax.to( deuceLightning1_1, 0,{ alpha: 0 }), 0);
	deuceAnimationIn.add(TweenMax.to( deuceLightning1_2, 0,{ alpha: 0 }), 0);
	deuceAnimationIn.add(TweenMax.to( deuceLightning2_1, 0,{ alpha: 0 }), 0);
	deuceAnimationIn.add(TweenMax.to( deuceLightning2_2, 0,{ alpha: 0 }), 0);
	deuceAnimationIn.add(TweenMax.to( deuceDividerWhite, 0,{ alpha: 0 }), 0);
	
	// RECTANGLE WIPE
	for (var i = 0; i < deuceRectArray.length; i++) {
		var rectangle = deuceRectArray[i];
		var duration = 1 - (i * .03);
		var rectangleX = window.innerWidth/2 + 1000;
		var rectangleRotation = -45 * toRAD;
		if ( i%2 == 0) {
			rectangleX = -rectangleX;
		}
		deuceAnimationIn.add(TweenMax.fromTo( rectangle, (duration),{ y: 0, scaleX: 1, scaleY: 0, rotation: rectangleRotation },{ y: 0, scaleX: 1, scaleY: 1, rotation: rectangleRotation, ease: Expo.easeInOut }), 0);
		deuceAnimationIn.add(TweenMax.fromTo( rectangle, (duration + .25),{ x: 0 },{ x: rectangleX, ease: Expo.easeInOut }), 0);
		
		if (i === 10 || i === 11) {
			var tempDelay = (duration/2);
			deuceAnimationIn.add(TweenMax.fromTo( rectangle, (duration/2),{ y: 0, scaleX: 1, scaleY: 0, rotation: rectangleRotation },{ y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeIn }), 0);
			deuceAnimationIn.add(TweenMax.fromTo( rectangle, (duration/2),{ x: 0, },{ x: rectangleX, delay: tempDelay, ease: Expo.easeIn }), 0);
		}
	}
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceScore1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeInOut }), .15);
	deuceAnimationIn.add(TweenMax.fromTo( deuceScoreSquare1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: (45 * toRAD), alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: (45 * toRAD), alpha: 1, ease: Elastic.easeInOut }), .15);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceScoreSquare2, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 1, rotation: (45 * toRAD), alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: (45 * toRAD), alpha: 1, ease: Expo.easeOut }), 1.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceBullet, .75,{ x: -1000, y: 1000, scaleX: 1, scaleY: 1 },{ x: 1000, y: -1000, scaleX: 1, scaleY: 1, ease: Expo.easeOut }), 1.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceDividerWhite, .01,{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1 }), 1.25);
	
	// WIGGLE
	deuceAnimationIn.add(TweenMax.fromTo( deuceScore1, .25,{ x: 0, y: 0 },{ x: generateRandomNumber(-15, 15), y: generateRandomNumber(-15, 15), ease: RoughEase.ease.config({ strength: 3, points: 30}) }), 1.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceDividerWhite, .25,{ x: 0, y: 0 },{ x: 10, y: 10, ease: RoughEase.ease.config({ strength: 3, points: 30}) }), 1.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceScoreSquare2, .25,{ x: 0, y: 0 },{ x: 10, y: 10, ease: RoughEase.ease.config({ strength: 3, points: 30}) }), 1.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceScoreSquare1, .25,{ x: 0, y: 0 },{ x: generateRandomNumber(-25, 25), y: generateRandomNumber(-15, 15), ease: RoughEase.ease.config({ strength: 3, points: 30}) }), 1.25);
	
	deuceAnimationIn.add(TweenMax.to( deuceScore1, .5,{ x: 0, y: 0, ease: Expo.easeOut }), 1.5);
	deuceAnimationIn.add(TweenMax.to( deuceDividerWhite, .5,{ x: 0, y: 0, ease: Expo.easeOut }), 1.5);
	deuceAnimationIn.add(TweenMax.to( deuceScoreSquare2, .5,{ x: 0, y: 0, ease: Expo.easeOut }), 1.5);
	deuceAnimationIn.add(TweenMax.to( deuceScoreSquare1, .5,{ x: 0, y: 0, ease: Expo.easeOut }), 1.5);
	
	// PARTICLE EXPLOSIONS
	for (var i = 0; i < deuceExplosionArray.length; i++) {
		var circle = deuceExplosionArray[i];
		var destinationY = generateRandomNumber(-200, 200);
		
		if ( i%2 == 0) {
			var destinationX = generateRandomNumber(0, 300);
			deuceAnimationIn.add(TweenMax.fromTo( circle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 1.25);
		} else {
			var destinationX = generateRandomNumber(-300, 0);
			deuceAnimationIn.add(TweenMax.fromTo( circle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 1.25);
		}
	}
	
	deuceAnimationIn.add(TweenMax.to( deuceScoreSquare1, .25,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeIn }), 2);
	deuceAnimationIn.add(TweenMax.to( deuceScoreSquare2, .25,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeIn }), 2);
	deuceAnimationIn.add(TweenMax.to( deuceScore1, .25,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeIn }), 2);
	deuceAnimationIn.add(TweenMax.to( deuceDividerWhite, .25,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeIn }), 2);
	
	// SQUARES MOVE
	for (var i = 0; i < deuceRect2Array.length; i++) {
		var particle = deuceRect1Array[i];
		var particle2 = deuceRect2Array[i];
		var tempRotation = 45 * toRAD;
		var tempDestinationX = generateRandomNumber(95, 105);
		var tempDestinationY = generateRandomNumber(95, 105);
		if (i == 0) {
			tempDestinationX = 100;
			tempDestinationY = 100;
		}
		deuceAnimationIn.add(TweenMax.fromTo( particle, 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: tempRotation, alpha: 0 },{ x: tempDestinationX, y: tempDestinationY, scaleX: 1, scaleY: 1, rotation: tempRotation, alpha: 1, ease: Expo.easeOut }), 2.25);
		deuceAnimationIn.add(TweenMax.fromTo( particle2, 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: tempRotation, alpha: 0 },{ x: -tempDestinationY, y: -tempDestinationY, scaleX: 1, scaleY: 1, rotation: tempRotation, alpha: 1, ease: Expo.easeOut }), 2.25);
	}
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceScore1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 100, y: 100, scaleX: .25, scaleY: .25, alpha: 1, ease: Expo.easeOut }), 2.25);
	deuceAnimationIn.add(TweenMax.fromTo( deuceScore2, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -100, y: -100, scaleX: .25, scaleY: .25, alpha: 1, ease: Expo.easeOut }), 2.25);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceLightning1_1, 1.25,{ x: 500, y: -500, scaleX: 1, scaleY: 1, alpha: 0 },{ x: -2, y: -2, scaleX: .5, scaleY: .5, alpha: 1, ease: Expo.easeInOut }), 1.5);
	deuceAnimationIn.add(TweenMax.fromTo( deuceLightning1_2, 1.25,{ x: -500, y: 500, scaleX: 1, scaleY: 1, alpha: 0 },{ x: 2, y: 2, scaleX: .5, scaleY: .5, alpha: 1, ease: Expo.easeInOut }), 1.5);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceTitle, 1.5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 2.5);
	deuceAnimationIn.add(TweenMax.to( deuceLightning1_1, .5,{ x: 50, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut }), 2.5);
	deuceAnimationIn.add(TweenMax.to( deuceLightning1_2, .5,{ scaleX: 1, scaleY: 1, ease: Expo.easeOut }), 2.5);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceDivider2, .75,{ x: 0, y: 0, scaleX: 1, scaleY: 0, alpha: 1 },{ x: 125, y: 0, scaleX: 1, scaleY: 1, alpha: 0, ease: Expo.easeOut }), 2.5);
	deuceAnimationIn.add(TweenMax.fromTo( deuceDivider1, .75,{ x: 0, y: 0, scaleX: 1, scaleY: 0, alpha: 1 },{ x: -125, y: 0, scaleX: 1, scaleY: 1, alpha: 0, ease: Expo.easeOut }), 2.5);
	
	deuceAnimationIn.add(TweenMax.to( deuceLightning1_1, .5,{ x: 0, y: 50, ease: Expo.easeOut }), 3);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceLightning2_1, 1,{ x: 2, y: 2, scaleX: 1, scaleY: 1, alpha: 0 },{ x: -50, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 2.5);
	deuceAnimationIn.add(TweenMax.fromTo( deuceLightning2_2, 1,{ x: 2, y: 2, scaleX: 1, scaleY: 1, alpha: 0 },{ x: -2, y: -2, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 2.5);
	deuceAnimationIn.add(TweenMax.to( deuceLightning2_1, 1,{ x: 0, y: -50, ease: Expo.easeOut }), 3);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceStreak1_1, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 75, y: -75, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3);
	deuceAnimationIn.add(TweenMax.fromTo( deuceStreak2_1, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -65, y: 65, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3);
	
	deuceAnimationIn.add(TweenMax.fromTo( deuceStreak1_2, .75,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 30, y: -55, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3);
	deuceAnimationIn.add(TweenMax.fromTo( deuceStreak2_2, .75,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -50, y: 75, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3);
	
	// SHAKE RATTLE & ROLL
	deuceAnimationIn.add(TweenMax.fromTo( momentDeuce, 0.5,{ x: 0, y: 10 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 15, points: 30 }) }), 1.25);
	deuceAnimationIn.add(TweenMax.to( momentDeuce, 0,{ x: 0, y: 0 }), 0);
	
	deuceAnimationIn.timeScale(1.25);
	deuceAnimationIn.play();
	
	momentDeuce.visible = true;
	
	animationTimer = setTimeout(destroyDeuce, 5000);
	
}

function destroyDeuce() {
	
	deuceAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	deuceAnimationOut.add(TweenMax.to( deuceParticleContainer, 1.0, { alpha: 0 }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceEm_TennisBall.doc, 1,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceEm_Shard1.doc, 1,{ x: -800, y: 800, ease: Quart.easeInOut }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceEm_Shard2.doc, 1,{ x:  800, y:-800, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	deuceAnimationOut.add(TweenMax.to( deuceTitle, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceStreak1_1, .65,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceStreak2_1, .65,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceStreak1_2, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceStreak2_2, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceLightning1_1, 0.75,{ x: 500, y: -500, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceLightning1_2, 0.75,{ x: -1000, y: 1000, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceLightning2_1, 0.75,{ x: -500, y: 500, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceLightning2_2, 0.75,{ x: 1000, y: -1000, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceScore1, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	deuceAnimationOut.add(TweenMax.to( deuceScore2, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeIn }), 0);
	
	for (var i = 0; i < deuceRect2Array.length; i++) {
		var particle = deuceRect1Array[i];
		var particle2 = deuceRect2Array[i];
		deuceAnimationOut.add(TweenMax.to( particle, .5,{ x: 0, y: 0, rotation: 0, alpha: 0, ease: Expo.easeIn }), 0);
		deuceAnimationOut.add(TweenMax.to( particle2, .5,{ x: 0, y: 0, rotation: 0, alpha: 0, ease: Expo.easeIn }), 0);
	}
	for (var i = 0; i < deuceExplosionArray.length; i++) {
		var circle = deuceExplosionArray[i];
		var duration = 1 + (i * .02);
		deuceAnimationOut.add(TweenMax.to( circle, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	deuceAnimationOut.timeScale(1);
	deuceAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 3000);
}
