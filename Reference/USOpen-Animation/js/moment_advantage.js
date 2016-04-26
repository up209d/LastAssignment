var advantageRectArray = [];
var advantagePlusArray = [];
var advantageExplosionArray = [];
			
var advantageColors = ["0x00a6a0", "0xee3d96"];

//////////////// PARTICLE STUFF /////////////////
var advantageParticles 	= new ParticleEngine(window.innerWidth, 500);
var advantageEmitters 	= [];
var advantageParticleContainer;
var advantageEm_TennisBall,
	advantageEm_Plusses,
	advantageEm_PlussesMicro
/////////////////////////////////////////////////

function createAdvantage() {
	momentAdvantage = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentAdvantage);
	var assetsToLoader = [
		"img/advantage/explosion.png",
		"img/advantage/shard1.png",
		"img/advantage/shard2.png",
		"img/advantage/shard3.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		advantageParticleContainer = new PIXI.DisplayObjectContainer();
		momentAdvantage.addChild(advantageParticleContainer);
		
		advantageEm_TennisBall = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/ball-white.png", 
				life		: 	800.0,
				spin		: 	[-0.03, 0.03],
				speed		: 	[1, 3],
				scale		: 	[0.1,0.2],
				colors		: 	[advantageColors[0], advantageColors[1], 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		advantageEm_Plusses = new Emitter({
				type		:	"chaos",
				count		:	100,
			},
			{ 	type 		:	PlusParticle,
				size 		: 	16,
				thickness	: 	4,
				life		: 	1000.0,
				rotation	: 	0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[1,2],
				colors		: 	[advantageColors[0], advantageColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		
		advantageEm_PlussesMicro = new Emitter({
				type		:	"point",
				count		:	50,
			},
			{ 	type 		:	PlusParticle, 
				size 		: 	16,
				thickness	: 	4,
				life		: 	1000.0,
				rotation	: 	0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.5,1],
				colors		: 	[advantageColors[0], advantageColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		advantageEmitters.push(advantageEm_TennisBall);
		advantageEmitters.push(advantageEm_Plusses);
		advantageEmitters.push(advantageEm_PlussesMicro);

		advantageParticles.addEmitters(advantageEmitters);

		advantageParticleContainer.addChild(advantageEm_TennisBall.doc);
		advantageParticleContainer.addChild(advantageEm_Plusses.doc);
		advantageParticleContainer.addChild(advantageEm_PlussesMicro.doc);
		/////////////////////////////////////////////////
		
		// CREATE SOME RECTANGLES
		for (var i = 0; i < 6; i++) {
			advantageRectangle = new PIXI.Graphics();
			if (i < 3) {
				advantageRectangle.beginFill(advantageColors[0], 1);
			} else {
				advantageRectangle.beginFill(advantageColors[1], 1);
			}
			advantageRectangle.pivot.x = 1500;
			advantageRectangle.pivot.y = 50;
				
			advantageRectangle.drawRect(0, 0, 3000, 100);
			advantageRectangle.endFill();
			if (matchVizViewConfig.isWebGL) advantageRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			momentAdvantage.addChild(advantageRectangle);
			advantageRectArray.push(advantageRectangle);
		}
		
		// PLUS SIGNS
		for (var i = 0; i < 3; i++) {
			advantagePlus = new PIXI.Graphics();
			momentAdvantage.addChild(advantagePlus);
			advantagePlusArray.push(advantagePlus);
		}
		// SQUARES
		advantageSquare1 = new PIXI.Graphics();
		momentAdvantage.addChild(advantageSquare1);
		
		advantageSquare2 = new PIXI.Graphics();
		momentAdvantage.addChild(advantageSquare2);
		
		advantageSquare3 = new PIXI.Graphics();
		momentAdvantage.addChild(advantageSquare3);
		
		// EXPLOSION SHARDS
		advantageShardTexture1 = PIXI.Texture.fromImage("img/advantage/shard1.png");
		advantageShard1 = new PIXI.Sprite(advantageShardTexture1);
		advantageShard1.anchor.x = 0.5;
		advantageShard1.anchor.y = 0.5;
		advantageShard1.position.x = 0;
		advantageShard1.position.y = 0;
		advantageShard1.tint = advantageColors[1];
		if (matchVizViewConfig.isWebGL) advantageShard1.blendMode = PIXI.blendModes.MULTIPLY;
		momentAdvantage.addChild(advantageShard1);
		
		advantageShardTexture2 = PIXI.Texture.fromImage("img/advantage/shard2.png");
		advantageShard2 = new PIXI.Sprite(advantageShardTexture2);
		advantageShard2.anchor.x = 0.5;
		advantageShard2.anchor.y = 0.5;
		advantageShard2.position.x = 0;
		advantageShard2.position.y = 0;
		advantageShard2.tint = advantageColors[1];
		if (matchVizViewConfig.isWebGL) advantageShard2.blendMode = PIXI.blendModes.MULTIPLY;
		momentAdvantage.addChild(advantageShard2);
		
		advantageShardTexture3 = PIXI.Texture.fromImage("img/advantage/shard3.png");
		advantageShard3 = new PIXI.Sprite(advantageShardTexture3);
		advantageShard3.anchor.x = 0.5;
		advantageShard3.anchor.y = 0.5;
		advantageShard3.position.x = 0;
		advantageShard3.position.y = 0;
		advantageShard3.tint = advantageColors[1];
		if (matchVizViewConfig.isWebGL) advantageShard3.blendMode = PIXI.blendModes.MULTIPLY;
		momentAdvantage.addChild(advantageShard3);
		
		advantageExplosionTexture = PIXI.Texture.fromImage("img/advantage/explosion.png");
		advantageExplosion = new PIXI.Sprite(advantageExplosionTexture);
		advantageExplosion.anchor.x = 1;
		advantageExplosion.anchor.y = 0.5;
		advantageExplosion.position.x = 0;
		advantageExplosion.position.y = 0;
		advantageExplosion.tint = advantageColors[1];
		if (matchVizViewConfig.isWebGL) advantageExplosion.blendMode = PIXI.blendModes.MULTIPLY;
		momentAdvantage.addChild(advantageExplosion);
		
		// TEXT
		advantageTitle = new PIXI.Text("ADVANTAGE", { font: "80px Knockout47", fill: "#ffffff" });
		advantageTitle.position.x = 0;
		advantageTitle.position.y = 0;
		advantageTitle.anchor.x = 0.5;
		advantageTitle.anchor.y = 0.5;
		momentAdvantage.addChild(advantageTitle);
		
		$('#icon_advantage').click(function(){
			if (momentAdvantage.visible == false) explodeAdvantage();
			return false;
		});
		
		TweenMax.to($('#icon_advantage'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}

	momentAdvantage.visible = false;
}

function redrawAdvantage() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		advantageColors = ["0x00a6a0", "0xee3d96"]
	} else {
		advantageColors = ["0xee3d96", "0x00a6a0"]
	}
	
	for (var i = 0; i < 3; i++) {
		advantagePlusArray[i].clear();
		advantagePlusArray[i].beginFill(advantageColors[0], 1);
		advantagePlusArray[i].pivot.x = 0;
		advantagePlusArray[i].pivot.y = 0;
		advantagePlusArray[i].drawRect(-55, -165, 110, 330);
		advantagePlusArray[i].drawRect(-165, -55, 330, 110);
		advantagePlusArray[i].alpha = .5;
		advantagePlusArray[i].endFill();
		advantagePlusArray[i].x = 0;
		advantagePlusArray[i].y = 0;
		if (matchVizViewConfig.isWebGL) advantagePlusArray[i].blendMode = PIXI.blendModes.MULTIPLY;
	}

	advantageSquare1.clear();
	advantageSquare1.beginFill(advantageColors[0], 1);
	advantageSquare1.pivot.x = 0;
	advantageSquare1.pivot.y = 0;
	advantageSquare1.drawRect(-55, -55, 110, 110);
	advantageSquare1.alpha = .5;
	advantageSquare1.x = 0;
	advantageSquare1.y = 0;
	advantageSquare1.endFill();
	if (matchVizViewConfig.isWebGL) advantageSquare1.blendMode = PIXI.blendModes.MULTIPLY;
	
	advantageSquare2.clear();
	advantageSquare2.beginFill(advantageColors[0], 1);
	advantageSquare2.pivot.x = 0;
	advantageSquare2.pivot.y = 0;
	advantageSquare2.drawRect(-55, -55, 110, 110);
	advantageSquare2.alpha = 0;
	advantageSquare2.x = 0;
	advantageSquare2.y = 0;
	advantageSquare2.endFill();
	if (matchVizViewConfig.isWebGL) advantageSquare2.blendMode = PIXI.blendModes.MULTIPLY;
	
	advantageSquare3.clear();
	advantageSquare3.beginFill(advantageColors[1], 1);
	advantageSquare3.pivot.x = 0;
	advantageSquare3.pivot.y = 0;
	advantageSquare3.drawRect(-55, -55, 110, 110);
	advantageSquare3.alpha = .5;
	advantageSquare3.x = 0;
	advantageSquare3.y = 0;
	advantageSquare3.endFill();
	if (matchVizViewConfig.isWebGL) advantageSquare3.blendMode = PIXI.blendModes.MULTIPLY;
	
	advantageShard1.tint = advantageColors[1];
	advantageShard2.tint = advantageColors[1];
	advantageShard3.tint = advantageColors[1];
}

function explodeAdvantage() {
	hideMoments();
	
	redrawAdvantage();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < advantageEmitters.length ) {
		em = advantageEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(advantageParticles);

	/////////////////////////////////////////////////
	
	
	var tempSquareStartX = window.innerWidth/2 + 100;
	//var tempSquareStartY = 300;
	var tempSquareStartY = window.innerHeight/2 + 50;
	
	
	advantageAnimationIn =  new TimelineMax({ paused: true });

	//////////////// PARTICLE STUFF /////////////////
	advantageAnimationIn.add(TweenMax.fromTo( advantageParticleContainer, 1, { alpha: 0 }, { alpha: 1 }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageEm_TennisBall.doc, 1, { scaleX: 0, scaleY: 0 }, {  scaleX: 1.0, scaleY: 1.0, ease: Quart.easeInOut }), 1.75);
	advantageAnimationIn.add(TweenMax.fromTo( advantageEm_Plusses.doc, 1.5, { scaleX: 0, scaleY: 0, alpha:-0.5 }, {  scaleX: 1, scaleY: 1, alpha: 1.0, ease: Quart.easeOut }), 1.75);
	advantageAnimationIn.add(TweenMax.fromTo( advantageEm_PlussesMicro.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1.0, scaleY: 1.0, alpha: 1.0, ease: Quart.easeOut }), 1.75);
	advantageAnimationIn.add(TweenMax.fromTo( advantageEm_PlussesMicro.doc, .75, { rotation: 0 }, { rotation:Math.PI * 2, ease: Quart.easeOut }), 1.75);
	/////////////////////////////////////////////////
	
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[0], 1,{ x: 0, y: -tempSquareStartY, scaleY: 1},{ x: 0, y: tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[1], 1,{ x: 0, y: tempSquareStartY, scaleY: 1},{ x: 0, y: -tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[2], 1.15,{ x: 0, y: -tempSquareStartY, scaleY: 1},{ x: 0, y: tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[3], 1.15,{ x: 0, y: tempSquareStartY, scaleY: 1},{ x: 0, y: -tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[4], 1.25,{ x: 0, y: -tempSquareStartY, scaleY: 1},{ x: 0, y: tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageRectArray[5], 1.25,{ x: 0, y: tempSquareStartY, scaleY: 1},{ x: 0, y: -tempSquareStartY, scaleY: 1, ease: Expo.easeInOut }), 0);
	
	// SQUARES
	advantageAnimationIn.add(TweenMax.fromTo( advantageSquare1, 1,{ x: tempSquareStartX, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 55, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 ,ease: Expo.easeIn }), 0);
	advantageAnimationIn.add(TweenMax.fromTo( advantageSquare3, 1,{ x: -tempSquareStartX, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1  },{ x: -55, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 ,ease: Expo.easeIn, onComplete: function() {
		TweenMax.to( advantageSquare3, .75,{ x: -200, scaleX: 0, scaleY: 0, rotation: -25, alpha: 0, ease: Expo.easeOut });
	}}), 0);

	advantageAnimationIn.add(TweenMax.to( advantageSquare1, .5,{ x: 0, scaleX: 3, ease: Expo.easeOut, onComplete: function() {
		TweenMax.to( advantageSquare1, .5,{ alpha: 0, rotation: ((360 * toRAD)*2), ease: Expo.easeIn });
	}}), 1);
	advantageAnimationIn.add(TweenMax.fromTo( advantageSquare2, 1,{ x: 0, scaleX: 3, rotation: 0, alpha: 0  },{ x: 0, scaleX: 3, rotation: (180 * toRAD), alpha: 1 , ease: Expo.easeIn, onComplete: function() {
		TweenMax.to( advantageSquare2, 1,{ rotation: (360 * toRAD), alpha: 0, ease: Expo.easeOut });
	}}), 1);
	
	advantageAnimationIn.add(TweenMax.fromTo( advantageShard1, 1,{ x: -100, y: -50, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: generateRandomNumber(-300, -500), y: -150, scaleX: .5, scaleY: .5, rotation: ((360 * toRAD)*1), alpha: 0, ease: Expo.easeOut }), 1);
	advantageAnimationIn.add(TweenMax.fromTo( advantageShard2, 1,{ x: -100, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: generateRandomNumber(-300, -500), y: 0, scaleX: .5, scaleY: .5, rotation: ((-360 * toRAD)*1), alpha: 0, ease: Expo.easeOut }), 1);
	advantageAnimationIn.add(TweenMax.fromTo( advantageShard3, 1,{ x: -100, y: 50, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: generateRandomNumber(-300, -500), y: 150, scaleX: .5, scaleY: .5, rotation: ((360 * toRAD)*1), alpha: 0, ease: Expo.easeOut }), 1);
	advantageAnimationIn.add(TweenMax.fromTo( advantageExplosion, 1,{ x: -100, y: 0, scaleX: .5, scaleY: .5, rotation: 0, alpha: 1 },{ x: -350, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 , ease: Expo.easeOut }), 1);

	TweenMax.to( advantageShard1, 0,{ alpha: 0 });
	TweenMax.to( advantageShard2, 0,{ alpha: 0 });
	TweenMax.to( advantageShard3, 0,{ alpha: 0 });
	TweenMax.to( advantageExplosion, 0,{ alpha: 0 });

	// PLUS SIGNS
	for (var i = 0; i < advantagePlusArray.length; i++) {
		var plus = advantagePlusArray[i];
		var duration = 1 + (i * .15);
		var tempX = 0;
		var tempY = 0;
		if (i != 0) {
			tempX = generateRandomNumber(3, 10);
			tempY = generateRandomNumber(3, 10);
		}
		advantageAnimationIn.add(TweenMax.fromTo( plus, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, rotation: 0 },{ x: tempY, y: tempY, scaleX: 1, scaleY: 1, alpha: .5, rotation: ((360 * toRAD)*2), ease: Expo.easeInOut }), 1.5);
	}

	advantageAnimationIn.add(TweenMax.fromTo( advantageTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 2);
	
	// SHAKE RATTLE & ROLL
	advantageAnimationIn.add(TweenMax.fromTo( momentAdvantage, 0.5,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 15, points: 30 }) }), 1);
	advantageAnimationIn.add(TweenMax.to( momentAdvantage, 0,{ x: 0, y: 0 }), 0);
	
	advantageAnimationIn.timeScale(1.25);
	advantageAnimationIn.play();
	
	momentAdvantage.visible = true;
	
	animationTimer = setTimeout(destroyAdvantage, 4000);
}

function destroyAdvantage() {
	
	advantageAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	advantageAnimationOut.add(TweenMax.to( advantageParticleContainer, 1.0, { alpha: 0 }), 0);
	advantageAnimationOut.add(TweenMax.to( advantageEm_TennisBall.doc, 0.8,{ scaleX: 0, scaleY: 0, ease: Quart.easeInOut }), 0);
	advantageAnimationOut.add(TweenMax.to( advantageEm_Plusses.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0); /*rotation:Math.PI * 2,*/
	advantageAnimationOut.add(TweenMax.to( advantageEm_PlussesMicro.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	for (var i = 0; i < advantagePlusArray.length; i++) {
		var plus = advantagePlusArray[i];
		var duration = 1 + (i * .15);
		advantageAnimationOut.add(TweenMax.to( plus, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: ((360 * toRAD)*3), alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	for (var i = 0; i < advantageExplosionArray.length; i++) {
		var duration = 1 + (i * .02);
		advantageAnimationOut.add(TweenMax.to( advantageExplosionArray[i], (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	advantageAnimationOut.add(TweenMax.to( advantageTitle, 1,{ scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	advantageAnimationOut.timeScale(1);
	advantageAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);
}