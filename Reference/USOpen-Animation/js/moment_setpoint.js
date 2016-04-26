var setPointExplosionArray1 = [];
var setPointExplosionArray2 = [];
var setPointExplosionArray3 = [];
var setPointRectangleArray = [];
var setPointSquareArray = [];

var setPointColors = ["0xf39909", "0xa51981"];

//////////////// PARTICLE STUFF /////////////////
var setPointParticles 	= new ParticleEngine(window.innerWidth, 500);
var setPointEmitters 	= [];
var setPointParticleContainer;
var setPointEm_PlussesMicro,
	setPointEm_ThinShards,
	setPointEm_Squares
/////////////////////////////////////////////////

function createSetPoint() {
	momentSetPoint = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentSetPoint);
	
	var assetsToLoader = [
		"img/background.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		setPointParticleContainer = new PIXI.DisplayObjectContainer();
		momentSetPoint.addChild(setPointParticleContainer);

		setPointEm_PlussesMicro = new Emitter({
				type		:	"point",
				count		:	25,
			},
			{ 	type 		:	PlusParticle, 
				size 		: 	25,
				thickness	: 	2,
				life		: 	500.0,
				rotation	: 	45,
				spin		: 	[0, 0],
				speed		: 	[1, 3],
				scale		: 	[.5,1],
				colors		: 	[setPointColors[0], setPointColors[1]],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		setPointEm_ThinShards = new Emitter({
				type		:	"linear",
				count		:	50,
				angle		:	-45 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/common/shard2-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.05, 1],
				scale		: 	[0.25, 1],
				colors		: 	[setPointColors[0], setPointColors[1], 0xffffff, 0xffffff, 0xffffff],
				fade		: 	0.2,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		setPointEm_Squares = new Emitter({
				type		:	"chaos",
				count		:	100
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	15,
				numSides	:	4,
				life		: 	1000.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.25, 1],
				colors		: 	[setPointColors[0], setPointColors[1], 0xffffff],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		setPointEmitters.push(setPointEm_PlussesMicro);
		setPointEmitters.push(setPointEm_ThinShards);
		setPointEmitters.push(setPointEm_Squares);

		setPointParticles.addEmitters(setPointEmitters);

		setPointParticleContainer.addChild(setPointEm_PlussesMicro.doc);
		setPointParticleContainer.addChild(setPointEm_ThinShards.doc);
		setPointParticleContainer.addChild(setPointEm_Squares.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		// CIRCLE
		setPointCircle1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointCircle1.blendMode = PIXI.blendModes.MULTIPLY;
		momentSetPoint.addChild(setPointCircle1);
		
		setPointCircle2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointCircle2.blendMode = PIXI.blendModes.MULTIPLY;
		momentSetPoint.addChild(setPointCircle2);
		
		// SQUARES
		setPointSquare1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointSquare1.blendMode = PIXI.blendModes.MULTIPLY;
		setPointSquare1.pivot.x = 75;
		setPointSquare1.pivot.y = 75;
		momentSetPoint.addChild(setPointSquare1);
		
		setPointSquare2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointSquare2.blendMode = PIXI.blendModes.MULTIPLY;
		setPointSquare2.pivot.x = 25;
		setPointSquare2.pivot.y = 25;
		momentSetPoint.addChild(setPointSquare2);
				
		// SQUARE TRAILERS
		setPointLaser1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointLaser1.blendMode = PIXI.blendModes.MULTIPLY;
		setPointLaser1.pivot.x = 105;
		setPointLaser1.pivot.y = 800;
		momentSetPoint.addChild(setPointLaser1);
		
		setPointLaser2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) setPointLaser2.blendMode = PIXI.blendModes.MULTIPLY;
		setPointLaser2.pivot.x = 35;
		setPointLaser2.pivot.y = 0;
		momentSetPoint.addChild(setPointLaser2);
		
		// CREATE SOME EXPLOSION PIECES FOR THE FINAL EXPLOSION
		for (var i = 0; i < 60; i++) {
			var setPointParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,2);
			var randomSize = generateRandomNumber(5, 15)
			switch (randomParticleType) {
				case 0:
					// SQUARE OUTLINE
					setPointParticle.lineStyle(2, setPointColors[generateRandomNumber(0, 1)], 1);
					var tempSize = generateRandomNumber(2, 10);
					var tempPosition = -(tempSize/2);
					setPointParticle.drawRect(tempPosition, tempPosition, tempSize, tempSize);
					break;
				case 1:
					// SQUARE 
					setPointParticle.beginFill(setPointColors[generateRandomNumber(0, 1)], 1);
					var tempSize = generateRandomNumber(2, 10);
					var tempPosition = -(tempSize/2);
					setPointParticle.drawRect(tempPosition, tempPosition, tempSize, tempSize);
					break;
				default:
					// PLUS SIGN 
					setPointParticle.beginFill(setPointColors[generateRandomNumber(0, 1)], .8);
					setPointParticle.drawRect(-2, -6, 4, 12);
					setPointParticle.drawRect(-6, -2, 12, 4);
			}
			setPointParticle.endFill();
			if (matchVizViewConfig.isWebGL) setPointParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentSetPoint.addChild(setPointParticle);
			if (i < 30) {
				setPointExplosionArray1.push(setPointParticle);
			} else  {
				setPointExplosionArray2.push(setPointParticle);
			}
		}
		
		// FINAL BIG SQUARES
		for (var i = 0; i < 7; i++) {
			var setPointParticleSquare = new PIXI.Graphics();
			setPointParticleSquare.pivot.x = 125;
			setPointParticleSquare.pivot.y = 125;
			if (matchVizViewConfig.isWebGL) setPointParticleSquare.blendMode = PIXI.blendModes.MULTIPLY;
			momentSetPoint.addChild(setPointParticleSquare);
			setPointExplosionArray3.push(setPointParticleSquare);
		}
		
		// FINAL SMALL SQUARES
		for (var i = 0; i < 5; i++) {
			var setPointParticleSquareMini = new PIXI.Graphics();
			setPointParticleSquareMini.pivot.x = 25;
			setPointParticleSquareMini.pivot.y = 25;
			setPointParticleSquareMini.rotation = 45 * toRAD;
			if (matchVizViewConfig.isWebGL) setPointParticleSquareMini.blendMode = PIXI.blendModes.MULTIPLY;
			momentSetPoint.addChild(setPointParticleSquareMini);
			setPointSquareArray.push(setPointParticleSquareMini);
		}
		
		// CREATE SOME RECTANGLES FOR THE WIPE
		for (var i = 0; i < 12; i++) {
			setPointRectangles = new PIXI.Graphics();
			if (i === 3 || i === 8) {
				setPointRectangles.beginFill(setPointColors[1], 1);
			} else {
				setPointRectangles.beginFill(setPointColors[0], 1);
			}
			
			var tempWidth = window.innerWidth + 300;
			//setPointRectangles.drawRect(0, 0, 1200, 500);
			setPointRectangles.drawRect(0, 0, tempWidth, 500);
			setPointRectangles.endFill();
			//setPointRectangles.pivot.x = 600;
			setPointRectangles.pivot.x = tempWidth/2;
			setPointRectangles.pivot.y = 250;
			if (matchVizViewConfig.isWebGL) setPointRectangles.blendMode = PIXI.blendModes.MULTIPLY;
			momentSetPoint.addChild(setPointRectangles);
			setPointRectangleArray.push(setPointRectangles);
		}
		
		// TEXT
		setPointTitle = new PIXI.Text("SET", { font: "150px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		setPointTitle.anchor.x = 0.5;
		setPointTitle.anchor.y = 0.5;
		momentSetPoint.addChild(setPointTitle);
		
		$('#icon_setpoint').click(function(){
			if (momentSetPoint.visible == false) explodeSetPoint();
			return false;
		});
		
		TweenMax.to($('#icon_setpoint'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentSetPoint.visible = false;
}

function redrawSetPoint() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		setPointColors = ["0xf39909", "0xa51981"];
	} else {
		setPointColors = ["0xa51981", "0xf39909"];
	}
	setPointCircle1.clear();
	setPointCircle1.beginFill(setPointColors[0], 1);
	setPointCircle1.drawCircle(0, 0, 25);
	setPointCircle1.endFill();
		
	setPointCircle2.clear();
	setPointCircle2.beginFill(setPointColors[0], 1);
	setPointCircle2.drawCircle(0, 0, 25);
	setPointCircle2.endFill();
	
	// SQUARES
	setPointSquare1.clear();
	setPointSquare1.beginFill(setPointColors[0], 1);
	setPointSquare1.drawRect(0, 0, 150, 150);
	setPointSquare1.endFill();
	
	setPointSquare2.clear();
	setPointSquare2.beginFill(setPointColors[1], 1);
	setPointSquare2.drawRect(0, 0, 50, 50);
	setPointSquare2.endFill();
			
	setPointLaser1.clear();
	setPointLaser1.beginFill(setPointColors[0], 1);
	setPointLaser1.drawRect(0, 0, 210, 800);
	setPointLaser1.endFill();
	
	setPointLaser2.clear();
	setPointLaser2.beginFill(setPointColors[1], 1);
	setPointLaser2.drawRect(0, 0, 70, 800);
	setPointLaser2.endFill();
	
	// FINAL BIG SQUARES
	for (var i = 0; i < 7; i++) {
		setPointExplosionArray3[i].clear();
		setPointExplosionArray3[i].beginFill(setPointColors[0], 1);
		setPointExplosionArray3[i].drawRect(0, 0, 250, 250);
		setPointExplosionArray3[i].endFill();
	}
	// FINAL SMALL SQUARES
	for (var i = 0; i < 5; i++) {
		setPointSquareArray[i].clear();
		if (i < 3) {
			setPointSquareArray[i].beginFill(setPointColors[0], 1);
		} else {
			setPointSquareArray[i].beginFill(setPointColors[1], 1);
		}
		setPointSquareArray[i].drawRect(0, 0, 50, 50);
		setPointSquareArray[i].endFill();
	}
}

function explodeSetPoint() {
	hideMoments();
	
	redrawSetPoint();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < setPointEmitters.length ) {
		em = setPointEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(setPointParticles);
	
	/////////////////////////////////////////////////
	
	setPointAnimationIn =  new TimelineMax({ paused: true});
	
	// CIRCLE BOUNCING
	setPointAnimationIn.fromTo( setPointCircle1, .5, { x: 0, y: 300, scaleX: 0, scaleY: 0, alpha: 0},{ x: 0, y: -100, scaleX: 1, scaleY: 1, alpha: 1, delay: .5, ease: Circ.easeOut });
	setPointAnimationIn.to( setPointCircle1, .5, { x: 0, y: 300, ease: Quad.easeIn });
	setPointAnimationIn.to( setPointCircle1, .75, { bezier: { type:"soft", values:[{ x: -25, y: 100 }, {x: -150, y: 0 }]}, ease: Quad.easeOut }, "-=.1");
	setPointAnimationIn.to( setPointCircle1, .5, { x: 0, y: 0, ease: Circ.easeOut }, "-=.25");
	setPointAnimationIn.to( setPointCircle1, .75, { scaleX: 10, scaleY: 10, alpha: 0, delay: .65, ease: Expo.easeOut  });

	setPointAnimationIn2 =  new TimelineMax({ paused: true });
	setPointAnimationIn2.fromTo( setPointCircle2, .5, { x: 0, y: 300, scaleX: 0, scaleY: 0, alpha: 0},{ x: 0, y: -100, scaleX: .5, scaleY: .5, alpha: .5, delay: .55, ease: Circ.easeOut });
	setPointAnimationIn2.to( setPointCircle2, .5, { x: 0, y: 300, ease: Quad.easeIn });
	setPointAnimationIn2.to( setPointCircle2, .75, { bezier: { type:"soft", values:[{ x: -25, y: 100 }, {x: -150, y: 0 }]}, ease: Quad.easeOut }, "-=.1");
	setPointAnimationIn2.to( setPointCircle2, .75, { x: 0, y: 0, ease: Circ.easeOut }, "-=.25");
	setPointAnimationIn2.to( setPointCircle2, .5, { scaleX: 5, scaleY: 5, alpha: 0, delay: .4, ease: Expo.easeOut  });
	
	// LARGE SQUARE
	setPointSquare1In =  new TimelineMax({ paused: true });
	setPointSquare1In.fromTo( setPointSquare1, .75, { x: 800, y: -350, scaleX: 1, scaleY: 1, rotation: 25, alpha: 0},{ x: -50, y: 250, scaleX: .5, scaleY: .5, rotation: (45 * toRAD), alpha: 1, delay: .75, ease: Quad.easeInOut });
	setPointSquare1In.to( setPointSquare1, .6, { x: -200, y: 0, rotation: -5, ease: Circ.easeOut }, "-=.1");
	setPointSquare1In.to( setPointSquare1, .65, { x: 0, y: -250, rotation: 5, ease: Power2.easeOut }, "-=.15");
	setPointSquare1In.to( setPointSquare1, .5, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: (45 * toRAD), ease: Quad.easeIn });
	setPointSquare1In.fromTo( setPointSquare1, .75, { alpha: 1 },{ alpha: .25 });

	// SMALL SQUARE
	setPointSquare2In =  new TimelineMax({ paused: true });
	setPointSquare2In.fromTo( setPointSquare2, .75, { x: -500, y: 350, scaleX: 1, scaleY: 1, rotation: (45 * toRAD), alpha: 0},{ x: 0, y: -250, scaleX: .5, scaleY: .5, rotation: (45 * toRAD), alpha: 1, delay: .75, ease: Quad.easeInOut });
	setPointSquare2In.to( setPointSquare2, .6, { x: 200, y: 0, rotation: 5, ease: Circ.easeOut }, "-=.1");
	setPointSquare2In.to( setPointSquare2, .65, { x: 0, y: 250, rotation: -5, ease: Power2.easeOut }, "-=.15");
	setPointSquare2In.to( setPointSquare2, .5, { x: 0, y: 50, scaleX: 1, scaleY: 1, rotation: (45 * toRAD), ease: Quad.easeIn });
	setPointSquare2In.fromTo( setPointSquare2, .75, { alpha: 1 },{ alpha: 0 });
	
	TweenMax.set( setPointSquare1, { alpha: 0 });
	TweenMax.set( setPointSquare2, { alpha: 0 });
	
	//////////////// PARTICLE STUFF /////////////////
	setPointAnimationIn.add(TweenMax.fromTo( setPointParticleContainer, 1, { alpha: 0 }, { alpha: 1 }), 0);
	setPointAnimationIn.add(TweenMax.fromTo( setPointEm_PlussesMicro.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, { scaleX: 1, scaleY: 1, alpha: 1, ease: Quart.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointEm_ThinShards.doc, 1.5, { alpha: 0 }, { alpha: 1, ease: Quart.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointEm_Squares.doc, 1.5, { alpha: 0 }, { alpha: 1, ease: Quart.easeOut }), 3);
	/////////////////////////////////////////////////
	
	setPointAnimationIn.add(TweenMax.fromTo( setPointLaser1, .75,{ x: 0, y: 0, alpha: 1 },{ x: 0, y: -50, alpha: 0 }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointLaser2, .75,{ x: 0, y: 50, alpha: 1 },{ x: 0, y: 50, alpha: 0 }), 3);
	
	TweenMax.set( setPointLaser1, { alpha: 0 });
	TweenMax.set( setPointLaser2, { alpha: 0 });
	
	// RECTANGLE WIPE
	for (var i = 0; i < setPointRectangleArray.length; i++) {
		var rectangle = setPointRectangleArray[i];
		var duration = 1 - (i * .03);
		var rectangleX = window.innerWidth/2 + 1000;
		var rectangleRotation = 45 * toRAD;
		if ( i%2 == 0) {
			rectangleX = -rectangleX;
		}
		setPointAnimationIn.add(TweenMax.fromTo( rectangle, (duration),{ y: 0, scaleX: 1, scaleY: 0, rotation: rectangleRotation },{ y: 0, scaleX: 1, scaleY: 1, rotation: rectangleRotation, ease: Expo.easeInOut }), 0);
		setPointAnimationIn.add(TweenMax.fromTo( rectangle, (duration + .25),{ x: 0 },{ x: rectangleX, ease: Expo.easeInOut }), 0);
		
		if (i === 10 || i === 11) {
			var tempDelay = (duration/2);
			setPointAnimationIn.add(TweenMax.fromTo( rectangle, (duration/2),{ y: 0, scaleX: 1, scaleY: 0, rotation: rectangleRotation },{ y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeIn }), 0);
			setPointAnimationIn.add(TweenMax.fromTo( rectangle, (duration/2),{ x: 0, },{ x: rectangleX, delay: tempDelay, ease: Expo.easeIn }), 0);
		}
	}
	
	// PARTICLE EXPLOSIONS
	for (var i = 0; i < setPointExplosionArray1.length; i++) {
		var particles = setPointExplosionArray1[i];
		var destinationX = generateRandomNumber(-100, 100);
		var destinationY = generateRandomNumber(200, 400);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomAlpha = generateRandomNumber(3, 10) * .1
		var randomScale = 1 + (generateRandomNumber(5, 10) * .05) ;
		if (i < 15) {
			setPointAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: 0, y: 300, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 1.25);
		} else if (i > 14 && i < 30) {
			destinationX = generateRandomNumber(-250, -50);
			destinationY = generateRandomNumber(-100, 100);
			setPointAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: -150, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 1.75);
		}
	}
	
	// LITTLE SQUARE EXPLOSIONS
	for (var i = 0; i < setPointExplosionArray2.length; i++) {
		var particles2 = setPointExplosionArray2[i];
		var destinationX = generateRandomNumber(-500, 500);
		var destinationY = generateRandomNumber(-200, 200);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomAlpha = generateRandomNumber(3, 10) * .1
		var randomScale = 1;
		setPointAnimationIn.add(TweenMax.fromTo( particles2, 1.5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 3);
	}
	
	// BIG SQUARE EXPLOSIONS
	for (var i = 0; i < setPointExplosionArray3.length; i++) {
		var particles2 = setPointExplosionArray3[i];
		var destinationX = generateRandomNumber(-15, 15);
		var destinationY = 15 + generateRandomNumber(-15, 15);
		var randomAlpha = 1 /*generateRandomNumber(3, 10) * .1*/
		var randomDelay = 1 + (.1 * i);
		var tempScale =  10 - (i * 2)
		var tempRotation = 45 * toRAD;
		if (i < 4) {
			setPointAnimationIn.add(TweenMax.fromTo( particles2, randomDelay,{ scaleX: 0, scaleY: 0, rotation: tempRotation, alpha: 1 },{ scaleX: tempScale, scaleY: tempScale, rotation: tempRotation, alpha: 0, ease: Expo.easeOut }), 3);
		}
	}
	
	// SMALL SQUARE EXPLOSIONS
	setPointAnimationIn.add(TweenMax.fromTo( setPointSquareArray[0], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: .5 },{ x: -50, y: -125, scaleX: 1, scaleY: 1, alpha: .5, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointSquareArray[1], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -125, y: 100, scaleX: .5, scaleY: .5, alpha: 1, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointSquareArray[2], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -150, y: 75, scaleX: .25, scaleY: .25, alpha: 1, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointSquareArray[3], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 100, y: 100, scaleX: 1, scaleY: 1, alpha: 1, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointSquareArray[4], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: -175, y: -75, scaleX: .5, scaleY: .5, alpha: 1, ease: Expo.easeOut }), 3);
	
	setPointAnimationIn.add(TweenMax.fromTo( setPointExplosionArray3[4], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: tempRotation, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: tempRotation, alpha: 1, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointExplosionArray3[5], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: tempRotation, alpha: 0 },{ x: 35, y: 0, scaleX: .9, scaleY: .95, rotation: tempRotation, alpha: .5, ease: Expo.easeOut }), 3);
	setPointAnimationIn.add(TweenMax.fromTo( setPointExplosionArray3[6], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: tempRotation, alpha: 0 },{ x: -35, y: 0, scaleX: .9, scaleY: .95, rotation: tempRotation, alpha: .5, ease: Expo.easeOut }), 3);
	
	setPointAnimationIn.add(TweenMax.fromTo( setPointTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3);
	
	// SHAKE RATTLE & ROLL
	setPointAnimationIn.add(TweenMax.fromTo( momentSetPoint, 0.25,{ x: 5,y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.35);
	setPointAnimationIn.add(TweenMax.fromTo( momentSetPoint, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 5, points: 50 }) }), 1.75);
	setPointAnimationIn.add(TweenMax.fromTo( momentSetPoint, 0.50,{ x: 10, y: 10 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 10, points: 50 }) }), 3);
	setPointAnimationIn.add(TweenMax.to( momentSetPoint, 0,{ x: 0, y: 0 }), 0);
	
	setPointAnimationIn.timeScale(1.25);
	setPointAnimationIn.play();
	setPointAnimationIn2.timeScale(1.25);
	setPointAnimationIn2.play();
	setPointSquare1In.timeScale(1.25);
	setPointSquare1In.play();
	setPointSquare2In.timeScale(1.25);
	setPointSquare2In.play();
	
	momentSetPoint.visible = true;
	
	animationTimer = setTimeout(destroySetPoint, 5000);
}

