var gameExplosionArray1 = [];
var gameExplosionArray2 = [];
var gameExplosionArray3 = [];
var gameAngleArray = [];

var gameColors = ["0x7c17f9", "0xf28b07"];

//////////////// PARTICLE STUFF /////////////////
var gameParticles 	= new ParticleEngine(window.innerWidth, 500);
var gameEmitters 	= [];
var gameParticleContainer;
var gameEm_Triangles
/////////////////////////////////////////////////

function createGame() {
	momentGame = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentGame);
	
	var assetsToLoader = [
		"img/background.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {
		
		//////////////// PARTICLE STUFF /////////////////
		gameParticleContainer = new PIXI.DisplayObjectContainer();
		momentGame.addChild(gameParticleContainer);

		gameEm_Triangles = new Emitter({
				type		:	"chaos",
				count		:	150,
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	5,
				numSides	:	3,
				warp		: 	20,
				life		: 	1000.0,
				spin		: 	[-0.05, 0.05],
				speed		: 	[1, 3],
				scale		: 	[.25, 1],
				colors		: 	[gameColors[0], gameColors[1], 0xffffff],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);

		gameEmitters.push(gameEm_Triangles);

		gameParticles.addEmitters(gameEmitters);

		gameParticleContainer.addChild(gameEm_Triangles.doc);
		/////////////////////////////////////////////////
		
		
		
		
		
		
		
		// CREATE SOME ANGLES FOR INTRO WIPE
		for (var i = 0; i < 4; i++) {
			gameAngle = new PIXI.Graphics();
			if (i < 2) {
				gameAngle.beginFill(gameColors[0], 1);
			} else {
				gameAngle.beginFill(gameColors[1], 1);
			}
			
			//gameAngle.drawRect(0, 0, 400, 1000);
			gameAngle.drawRect(0, 0, 400, tempHeight);
			gameAngle.endFill();
			gameAngle.pivot.x = 200;
			//gameAngle.pivot.y = 500;
			gameAngle.pivot.y = tempHeight/2;
			if (matchVizViewConfig.isWebGL) gameAngle.blendMode = PIXI.blendModes.MULTIPLY;
			momentGame.addChild(gameAngle);
			gameAngleArray.push(gameAngle);
		}
		
		// CIRCLE
		gameCircle1 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) gameCircle1.blendMode = PIXI.blendModes.MULTIPLY;
		momentGame.addChild(gameCircle1);

		gameCircle2 = new PIXI.Graphics();
		if (matchVizViewConfig.isWebGL) gameCircle2.blendMode = PIXI.blendModes.MULTIPLY;
		momentGame.addChild(gameCircle2);

		// BARS
		gameBarTexture = PIXI.Texture.fromImage("img/game/bar.png");
		gameBar1 = new PIXI.Sprite(gameBarTexture);
		gameBar1.anchor.x = 0.5;
		gameBar1.anchor.y = 0.5;
		gameBar1.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) gameBar1.blendMode = PIXI.blendModes.MULTIPLY;
		momentGame.addChild(gameBar1);
		gameBar2 = new PIXI.Sprite(gameBarTexture);
		gameBar2.anchor.x = 0.5;
		gameBar2.anchor.y = 0.5;
		gameBar2.tint = gameColors[1];
		if (matchVizViewConfig.isWebGL) gameBar2.blendMode = PIXI.blendModes.MULTIPLY;
		momentGame.addChild(gameBar2);
		
		// CREATE SOME EXPLOSION PIECES FOR THE FINAL EXPLOSION
		for (var i = 0; i < 60; i++) {
			var gameParticle = new PIXI.Graphics();
			var randomParticleType = generateRandomNumber(0,1);
			var randomSize = generateRandomNumber(5, 10)
			switch (randomParticleType) {
				case 0:
					// TRIANGLE OUTLINE
					gameParticle.lineStyle(2, gameColors[generateRandomNumber(0, 1)], 1);
					//gameParticle.beginFill(gameColors[generateRandomNumber(0, 1)], 1);
					gameParticle.moveTo(-randomSize, -randomSize);
					gameParticle.lineTo(randomSize, -randomSize);
					gameParticle.lineTo(0, randomSize);
					gameParticle.lineTo(-randomSize, -randomSize);
					break;
				default:
					// TRIANGLE 
					gameParticle.beginFill(gameColors[generateRandomNumber(0, 1)], 1);
					gameParticle.moveTo(-randomSize, -randomSize);
					gameParticle.lineTo(randomSize, -randomSize);
					gameParticle.lineTo(0, randomSize);
					gameParticle.lineTo(-randomSize, -randomSize);
			}
			gameParticle.endFill();
			if (matchVizViewConfig.isWebGL) gameParticle.blendMode = PIXI.blendModes.MULTIPLY;
			momentGame.addChild(gameParticle);
			if (i < 30) {
				gameExplosionArray1.push(gameParticle);
			} else  {
				gameExplosionArray2.push(gameParticle);
			}
		}
		
		// FINAL BIG TRIANGLES
		for (var i = 0; i < 7; i++) {
			var gameParticleTriangle = new PIXI.Graphics();
			if (matchVizViewConfig.isWebGL) gameParticleTriangle.blendMode = PIXI.blendModes.MULTIPLY;
			momentGame.addChild(gameParticleTriangle);
			gameExplosionArray3.push(gameParticleTriangle);
		}
		
		// TEXT
		gameTitle = new PIXI.Text("GAME", { font: "125px Knockout47", fill: "#ffffff", align: "center", lineHeight: "-25px"});
		gameTitle.anchor.x = 0.5;
		gameTitle.anchor.y = 0.5;
		momentGame.addChild(gameTitle);
		
		$('#icon_game').click(function(){
			if (momentGame.visible == false) explodeGame();
			return false;
		});
		
		TweenMax.to($('#icon_game'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	}
	
	momentGame.visible = false;
}

