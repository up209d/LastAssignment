var aceRectArray = [];
var aceExplosionArray1 = [];
var aceExplosionArray2 = [];
var aceColors = ["0x8cc63f", "0x00b2ef"];

//////////////// PARTICLE STUFF /////////////////
var aceParticles 	= new ParticleEngine(window.innerWidth, 500);
var aceEmitters 	= [];
var aceParticleContainer;
var aceEm_TennisBalls,
	aceEm_LightningBolts,
	aceEm_ThinShards,
	aceEm_Circles
/////////////////////////////////////////////////

function createAce() {
	momentAce = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentAce);
	
	var assetsToLoader = [
		"img/ace/lightning1.png",
		"img/ace/lightning2.png",
		"img/ace/lightning3.png",
		"img/ace/lightning4.png",
		"img/ace/lightning5.png",
		"img/ace/lightning6.png",
		"img/ace/lightning7.png",
		"img/ace/lightning8.png",
		"img/ace/lightning9.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		aceParticleContainer = new PIXI.DisplayObjectContainer();
		momentAce.addChild(aceParticleContainer);
		
		aceEm_TennisBalls = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/ball-white.png", 
				life		: 	800.0,
				spin		: 	[-0.03, 0.03],
				speed		: 	[1, 3],
				scale		: 	[0.1,0.2],
				colors		: 	[aceColors[0], aceColors[1], 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		aceEm_LightningBolts = new Emitter({
				type		:	"linear",
				count		:	35,
				angle		:	135 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/lightning-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.05,0.5],
				colors		: 	[aceColors[0], aceColors[1]],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		aceEm_ThinShards = new Emitter({
				type		:	"linear",
				count		:	100,
				angle		:	-45 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/shard2-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.05, 1],
				colors		: 	[aceColors[0], aceColors[1]],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
										
		aceEm_Circles = new Emitter({
				type		:	"point",
				count		:	50,
			},
			{ 	type 		:	CircleParticle, 
				size 		: 	15,
				life		: 	800.0,
				spin		: 	[-0.00, 0.00],
				speed		: 	[1, 3],
				scale		: 	[.25,1],
				colors		: 	[aceColors[0], aceColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		aceEmitters.push(aceEm_TennisBalls);
		aceEmitters.push(aceEm_LightningBolts);
		aceEmitters.push(aceEm_ThinShards);
		aceEmitters.push(aceEm_Circles);

		aceParticles.addEmitters(aceEmitters);

		aceParticleContainer.addChild(aceEm_TennisBalls.doc);
		aceParticleContainer.addChild(aceEm_LightningBolts.doc);
		aceParticleContainer.addChild(aceEm_ThinShards.doc);
		aceParticleContainer.addChild(aceEm_Circles.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		

		aceCircleOutline1 = new PIXI.Graphics();
		aceCircleOutline1.lineStyle(3, aceColors[0], 1);
		aceCircleOutline1.drawCircle(0, 0, 75); 
		aceCircleOutline1.endFill();
		if (matchVizViewConfig.isWebGL) aceCircleOutline1.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircleOutline1);

		aceCircleOutline2 = new PIXI.Graphics();
		aceCircleOutline2.lineStyle(5, aceColors[1], 1);
		aceCircleOutline2.drawCircle(0, 0, 25); 
		aceCircleOutline2.endFill();
		if (matchVizViewConfig.isWebGL) aceCircleOutline2.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircleOutline2);
		
		// CREATE SOME RECTANGLES
		for (var i = 0; i < 3; i++) {
			var aceRectangle = new PIXI.Graphics();
			if (matchVizViewConfig.isWebGL) aceRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			aceRectangle.pivot.x = 2000;
			aceRectangle.pivot.y = 50;
			aceRectangle.rotation = (15 * toRAD);
			momentAce.addChild(aceRectangle);
			aceRectArray.push(aceRectangle);
		}
		
		// CREATE SOME EXPLOSION PIECES
		for (var i = 0; i < 6; i++) {
			var aceParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,5);
			
			switch (randomParticleType) {
				case 0:
					aceParticle.lineStyle(2, aceColors[0], 1);
					aceParticle.drawCircle(0, 0, generateRandomNumber(5, 15)); 
					break;
				default:
					aceParticle.beginFill(aceColors[1], .5);
					aceParticle.drawCircle(0, 0, generateRandomNumber(2, 10));
			}
			aceParticle.endFill();
			if (matchVizViewConfig.isWebGL) aceParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentAce.addChild(aceParticle);
			aceExplosionArray2.push(aceParticle);
		}

		aceBallTrailer = new PIXI.Graphics();
		aceBallTrailer.pivot.x = 5;
		aceBallTrailer.pivot.y = 0;
		if (matchVizViewConfig.isWebGL) aceBallTrailer.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceBallTrailer);
		
		aceBall = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceBall.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceBall);
		
		aceCircle1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceCircle1.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircle1);
		
		aceCircle2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceCircle2.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircle2);
		
		aceCircle3 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceCircle3.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircle3);
	
		aceCircle4 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceCircle4.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircle4);
	
		aceCircle5 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) aceCircle5.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceCircle5);
		
		aceLightning1 = PIXI.Texture.fromImage("img/ace/lightning1.png");
		aceLightning1 = new PIXI.Sprite(aceLightning1);
		aceLightning1.anchor.x = 0.5;
		aceLightning1.anchor.y = 0.5;
		aceLightning1.tint = aceColors[0];
		if (matchVizViewConfig.isWebGL) aceLightning1.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning1);
		
		aceLightning2 = PIXI.Texture.fromImage("img/ace/lightning2.png");
		aceLightning2 = new PIXI.Sprite(aceLightning2);
		aceLightning2.anchor.x = 0.5;
		aceLightning2.anchor.y = 0.5;
		aceLightning2.tint = aceColors[1];
		if (matchVizViewConfig.isWebGL) aceLightning2.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning2);
		
		aceLightning3 = PIXI.Texture.fromImage("img/ace/lightning3.png");
		aceLightning3 = new PIXI.Sprite(aceLightning3);
		aceLightning3.anchor.x = 0.5;
		aceLightning3.anchor.y = 0.5;
		aceLightning3.tint = aceColors[0];
		if (matchVizViewConfig.isWebGL) aceLightning3.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning3);
		
		aceLightning4 = PIXI.Texture.fromImage("img/ace/lightning4.png");
		aceLightning4 = new PIXI.Sprite(aceLightning4);
		aceLightning4.anchor.x = 0.5;
		aceLightning4.anchor.y = 0.5;
		aceLightning4.tint = aceColors[1];
		if (matchVizViewConfig.isWebGL) aceLightning4.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning4);
		
		aceLightning5 = PIXI.Texture.fromImage("img/ace/lightning5.png");
		aceLightning5 = new PIXI.Sprite(aceLightning5);
		aceLightning5.anchor.x = 0.5;
		aceLightning5.anchor.y = 0.5;
		aceLightning5.tint = aceColors[1];
		if (matchVizViewConfig.isWebGL) aceLightning5.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning5);
		
		aceLightning6 = PIXI.Texture.fromImage("img/ace/lightning6.png");
		aceLightning6 = new PIXI.Sprite(aceLightning6);
		aceLightning6.anchor.x = 0.5;
		aceLightning6.anchor.y = 0.5;
		aceLightning6.tint = aceColors[0];
		if (matchVizViewConfig.isWebGL) aceLightning6.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning6);
		
		aceLightning7 = PIXI.Texture.fromImage("img/ace/lightning7.png");
		aceLightning7 = new PIXI.Sprite(aceLightning7);
		aceLightning7.anchor.x = 0.5;
		aceLightning7.anchor.y = 0.5;
		aceLightning7.tint = aceColors[1];
		if (matchVizViewConfig.isWebGL) aceLightning7.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning7);
		
		aceLightning8 = PIXI.Texture.fromImage("img/ace/lightning8.png");
		aceLightning8 = new PIXI.Sprite(aceLightning8);
		aceLightning8.anchor.x = 0.5;
		aceLightning8.anchor.y = 0.5;
		aceLightning8.tint = aceColors[0];
		if (matchVizViewConfig.isWebGL) aceLightning8.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning8);
		
		aceLightning9 = PIXI.Texture.fromImage("img/ace/lightning9.png");
		aceLightning9 = new PIXI.Sprite(aceLightning9);
		aceLightning9.anchor.x = 0.5;
		aceLightning9.anchor.y = 0.5;
		aceLightning9.tint = aceColors[0];
		if (matchVizViewConfig.isWebGL) aceLightning9.blendMode = PIXI.blendModes.MULTIPLY;
		momentAce.addChild(aceLightning9);
		
		aceTitle = new PIXI.Text("ACE", { font: "150px Knockout47", fill: "#ffffff" });
		aceTitle.anchor.x = 0.5;
		aceTitle.anchor.y = 0.5;
		momentAce.addChild(aceTitle);
		
		$('#icon_ace').click(function(){
			if (momentAce.visible == false) explodeAce();
			return false;
		});
		
		TweenMax.to($('#icon_ace'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentAce.visible = false;
}

function redrawAce() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		aceColors = ["0x8cc63f", "0x00b2ef"];
	} else {
		aceColors = ["0x00b2ef", "0x8cc63f"];
	}
	
	aceBallTrailer.clear();
	aceBallTrailer.beginFill(aceColors[0], .25);
	aceBallTrailer.drawRect(0, 0, 10, 400);
	aceBallTrailer.endFill();
	
	aceBall.clear();
	aceBall.beginFill(aceColors[0], 1);
	aceBall.drawCircle(0, 0, 100);
	aceBall.endFill();
	aceBall.beginFill(aceColors[0], .5);
	aceBall.drawCircle(-7, -7, 90);
	aceBall.endFill();
	
	aceCircle1.clear();
	aceCircle1.beginFill(aceColors[0], .20);
	aceCircle1.drawCircle(0, 0, 115);
	aceCircle1.endFill();
	
	aceCircle2.clear();
	aceCircle2.beginFill(aceColors[0], .5);
	aceCircle2.drawCircle(0, 0, 115);
	aceCircle2.endFill();
	
	aceCircle3.clear();
	aceCircle3.beginFill(aceColors[0], .4);
	aceCircle3.drawCircle(0, 0, 115);
	aceCircle3.endFill();

	aceCircle4.clear();
	aceCircle4.beginFill(aceColors[0], .40);
	aceCircle4.drawCircle(0, 0, 85);
	aceCircle4.endFill();

	aceCircle5.clear();
	aceCircle5.beginFill(aceColors[1], 1);
	aceCircle5.drawCircle(0, 0, 45);
	aceCircle5.endFill();
		
	aceLightning1.tint = aceColors[0];
	aceLightning2.tint = aceColors[1];
	aceLightning3.tint = aceColors[0];
	aceLightning4.tint = aceColors[1];
	aceLightning5.tint = aceColors[1];
	aceLightning6.tint = aceColors[0];
	aceLightning7.tint = aceColors[1];
	aceLightning8.tint = aceColors[0];
	aceLightning9.tint = aceColors[0];
	
	for (var i = 0; i < 3; i++) {
		aceRectArray[i].clear();
		aceRectArray[i].beginFill(aceColors[1], 1);
		aceRectArray[i].drawRect(0, 0, 4000, 100);
		aceRectArray[i].endFill();
	}
}