function destroySetPoint() {
	
	setPointAnimationOut =  new TimelineMax({ paused: true});
	
	//////////////// PARTICLE STUFF /////////////////
	setPointAnimationOut.add(TweenMax.to( setPointParticleContainer, 1.0, { alpha: 0 }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointEm_PlussesMicro.doc, 1.0, { scaleX: 0.25, scaleY: 0.25, ease: Quart.easeInOut }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointEm_ThinShards.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointEm_Squares.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Quart.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	setPointAnimationOut.add(TweenMax.to( setPointTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointSquare1, .9,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	
	for (var i = 0; i < setPointExplosionArray1.length; i++) {
		var particles = setPointExplosionArray1[i];
		var duration = 1 + (i * .02);
		setPointAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	for (var i = 0; i < setPointExplosionArray2.length; i++) {
		var particles = setPointExplosionArray2[i];
		var duration = 1 + (i * .02);
		setPointAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	for (var i = 0; i < setPointExplosionArray3.length; i++) {
		var particles = setPointExplosionArray3[i];
		var duration = 1 + (i * .1);
		if (i < 4) {
			setPointAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 3, alpha: 0, ease: Expo.easeInOut }), 0);
		}
	}
	for (var i = 0; i < setPointSquareArray.length; i++) {
		var particles = setPointSquareArray[i];
		var duration = 1 + (i * .1);
		setPointAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	
	setPointAnimationOut.add(TweenMax.to( setPointExplosionArray3[4], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointExplosionArray3[5], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 6, alpha: 0, ease: Expo.easeInOut }), 0);
	setPointAnimationOut.add(TweenMax.to( setPointExplosionArray3[6], 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: -6, alpha: 0, ease: Expo.easeInOut }), 0);
	
	setPointAnimationOut.timeScale(1);
	setPointAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);	
}