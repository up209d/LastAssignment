
//////////////// PARTICLE STUFF /////////////////
var homepageParticles 	= new ParticleEngine(window.innerWidth/2, window.innerHeight/2);
var homepageEmitters 	= [];
var homepageParticleContainer;
var homepageEm_Plusses,
	homepageEm_CirclesOutlined,
	homepageEm_CirclesFilled,
	homepageEm_ThinShard,
	homepageEm_CirclesTiny,
	homepageEm_Triangles2,
	homepageEm_CirclesOutlined2
	
var homepageLeftWrapper,
	homepageRightWrapper,
	homepageSwarmContainer1,
	homepageSwarmContainer2,
	homepageSwarmTri,
	homepageLeftAngle1_1,
	homepageLeftAngle1_2,
	homepageLeftAngle2_1,
	homepageLeftAngle2_2,
	
	homepageRightAngle1_1,
	homepageRightAngle1_2,
	homepageRightAngle2_1,
	homepageRightAngle2_2,
	
	homepageLeft2Angle1_1,
	homepageLeft2Angle1_2,
	homepageLeft2Angle2_1,
	homepageLeft2Angle2_2,
	
	homepageRight2Angle1_1,
	homepageRight2Angle1_2,
	homepageRight2Angle2_1,
	homepageRight2Angle2_2
	
var isHomepageActive = false;

var simplexNoise = new SimplexNoise();
var noiseTime = 0;
	
/////////////////////////////////////////////////

