
var genericPointExplosionArray = [];

var genericPointColors = ["0x004b85", "0xcc3333"];

//////////////// PARTICLE STUFF /////////////////
var genericPointParticles 	= new ParticleEngine(window.innerWidth, 500);
var genericPointEmitters 	= [];
var genericPointParticleContainer;
var genericPointEm_TennisBalls,
	genericPointEm_ThinShards,
	genericPointEm_Circles,
	genericPointEm_Circles2
/////////////////////////////////////////////////

function createGenericPoint() {
	momentGenericPoint = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentGenericPoint);
	
	var assetsToLoader = [
		"img/background.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		genericPointParticleContainer = new PIXI.DisplayObjectContainer();
		momentGenericPoint.addChild(genericPointParticleContainer);
		
		genericPointEm_TennisBalls = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/ball-white.png", 
				life		: 	800.0,
				spin		: 	[-0.03, 0.03],
				speed		: 	[1, 3],
				scale		: 	[0.1,0.2],
				colors		: 	[0xffffff, 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		genericPointEm_ThinShards = new Emitter({
				type		:	"chaos",
				count		:	100,
				angle		:	-45 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/shard2-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.05, 1],
				colors		: 	[0xffffff, 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		
		genericPointEm_Circles = new Emitter({
				type		:	"chaos",
				count		:	100,
			},
			{ 	type 		:	CircleParticle,
				size 		: 	20,
				life		: 	1000.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.25,1],
				colors		: 	[genericPointColors[0], genericPointColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		
		genericPointEm_Circles2 = new Emitter({
				type		:	"point",
				count		:	50,
			},
			{ 	type 		:	CircleParticle, 
				size 		: 	16,
				life		: 	1000.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.5,1],
				colors		: 	[genericPointColors[0], genericPointColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		genericPointEmitters.push(genericPointEm_TennisBalls);
		genericPointEmitters.push(genericPointEm_ThinShards);
		genericPointEmitters.push(genericPointEm_Circles);
		genericPointEmitters.push(genericPointEm_Circles2);

		genericPointParticles.addEmitters(genericPointEmitters);

		genericPointParticleContainer.addChild(genericPointEm_TennisBalls.doc);
		genericPointParticleContainer.addChild(genericPointEm_ThinShards.doc);
		genericPointParticleContainer.addChild(genericPointEm_Circles.doc);
		genericPointParticleContainer.addChild(genericPointEm_Circles2.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		

		
		genericPointCircleMain1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) genericPointCircleMain1.blendMode = PIXI.blendModes.MULTIPLY;
		momentGenericPoint.addChild(genericPointCircleMain1);
		
		genericPointCircleMain2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) genericPointCircleMain2.blendMode = PIXI.blendModes.MULTIPLY;
		momentGenericPoint.addChild(genericPointCircleMain2);
		
		genericPointCircleMain3 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) genericPointCircleMain3.blendMode = PIXI.blendModes.MULTIPLY;
		momentGenericPoint.addChild(genericPointCircleMain3);
		
		genericPointCircleSmall = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) genericPointCircleSmall.blendMode = PIXI.blendModes.MULTIPLY;
		momentGenericPoint.addChild(genericPointCircleSmall);

		// CREATE SOME EXPLOSION PIECES FOR THE FINAL EXPLOSION
		for (var i = 0; i < 60; i++) {
			var genericPointParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,1);
			
			switch (randomParticleType) {
				case 0:
					// CIRCLE
					genericPointParticle.beginFill(genericPointColors[generateRandomNumber(0, 1)], .5);
					genericPointParticle.drawCircle(0, 0, generateRandomNumber(2, 10));
					break;
				case 1:
				default:
					// CIRCLE WITH STROKE
					genericPointParticle.lineStyle(2, genericPointColors[generateRandomNumber(0, 1)], 1);
					genericPointParticle.drawCircle(0, 0, generateRandomNumber(2, 10)); 
			}
			
			genericPointParticle.endFill();
			if (matchVizViewConfig.isWebGL) genericPointParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentGenericPoint.addChild(genericPointParticle);
			genericPointExplosionArray.push(genericPointParticle);
		}

		// TEXT
		genericPointTitle = new PIXI.Text("POINT", { font: "120px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		genericPointTitle.anchor.x = 0.5;
		genericPointTitle.anchor.y = 0.5;
		momentGenericPoint.addChild(genericPointTitle);
		
		$('#icon_genericpoint').click(function(){
			if (momentGenericPoint.visible == false) explodeGenericPoint();
			return false;
		});
		
		TweenMax.to($('#icon_genericpoint'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentGenericPoint.visible = false;
}

function redrawGenericPoint() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		genericPointColors = ["0x004b85", "0xcc3333"];
	} else {
		genericPointColors = ["0xcc3333", "0x004b85"];
	}
	genericPointCircleMain1.clear();
	genericPointCircleMain1.beginFill(genericPointColors[0], 1);
	genericPointCircleMain1.drawCircle(0, 0, 125);
	genericPointCircleMain1.endFill();
	
	genericPointCircleMain2.clear();
	genericPointCircleMain2.beginFill(genericPointColors[0], 1);
	genericPointCircleMain2.drawCircle(0, 0, 110);
	genericPointCircleMain2.endFill();
	
	genericPointCircleMain3.clear();
	genericPointCircleMain3.beginFill(genericPointColors[0], 1);
	genericPointCircleMain3.drawCircle(0, 0, 95);
	genericPointCircleMain3.endFill();
	
	genericPointCircleSmall.clear();
	genericPointCircleSmall.beginFill(genericPointColors[1], 1);
	genericPointCircleSmall.drawCircle(0, 0, 25);
	genericPointCircleSmall.endFill();
}

function explodeGenericPoint() {
	hideMoments();
	
	redrawGenericPoint();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < genericPointEmitters.length ) {
		em = genericPointEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(genericPointParticles);
	
	/////////////////////////////////////////////////
	
	genericPointAnimationIn =  new TimelineMax({ paused: true });

	genericPointAnimationIn.fromTo( genericPointCircleSmall, 1, { x: 500, y: 200, scaleX: 0, scaleY: 0, alpha: 0},{ bezier: {values:[{ x: 50, y: -10 }, { x: 0, y: 0 }] }, scaleX: 1, scaleY: 1, alpha: 1, ease: Power4.easeOut });
	genericPointAnimationIn.to( genericPointCircleSmall, .75, { scaleX: 5, scaleY: 5, alpha: 0, delay: .1, ease: Power4.easeOut }, "-=.25");
	
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointCircleMain1, 1, { x: -500, y: 200, scaleX: 0, scaleY: 0, alpha: 0},{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut, easeParams:[1, .5] }), .75);
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointCircleMain2, 1, { x: -500, y: 200, scaleX: 0, scaleY: 0, alpha: 0},{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: .5, ease: Elastic.easeOut, easeParams:[.5, .5] }), .80);
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointCircleMain3, 1, { x: -500, y: 200, scaleX: 0, scaleY: 0, alpha: 0},{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: .25, ease: Elastic.easeOut, easeParams:[.25, .5] }), .85);
	
	//////////////// PARTICLE STUFF /////////////////
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointParticleContainer, 1, { alpha: 0}, { alpha: 1 }), 0);
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointEm_TennisBalls.doc, 1, { scaleX: 0.0, scaleY: 0.0}, { scaleX: 1.0, scaleY: 1.0, ease: Quart.easeInOut }), .75);
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointEm_ThinShards.doc, 0.75,{ scaleX: 0.0, scaleY: 0.0, x: 600 , y: -600, alpha: 0}, { scaleX: 1.0, scaleY: 1.0, x: 0, y: 0, alpha: 1, ease: Quart.easeInOut }), .75);
	genericPointAnimationIn.add(TweenMax.fromTo(genericPointEm_Circles.doc, .5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1.0, scaleY: 1.0, alpha: 1.0, ease: Quart.easeOut }), .75);
	genericPointAnimationIn.add(TweenMax.fromTo(genericPointEm_Circles2.doc, .5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1.0, scaleY: 1.0, alpha: 1.0, ease: Quart.easeOut }), .75);
	/////////////////////////////////////////////////

	// PARTICLE EXPLOSIONS
	for (var i = 0; i < genericPointExplosionArray.length; i++) {
		var particles = genericPointExplosionArray[i];
		var destinationX = generateRandomNumber(-400, 400);
		var destinationY = generateRandomNumber(-200, 200);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomScale = 1 ;
		genericPointAnimationIn.add( TweenMax.fromTo( particles, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 1 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: 1, ease: Expo.easeOut }), .75);
	}

	// PARTICLE EXPLOSIONS FADE OUT
	for (var i = 0; i < genericPointExplosionArray.length; i++) {
		var particles = genericPointExplosionArray[i];
		genericPointAnimationIn.add( TweenMax.to( particles, 1.5,{ alpha: 0 }), 1);
	}

	// SHAKE RATTLE & ROLL
	genericPointAnimationIn.add(TweenMax.fromTo( momentGenericPoint, 0.5,{ x: 10, y: 10 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 10, points: 50}) }), .85);
	genericPointAnimationIn.add(TweenMax.to( momentGenericPoint, 0,{ x: 0, y: 0 }), 0);
	
	genericPointAnimationIn.add(TweenMax.fromTo( genericPointTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), .75);
	
	genericPointAnimationIn.timeScale(1.25);
	genericPointAnimationIn.play();
	
	momentGenericPoint.visible = true;
	
	animationTimer = setTimeout(destroyGenericPoint, 3000);
}

function destroyGenericPoint() {
	
	genericPointAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	genericPointAnimationOut.add(TweenMax.to( genericPointParticleContainer, 1.0, { alpha: 0 }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointEm_TennisBalls.doc, 1.0,{ scaleX: 0, scaleY: 0, ease: Quart.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointEm_ThinShards.doc, 1.0,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointEm_Circles.doc, 1.0,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointEm_Circles2.doc, 1.0,{ scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	for (var i = 0; i < genericPointExplosionArray.length; i++) {
		var particles = genericPointExplosionArray[i];
		var duration = .5 + (i * .02);
		genericPointAnimationOut.add(TweenMax.to( particles, (duration),{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	genericPointAnimationOut.add(TweenMax.to( genericPointCircleMain1, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointCircleMain2, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointCircleMain3, .5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	genericPointAnimationOut.add(TweenMax.to( genericPointTitle, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	genericPointAnimationOut.timeScale(1);
	genericPointAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);	
}