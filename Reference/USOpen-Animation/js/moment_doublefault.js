var doubleFaultRectArray = [];
var doubleFaultPlusArray = [];
var doubleFaultAngleArray = [];
var doubleFaultExplosionArray = [];

var doubleFaultColors = ["0xf04e37", "0x620fe4"];

//////////////// PARTICLE STUFF /////////////////
var doubleFaultParticles 	= new ParticleEngine(window.innerWidth, 500);
var doubleFaultEmitters 	= [];
var doubleFaultParticleContainer;
var doubleFaultEm_Plusses,
	doubleFaultEm_PlussesMicro,
	doubleFaultEm_Circles,
	doubleFaultEm_ThinShards
/////////////////////////////////////////////////

function createDoubleFault() {
	momentDoubleFault = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentDoubleFault);
	var assetsToLoader = [
		"img/background.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		doubleFaultParticleContainer = new PIXI.DisplayObjectContainer();
		momentDoubleFault.addChild(doubleFaultParticleContainer);

		doubleFaultEm_Plusses = new Emitter({
				type		:	"chaos",
				count		:	100,
			},
			{ 	type 		:	PlusParticle,
				size 		: 	20,
				thickness	: 	6,
				life		: 	1000.0,
				rotation	: 	45,
				spin		: 	[0, 0],
				speed		: 	[1, 3],
				scale		: 	[.25,2],
				colors		: 	[doubleFaultColors[0], doubleFaultColors[1], 0xffffff],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
										
		doubleFaultEm_PlussesMicro = new Emitter({
				type		:	"point",
				count		:	25,
			},
			{ 	type 		:	PlusParticle, 
				size 		: 	25,
				thickness	: 	6,
				life		: 	500.0,
				rotation	: 	45,
				spin		: 	[0, 0],
				speed		: 	[1, 3],
				scale		: 	[.5,1],
				colors		: 	[doubleFaultColors[0], doubleFaultColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
										
		doubleFaultEm_Circles = new Emitter({
				type		:	"point",
				count		:	25,
			},
			{ 	type 		:	CircleParticle, 
				size 		: 	15,
				thickness	: 	4,
				life		: 	500.0,
				spin		: 	[0, 0],
				speed		: 	[1, 3],
				scale		: 	[.5,1],
				colors		: 	[doubleFaultColors[0], doubleFaultColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		doubleFaultEm_ThinShards = new Emitter({
				type		:	"linear",
				count		:	100,
				angle		:	-45 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/shard2-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.25, 1],
				colors		: 	[doubleFaultColors[0], doubleFaultColors[1], 0xffffff, 0xffffff, 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		doubleFaultEmitters.push(doubleFaultEm_Plusses);
		doubleFaultEmitters.push(doubleFaultEm_PlussesMicro);
		doubleFaultEmitters.push(doubleFaultEm_Circles);
		doubleFaultEmitters.push(doubleFaultEm_ThinShards);

		doubleFaultParticles.addEmitters(doubleFaultEmitters);

		doubleFaultParticleContainer.addChild(doubleFaultEm_Plusses.doc);
		doubleFaultParticleContainer.addChild(doubleFaultEm_PlussesMicro.doc);
		doubleFaultParticleContainer.addChild(doubleFaultEm_Circles.doc);
		doubleFaultParticleContainer.addChild(doubleFaultEm_ThinShards.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		doubleFaultCircle1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) doubleFaultCircle1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultCircle1);
		
		doubleFaultCircle2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) doubleFaultCircle2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultCircle2);
		
		// CREATE SOME EXPLOSION PIECES
		for (var i = 0; i < 30; i++) {
			var doubleFaultParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,5);
			
			switch (randomParticleType) {
				case 0:
					doubleFaultParticle.lineStyle(2, doubleFaultColors[generateRandomNumber(0, 1)], 1);
					doubleFaultParticle.drawCircle(0, 0, generateRandomNumber(5, 15)); 
					break;
				default:
					doubleFaultParticle.beginFill(doubleFaultColors[generateRandomNumber(0, 1)], .5);
					doubleFaultParticle.drawCircle(0, 0, generateRandomNumber(2, 10));
			}
			doubleFaultParticle.endFill();
			if (matchVizViewConfig.isWebGL) doubleFaultParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentDoubleFault.addChild(doubleFaultParticle);
			doubleFaultExplosionArray.push(doubleFaultParticle);
		}
		
		// CREATE SOME ANGLES
		for (var i = 0; i < 4; i++) {
			doubleFaultAngle = new PIXI.Graphics();
			if (i < 2) {
				doubleFaultAngle.beginFill(doubleFaultColors[0], 1);
			} else {
				doubleFaultAngle.beginFill(doubleFaultColors[1], 1);
			}
			//doubleFaultAngle.drawRect(0, 0, 400, 1000);
			var tempHeight = window.innerHeight + 300;
			doubleFaultAngle.drawRect(0, 0, 400, tempHeight);
			doubleFaultAngle.endFill();
			doubleFaultAngle.pivot.x = 200;
			//doubleFaultAngle.pivot.y = 500;
			doubleFaultAngle.pivot.y = tempHeight/2;
			if (matchVizViewConfig.isWebGL) doubleFaultAngle.blendMode = PIXI.blendModes.MULTIPLY;
			momentDoubleFault.addChild(doubleFaultAngle);
			doubleFaultAngleArray.push(doubleFaultAngle);
		}
		

		// CREATE SOME CROSSES
		doubleFaultCross1 = new PIXI.Graphics();
		for (var i = 0; i < 2; i++) {
			var doubleFaultRectangle = new PIXI.Graphics();
			if (matchVizViewConfig.isWebGL) doubleFaultRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			doubleFaultCross1.addChild(doubleFaultRectangle);
		}
		momentDoubleFault.addChild(doubleFaultCross1);
		
		doubleFaultCross2 = new PIXI.Graphics();
		for (var i = 0; i < 2; i++) {
			var doubleFaultRectangle = new PIXI.Graphics();
			if (matchVizViewConfig.isWebGL) doubleFaultRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			doubleFaultCross2.addChild(doubleFaultRectangle);
		}
		momentDoubleFault.addChild(doubleFaultCross2);
		
		// CREATE SOME PLUSES
		doubleFaultPlus1 = new PIXI.Graphics();
		for (var i = 0; i < 2; i++) {
			var doubleFaultRectangle = new PIXI.Graphics();
			doubleFaultRectangle.pivot.x = 0;
			doubleFaultRectangle.pivot.y = 0;
			if (matchVizViewConfig.isWebGL) doubleFaultRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			doubleFaultPlus1.addChild(doubleFaultRectangle);
		}
		momentDoubleFault.addChild(doubleFaultPlus1);
		
		doubleFaultPlus2 = new PIXI.Graphics();
		for (var i = 0; i < 2; i++) {
			var doubleFaultRectangle = new PIXI.Graphics();
			doubleFaultRectangle.pivot.x = 0;
			doubleFaultRectangle.pivot.y = 0;
			if (matchVizViewConfig.isWebGL) doubleFaultRectangle.blendMode = PIXI.blendModes.MULTIPLY;
			doubleFaultPlus2.addChild(doubleFaultRectangle);
		}
		momentDoubleFault.addChild(doubleFaultPlus2);
		
		
		// SHARDS
		doubleFaultShardTexture1 = PIXI.Texture.fromImage("img/doublefault/shard1.png");
		doubleFaultShardBig1 = new PIXI.Sprite(doubleFaultShardTexture1);
		doubleFaultShardBig1.anchor.x = 0.5;
		doubleFaultShardBig1.anchor.y = 0.5;
		doubleFaultShardBig1.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) doubleFaultShardBig1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultShardBig1);
		
		doubleFaultShardBig2 = new PIXI.Sprite(doubleFaultShardTexture1);
		doubleFaultShardBig2.anchor.x = 0.5;
		doubleFaultShardBig2.anchor.y = 0.5;
		doubleFaultShardBig2.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) doubleFaultShardBig2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultShardBig2);
		
		doubleFaultShardTexture2 = PIXI.Texture.fromImage("img/doublefault/shard2.png");
		doubleFaultShardMini1 = new PIXI.Sprite(doubleFaultShardTexture2);
		doubleFaultShardMini1.anchor.x = 0.5;
		doubleFaultShardMini1.anchor.y = 0.5;
		doubleFaultShardMini1.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) doubleFaultShardMini1.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultShardMini1);
		
		doubleFaultShardMini2 = new PIXI.Sprite(doubleFaultShardTexture2);
		doubleFaultShardMini2.anchor.x = 0.5;
		doubleFaultShardMini2.anchor.y = 0.5;
		doubleFaultShardMini2.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) doubleFaultShardMini2.blendMode = PIXI.blendModes.MULTIPLY;
		momentDoubleFault.addChild(doubleFaultShardMini2);
		
		// TEXT
		doubleFaultTitle1 = new PIXI.Text("DOUBLE", { font: "90px Knockout47", fill: "#ffffff", align: "center"});
		doubleFaultTitle1.anchor.x = 0.5;
		doubleFaultTitle1.anchor.y = 0.5;
		momentDoubleFault.addChild(doubleFaultTitle1);
		
		doubleFaultTitle2 = new PIXI.Text("FAULT", { font: "90px Knockout47", fill: "#ffffff", align: "center"});
		doubleFaultTitle2.anchor.x = 0.5;
		doubleFaultTitle2.anchor.y = 0.5;
		momentDoubleFault.addChild(doubleFaultTitle2);
		
		$('#icon_doublefault').click(function(){
			if (momentDoubleFault.visible == false) explodeDoubleFault();
			return false;
		});
		
		TweenMax.to($('#icon_doublefault'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}

	momentDoubleFault.visible = false;
}