function createHomepage() {
	momentHomepage = new PIXI.DisplayObjectContainer();
	momentGroup.addChild(momentHomepage);
	
	var assetsToLoader = [
		"img/homepage/angle-white.png",
		"img/homepage/shard3-white.png",
		"img/homepage/glow.png",
		"img/homepage/triangle2-white.png",
		"img/homepage/logo.png"
		];
	var loader = new PIXI.AssetLoader(assetsToLoader);
	loader.onComplete = onAssetsLoaded;
	loader.load();

	function onAssetsLoaded() {

		initCurves();
			
		//////////////// PARTICLE STUFF /////////////////
		homepageParticleContainer = new PIXI.DisplayObjectContainer();
		momentHomepage.addChild(homepageParticleContainer);
			
		homepageEm_CirclesOutlined = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	CircleOutlinedParticle, 
				size 		: 	20,
				life		: 	800.0,
				spin		: 	[0, 0],
				speed		: 	[0.01, 0.05],
				scale		: 	[.25,1],
				colors		: 	[0xffffff,0xffffff],
				fade		: 	0,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		homepageEm_CirclesFilled = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	CircleFilledParticle, 
				size 		: 	8,
				life		: 	800.0,
				spin		: 	[0, 0],
				speed		: 	[0.01, .05],
				scale		: 	[0.1,1],
				colors		: 	[0xffffff,0xffffff],
				fade		: 	0,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
	
		homepageEm_Triangles = new Emitter({
				type		:	"chaos",
				count		:	50,
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	8,
				numSides	:	3,
				life		: 	1000.0,
				spin		: 	[-0.01, 0.05],
				speed		: 	[0.01, 0.05],
				scale		: 	[0.25, 1],
				colors		: 	[0xffffff, 0xffffff],
				fade		: 	0,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
	
		homepageEm_ThinShards = new Emitter({
				type		:	"linear",
				count		:	10,
				angle		:	-45 
			},
			{ 	type 		:	SimpleParticle, 
				image		:	"img/homepage/shard3-white.png", 
				life		: 	1000.0,
				spin		: 	[0,0],
				speed		: 	[0.1, 0.2],
				scale		: 	[0.5, 1],
				colors		: 	[0xffffff, 0xffffff],
				fade		: 	0,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		homepageEm_CirclesTiny = new Emitter({
				type		:	"chaos",
				count		:	25,
			},
			{ 	type 		:	CircleFilledParticle, 
				size 		: 	4,
				life		: 	800.0,
				spin		: 	[0, 0],
				speed		: 	[0.1, .3],
				scale		: 	[0.25,1],
				colors		: 	[0x3ab6de,0xa8028c],
				fade		: 	.1,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		
	
		homepageEm_Triangles2 = new Emitter({
				type		:	"chaos",
				count		:	10,
			},
			{ 	type 		:	PolygonParticle,
				size 		: 	8,
				numSides	:	3,
				life		: 	1000.0,
				spin		: 	[0.05, 0.05],
				speed		: 	[0.15, 0.25],
				scale		: 	[0.25, 1],
				colors		: 	[0x6c1ee6, 0xeca31c, 0x53d497],
				fade		: 	0,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
			
		homepageEm_CirclesOutlined2 = new Emitter({
				type		:	"chaos",
				count		:	10,
			},
			{ 	type 		:	CircleOutlinedParticle, 
				size 		: 	20,
				life		: 	800.0,
				spin		: 	[0, 0],
				speed		: 	[0.25, 0.5],
				scale		: 	[.25,1],
				colors		: 	[0x832273,0x832273],
				fade		: 	0.4,
				blendMode 	:	PIXI.blendModes.NORMAL
			}
		);
		
		homepageEmitters.push(homepageEm_CirclesOutlined);
		homepageEmitters.push(homepageEm_CirclesFilled);
		homepageEmitters.push(homepageEm_Triangles);
		homepageEmitters.push(homepageEm_ThinShards);
		homepageEmitters.push(homepageEm_CirclesTiny);
		homepageEmitters.push(homepageEm_Triangles2);
		homepageEmitters.push(homepageEm_CirclesOutlined2);
	
		homepageParticles.addEmitters(homepageEmitters);
	
		homepageParticleContainer.addChild(homepageEm_CirclesOutlined.doc);
		homepageParticleContainer.addChild(homepageEm_CirclesFilled.doc);
		homepageParticleContainer.addChild(homepageEm_Triangles.doc);
		homepageParticleContainer.addChild(homepageEm_ThinShards.doc);
		homepageParticleContainer.addChild(homepageEm_CirclesTiny.doc);
		homepageParticleContainer.addChild(homepageEm_Triangles2.doc);
		homepageParticleContainer.addChild(homepageEm_CirclesOutlined2.doc);
		/////////////////////////////////////////////////
			
		// CENTERED GLOW
		homepageTextureGlow = PIXI.Texture.fromImage("img/homepage/glow.png");
		homepageGlow = new PIXI.Sprite(homepageTextureGlow);
		homepageGlow.anchor.x = 0.5;
		homepageGlow.anchor.y = 0.5;
		homepageGlow.alpha = 0.75;
		momentHomepage.addChild(homepageGlow);
		
		// SWARMING ARROWS
		homepageSwarmContainer1 = new PIXI.DisplayObjectContainer();
		homepageSwarmContainer2 = new PIXI.DisplayObjectContainer();
		homepageSwarmArray = [];
		
		var homepageTextureTriangle = PIXI.Texture.fromImage("img/homepage/triangle2-white.png");
		for (var i = 0; i < 10; i++) {
			homepageSwarmTri = new PIXI.Sprite(homepageTextureTriangle);
			homepageSwarmTri.anchor.x = 0.5;
			homepageSwarmTri.anchor.y = 0.5;
			homepageSwarmTri.tint = 0x6e1ce8;
			homepageSwarmArray.push(homepageSwarmTri);
			if (i < 5) {
				homepageSwarmContainer1.addChild(homepageSwarmTri);
			} else {
				homepageSwarmContainer2.addChild(homepageSwarmTri);
			}
		}
		momentHomepage.addChild(homepageSwarmContainer1);
		momentHomepage.addChild(homepageSwarmContainer2);
		
	
		// BEGIN MOVING ANGLES
		// LEFT ANGLES
		homepageTextureAngle = PIXI.Texture.fromImage("img/homepage/angle-white.png");
		
		homepageLeftWrapper = new PIXI.DisplayObjectContainer();
			homepageLeftInner = new PIXI.DisplayObjectContainer();
				homepageLeftGroup1 = new PIXI.DisplayObjectContainer();
			
					// RED ANGLE 1
					homepageLeftAngle1_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeftAngle1_1.anchor.x = 0;
					homepageLeftAngle1_1.anchor.y = 1;
					homepageLeftAngle1_1.position.x = -250;
					homepageLeftAngle1_1.position.y = -500;
					homepageLeftAngle1_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeftGroup1.addChild(homepageLeftAngle1_1);
					
					// RED ANGLE 2
					homepageLeftAngle1_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeftAngle1_2.anchor.x = 0;
					homepageLeftAngle1_2.anchor.y = 1;
					homepageLeftAngle1_2.position.x = -300;
					homepageLeftAngle1_2.position.y = -525;
					homepageLeftAngle1_2.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeftGroup1.addChild(homepageLeftAngle1_2);
				homepageLeftInner.addChild(homepageLeftGroup1);
					
				homepageLeftGroup2 = new PIXI.DisplayObjectContainer();
					// BLUE ANGLE 1
					homepageLeftAngle2_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeftAngle2_1.anchor.x = 0;
					homepageLeftAngle2_1.anchor.y = 1;
					homepageLeftAngle2_1.position.x = 0;
					homepageLeftAngle2_1.position.y = 100;
					homepageLeftAngle2_1.alpha = .5;
					homepageLeftAngle2_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeftGroup2.addChild(homepageLeftAngle2_1);
					
					// BLUE ANGLE 2
					homepageLeftAngle2_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeftAngle2_2.anchor.x = 0;
					homepageLeftAngle2_2.anchor.y = 1;
					homepageLeftAngle2_2.position.x = -150;
					homepageLeftAngle2_2.position.y = 100;
					homepageLeftAngle2_2.alpha = .5;
					homepageLeftAngle2_2.blendMode = PIXI.blendModes.MULTIPLY;
				homepageLeftGroup2.addChild(homepageLeftAngle2_2);
					
				homepageLeftInner.addChild(homepageLeftGroup2);
			homepageLeftWrapper.addChild(homepageLeftInner);
		momentHomepage.addChild(homepageLeftWrapper);
					
		
		// RIGHT ANGLES
		homepageRightWrapper = new PIXI.DisplayObjectContainer();
			homepageRightInner = new PIXI.DisplayObjectContainer();
				homepageRightGroup1 = new PIXI.DisplayObjectContainer();
			
					// RED ANGLE 1
					homepageRightAngle1_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageRightAngle1_1.anchor.x = 0;
					homepageRightAngle1_1.anchor.y = 1;
					homepageRightAngle1_1.position.x = -250;
					homepageRightAngle1_1.position.y = -500;
					homepageRightAngle1_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRightGroup1.addChild(homepageRightAngle1_1);
					
					// RED ANGLE 2
					homepageRightAngle1_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageRightAngle1_2.anchor.x = 0;
					homepageRightAngle1_2.anchor.y = 1;
					homepageRightAngle1_2.position.x = -300;
					homepageRightAngle1_2.position.y = -525;
					homepageRightAngle1_2.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRightGroup1.addChild(homepageRightAngle1_2);
				homepageRightInner.addChild(homepageRightGroup1);
					
				homepageRightGroup2 = new PIXI.DisplayObjectContainer();
					// BLUE ANGLE 1
					homepageRightAngle2_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageRightAngle2_1.anchor.x = 0;
					homepageRightAngle2_1.anchor.y = 1;
					homepageRightAngle2_1.position.x = 0;
					homepageRightAngle2_1.position.y = 100;
					homepageRightAngle2_1.alpha = .5;
					homepageRightAngle2_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRightGroup2.addChild(homepageRightAngle2_1);
					
					// BLUE ANGLE 2
					homepageRightAngle2_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageRightAngle2_2.anchor.x = 0;
					homepageRightAngle2_2.anchor.y = 1;
					homepageRightAngle2_2.position.x = -150;
					homepageRightAngle2_2.position.y = 100;
					homepageRightAngle2_2.alpha = .5;
					homepageRightAngle2_2.blendMode = PIXI.blendModes.MULTIPLY;
				homepageRightGroup2.addChild(homepageRightAngle2_2);
					
				homepageRightInner.addChild(homepageRightGroup2);
			homepageRightWrapper.addChild(homepageRightInner);
		momentHomepage.addChild(homepageRightWrapper);
					
		
		// LEFT ANGLES V2
		homepageLeft2Wrapper = new PIXI.DisplayObjectContainer();
			homepageLeft2Inner = new PIXI.DisplayObjectContainer();
				homepageLeft2Group1 = new PIXI.DisplayObjectContainer();
			
					// RED ANGLE 1
					homepageLeft2Angle1_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeft2Angle1_1.anchor.x = 0;
					homepageLeft2Angle1_1.anchor.y = 1;
					homepageLeft2Angle1_1.position.x = -250;
					homepageLeft2Angle1_1.position.y = -500;
					homepageLeft2Angle1_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeft2Group1.addChild(homepageLeft2Angle1_1);
					
					// RED ANGLE 2
					homepageLeft2Angle1_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeft2Angle1_2.anchor.x = 0;
					homepageLeft2Angle1_2.anchor.y = 1;
					homepageLeft2Angle1_2.position.x = -300;
					homepageLeft2Angle1_2.position.y = -525;
					homepageLeft2Angle1_2.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeft2Group1.addChild(homepageLeft2Angle1_2);
				homepageLeft2Inner.addChild(homepageLeft2Group1);
					
				homepageLeft2Group2 = new PIXI.DisplayObjectContainer();
					// BLUE ANGLE 1
					homepageLeft2Angle2_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeft2Angle2_1.anchor.x = 0;
					homepageLeft2Angle2_1.anchor.y = 1;
					homepageLeft2Angle2_1.position.x = 0;
					homepageLeft2Angle2_1.position.y = 100;
					homepageLeft2Angle2_1.alpha = .5;
					homepageLeft2Angle2_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageLeft2Group2.addChild(homepageLeft2Angle2_1);
					
					// BLUE ANGLE 2
					homepageLeft2Angle2_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageLeft2Angle2_2.anchor.x = 0;
					homepageLeft2Angle2_2.anchor.y = 1;
					homepageLeft2Angle2_2.position.x = -150;
					homepageLeft2Angle2_2.position.y = 100;
					homepageLeft2Angle2_2.alpha = .5;
					homepageLeft2Angle2_2.blendMode = PIXI.blendModes.MULTIPLY;
				homepageLeft2Group2.addChild(homepageLeft2Angle2_2);
					
				homepageLeft2Inner.addChild(homepageLeft2Group2);
			homepageLeft2Wrapper.addChild(homepageLeft2Inner);
		momentHomepage.addChild(homepageLeft2Wrapper);
					
		
		// RIGHT ANGLES
		homepageRight2Wrapper = new PIXI.DisplayObjectContainer();
			homepageRight2Inner = new PIXI.DisplayObjectContainer();
				homepageRight2Group1 = new PIXI.DisplayObjectContainer();
					
					// RED ANGLE 1
					homepageRight2Angle1_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageRight2Angle1_1.anchor.x = 0;
					homepageRight2Angle1_1.anchor.y = 1;
					homepageRight2Angle1_1.position.x = -250;
					homepageRight2Angle1_1.position.y = -500;
					homepageRight2Angle1_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRight2Group1.addChild(homepageRight2Angle1_1);
					
					// RED ANGLE 2
					homepageRight2Angle1_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageRight2Angle1_2.anchor.x = 0;
					homepageRight2Angle1_2.anchor.y = 1;
					homepageRight2Angle1_2.position.x = -300;
					homepageRight2Angle1_2.position.y = -525;
					homepageRight2Angle1_2.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRight2Group1.addChild(homepageRight2Angle1_2);
				homepageRight2Inner.addChild(homepageRight2Group1);
					
				homepageRight2Group2 = new PIXI.DisplayObjectContainer();
					// BLUE ANGLE 1
					homepageRight2Angle2_1 = new PIXI.Sprite(homepageTextureAngle);
					homepageRight2Angle2_1.anchor.x = 0;
					homepageRight2Angle2_1.anchor.y = 1;
					homepageRight2Angle2_1.position.x = 0;
					homepageRight2Angle2_1.position.y = 100;
					homepageRight2Angle2_1.alpha = .5;
					homepageRight2Angle2_1.blendMode = PIXI.blendModes.MULTIPLY;
					homepageRight2Group2.addChild(homepageRight2Angle2_1);
					
					// BLUE ANGLE 2
					homepageRight2Angle2_2 = new PIXI.Sprite(homepageTextureAngle);
					homepageRight2Angle2_2.anchor.x = 0;
					homepageRight2Angle2_2.anchor.y = 1;
					homepageRight2Angle2_2.position.x = -150;
					homepageRight2Angle2_2.position.y = 100;
					homepageRight2Angle2_2.alpha = .5;
					homepageRight2Angle2_2.blendMode = PIXI.blendModes.MULTIPLY;
				homepageRight2Group2.addChild(homepageRight2Angle2_2);
					
				homepageRight2Inner.addChild(homepageRight2Group2);
			homepageRight2Wrapper.addChild(homepageRight2Inner);
		momentHomepage.addChild(homepageRight2Wrapper);
		
		// LOGO
		homepageTextureLogo = PIXI.Texture.fromImage("img/homepage/logo.png");
		homepageLogo = new PIXI.Sprite(homepageTextureLogo);
		homepageLogo.anchor.x = 0.5;
		homepageLogo.anchor.y = 0.5;
		homepageLogo.alpha = 0.75;
		momentHomepage.addChild(homepageLogo);
		
		
		$('#icon_homepage').click(function(){
			if (momentHomepage.visible == false) explodeHomepage();
			return false;
		});
		
		TweenMax.to($('#icon_homepage'), 1, {css:{ display: 'inline-block', autoAlpha: 1}, delay: 0});
	
	}
	
	momentHomepage.visible = false;
}

function redrawHomepage() {
	homepageSwarmTri.tint = 0x6e1ce8;
	
	homepageLeftAngle1_1.tint = 0xd9182d;
	homepageLeftAngle1_2.tint = 0xd9182d;
	homepageLeftAngle2_1.tint = 0x00b2ef;
	homepageLeftAngle2_2.tint = 0x00b2ef;
	
	homepageRightAngle1_1.tint = 0xd9182d;
	homepageRightAngle1_2.tint = 0xd9182d;
	homepageRightAngle2_1.tint = 0x00b2ef;
	homepageRightAngle2_2.tint = 0x00b2ef;
	
	homepageLeft2Angle1_1.tint = 0xd9182d;
	homepageLeft2Angle1_2.tint = 0xd9182d;
	homepageLeft2Angle2_1.tint = 0x00b2ef;
	homepageLeft2Angle2_2.tint = 0x00b2ef;
	
	homepageRight2Angle1_1.tint = 0xd9182d;
	homepageRight2Angle1_2.tint = 0xd9182d;
	homepageRight2Angle2_1.tint = 0x00b2ef;
	homepageRight2Angle2_2.tint = 0x00b2ef;
}

function explodeHomepage() {
	isHomepageActive = true;
	
	hideMoments();
	
	redrawHomepage();
	
	// KILL THE TWEENS
	TweenMax.killTweensOf(homepageLeftInner);
	TweenMax.killTweensOf(homepageRightInner);
	TweenMax.killTweensOf(homepageLeft2Inner);
	TweenMax.killTweensOf(homepageRight2Inner);
	for (var i = 0; i < homepageSwarmArray.length; i++) {
		var triangle = homepageSwarmArray[i];
		TweenMax.killTweensOf(triangle);
	}
	
	//////////////// PARTICLE STUFF /////////////////
	
	var w = window.innerWidth/2;
	var h = window.innerHeight/2;

	var i = 0;
	var em;
	while ( i < homepageEmitters.length ) {
		em = homepageEmitters[i++];
		em.w = w;
		em.h = h;
		em.reset();
	}
	
	passParticlesToRAF(homepageParticles);

	/////////////////////////////////////////////////
	var homepageSwarmAnimation1 =  new TimelineMax({ paused: true, repeat: 2, onRepeat: function() {
		var tempColor = homepageSwarmArray[0].tint;
		if (tempColor == 16627731 ) {
			tempColor = 0x6e1ce8;
		} else  {
			tempColor = 0xfdb813
		}
		for (var i = 0; i < homepageSwarmArray.length; i++) {
			var triangle = homepageSwarmArray[i];
			triangle.tint = tempColor;
		}
	}});
	for (var i = 0; i < homepageSwarmArray.length; i++) {
		var triangle = homepageSwarmArray[i],
			tempX = 0,
			tempY = 0,
			tempScale = .5,
			tempDelay  = (i * .05),
			tempAlpha  =  1 - (i * .15),
			tempAnchorX = 0.5,
			tempAnchorY = 0.5
			
			switch (i) {
				case 0:
				case 5:
					tempAnchorX = 0.5;
					tempAnchorY = 0.5;
					break;
				case 1:
				case 6:
					tempAnchorX = 1.1;
					tempAnchorY = 1.7;
					tempScale = .35;
					break;
				case 2:
				case 7:
					tempAnchorX = 0.1;
					tempAnchorY = 1.7;
					tempScale = .4;
					break;
				case 3:
				case 8:
					tempAnchorX = 1.25;
					tempAnchorY = 2.25;
					break;
				case 4:
				case 9:
					tempAnchorX = -0.25;
					tempAnchorY = 2.25;
					break; 
				default:
					break;
			}
		if (i < 5) {
		} else {
			//tempX = 0;
			tempDelay  = ((i-5) * .05) + .25;
			tempAlpha  =  1 - ((i-5) * .15);
		}
		homepageSwarmAnimation1.add(TweenMax.fromTo( triangle, 2,{ x: tempX, y: tempY, scaleX: 0, scaleY: 0, alpha: 0 },{ x: tempX, y: tempY, scaleX: tempScale, scaleY: tempScale, delay: tempDelay, alpha: tempAlpha, ease: Expo.easeInOut }), 0);	
		homepageSwarmAnimation1.add(TweenMax.fromTo( triangle, 2,{ anchorX: 0, anchorY: 0, rotation: -5 },{ anchorX: tempAnchorX, anchorY: tempAnchorY, rotation: 0, delay: tempDelay, ease: Elastic.easeInOut }), 0);
		homepageSwarmAnimation1.add(TweenMax.to( triangle, 1,{ y: 400, scaleX: (tempScale * .85), scaleY: (tempScale * .85), delay: tempDelay, ease: Expo.easeInOut }), 1.5);
		homepageSwarmAnimation1.add(TweenMax.to( triangle, .75,{ scaleX: 0, scaleY: 0, anchorX: 0, anchorY: 0, rotation: 10, alpha: 0, delay: tempDelay, ease: Expo.easeIn }), 2.25);
		homepageSwarmAnimation1.add(TweenMax.to( triangle, .1,{ alpha: 0 }), 4.9);
	}
		
	// X MOVEMENT
	var homepageLeftAnimX =  new TimelineMax({ paused: true, repeat: 2 });
		homepageLeftAnimX.add(TweenMax.fromTo( homepageLeftInner, 2, { x: 0, },{ x: -50, ease: Quad.easeInOut }), 0);
		homepageLeftAnimX.add(TweenMax.to( homepageLeftInner, 2, { x: 0, ease: Quad.easeInOut }), 2);
		
		homepageLeftAnimX.add(TweenMax.fromTo( homepageLeft2Inner, 2, { x: 0, },{ x: -50, ease: Quad.easeInOut }), 0);
		homepageLeftAnimX.add(TweenMax.to( homepageLeft2Inner, 2, { x: 0, ease: Quad.easeInOut }), 2);
		
	var homepageRightAnimX =  new TimelineMax({ paused: true, repeat: 2 });
		homepageRightAnimX.add(TweenMax.fromTo( homepageRightInner, 2, { x: 0, },{ x: -50, ease: Quad.easeInOut }), 0);
		homepageRightAnimX.add(TweenMax.to( homepageRightInner, 2, { x: 0, ease: Quad.easeInOut }), 2);
		
		homepageRightAnimX.add(TweenMax.fromTo( homepageRight2Inner, 2, { x: 0, },{ x: -50, ease: Quad.easeInOut }), 0);
		homepageRightAnimX.add(TweenMax.to( homepageRight2Inner, 2, { x: 0, ease: Quad.easeInOut }), 2);
	
	// Y MOVEMENT
	var homepageLeftAnimY =  new TimelineMax({ paused: true, repeat: 1 });
		homepageLeftAnimY.add(TweenMax.fromTo( homepageLeftInner, 2, { y: 200, },{ y: 100, ease: Expo.easeInOut }), 1.5);
		homepageLeftAnimY.add(TweenMax.to( homepageLeftInner, 2, { y: 200, ease: Expo.easeInOut }), 5);
	
	var homepageRightAnimY =  new TimelineMax({ paused: true, repeat: 1 });
		homepageRightAnimY.add(TweenMax.fromTo( homepageRightInner, 2, { y: 200, },{ y: 100, ease: Expo.easeInOut }), 1.5);
		homepageRightAnimY.add(TweenMax.to( homepageRightInner, 2, { y: 200, ease: Expo.easeInOut }), 5);
	
	// HIDDEN STUFF
	var homepageLeftAnimY2 =  new TimelineMax({ paused: true, repeat: 1 });
		homepageLeftAnimY2.add(TweenMax.fromTo( homepageLeft2Inner, 2, { y: 200, alpha: 0 },{ y: 200, alpha: 1, ease: Expo.easeInOut }), 1.5);
		homepageLeftAnimY2.add(TweenMax.to( homepageLeft2Inner, 2, { alpha: 0, ease: Expo.easeInOut }), 5);
		
	var homepageRightAnimY2 =  new TimelineMax({ paused: true, repeat: 1 });
		homepageRightAnimY2.add(TweenMax.fromTo( homepageRight2Inner, 2, { y: 200, alpha: 0 },{ y: 200, alpha: 1, ease: Expo.easeInOut }), 1.5);
		homepageRightAnimY2.add(TweenMax.to( homepageRight2Inner, 2, { alpha: 0, ease: Expo.easeInOut }), 5);

	homepageLeftAnimX.timeScale(1.5);
	homepageRightAnimX.timeScale(1.5);
	homepageLeftAnimY.timeScale(1.5);
	homepageRightAnimY.timeScale(1.5);
	homepageLeftAnimY2.timeScale(1.5);
	homepageRightAnimY2.timeScale(1.5);
	
	homepageSwarmAnimation1.time(0);
	homepageLeftAnimX.time(0);
	homepageRightAnimX.time(0);
	homepageLeftAnimY.time(0);
	homepageRightAnimY.time(0);
	homepageLeftAnimY2.time(0);
	homepageRightAnimY2.time(0);
	
	homepageSwarmAnimation1.play();
	homepageLeftAnimX.play();
	homepageRightAnimX.play();
	homepageLeftAnimY.play();
	homepageRightAnimY.play();
	homepageLeftAnimY2.play();
	homepageRightAnimY2.play();
	
	// FADE EVERYTHING IN
	TweenMax.fromTo (homepageLogo, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (homepageLeftWrapper, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (homepageRightWrapper, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (homepageLeft2Wrapper, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (homepageRight2Wrapper, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (curveGroup, 2, { alpha: 0 }, { alpha: 1 });
	TweenMax.fromTo (homepageParticleContainer, 2, { alpha: 0 }, { alpha: 1 });
	
	// START ANIMATING THINGS
	resizeHomepage();
	momentHomepage.visible = true;
	
	animationTimer = setTimeout(destroyHomepage, 8000);
}

function destroyHomepage() {
	TweenMax.to ( homepageLeftWrapper, 2, { alpha: 0 });
	TweenMax.to ( homepageRightWrapper, 2, { alpha: 0 });
	TweenMax.to ( homepageLeft2Wrapper, 2, { alpha: 0 });
	TweenMax.to ( homepageRight2Wrapper, 2, { alpha: 0 });
	TweenMax.to ( curveGroup, 2, { alpha: 0 });
	TweenMax.to ( homepageLogo, 2, { alpha: 0 });
	TweenMax.to ( homepageParticleContainer, 2, { alpha: 0,  onComplete: function () {
		isHomepageActive = false;
	}});
	
	animationTimer = setTimeout(hideMoments, 2000);
}

function resizeHomepage(){
	resizeCurves();
	
	var posX = renderer.width/2;
	var posY = renderer.height/2;
	var scaleRatio = Math.max((window.innerWidth/1920), (window.innerHeight/1000));
	var triPosX =  350 * scaleRatio;
	var triPosY = 200 * scaleRatio;
	// DON'T LET IT GET TOO CLOSE TO THE LOGO
	if (triPosX < 350) {
		triPosX = 350;
	}
	var triScale = scaleRatio + .5;
	
	// POSITION THE MOVING ARROWS
	TweenMax.set (homepageSwarmContainer1, { x: -triPosX, y: triPosY, scaleX: triScale, scaleY: triScale, rotation: (-210 * toRAD) });
	TweenMax.set (homepageSwarmContainer2, { x: triPosX, y: -triPosY, scaleX: triScale, scaleY: triScale, rotation: (-30 * toRAD) });

	// POSITION THE SIDE ANGLES
	homepageLeftWrapper.position.x = -posX;
	homepageLeftWrapper.position.y = posY;
	TweenMax.set (homepageLeftWrapper, { scaleX: scaleRatio, scaleY: scaleRatio });
	
	homepageLeft2Wrapper.position.x = -posX;
	homepageLeft2Wrapper.position.y = posY;
	TweenMax.set (homepageLeft2Wrapper, { scaleX: scaleRatio, scaleY: scaleRatio });
	
	homepageRightWrapper.position.x = posX;
	homepageRightWrapper.position.y = -posY;
	TweenMax.set (homepageRightWrapper, { scaleX: scaleRatio, scaleY: scaleRatio, rotation: (180 * toRAD) });
	
	homepageRight2Wrapper.position.x = posX;
	homepageRight2Wrapper.position.y = -posY;
	TweenMax.set (homepageRight2Wrapper, { scaleX: scaleRatio, scaleY: scaleRatio, rotation: (180 * toRAD) });
}




ATUtil = {
	randomRange : function(min, max) {
		return min + Math.random() * (max - min);
	},
	randomInt : function(min,max){
		return Math.floor(min + Math.random() * (max - min + 1));
	},
	map : function(value, min1, max1, min2, max2) {
		return ATUtil.lerp(ATUtil.norm(value, min1, max1), min2, max2);
	},
	lerp : function(value, min, max){
		return min + (max -min) * value;
	},
	norm : function(value , min, max){
		return (value - min) / (max - min);
	},
	shuffle : function(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},
	clamp : function(value, min, max) {
		return Math.max(Math.min(value, max), min);
	}
};

//curves
var CURVE_COUNT = 3;
var SEGMENT_COUNT = 6;
var curves = [];
var curvePts = []; //2D array: number of curves x number of segments
var xstep
var curveOpacity = 0;
var curveGroup;


function initCurves(){
	//init curves
	curveGroup = new PIXI.DisplayObjectContainer();
	momentHomepage.addChild(curveGroup);
	
	xstep = (renderer.width)/SEGMENT_COUNT;
	for (var i = 0; i < CURVE_COUNT; i++) {
		var curve = new PIXI.Graphics();
		curveGroup.addChild(curve);
		//curve.blendMode = PIXI.blendModes.MULTIPLY;
		curves.push(curve);

		//create random curve points
		var thisCurvePts = [];
		curvePts.push(thisCurvePts)
		
		var xpos = -(renderer.width )/2;			
		for (var j = 0; j <= SEGMENT_COUNT; j++) {
			var pt = getRandomPt(xpos);
			thisCurvePts.push(pt);
			xpos += xstep;
		}
	}

	drawCurves();
}

function resizeCurves(){
	//resize curves
	if (curveGroup){
		xstep = (renderer.width )/SEGMENT_COUNT;
		for (var i = 0; i < CURVE_COUNT; i++) {
			var thisCurvePts = curvePts[i];
			var xpos = -(renderer.width )/2;			
			for (var j = 0; j <= SEGMENT_COUNT; j++) {
				thisCurvePts[j].x = xpos;
				xpos += xstep;
			}
		}
	}
}


//every frame - update curve points and redraw curves
function drawCurves(){

	for (var i = 0; i < CURVE_COUNT; i++) {

		var curve = curves[i];
		var thisCurvePts = curvePts[i];
		
		for (var j = 0; j <= SEGMENT_COUNT; j ++) {
			thisCurvePts[j].y = simplexNoise.noise(noiseTime + j/8, i/8) *  200;
		}

		curve.clear();
		
		//DO FILL?
		if (curveOpacity > 0){
			curve.beginFill(COLORS[i],curveOpacity);	
		}else{
			//curve.lineStyle(10, COLORS[i],.8);
			curve.lineStyle(1, 0xcccccc,1);
		}
		
		// move to the first point			
		curve.moveTo(thisCurvePts[0].x, thisCurvePts[0].y);

		//draw through mid points
		for (var j = 1; j <= SEGMENT_COUNT - 2; j ++)
		{
			var xc = (thisCurvePts[j].x + thisCurvePts[j + 1].x) / 2;
			var yc = (thisCurvePts[j].y + thisCurvePts[j + 1].y) / 2;
			curve.quadraticCurveTo(thisCurvePts[j].x, thisCurvePts[j].y, xc, yc);
		}
		// curve through the last two points
		curve.quadraticCurveTo(thisCurvePts[j].x, thisCurvePts[j].y, thisCurvePts[j+1].x,thisCurvePts[j+1].y);

		//FILL
		if (curveOpacity > 0){
			curve.lineTo(thisCurvePts[j+1].x, 300);
			curve.lineTo(thisCurvePts[0].x, 300);
			curve.lineTo(thisCurvePts[0].x, thisCurvePts[0].y)
			curve.endFill();
		}

	};

}

function getRandomPt(xpos){
	var yRange = renderer.height/2;
	return new PIXI.Point(xpos,ATUtil.randomRange(-yRange,yRange));
}