function redrawGame() {
	var tempColorOrder = 1 + Math.floor(Math.random()*2);
	if (tempColorOrder === 1) {
		gameColors = ["0x7c17f9", "0xf28b07"];
	} else {
		gameColors = ["0xf28b07", "0x7c17f9"];
	}
	
	// CIRCLE
	gameCircle1.clear();
	gameCircle1.beginFill(gameColors[0], 1);
	gameCircle1.drawCircle(0, 0, 25);
	gameCircle1.endFill();
	
	gameCircle2.clear();
	gameCircle2.beginFill(gameColors[0], 1);
	gameCircle2.drawCircle(0, 0, 15);
	gameCircle2.endFill();

	// BARS
	gameBar1.tint = gameColors[1];
	gameBar2.tint = gameColors[1];
	
	// FINAL BIG TRIANGLES
	for (var i = 0; i < 7; i++) {
		gameExplosionArray3[i].clear();
		gameExplosionArray3[i].beginFill(gameColors[0], .5);
		gameExplosionArray3[i].moveTo(-200, -200);
		gameExplosionArray3[i].lineTo(200, -200);
		gameExplosionArray3[i].lineTo(0, 200);
		gameExplosionArray3[i].lineTo(-200, -200);
		gameExplosionArray3[i].endFill();
	}
}