function redrawDoubleFault() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		doubleFaultColors = ["0xf04e37", "0x620fe4"];
	} else {
		doubleFaultColors = ["0x620fe4", "0xf04e37"];
	}
	
	doubleFaultCircle1.clear();
	doubleFaultCircle1.beginFill(doubleFaultColors[1], 1);
	doubleFaultCircle1.drawCircle(0, 0, 115);
	doubleFaultCircle1.endFill();
	
	doubleFaultCircle2.clear();
	doubleFaultCircle2.beginFill(doubleFaultColors[1], 1);
	doubleFaultCircle2.drawCircle(0, 0, 85);
	doubleFaultCircle2.endFill();
	
	// CREATE SOME CROSSES
	for (var i = 0; i < 2; i++) {
		doubleFaultCross1.children[i].clear();
		doubleFaultCross1.children[i].beginFill(doubleFaultColors[0], 1);
		doubleFaultCross1.children[i].drawRect(-73, -155, 145, 320);
		if (i < 1) {
			doubleFaultCross1.children[i].rotation = (45 * toRAD);
		} else {
			doubleFaultCross1.children[i].rotation = (-45 * toRAD);
		}
		doubleFaultCross1.children[i].endFill();
	}
	
	for (var i = 0; i < 2; i++) {
		doubleFaultCross2.children[i].clear();
		doubleFaultCross2.children[i].beginFill(doubleFaultColors[0], 1);
		doubleFaultCross2.children[i].drawRect(-73, -155, 145, 320);
		if (i < 1) {
			doubleFaultCross2.children[i].rotation = (45 * toRAD);
		} else {
			doubleFaultCross2.children[i].rotation = (-45 * toRAD);
		}
		doubleFaultCross2.children[i].endFill();
	}
	
	// CREATE SOME PLUSES
	for (var i = 0; i < 2; i++) {
		doubleFaultPlus1.children[i].clear();
		doubleFaultPlus1.children[i].beginFill(doubleFaultColors[0], 1);
		doubleFaultPlus1.children[i].drawRect(-15, -100, 30, 200);
		if (i < 1) {
			doubleFaultPlus1.children[i].rotation = (45 * toRAD);
		} else {
			doubleFaultPlus1.children[i].rotation = (-45 * toRAD);
		}
		doubleFaultPlus1.children[i].endFill();
	}
	
	for (var i = 0; i < 2; i++) {
		doubleFaultPlus2.children[i].clear();
		doubleFaultPlus2.children[i].beginFill(doubleFaultColors[0], 1);
		doubleFaultPlus2.children[i].drawRect(-15, -100, 30, 200);
		if (i < 1) {
			doubleFaultPlus2.children[i].rotation = (45 * toRAD);
		} else {
			doubleFaultPlus2.children[i].rotation = (-45 * toRAD);
		}
		doubleFaultPlus2.children[i].endFill();
	}
	
	doubleFaultShardBig1.tint = doubleFaultColors[1];
	doubleFaultShardBig2.tint = doubleFaultColors[1];
	doubleFaultShardMini1.tint = doubleFaultColors[1];
	doubleFaultShardMini2.tint = doubleFaultColors[1];
}

