
// UPDATES TO SOME BUGS IN PIXI
Object.defineProperty(PIXI.DisplayObject.prototype, 'scaleX', {
	get: function() {
		return  this.scale.x;
	},
	set: function(value) {
		this.scale.x = value;
	}
});

Object.defineProperty(PIXI.DisplayObject.prototype, 'scaleY', {
	get: function() {
		return  this.scale.y;
	},
	set: function(value) {
		this.scale.y = value;
	}
});

// UPDATES TO SOME BUGS IN PIXI
Object.defineProperty(PIXI.DisplayObject.prototype, 'anchorX', {
	get: function() {
		return  this.anchor.x;
	},
	set: function(value) {
		this.anchor.x = value;
	}
});

Object.defineProperty(PIXI.DisplayObject.prototype, 'anchorY', {
	get: function() {
		return  this.anchor.y;
	},
	set: function(value) {
		this.anchor.y = value;
	}
});

var momentGroup;
var momentAce;
var momentAdvantage;
var momentBreakPoint;
var momentDoubleFault;
var momentDeuce;
var momentGame;
var momentGenericPoint;
var momentHomepage;
var momentMatchPoint;
var momentSetPoint;
var animationTimer;
var toRAD = Math.PI/180;
var matchVizViewConfig = {
    isWebGL: true
	}

function initBeast(){
	momentGroup = new PIXI.DisplayObjectContainer();
	stage.addChild(momentGroup);
	drawBeast();
	WebFontConfig = {
		custom: { families: ['Knockout47'],
			urls: [ 'css/styles.css']},
		active: function() {
			createAce();
			createAdvantage();
			createBreakPoint();
			createDoubleFault();
			createDeuce();
			createGame();
			createGenericPoint();
			createHomepage();
			createMatchPoint();
			createSetPoint();
		}
	  };
	  (function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();
}

function hideMoments() {
	clearTimeout(animationTimer);
	momentAce.visible = false;
	momentAdvantage.visible = false;
	momentDoubleFault.visible = false;
	momentDeuce.visible = false;
	momentBreakPoint.visible = false;
	momentGenericPoint.visible = false;
	momentGame.visible = false;
	momentHomepage.visible = false;
	momentMatchPoint.visible = false;
	momentSetPoint.visible = false;

	if (__PE)
		__PE.reset();
}

function generateRandomNumber(min, max) {
	var random = Math.floor(Math.random() * (max - min + 1)) + min;   
	return random;
}

var __PE; // reference to active particle engine;

function drawBeast(){
	if (__PE)
		__PE.step();
}

function resizeBeast(){
	if (momentGroup){
		momentGroup.x = renderer.width/2;
		momentGroup.y = renderer.height/2;
	}
}

function passParticlesToRAF(PE) {
	__PE = PE;
}