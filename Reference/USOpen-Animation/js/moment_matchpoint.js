var matchPointOctagonContainerArray1 = [];
var matchPointOctagonArray1 = [];
var matchPointOctagonContainerArray2 = [];
var matchPointOctagonArray2 = [];
var matchPointOctagonContainerArray3 = [];
var matchPointOctagonArray3 = [];
var matchPointOctagonContainerArray4 = [];
var matchPointOctagonArray4 = [];

var matchPointExplosionArray1 = [];
var matchPointExplosionArray2 = [];
var matchPointAngleArray = [];

var matchPointColors = ["0xfdb813", "0x8cc63f"];

//////////////// PARTICLE STUFF /////////////////
var matchPointParticles 	= new ParticleEngine(window.innerWidth, 500);
var matchPointEmitters 	= [];
var matchPointParticleContainer;
var matchPointEm_TennisBalls,
	matchPointEm_Octagons,
	matchPointEm_ThinShards,
	matchPointEm_Circles
/////////////////////////////////////////////////

function createMatchPoint() {
	momentMatchPoint = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentMatchPoint);
	
	var assetsToLoader = [
		"img/matchpoint/octagon.png",
		"img/matchpoint/bar.png",
		"img/matchpoint/bar2.png",
		"img/matchpoint/stripes.png",
		"img/matchpoint/bar-piece1.png",
		"img/matchpoint/bar-piece2.png",
		"img/matchpoint/bar-piece3.png",
		"img/matchpoint/lightning1.png",
		"img/matchpoint/lightning2.png",
		"img/matchpoint/lightning3.png",
		"img/matchpoint/lightning4.png",
		"img/matchpoint/bar-swirl1.png",
		"img/matchpoint/bar-swirl2.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		matchPointParticleContainer = new PIXI.DisplayObjectContainer();
		momentMatchPoint.addChild(matchPointParticleContainer);
		
		matchPointEm_TennisBalls = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/ball-white.png", 
				life		: 	800.0,
				spin		: 	[-0.03, 0.03],
				speed		: 	[1, 3],
				scale		: 	[0.1,0.2],
				colors		: 	[matchPointColors[0], matchPointColors[1], 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		matchPointEm_Octagons = new Emitter({
				type		:	"chaos",
				count		:	100
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	15,
				numSides	:	6,
				life		: 	1000.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.25, 1],
				colors		: 	[matchPointColors[0], matchPointColors[1], 0xffffff],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		matchPointEm_ThinShards = new Emitter({
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
				colors		: 	[matchPointColors[0], matchPointColors[1]],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
										
		matchPointEm_Circles = new Emitter({
				type		:	"point",
				count		:	50,
			},
			{ 	type 		:	CircleParticle, 
				size 		: 	15,
				life		: 	800.0,
				spin		: 	[-0.00, 0.00],
				speed		: 	[1, 3],
				scale		: 	[.25,1],
				colors		: 	[matchPointColors[0], matchPointColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		matchPointEmitters.push(matchPointEm_TennisBalls);
		matchPointEmitters.push(matchPointEm_Octagons);
		matchPointEmitters.push(matchPointEm_ThinShards);
		matchPointEmitters.push(matchPointEm_Circles);

		matchPointParticles.addEmitters(matchPointEmitters);

		matchPointParticleContainer.addChild(matchPointEm_TennisBalls.doc);
		matchPointParticleContainer.addChild(matchPointEm_Octagons.doc);
		matchPointParticleContainer.addChild(matchPointEm_ThinShards.doc);
		matchPointParticleContainer.addChild(matchPointEm_Circles.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		

		
		// STRIPES
		matchPointSwirlTexture1 = PIXI.Texture.fromImage("img/matchpoint/bar-swirl1.png");
		matchPointSwirl1 = new PIXI.Sprite(matchPointSwirlTexture1);
		matchPointSwirl1.anchor.x = 0.5;
		matchPointSwirl1.anchor.y = 0.5;
		matchPointSwirl1.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointSwirl1.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointSwirl1);
		
		matchPointSwirlTexture2 = PIXI.Texture.fromImage("img/matchpoint/bar-swirl2.png");
		matchPointSwirl2 = new PIXI.Sprite(matchPointSwirlTexture2);
		matchPointSwirl2.anchor.x = 0.5;
		matchPointSwirl2.anchor.y = 0.5;
		matchPointSwirl2.tint = matchPointColors[1];
		if (matchVizViewConfig.isWebGL) matchPointSwirl2.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointSwirl2);
		
		// STRIPES
		matchPointStripesTexture = PIXI.Texture.fromImage("img/matchpoint/stripes.png");
		matchPointStripes = new PIXI.Sprite(matchPointStripesTexture);
		matchPointStripes.anchor.x = 0.5;
		matchPointStripes.anchor.y = 0.5;
		matchPointStripes.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointStripes.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointStripes);
		
		// OCTAGON
		matchPointOctagonMiniTexture = PIXI.Texture.fromImage("img/matchpoint/octagon.png");
		matchPointOctagonMini = new PIXI.Sprite(matchPointOctagonMiniTexture);
		matchPointOctagonMini.anchor.x = 0.5;
		matchPointOctagonMini.anchor.y = 0.5;
		matchPointOctagonMini.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointOctagonMini.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointOctagonMini);
		
		matchPointOctagonMini2 = new PIXI.Sprite(matchPointOctagonMiniTexture);
		matchPointOctagonMini2.anchor.x = 0.5;
		matchPointOctagonMini2.anchor.y = 0.5;
		matchPointOctagonMini2.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointOctagonMini2.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointOctagonMini2);

		// CREATE THE SHARD PIECES AND BARS
		matchPointBar1 = new PIXI.DisplayObjectContainer();
		matchPointBar2 = new PIXI.DisplayObjectContainer();
		matchPointBar3 = new PIXI.DisplayObjectContainer();
		matchPointBarPiece1Texture = PIXI.Texture.fromImage("img/matchpoint/bar-piece1.png");
		matchPointBarPiece2Texture = PIXI.Texture.fromImage("img/matchpoint/bar-piece2.png");
		matchPointBarPiece3Texture = PIXI.Texture.fromImage("img/matchpoint/bar-piece3.png");
		for (var i = 0; i < 3; i++) {
			matchPointBarPiece1 = new PIXI.Sprite(matchPointBarPiece1Texture);
			matchPointBarPiece2 = new PIXI.Sprite(matchPointBarPiece2Texture);
			matchPointBarPiece3 = new PIXI.Sprite(matchPointBarPiece3Texture);
			matchPointBarPiece1.anchor.x = 0.5;
			matchPointBarPiece1.anchor.y = 0.5;
			matchPointBarPiece2.anchor.x = 0.5;
			matchPointBarPiece2.anchor.y = 0.5;
			matchPointBarPiece3.anchor.x = 0.5;
			matchPointBarPiece3.anchor.y = 0.5;
			matchPointBarPiece1.tint = matchPointColors[i];
			matchPointBarPiece2.tint = matchPointColors[i];
			matchPointBarPiece3.tint = matchPointColors[i];
			var targetContainer;
			if (i == 0) {
				targetContainer = matchPointBar1
			} else if (i == 1) {
				targetContainer = matchPointBar2
			} else {
				matchPointBarPiece1.tint = matchPointColors[0];
				matchPointBarPiece2.tint = matchPointColors[0];
				matchPointBarPiece3.tint = matchPointColors[0];
				targetContainer = matchPointBar3
			}
			if (matchVizViewConfig.isWebGL) matchPointBarPiece1.blendMode = PIXI.blendModes.MULTIPLY;
			if (matchVizViewConfig.isWebGL) matchPointBarPiece2.blendMode = PIXI.blendModes.MULTIPLY;
			if (matchVizViewConfig.isWebGL) matchPointBarPiece3.blendMode = PIXI.blendModes.MULTIPLY;
			targetContainer.addChild(matchPointBarPiece1);
			targetContainer.addChild(matchPointBarPiece2);
			targetContainer.addChild(matchPointBarPiece3);
		}
		momentMatchPoint.addChild(matchPointBar1);
		momentMatchPoint.addChild(matchPointBar2);
		momentMatchPoint.addChild(matchPointBar3);
		
		// BIG OCTAGON EXPLOSION 1
		for (var i = 0; i < 5; i++) {
			var matchPointOctagonContainer = new PIXI.DisplayObjectContainer();
			
			var matchPointOctagon = new PIXI.Graphics();
			var numSides = 6,
				size = 200,
				a = 2 * Math.PI / numSides,
				z = 0;
		
			matchPointOctagon.beginFill(matchPointColors[0], 1);
			matchPointOctagon.moveTo (size, 0);
		
			while ( z < numSides ) {
			  matchPointOctagon.lineTo (size * Math.cos (z * a), size * Math.sin (z * a));
			  z++;
			}
			
			if (matchVizViewConfig.isWebGL) matchPointOctagon.blendMode = PIXI.blendModes.MULTIPLY;
			matchPointOctagonContainer.addChild(matchPointOctagon);
			momentMatchPoint.addChild(matchPointOctagonContainer);
			matchPointOctagonContainer.pivot.x = .5;
			matchPointOctagonContainer.pivot.y = .5	;
	
			matchPointOctagonContainerArray1.push(matchPointOctagonContainer);
			matchPointOctagonArray1.push(matchPointOctagon);
		}
		
		// OCTAGON OUTLINES EXPLOSION 2
		for (var i = 0; i < 5; i++) {
			var matchPointOctagonContainer = new PIXI.DisplayObjectContainer();
			var matchPointOctagon = new PIXI.Graphics();
			
			matchPointOctagon.lineStyle(2, matchPointColors[0], 1);
			matchPointOctagon.moveTo (size, 0);
			
			var tempVar = 2 * Math.PI / 6;
			matchPointOctagon.lineTo (200 * Math.cos (1 * tempVar), 200 * Math.sin (1 * tempVar));
			matchPointOctagon.lineTo (200 * Math.cos (2 * tempVar), 200 * Math.sin (2 * tempVar));
			matchPointOctagon.lineTo (200 * Math.cos (3 * tempVar), 200 * Math.sin (3 * tempVar));
			matchPointOctagon.lineTo (200 * Math.cos (4 * tempVar), 200 * Math.sin (4 * tempVar));
			matchPointOctagon.lineTo (200 * Math.cos (5 * tempVar), 200 * Math.sin (5 * tempVar));
			matchPointOctagon.lineTo (200 * Math.cos (0 * tempVar), 200 * Math.sin (0 * tempVar));
			
			if (matchVizViewConfig.isWebGL) matchPointOctagon.blendMode = PIXI.blendModes.MULTIPLY;
			matchPointOctagonContainer.addChild(matchPointOctagon);
			momentMatchPoint.addChild(matchPointOctagonContainer);
			matchPointOctagonContainer.pivot.x = .5;
			matchPointOctagonContainer.pivot.y = .5	;
	
			matchPointOctagonContainerArray3.push(matchPointOctagonContainer);
			matchPointOctagonArray3.push(matchPointOctagon);
		}
		
		// FINAL OCTAGON EXPLOSION 4
		for (var i = 0; i < 10; i++) {
			var matchPointOctagonContainer = new PIXI.DisplayObjectContainer();
		
			var matchPointOctagon = new PIXI.Graphics();
			if (matchVizViewConfig.isWebGL) matchPointOctagon.blendMode = PIXI.blendModes.MULTIPLY;
			matchPointOctagonContainer.addChild(matchPointOctagon);
			momentMatchPoint.addChild(matchPointOctagonContainer);
			matchPointOctagonContainer.pivot.x = .5;
			matchPointOctagonContainer.pivot.y = .5;
	
			matchPointOctagonContainerArray4.push(matchPointOctagonContainer);
			matchPointOctagonArray4.push(matchPointOctagon);
		}
		
		// CREATE SOME EXPLOSION PIECES FOR THE FINAL EXPLOSION
		for (var i = 0; i < 60; i++) {
			var matchPointParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,4);
			
			switch (randomParticleType) {
				case 0:
					// CIRCLE
					matchPointParticle.beginFill(matchPointColors[generateRandomNumber(0, 1)], .5);
					matchPointParticle.drawCircle(0, 0, generateRandomNumber(2, 10));
					break;
				case 1:
					// CIRCLE WITH STROKE
					matchPointParticle.lineStyle(2, matchPointColors[generateRandomNumber(0, 1)], 1);
					matchPointParticle.drawCircle(0, 0, generateRandomNumber(2, 10)); 
					break;
				case 2:
					// SQUARE
					matchPointParticle.beginFill(matchPointColors[generateRandomNumber(0, 1)], .5);
					var tempSize = generateRandomNumber(2, 10);
					var tempPosition = -(tempSize/2);
					matchPointParticle.drawRect(tempPosition, tempPosition, tempSize, tempSize);
					break;
				case 3:
					// SQUARE WITH STROKE
					matchPointParticle.lineStyle(2, matchPointColors[generateRandomNumber(0, 1)], 1);
					var tempSize = generateRandomNumber(2, 10);
					var tempPosition = -(tempSize/2);
					matchPointParticle.drawRect(tempPosition, tempPosition, tempSize, tempSize);
					break;
				default:
					// PLUS SIGN 
					matchPointParticle.beginFill(matchPointColors[generateRandomNumber(0, 1)], .8);
					matchPointParticle.drawRect(-2, -6, 4, 12);
					matchPointParticle.drawRect(-6, -2, 12, 4);
			}
			
			matchPointParticle.endFill();
			if (matchVizViewConfig.isWebGL) matchPointParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentMatchPoint.addChild(matchPointParticle);
			if (i < 30) {
				matchPointExplosionArray1.push(matchPointParticle);
			} else  {
				matchPointParticle.alpha = 0;
				matchPointExplosionArray2.push(matchPointParticle);
			}
		}
		
		matchPointLightningTexture1 = PIXI.Texture.fromImage("img/matchpoint/lightning1.png");
		matchPointLightning1 = new PIXI.Sprite(matchPointLightningTexture1);
		matchPointLightning1.anchor.x = 0.5;
		matchPointLightning1.anchor.y = 0.5;
		matchPointLightning1.tint = matchPointColors[1];
		if (matchVizViewConfig.isWebGL) matchPointLightning1.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointLightning1);
		
		matchPointLightningTexture2 = PIXI.Texture.fromImage("img/matchpoint/lightning2.png");
		matchPointLightning2 = new PIXI.Sprite(matchPointLightningTexture2);
		matchPointLightning2.anchor.x = 0.5;
		matchPointLightning2.anchor.y = 0.5;
		matchPointLightning2.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointLightning2.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointLightning2);
		
		matchPointLightningTexture3 = PIXI.Texture.fromImage("img/matchpoint/lightning3.png");
		matchPointLightning3 = new PIXI.Sprite(matchPointLightningTexture3);
		matchPointLightning3.anchor.x = 0.5;
		matchPointLightning3.anchor.y = 0.5;
		matchPointLightning3.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointLightning3.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointLightning3);
		
		matchPointLightningTexture4 = PIXI.Texture.fromImage("img/matchpoint/lightning4.png");
		matchPointLightning4 = new PIXI.Sprite(matchPointLightningTexture4);
		matchPointLightning4.anchor.x = 0.5;
		matchPointLightning4.anchor.y = 0.5;
		matchPointLightning4.tint = matchPointColors[0];
		if (matchVizViewConfig.isWebGL) matchPointLightning4.blendMode = PIXI.blendModes.MULTIPLY;
		momentMatchPoint.addChild(matchPointLightning4);
		
		// CREATE SOME ANGLES FOR INTRO WIPE
		for (var i = 0; i < 4; i++) {
			matchPointAngle = new PIXI.Graphics();
			if (i < 2) {
				matchPointAngle.beginFill(matchPointColors[1], 1);
			} else {
				matchPointAngle.beginFill(matchPointColors[0], 1);
			}
			var tempHeight = window.innerHeight + 300;
			//matchPointAngle.drawRect(0, 0, 400, 1000);
			matchPointAngle.drawRect(0, 0, 400, tempHeight);
			matchPointAngle.endFill();
			matchPointAngle.pivot.x = 200;
			//matchPointAngle.pivot.y = 500;
			matchPointAngle.pivot.y = tempHeight/2;
			if (matchVizViewConfig.isWebGL) matchPointAngle.blendMode = PIXI.blendModes.MULTIPLY;
			momentMatchPoint.addChild(matchPointAngle);
			matchPointAngleArray.push(matchPointAngle);
		}
		
		// TEXT
		matchPointTitle = new PIXI.Text("MATCH", { font: "120px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		matchPointTitle.anchor.x = 0.5;
		matchPointTitle.anchor.y = 0.5;
		momentMatchPoint.addChild(matchPointTitle);
		
		$('#icon_matchpoint').click(function(){
			if (momentMatchPoint.visible == false) explodeMatchPoint();
			return false;
		});
		
		TweenMax.to($('#icon_matchpoint'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentMatchPoint.visible = false;
}

function redrawMatchPoint() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		matchPointColors = ["0xfdb813", "0x8cc63f"];
	} else {
		matchPointColors = ["0x8cc63f", "0xfdb813"];
	}
	
	matchPointSwirl1.tint = matchPointColors[0];
	matchPointSwirl2.tint = matchPointColors[1];
	
	matchPointStripes.tint = matchPointColors[0];
	matchPointOctagonMini.tint = matchPointColors[0];
	matchPointOctagonMini2.tint = matchPointColors[0];
	
	// FINAL OCTAGON EXPLOSION 4
	for (var i = 0; i < 10; i++) {
		matchPointOctagonArray4[i].clear();
		var numSides = 6,
			size = 200,
			a = 2 * Math.PI / numSides,
			z = 0;
	
		matchPointOctagonArray4[i].beginFill(matchPointColors[0], 1);
		matchPointOctagonArray4[i].moveTo (size, 0);
	
		while ( z < numSides ) {
		  matchPointOctagonArray4[i].lineTo (size * Math.cos (z * a), size * Math.sin (z * a));
		  z++;
		}
	}	
}

function explodeMatchPoint() {
	hideMoments();
	
	redrawMatchPoint();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < matchPointEmitters.length ) {
		em = matchPointEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(matchPointParticles);
	
	/////////////////////////////////////////////////
	
	matchPointAnimationIn =  new TimelineMax({ paused: true });
	
	matchPointAnimationIn.fromTo( matchPointOctagonMini, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0},{ bezier: {values:[{ x: -50, y: -110 }, { x: 150, y: 0 }] }, scaleX: 1, scaleY: 1, rotation: 5, alpha: 1, delay: .5, ease: Quad.easeOut });
	matchPointAnimationIn.to( matchPointOctagonMini, .5, { bezier: {values:[{ x: -50, y: -50 }, {x: -200, y: 0 }]}, rotation: -5, ease: Quad.easeOut }, "-=.15");
	matchPointAnimationIn.to( matchPointOctagonMini, .75, { bezier: {values:[{ x: 50, y: -110 }, {x: 150, y: -100 }]}, rotation: 5, ease: Quad.easeOut }, "-=.15");
	matchPointAnimationIn.to( matchPointOctagonMini, .75, { x: 0, y: 0, rotation: -5, ease: Strong.easeOut }, "-=.15");
	matchPointAnimationIn.to( matchPointOctagonMini, .25, { scaleX: 0, scaleY: 0, alpha: 0, ease: Bounce.easeOut });
	
	// DUPLICATE OCTAGON TRAILER
	matchPointAnimationIn2 =  new TimelineMax({ paused: true });
	matchPointAnimationIn2.fromTo( matchPointOctagonMini2, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0},{ bezier: {values:[{ x: -50, y: -110 }, { x: 150, y: 0 }] }, scaleX: .5, scaleY: .5, rotation: 6, alpha: 1, delay: .55, ease: Quad.easeOut });
	matchPointAnimationIn2.to( matchPointOctagonMini2, .5, { bezier: {values:[{ x: -50, y: -50 }, {x: -200, y: 0 }]}, rotation: -6, ease: Quad.easeOut }, "-=.15");
	matchPointAnimationIn2.to( matchPointOctagonMini2, .75, { bezier: {values:[{ x: 50, y: -110 }, {x: 150, y: -100 }]}, rotation: 6, ease: Quad.easeOut }, "-=.15");
	matchPointAnimationIn2.to( matchPointOctagonMini2, .75, { x: 0, y: 0, rotation: -6, alpha: 0, ease: Strong.easeOut }, "-=.15");
	
	//////////////// PARTICLE STUFF /////////////////
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointParticleContainer, 1, { alpha: 0}, { alpha: 1 }), 0);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointEm_TennisBalls.doc, 1, { scaleX: 0.0, scaleY: 0.0}, {  scaleX: 1.0, scaleY: 1.0, ease: Quart.easeInOut }), 2.75);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointEm_Octagons.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: 600 , y: -600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 2.75);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointEm_ThinShards.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: -600,  y: 600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 2.75);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointEm_Circles.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: -600,  y: 600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), 2.75);
	/////////////////////////////////////////////////
	
	// RECTANGLE WIPE
	for (var i = 0; i < matchPointAngleArray.length; i++) {
		var destinationX = window.innerWidth/2 + 400;
		matchPointAnimationIn.add(TweenMax.fromTo( matchPointAngleArray[i], (1-(i * .1)),{ x: -destinationX, y: 0, rotation: (20 * toRAD) },{ x: destinationX, y: 0, rotation: (20 * toRAD), ease: Expo.easeInOut }), 0);
	}

	// BARS
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar1, .75,{ x: 350, y: 100, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 },{ x: 150, y: 0, scaleX: 1, scaleY: 1, rotation: .5, alpha: 1, ease: Expo.easeIn }), .35);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar2, .75,{ x: -350, y: 100, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 },{ x: -150, y: 0, scaleX: 1, scaleY: 1, rotation: -.5, alpha: 1, ease: Expo.easeIn }), .75);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar3, .75,{ x: 300, y: -300, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 },{ x: 100, y: -100, scaleX: 1, scaleY: 1, rotation: -.75, alpha: 1, ease: Expo.easeIn }), 1.35);
	
	// PARTICLE EXPLOSIONS
	for (var i = 0; i < matchPointExplosionArray1.length; i++) {
		var particles = matchPointExplosionArray1[i];
		var destinationX = generateRandomNumber(150, 200);
		var destinationY = generateRandomNumber(0, 100);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomScale = 1;
		if (i < 10) {
			destinationX = generateRandomNumber(150, 250);
			matchPointAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: 150, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: 1, ease: Expo.easeOut }), 1);
		} else if (i >=10 && i < 20) {
			destinationX = generateRandomNumber(-250, -150);
			matchPointAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: -150, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: 1, ease: Expo.easeOut }), 1.5);
		} else {
			destinationX = generateRandomNumber(100, 200);
			destinationY = generateRandomNumber(-200, -100);
			matchPointAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: 100, y: -100, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: 1, ease: Expo.easeOut }), 2.0);
		}
	}
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar1.children[0], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 10, y: -50, scaleX: 0, scaleY: 0, rotation: -1, alpha: 0, ease: Sine.easeOut }), 1);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar1.children[1], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 20, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Sine.easeOut }), 1);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar1.children[2], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 10, y: 50, scaleX: 0, scaleY: 0, rotation: 1, alpha: 0, ease: Sine.easeOut }), 1);
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar2.children[0], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: -10, y: -50, scaleX: 0, scaleY: 0, rotation: 1, alpha: 0, ease: Sine.easeOut }), 1.5);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar2.children[1], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: -20, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Sine.easeOut }), 1.5);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar2.children[2], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: -10, y: 50, scaleX: 0, scaleY: 0, rotation: -1, alpha: 0, ease: Sine.easeOut }), 1.5);
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar3.children[0], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 10, y: -50, scaleX: 0, scaleY: 0, rotation: -1, alpha: 0, ease: Sine.easeOut }), 2);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar3.children[1], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 20, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Sine.easeOut }), 2);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointBar3.children[2], 1,{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 },{ x: 10, y: 50, scaleX: 0, scaleY: 0, rotation: 1, alpha: 0, ease: Sine.easeOut }), 2);
	
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointSwirl1, 1,{ scaleX: 1.5, scaleY: 1.5, rotation: -8, alpha: 0 },{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 1, ease: Quad.easeIn }), 2);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointSwirl2, 1,{ scaleX: 1.5, scaleY: 1.5, rotation: -8, alpha: 0 },{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 1, ease: Quad.easeIn }), 2);
	//matchPointAnimationIn.add(TweenMax.fromTo( matchPointSwirl1, .25,{ alpha: 0 },{ alpha: 1 }), 1.75);
	//matchPointAnimationIn.add(TweenMax.fromTo( matchPointSwirl2, .25,{ alpha: 0 },{ alpha: 1 }), 1.75);
	
	// FIRST OCTAGON ATTACK
	for (var i = 0; i < matchPointOctagonContainerArray1.length; i++) {
		var octagon = matchPointOctagonContainerArray1[i],
			tempRotation = -510 * toRAD,
			tempScale =  5 - (i * .75),
			tempDuration  = 1 + (i * .5),
			tempAlpha  =  1 - (i * .1);
			
		matchPointAnimationIn.add(TweenMax.fromTo( octagon, tempDuration,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: tempAlpha },{ scaleX: tempScale, scaleY: tempScale, rotation: tempRotation, alpha: 0, ease: Expo.easeOut }), 3);	
	}
	
	// THIRD OUTLINED OCTAGON ATTACK
	for (var i = 0; i < matchPointOctagonContainerArray3.length; i++) {
		var octagon = matchPointOctagonContainerArray3[i],
			tempScale =  3.7 - (i * .75),
			tempDelay = (i * .1),
			tempDuration = 1 + (i * .25),
			tempAlpha = i * .05;
			
		matchPointAnimationIn.add(TweenMax.fromTo( octagon, tempDuration,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 1 },{ scaleX: tempScale, scaleY: tempScale, rotation: -5, alpha: tempAlpha, ease: Expo.easeOut }), 3);
	}

	// FINAL ANIMATION
	for (var i = 0; i < matchPointOctagonContainerArray4.length; i++) {
		var octagon = matchPointOctagonContainerArray4[i],
			tempRotation = 150 * toRAD,
			tempScale =  1 - (i * .1),
			tempDuration  = 1 + (i * .05),
			tempAlpha  =  1 - (i * .1);
			
		matchPointAnimationIn.add(TweenMax.fromTo( octagon, tempDuration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 15, alpha: 0 },{ x: 0, y: 0, scaleX: tempScale, scaleY: tempScale, rotation: tempRotation, alpha: tempAlpha, ease: Expo.easeOut }), 3);
	}
	
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointStripes, 1.5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0},{ x: -25, y: 25, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1, ease: Elastic.easeInOut }), 2.5);
	
	
	for (var i = 0; i < matchPointExplosionArray1.length; i++) {
		var particles = matchPointExplosionArray1[i];
		matchPointAnimationIn.add(TweenMax.to( particles, .5,{ alpha: 0 }), 3);
	}
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointLightning1, 1.0,{ x: 0, y: 0, scaleX: 0, scaleY: 0 },{ x: 150, y: -150, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 3);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointLightning2, 1.15,{ x: 0, y: 0, scaleX: 0, scaleY: 0 },{ x: 150, y: 150, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 3);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointLightning3, 1.25,{ x: 0, y: 0, scaleX: 0, scaleY: 0 },{ x: -150, y: 150, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 3);
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointLightning4, 1.75,{ x: 0, y: 0, scaleX: 0, scaleY: 0 },{ x: -150, y: -150, scaleX: 1, scaleY: 1, ease: Elastic.easeOut }), 3);
	
	matchPointAnimationIn.add(TweenMax.fromTo( matchPointTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3);
	
	// SHAKE RATTLE & ROLL
	matchPointAnimationIn.add(TweenMax.fromTo( momentMatchPoint, 0.25,{ x: 5,y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.10);
	matchPointAnimationIn.add(TweenMax.fromTo( momentMatchPoint, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.6);
	matchPointAnimationIn.add(TweenMax.fromTo( momentMatchPoint, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 2.20);
	matchPointAnimationIn.add(TweenMax.fromTo( momentMatchPoint, 0.5,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 15, points: 50 }) }), 3);
	matchPointAnimationIn.add(TweenMax.to( momentMatchPoint, 0,{ x: 0, y: 0 }), 0);
	
	matchPointAnimationIn.timeScale(1.25);
	matchPointAnimationIn.play();
	matchPointAnimationIn2.timeScale(1.25);
	matchPointAnimationIn2.play();

	momentMatchPoint.visible = true;
	
	animationTimer = setTimeout(destroyMatchPoint, 5000);
}

function destroyMatchPoint() {
	
	matchPointAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	matchPointAnimationOut.add(TweenMax.to( matchPointParticleContainer, 1.0, { alpha: 0 }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointEm_TennisBalls.doc, 1.0,{ scaleX: 0, scaleY: 0, ease: Quart.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointEm_ThinShards.doc, 1.0,{ scaleX: 0, scaleY: 0, /*x: 600, y: -600,*/ ease: Quart.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointEm_Octagons.doc, 1.0,{ scaleX: 0, scaleY: 0, /*x: -600, y: 600, */ ease: Quart.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointEm_Circles.doc, 1.0,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	matchPointAnimationOut.add(TweenMax.to( matchPointTitle, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointStripes, .8,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, rotation: -5, ease: Expo.easeInOut }), 0);
	
	matchPointAnimationOut.add(TweenMax.to( matchPointLightning1, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointLightning2, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointLightning3, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	matchPointAnimationOut.add(TweenMax.to( matchPointLightning4, 1.0,{ scaleX: 0, scaleY: 0, x: 0, y: 0, ease: Expo.easeInOut }), 0);
	
	for (var i = 0; i < matchPointOctagonContainerArray3.length; i++) {
		var octagon = matchPointOctagonContainerArray3[i];
		var duration = 1 - (i * .1);
		matchPointAnimationOut.add(TweenMax.to( octagon, duration,{ scaleX: 0, scaleY: 0, rotation: -10, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	for (var i = 0; i < matchPointOctagonContainerArray4.length; i++) {
		var octagon = matchPointOctagonContainerArray4[i];
		var duration = 1 - (i * .1);
		matchPointAnimationOut.add(TweenMax.to( octagon, duration,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	for (var i = 0; i < matchPointExplosionArray1.length; i++) {
		var particles = matchPointExplosionArray1[i];
		var duration = 1 + (i * .02);
		matchPointAnimationOut.add(TweenMax.to( particles, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}

	matchPointAnimationOut.timeScale(1);
	matchPointAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);	
}