function explodeGame() {
	hideMoments();
	
	redrawGame();
	
	//////////////// PARTICLE STUFF /////////////////
	var w = window.innerWidth;
	var h = 500 //window.innerHeight;

	var i = 0;
	var em;
	while ( i < gameEmitters.length ) {
		em = gameEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}

	// hAX
	passParticlesToRAF(gameParticles);

	/////////////////////////////////////////////////
	
	gameAnimationIn =  new TimelineMax({ paused: true });
	gameAnimationIn.fromTo( gameCircle1, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0},{ bezier: {values:[{ x: -50, y: -110 }, { x: 150, y: 0 }] }, scaleX: 1, scaleY: 1, alpha: .5, delay: .5, ease: Quad.easeOut });
	gameAnimationIn.to( gameCircle1, .5, { bezier: { type:"soft", values:[{ x: -50, y: -50 }, {x: -200, y: 0 }]}, ease: Quad.easeOut }, "-=.15");
	gameAnimationIn.to( gameCircle1, 1, { bezier: { type:"cubic", values:[{ x: -200, y: 0}, { x: -100, y: -175 }, { x: -75, y: -200 }, { x: 0, y: -200 }]}, ease: Circ.easeOut }, "-=.15");
	gameAnimationIn.to( gameCircle1, .5, { x: 0, y: 0, ease: Circ.easeIn });
	gameAnimationIn.to( gameCircle1, 0, { alpha: 0 });
	
	
	gameAnimationIn2 =  new TimelineMax({ paused: true });
	gameAnimationIn2.fromTo( gameCircle2, .75, { x: -600, y: -100, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0},{ bezier: {values:[{ x: -50, y: -110 }, { x: 150, y: 0 }] }, scaleX: 1, scaleY: 1, alpha: .5, delay: .55, ease: Quad.easeOut });
	gameAnimationIn2.to( gameCircle2, .5, { bezier: { type:"soft", values:[{ x: -50, y: -50 }, {x: -200, y: 0 }]}, ease: Quad.easeOut }, "-=.15");
	gameAnimationIn2.to( gameCircle2, 1, { bezier: { type:"cubic", values:[{ x: -200, y: 0}, { x: -100, y: -175 }, { x: -75, y: -200 }, { x: 0, y: -200 }]}, ease: Circ.easeOut }, "-=.15");
	gameAnimationIn2.to( gameCircle2, .5, { x: 0, y: 0, ease: Circ.easeIn });
	gameAnimationIn2.to( gameCircle2, 0, { alpha: 0 });
	
	//////////////// PARTICLE STUFF /////////////////
	gameAnimationIn.add(TweenMax.fromTo( gameParticleContainer, 1, { alpha: 0 }, { alpha: 1 }), 0);
	gameAnimationIn.add(TweenMax.fromTo( gameEm_Triangles.doc, 1.5, { scaleX: 0, scaleY: 0, alpha: 0 }, {  scaleX: 1, scaleY: 1, alpha: 1 , ease: Quart.easeOut }), 3);
	/////////////////////////////////////////////////
	
	// RECTANGLE WIPE
	for (var i = 0; i < gameAngleArray.length; i++) {
		var destinationX = window.innerWidth/2 + 400;
		gameAnimationIn.add(TweenMax.fromTo( gameAngleArray[i], (1-(i * .1)),{ x: -destinationX, y: 0, rotation: (20 * toRAD) },{ x: destinationX, y: 0, rotation: (20 * toRAD), ease: Expo.easeInOut }), 0);
	}

	// BARS
	gameAnimationIn.add(TweenMax.fromTo( gameBar1, .75,{ x: 350, y: 100, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 },{ x: 150, y: 0, scaleX: 1, scaleY: 1, rotation: .5, alpha: 1, ease: Expo.easeIn, onComplete: function() {
		TweenMax.to( gameBar1, .75,{ x: 350, y: 100, scaleX: 1, scaleY: 1, rotation: (generateRandomNumber(2, 6)), alpha: 1, ease: Cubic.easeOut });
	}}), .35);
	gameAnimationIn.add(TweenMax.fromTo( gameBar2, .75,{ x: -350, y: 100, scaleX: 1, scaleY: 1, rotation: 0, alpha: 0 },{ x: -150, y: 0, scaleX: 1, scaleY: 1, rotation: -.5, alpha: 1, ease: Expo.easeIn, onComplete: function() {
		TweenMax.to( gameBar2, .75,{ x: -350, y: 100, scaleX: 1, scaleY: 1, rotation: -(generateRandomNumber(2, 6)), alpha: 1, ease: Cubic.easeOut });
	}}), .75);
	gameAnimationIn.add(TweenMax.to( gameBar1, .75,{ x: 25, y: 0, rotation: 3.5, alpha: 1, ease: Expo.easeIn, onComplete: function() {
		TweenMax.to( gameBar1, 0,{ alpha: 0 });
	}}), 2.25);
	gameAnimationIn.add(TweenMax.to( gameBar2, .75,{ x: -25, y: 0, rotation: -3.5, alpha: 1, ease: Expo.easeIn , onComplete: function() {
		TweenMax.to( gameBar2, 0,{ alpha: 0 });
	}}), 2.25);

	// SHAKE RATTLE & ROLL
	gameAnimationIn.add(TweenMax.fromTo( momentGame, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 10, points: 50}) }), 1.15);
	gameAnimationIn.add(TweenMax.fromTo( momentGame, 0.25,{ x: 5, y: 5 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 10, points: 50}) }), 1.5);
	gameAnimationIn.add(TweenMax.fromTo( momentGame, 0.50,{ x: 10, y: 10 },{ x: 0, y: 0, ease: RoughEase.ease.config({ strength: 20, points: 50}) }), 3);
	gameAnimationIn.add(TweenMax.to( momentGame, 0,{ x: 0, y: 0 }), 0);

	// PARTICLE EXPLOSIONS
	for (var i = 0; i < gameExplosionArray1.length; i++) {
		var particles = gameExplosionArray1[i];
		var destinationX = generateRandomNumber(100, 350);
		var destinationY = generateRandomNumber(-100, 100);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomAlpha = generateRandomNumber(3, 10) * .1
		var randomScale = 1 - (generateRandomNumber(5, 10) * .05) ;
		if (i < 15) {
			gameAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: 150, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 1);
		} else if (i > 14 && i < 30) {
			destinationX = generateRandomNumber(-350, -100);
			gameAnimationIn.add(TweenMax.fromTo( particles, 1.5,{ x: -150, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 1.5);
		}
	}
	
	// LITTLE TRIANGLE EXPLOSIONS
	for (var i = 0; i < gameExplosionArray2.length; i++) {
		var particles2 = gameExplosionArray2[i];
		var destinationX = generateRandomNumber(-500, 500);
		var destinationY = generateRandomNumber(-200, 200);
		var randomRotation  = generateRandomNumber(-20, 20);
		var randomAlpha = generateRandomNumber(3, 10) * .1
		var randomScale = 1; 
		gameAnimationIn.add(TweenMax.fromTo( particles2, 1.5,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: randomScale, scaleY: randomScale, rotation: randomRotation, alpha: randomAlpha, ease: Expo.easeOut }), 3);
	}
	
	// BIG TRIANGLE EXPLOSIONS
	for (var i = 0; i < gameExplosionArray3.length; i++) {
		var particles2 = gameExplosionArray3[i];
		var destinationX = generateRandomNumber(-15, 15);
		var destinationY = 15 + generateRandomNumber(-15, 15);
		var randomAlpha = 1 
		var randomDelay = 1 + (.1 * i);
		var tempScale =  10 - (i * 2)
		if (i < 3) {
			gameAnimationIn.add(TweenMax.fromTo( particles2, randomDelay,{ scaleX: 0, scaleY: 0, rotation: 0, alpha: 1 },{ scaleX: tempScale, scaleY: tempScale, rotation: 0, alpha: 0, ease: Expo.easeOut }), 3);
		} else {
			gameAnimationIn.add(TweenMax.fromTo( particles2, randomDelay,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 0, alpha: 0 },{ x: destinationX, y: destinationY, scaleX: 1, scaleY: .75, rotation: 0, alpha: randomAlpha, ease: Elastic.easeOut }), 3);
		}
	}
	
	// FADE OUT THE LITTLE TRIANGLE EXPLOSIONS
	for (var i = 0; i < gameExplosionArray1.length; i++) {
		var particles = gameExplosionArray1[i];
		gameAnimationIn.add(TweenMax.to( particles, .5,{ alpha: 0,ease: Expo.easeInOut }), 2.75);
	}
	
	gameAnimationIn.add(TweenMax.fromTo( gameTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0 },{ x: 0, y: -25, scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut }), 3);
	
	gameAnimationIn.timeScale(1.25);
	gameAnimationIn.play();
	gameAnimationIn2.timeScale(1.25);
	gameAnimationIn2.play();
	
	momentGame.visible = true;
	
	animationTimer = setTimeout(destroyGame, 5000);
}

function destroyGame() {
	
	gameAnimationOut =  new TimelineMax({ paused: true });
	
	//////////////// PARTICLE STUFF /////////////////
	gameAnimationOut.add(TweenMax.to( gameParticleContainer, 1.0, { alpha: 0 }), 0);
	gameAnimationOut.add(TweenMax.to( gameEm_Triangles.doc, 1.0, { scaleX: 0.5, scaleY: 0.5, ease: Expo.easeInOut }), 0);
	/////////////////////////////////////////////////
	
	gameAnimationOut.add(TweenMax.to( gameTitle, 1,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	for (var i = 0; i < gameExplosionArray2.length; i++) {
		var particles = gameExplosionArray2[i];
		var duration = 1 + (i * .02);
		gameAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	for (var i = 0; i < gameExplosionArray3.length; i++) {
		var particles = gameExplosionArray3[i];
		var duration = 1 + (i * .1);
		gameAnimationOut.add(TweenMax.to( particles, duration,{ x: 0, y: 0, scaleX: 0, scaleY: 0, rotation: 3, alpha: 0, ease: Expo.easeInOut }), 0);
	}
	gameAnimationOut.timeScale(1);
	gameAnimationOut.play();
	
	animationTimer = setTimeout(hideMoments, 2000);	
}