function explodeAce() {
	hideMoments();
	
	redrawAce();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < aceEmitters.length ) {
		em = aceEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(aceParticles);

	/////////////////////////////////////////////////
	
	aceAnimationIn =  new TimelineMax({ paused: true});
	
	aceAnimationIn.fromTo( aceBall, .75,{ x: 0, y: 250, scaleX: 0.05, scaleY: 0.05, alpha: 0},{ x: 0, y: -200, scaleX: 0.05, scaleY: 0.05, alpha: 1, ease: Expo.easeOut });
	aceAnimationIn.to( aceBall, .75, { x: 0, y: -100, ease: Expo.easeIn });
	aceAnimationIn.to( aceBall, .5, { bezier: {values:[{ x: 200, y: 0 }, { x: 300, y: 200 }] }, scaleX: 0.25, scaleY: 0.25, alpha: 1, ease: Quad.easeOut });
	aceAnimationIn.to( aceBall, .5, { bezier: {values:[{ x: 50, y: 0 }, {x: 0, y: 0 }]}, alpha: 0, scaleX: 10, scaleY: 10, ease: Quad.easeOut }, "-=.25");
	
	// TRAILER
	aceAnimationIn.add(TweenMax.fromTo( aceBallTrailer, 1,{ x: 0, y: 250, scaleY: 5, alpha: 1 },{ x: 0, y: -200, scaleY: 0.75, alpha: 0, ease: Expo.easeOut }), 0);
	
	// BALL EXPLOSION
	aceAnimationIn.add(TweenMax.fromTo( aceCircleOutline1, 1,{ x: 0, y: -100, scaleX: 0.1, scaleY: 0, alpha: 1 },{ x: 0, y: -100, scaleX: 1, scaleY: 1, alpha: 0, ease: Expo.easeOut }), 1.5);
	aceAnimationIn.add(TweenMax.fromTo( aceCircleOutline2, 1,{ x: 0, y: -100, scaleX: 0.1, scaleY: 0, alpha: 1 },{ x: 0, y: -100, scaleX: 1, scaleY: 1, alpha: 0, ease: Expo.easeOut }), 1.5);
	
	//////////////// PARTICLE STUFF /////////////////
	aceAnimationIn.add(TweenMax.fromTo( aceParticleContainer, 1, { alpha: 0}, { alpha: 1 }), 0);
	aceAnimationIn.add(TweenMax.fromTo( aceEm_TennisBalls.doc, 1, { scaleX: 0.0, scaleY: 0.0}, {  scaleX: 1.0, scaleY: 1.0, ease: Quart.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.fromTo( aceEm_LightningBolts.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: 600 , y: -600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.fromTo( aceEm_ThinShards.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: -600,  y: 600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.fromTo( aceEm_Circles.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: -600,  y: 600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 1.5);
	/////////////////////////////////////////////////
	
	// PARTICLE EXPLOSIONS 1
	for (var i = 0; i < aceExplosionArray2.length; i++) {
		var circle = aceExplosionArray2[i];
		var destinationX = generateRandomNumber(-100, 100);
		var destinationY = generateRandomNumber(-200, 0);
		aceAnimationIn.add(TweenMax.fromTo( circle, 1,{ x: 0, y: -100, scaleX: 0, scaleY: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 1.5);
	}
	
	// MOVE PANELS
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[0], 2.25,{ x: 0, y: 1500 },{ x: 0, y: 50, ease: Expo.easeOut }), 0);
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[1], 2.25,{ x: 0, y: 1500 },{ x: 0, y: 50, ease: Expo.easeOut }), 0);
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[2], 2.25,{ x: 0, y: 1500 },{ x: 0, y: 50, ease: Expo.easeOut }), 0);
	
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[0], 1.5,{ scaleY: 2, rotation: (25 * toRAD), alpha: 0 },{ scaleY: 1, rotation: (-15 * toRAD), alpha: .5, ease: Quad.easeInOut }), 0);
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[1], 1.5,{ scaleY: 2, rotation: (25* toRAD), alpha: 0 },{ scaleY: .5, rotation: (-15 * toRAD), alpha: .5, ease: Quad.easeInOut }), 0);
	aceAnimationIn.add(TweenMax.fromTo( aceRectArray[2], 1.5,{ scaleY: 2, rotation: (25 * toRAD), alpha: 0 },{ scaleY: .25, rotation: (-15 * toRAD), alpha: .5, ease: Quad.easeInOut }), 0);
	
	aceAnimationIn.add(TweenMax.to( aceRectArray[0], 1.0,{ scaleY: .5, rotation: (-10 * toRAD), ease: Quad.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.to( aceRectArray[1], 1.0,{ scaleY: .25, rotation: (-10 * toRAD), ease: Quad.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.to( aceRectArray[2], 1.0,{ scaleY: 0, rotation: (-10 * toRAD), ease: Quad.easeInOut }), 1.5);
	aceAnimationIn.add(TweenMax.to( aceRectArray[0], .5,{ alpha: 0 }), 1.5);
	aceAnimationIn.add(TweenMax.to( aceRectArray[1], .5,{ alpha: 0 }), 1.5);
	aceAnimationIn.add(TweenMax.to( aceRectArray[2], .5,{alpha: 0 }), 1.5);
	
	// FINAL CIRCLE EXPLOSION
	aceAnimationIn.add(TweenMax.fromTo( aceCircle1, 1.25,{ x: 250, y: 50, scaleX: 0, scaleY: 0},{ x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut }), 1.75);
	aceAnimationIn.add(TweenMax.fromTo( aceCircle2, 1.5,{ x: 250, y: 50, scaleX: 0, scaleY: 0},{ x: -10, y: -10, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 1.75);
	aceAnimationIn.add(TweenMax.fromTo( aceCircle3, 1.75,{ x: 250, y: 50, scaleX: 0, scaleY: 0},{ x: 5, y: 2, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 1.75);
	aceAnimationIn.add(TweenMax.fromTo( aceCircle4, 1.25,{ x: 250, y: 50, scaleX: 0, scaleY: 0},{ x: -25, y: -25, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 1.75);
	aceAnimationIn.add(TweenMax.fromTo( aceCircle5, 1.5,{ x: 250, y: 50, scaleX: 0, scaleY: 0},{ x: 50, y: 70, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 1.75);
	
	aceAnimationIn.add(TweenMax.fromTo( aceTitle, 2,{ x: 50, y: 0, scaleX: 0, scaleY: 0, rotation: 2, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1, ease: Elastic.easeOut }), 1.75);
	
	aceAnimationIn.add(TweenMax.fromTo( aceLightning1, 1.0,{ scaleX: 0, scaleY: 0, x: 250, y: -180 },{ scaleX: 1, scaleY: 1, x: 40, y: -130, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning2, 1.15,{ scaleX: 0, scaleY: 0, x: 250, y: -150 },{ scaleX: 1, scaleY: 1, x: 100, y: -100, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning3, 1.25,{ scaleX: 0, scaleY: 0, x: 250, y: -110 },{ scaleX: 1, scaleY: 1, x: 140, y: -60, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning4, 1.75,{ scaleX: 0, scaleY: 0, x: 250, y: -40 },{ scaleX: 1, scaleY: 1, x: 160, y: 10, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning5, 1.45,{ scaleX: 0, scaleY: 0, x: 250, y: -30 },{ scaleX: 1, scaleY: 1, x: 100, y: 20, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning6, 1.55,{ scaleX: 0, scaleY: 0, x: 250, y: 40 },{ scaleX: 1, scaleY: 1, x: -60, y: 90, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning7, 1.65,{ scaleX: 0, scaleY: 0, x: 250, y: 10 },{ scaleX: 1, scaleY: 1, x: -120, y: 60, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning8, 1.75,{ scaleX: 0, scaleY: 0, x: 250, y: -10 },{ scaleX: 1, scaleY: 1, x: -170, y: 40, ease: Elastic.easeOut }), 1.80);
	aceAnimationIn.add(TweenMax.fromTo( aceLightning9, 1.85,{ scaleX: 0, scaleY: 0, x: 250, y: -40 },{ scaleX: 1, scaleY: 1, x: -70, y: -90, ease: Elastic.easeOut }), 1.80);

	// SHAKE RATTLE & ROLL
	aceAnimationIn.add(TweenMax.fromTo( momentAce, 0.75,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 15, points: 50 }) }), 1.75);
	aceAnimationIn.add(TweenMax.to( momentAce, 0,{ x: 0, y: 0 }), 0);
	
	aceAnimationIn.timeScale(1.25);
	aceAnimationIn.play();
	
	momentAce.visible = true;
	
	animationTimer = setTimeout(destroyAce,4000);
}

function destroyAce() {
	
	aceAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	aceAnimationOut.add(TweenMax.to( aceParticleContainer, 1.0, { alpha: 0 }), 0);
	aceAnimationOut.add(TweenMax.to( aceEm_TennisBalls.doc, 1.0,{ scaleX: 0, scaleY: 0, ease: Quart.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceEm_ThinShards.doc, 1.0,{ x: 600, y: -600,ease: Quart.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceEm_LightningBolts.doc, 1.0,{ x: -600, y: 600, ease: Quart.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceEm_Circles.doc, 1.0,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	aceAnimationOut.add(TweenMax.to( aceCircle1, 1.1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceCircle2, 1.0,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceCircle3, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceCircle4, .8,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceCircle5, .7,{ x: 0, y: 0, scaleX: 0, scaleY: 0, ease: Expo.easeInOut }), 0);
	
	aceAnimationOut.add(TweenMax.to( aceTitle, .6,{ scaleX: 0, scaleY: 0, x: 0, y: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	aceAnimationOut.add(TweenMax.to( aceLightning1, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning2, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning3, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning4, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning5, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning6, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning7, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning8, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	aceAnimationOut.add(TweenMax.to( aceLightning9, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	
	aceAnimationOut.add(TweenMax.fromTo( aceRectArray[0], .75,{ x: 500, y: -800, scaleY: 5, alpha: 0, rotation: (-15 * toRAD) },{ x: 0, y: 0, scaleY: 0, alpha: 1, rotation: (-15 * toRAD), ease: Expo.easeIn }), 0);
	aceAnimationOut.add(TweenMax.fromTo( aceRectArray[1], .75,{ x: -500, y: 800, scaleY: 5, alpha: 0, rotation: (-15 * toRAD) },{ x: 0, y: 0, scaleY: 0, alpha: 1, rotation: (-15 * toRAD), ease: Expo.easeIn }), 0);

	for (var i = 0; i < aceExplosionArray2.length; i++) {
		var circle = aceExplosionArray2[i];
		var duration = 1 + (i * .02);
		aceAnimationOut.add(TweenMax.to( circle, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	aceAnimationOut.timeScale(1);
	aceAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);
}