function explodeDoubleFault() {
	hideMoments();
	
	redrawDoubleFault();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < doubleFaultEmitters.length ) {
		em = doubleFaultEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(doubleFaultParticles);
	/////////////////////////////////////////////////
	
	doubleFaultAnimationIn =  new TimelineMax({ paused: true });
	doubleFaultAnimationIn.fromTo( doubleFaultCircle1, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, alpha: 0 },{ bezier: {values:[{ x: -100, y: -110 }, { x: 250, y: 25 }] }, scaleX: .15, scaleY: .15, alpha: 1, delay: .5, ease: Quad.easeOut });
	doubleFaultAnimationIn.to( doubleFaultCircle1, .5, { bezier: {values:[{ x: -100, y: -50 }, {x: -250, y: 0 }]}, scaleX: .35, scaleY: .35, ease: Quad.easeOut }, "-=.15");
	doubleFaultAnimationIn.to( doubleFaultCircle1, 1, { bezier: {values:[{ x: -100, y: -25 }, {x: 0, y: 0 }]}, scaleX: 1, scaleY: 1, ease: Quad.easeOut }, "-=.15");
	
	doubleFaultAnimationIn2 =  new TimelineMax({ paused: true });
	doubleFaultAnimationIn2.fromTo( doubleFaultCircle2, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, alpha: 0 },{ bezier: {values:[{ x: -100, y: -110 }, { x: 250, y: 25 }] }, scaleX: .15, scaleY: .15, alpha: 1, delay: .55, ease: Quad.easeOut });
	doubleFaultAnimationIn2.to( doubleFaultCircle2, .5, { bezier: {values:[{ x: -100, y: -50 }, {x: -250, y: 0 }]}, scaleX: .35, scaleY: .35, ease: Quad.easeOut }, "-=.15");
	doubleFaultAnimationIn2.to( doubleFaultCircle2, 1, { bezier: {values:[{ x: -100, y: -25 }, {x: 0, y: 0 }]}, scaleX: 1, scaleY: 1, alpha: .25, ease: Quad.easeOut }, "-=.15");
	
	//////////////// PARTICLE STUFF /////////////////
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultParticleContainer, 1, { alpha: 0 }, { alpha: 1 }), 0);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultEm_Plusses.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, {  scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultEm_PlussesMicro.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultEm_Circles.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, {  scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultEm_ThinShards.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1.0, scaleY: 1.0, alpha: 1.0, ease: Quart.easeOut }), 3.25);
	/////////////////////////////////////////////////
	
	// RECTANGLE WIPE
	for (var i = 0; i < doubleFaultAngleArray.length; i++) {
		var destinationX = window.innerWidth/2 + 400;
		doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultAngleArray[i], (1-(i * .1)),{ x: -destinationX, y: 0, rotation: (20 * toRAD) },{ x: destinationX, y: 0, rotation: (20 * toRAD), ease: Expo.easeInOut }), 0);
	}

	// PARTICLE EXPLOSIONS
	for (var i = 0; i < doubleFaultExplosionArray.length; i++) {
		var circle = doubleFaultExplosionArray[i];
		var destinationY = generateRandomNumber(-100, 100);
		if (i < doubleFaultExplosionArray.length/2) {
			var destinationX = generateRandomNumber(100, 300);
			doubleFaultAnimationIn.add(TweenMax.fromTo( circle, 1,{ x: 200, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 1);
		} else {
			var destinationX = generateRandomNumber(-300, -100);
			doubleFaultAnimationIn.add(TweenMax.fromTo( circle, 1,{ x: -200, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 1.35);
		}
	}
	
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus1, 2.0,{ bezier: {values:[ { x: 225, y: 25 }, { x: 275, y: -50 }, { x: 250, y: -100 } ]}, ease: Expo.easesInOut}), 1);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultPlus1, .5,{ scaleX: 0, scaleY: 0, alpha: 1 },{ scaleX: .75, scaleY: .75, alpha: 1, ease: Bounce.easeOut }), 1);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultPlus1, 3,{ rotation: 0 },{ rotation: -8 , ease: Expo.easeOut }), 1);
	
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus2, 1.5,{ bezier: {values:[ { x: -225, y: -25 }, { x: -275, y: 50 }, { x: -250, y: 100 }] }, ease: Power2.easesIn }), 1.5);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultPlus2, .5,{ scaleX: 0, scaleY: 0, alpha: 1 },{ scaleX: .75, scaleY: .75, alpha: 1, ease: Bounce.easeOut }), 1.5);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultPlus2, 3,{ rotation: 0 },{ rotation: -8 , ease: Expo.easeOut }), 1.5);

	// PULL IN X
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus1, 0.75,{ x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Power4.easeIn }), 2.5);
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus2, 0.75,{ x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Power4.easeIn }), 2.5);
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus1, 1.5,{ scaleX: 20, scaleY: 20, alpha: 0, rotation: -10, ease: Power4.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultPlus2, 1.6,{ scaleX: 25, scaleY: 25, alpha: 0, rotation: -12, ease: Power4.easeOut }), 3.25);

	// CIRCLE EXPLOSION
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultCircle1, 1.0,{ x: 0, y: 0, scaleX: .25, scaleY: .25, ease: Cubic.easeIn }), 2.5);
	doubleFaultAnimationIn.add(TweenMax.to( doubleFaultCircle2, 1.0,{ x: 0, y: 0, scaleX: .25, scaleY: .25, alpha: 0, ease: Cubic.easeIn }), 2.5);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultCircle1, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: .25 },{ x: 0, y: 0, scaleX: 10, scaleY: 10, alpha: 0, ease: Cubic.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultCross1, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: (-180 * toRAD), alpha: 1 },{ x: 20, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1, ease: Expo.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultCross2, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: (180 * toRAD), alpha: 1 },{ x: -20, y: 0, scaleX: 1, scaleY: 1, rotation: 0, alpha: 1, ease: Expo.easeOut }), 3.25);
	
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultTitle1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: -35, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultTitle2, 1.1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 35, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3.25);
	
	// SHARDS
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultShardBig1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 135, y: -165, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultShardBig2, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -155, y: 140, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultShardMini1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 180, y: -190, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.fromTo( doubleFaultShardMini2, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -165, y: 75, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3.25);
	
	// FADE PARTICLE EXPLOSIONS
	for (var i = 0; i < doubleFaultExplosionArray.length; i++) {
		var circle = doubleFaultExplosionArray[i];
		doubleFaultAnimationIn.add(TweenMax.to( circle, 1,{ alpha: 0, ease: Quart.easeOut }), 3.25);
	}
	
	// SHAKE RATTLE & ROLL
	doubleFaultAnimationIn.add(TweenMax.fromTo( momentDoubleFault, 0.25,{ x: 5,y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.10);
	doubleFaultAnimationIn.add(TweenMax.fromTo( momentDoubleFault, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.45);
	doubleFaultAnimationIn.add(TweenMax.fromTo( momentDoubleFault, 0.5,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 15, points: 50 }) }), 3.25);
	doubleFaultAnimationIn.add(TweenMax.to( momentDoubleFault, 0,{ x: 0, y: 0 }), 0);
	
	// RESET SOME THINGS
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultCircle1, 0,{ x: -50, y: -150, scaleX: 0, scaleY: 0, alpha: 0 }), 0);
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultCircle2, 0,{ x: -50, y: -150, scaleX: 0, scaleY: 0, alpha: 0 }), 0);
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultCross1, 0,{ alpha: 0 }), 0);
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultCross2, 0,{ alpha: 0 }), 0);
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultPlus1, 0,{ x: 200, y: -20, scaleX: 0.5, scaleY: 0.5, alpha: 0 }), 0);
	doubleFaultAnimationIn.add( TweenMax.to( doubleFaultPlus2, 0,{ x: -200, y: -20, scaleX: 0.5, scaleY: 0.5, alpha: 0 }), 0);
	
	doubleFaultAnimationIn.timeScale(1.25);
	doubleFaultAnimationIn.play();
	doubleFaultAnimationIn2.timeScale(1.25);
	doubleFaultAnimationIn2.play();
	
	momentDoubleFault.visible = true;
	
	animationTimer = setTimeout(destroyDoubleFault, 5000);
}

function destroyDoubleFault() {
	
	doubleFaultAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultParticleContainer, 1.0, { alpha: 0 }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultEm_Plusses.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultEm_PlussesMicro.doc, 1.0, { scaleX: 0.25, scaleY: 0.25, ease: Quart.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultEm_Circles.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultEm_ThinShards.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultCross1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 2, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultCross2, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: -2, alpha: 0, ease: Expo.easeInOut }), 0);
	
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultPlus1, 1,{ scaleX: 0, scaleY: 0, rotation: -6, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultPlus2, 1,{ scaleX: 0, scaleY: 0, rotation: -6, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultCircle1, 1,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultCircle2, 1,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultTitle1, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultTitle2, .8,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	// SHARDS
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultShardBig1, .8,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultShardBig2, .8,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultShardMini1, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	doubleFaultAnimationOut.add(TweenMax.to( doubleFaultShardMini2, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);	
	
	for (var i = 0; i < doubleFaultExplosionArray.length; i++) {
		var circle = doubleFaultExplosionArray[i];
		var duration = 1 + (i * .02);
		doubleFaultAnimationOut.add( TweenMax.to( circle, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	doubleFaultAnimationOut.timeScale(1);
	doubleFaultAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);
}