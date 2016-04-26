function ParticleEngine(w,h) {
	var _emitters		= [];
	var _numEmitters	= 0;
	var _w 				= w / 2;
	var _h 				= h / 2;

	this.addEmitter = function(emitter) {
		_emitters.push(emitter);
		_numEmitters++;
	};

	this.addEmitters = function(emitters, replace) {
		if (replace === true) {
			this.clearEmitters();
			_emitters = emitters;
		}
		else _emitters = _emitters.concat(emitters);

		_numEmitters = _emitters.length;
	}

	this.removeEmitter = function (emitter) {
		var i = _emitters.indexOf(emitter);

		if (i >= 0) {
			_emitters.splice(i, 1);
		 	_numEmitters = _emitters.length;
		 }
	};

	this.removeEmitters = function (emitters) {
		var i = 0, len = emitters.length;
		while ( i < len) {
			this.removeEmitter(emitters[i++]);
		}
	}

	this.reset = function() {
		var i = 0; while ( i < _numEmitters) _emitters[i++].reset();
	}

	this.step = function() {
		var i = 0; while ( i < _numEmitters) _emitters[i++].emit();
	}
}


function Emitter(emitterOptions, pDef) {
	this.doc = new PIXI.DisplayObjectContainer();

	emitterOptions.type = emitterOptions.type || 'point';

	var _pool = emitterOptions.pool || [];

	var _regenParticle = function(p) {
		var x,y,a,dy,dx,sx,sy,s;//1 / Math.tan(Math.PI * -90/ 180)
		

		switch (emitterOptions.type) {
			case "chaos"		: 	a  = Math.random() * 360;

									dy = Math.sin(Math.PI * a / 180)
									dx = Math.cos(Math.PI * a / 180);
									s  = ((Math.random() * (pDef.speed[1] - pDef.speed[0])) + pDef.speed[0]);;
									x  = Math.random() * this.w * 2 - this.w;
									y  = Math.random() * this.h * 2 - this.h;
									break;

			case "explosion" 	: 	// same as a point, but it doesn't regenerate
			case "point" 		:   a  = Math.random() * 360;

									dy = Math.sin(Math.PI * a / 180)
									dx = Math.cos(Math.PI * a / 180);

									s  = ((Math.random() * (pDef.speed[1] - pDef.speed[0])) + pDef.speed[0]);;
									x  = 0
									y  = 0
									break;

			case "linear" 		: 	dy = Math.sin(Math.PI * (emitterOptions.angle || 0) / 180);
									dx = Math.cos(Math.PI * (emitterOptions.angle || 0) / 180);
									x  = Math.random() * this.w * 2 - this.w;
									y  = Math.random() * this.h * 2 - this.h;
									break;
		}

		p.directionX 	= dx;
		p.directionY 	= dy;

		p.speed 		= Math.random() * (pDef.speed[1] - pDef.speed[0]) + pDef.speed[0];
		p.spin 			= Math.random() * (pDef.spin[1] - pDef.spin[0]) + pDef.spin[0] //* Math.PI / 180
		p.scaleEnd		= (pDef.scaleEnd != undefined) ? Math.random() * (pDef.scaleEnd[1] - pDef.scaleEnd[0]) + pDef.scaleEnd[0] : pDef.scale;
		p.age 			= Math.floor(Math.random() * pDef.life);


		var d = p.doc, s = p.sprite;

		d.x = x;
		d.y = y;

		d.alpha 	= 0;
		d.scaleX 	= 
		d.scaleY 	= (Math.random() * (pDef.scale[1] - pDef.scale[0])) + pDef.scale[0];

		p.scaleStep = d.scaleX - p.scaleEnd;

		if (pDef.colors)
			p.setTint(pDef.colors[Math.floor(Math.random() * pDef.colors.length)]);


		if (pDef.fade) {
			var timeLeft 	= pDef.life - p.age;
			var timeFade 	= pDef.fade * timeLeft;
			var steps 		= (timeLeft / p.speed) * pDef.fade

			p.fadeIn  	= p.age + timeFade;
			p.fadeOut 	= pDef.life - timeFade;
			p.fadeSpeed = 1.0 / steps;

			d.alpha = 0;
		}
		else d.alpha = 1.0
	}

	var _init = function() {
		var i = 0;
		var p;

		if (emitterOptions.pool) {
			_pool = emitterOptions.pool;
			emitterOptions.count = emitterOptions.pool.length;
		}
		else {
			while ( i < emitterOptions.count) {
				p = new pDef.type(pDef)
				this.doc.addChild (p.doc)

				_regenParticle.call(this, p);

				_pool.push(p);
				i++;
		}
		}
	}

	this.reset = function() {
		var i = 0;
		while ( i < emitterOptions.count) {
			_regenParticle.call(this, _pool[i++]);
		}
	}

	// update parameters for all particles
	this.emit = function() {
		var i = 0;
		var p;
		var c, d;

		while ( i < emitterOptions.count) {
			p = _pool[i];
			d = p.doc;

			d.rotation 	+= p.spin 
			d.x 		+= p.speed * p.directionX;
			d.y 		+= p.speed * p.directionY;


			if (pDef.fade) {
				if (p.age < p.fadeIn) 		d.alpha += (d.alpha < 1.0) ? p.fadeSpeed : 1.0 - d.alpha;
				else if (p.age > p.fadeOut) d.alpha -= (d.alpha > 0.0) ? p.fadeSpeed : -d.alpha;
				else 						d.alpha = 1.0;
			}

			p.tick(); // perform any particle-specific processing

			p.age += p.speed

			if (p.age >= pDef.life) {
				if (pDef.fade) 
					d.alpha = 0;

				if (emitterOptions.type != 'explosion')
					_regenParticle.call(this,p);
			}
			i++;
		}
	}

	_init.call(this);
}



function PolygonParticle(pDef) {

    this.g = new PIXI.Graphics();
	this.g.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.g);

	pDef.warp 		= pDef.warp || 0;
	pDef.rotation 	= pDef.rotation || 0;
	
	var fillType = 1 + Math.floor(Math.random()*2);

	this.tick = function() {}

	this.setTint = function (color) {
	    var a 	= 2 * Math.PI / pDef.numSides;
	    var i 	= 1;
	    var sX 	= pDef.size + Math.random()*pDef.warp; 

		this.g.clear();
		//this.g.lineStyle (5, color, 1);
		
	   	//this.g.beginFill(color, 1);
		if (fillType === 1) {
			// OUTLINED
			this.g.lineStyle(2, color, 1);
		} else {
			// FILLED
			this.g.beginFill(color, 1);
		}

	    this.g.moveTo (sX, 0);

	    while ( i <= pDef.numSides-1 ) {
	      this.g.lineTo ( (pDef.size+Math.random() * pDef.warp) * Math.cos (i * a), (pDef.size+Math.random() * pDef.warp)  * Math.sin (i * a));
	      i++;
	    }

	    this.g.lineTo(sX, 0)
	    this.g.endFill();

	    this.g.rotation = Math.PI / 180 * pDef.rotation;
	}
}



function PlusParticle(pDef) {

    this.g = new PIXI.Graphics();
	this.g.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.g);

	var hS = pDef.size >> 1;
    var hT = pDef.thickness >> 1;

	this.tick = function() {}

	this.setTint = function (color) {
		this.g.clear();
	    this.g.beginFill(color, 1);
		this.g.drawRect(-hS, -hT, pDef.size, pDef.thickness);
		this.g.drawRect(-hT, -hS, pDef.thickness, pDef.size);
		this.g.endFill();
	}
	this.g.rotation = pDef.rotation * (Math.PI/180);
}

function CircleParticle(pDef) {

    this.g = new PIXI.Graphics();
	this.g.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.g);

	var hS = pDef.size >> 1;
	var fillType = 1 + Math.floor(Math.random()*2);

	this.tick = function() {}

	this.setTint = function (color) {
		this.g.clear();
		if (fillType === 1) {
			// OUTLINED
			this.g.lineStyle(2, color, 1);
		} else {
			// FILLED
			this.g.beginFill(color, 1);
		}
		this.g.drawCircle(0, 0, hS);
		this.g.endFill();
	}
}

function CircleOutlinedParticle(pDef) {

    this.g = new PIXI.Graphics();
	this.g.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.g);

	var hS = pDef.size >> 1;

	this.tick = function() {}

	this.setTint = function (color) {
		this.g.clear();
		this.g.lineStyle(2, color, 1);
		//this.g.beginFill(color, 1);
		this.g.drawCircle(0, 0, hS);
		this.g.endFill();
	}
}

function CircleFilledParticle(pDef) {

    this.g = new PIXI.Graphics();
	this.g.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.g);

	var hS = pDef.size >> 1;

	this.tick = function() {}

	this.setTint = function (color) {
		this.g.clear();
		//this.g.lineStyle(2, color, 1);
		this.g.beginFill(color, 1);
		this.g.drawCircle(0, 0, hS);
		this.g.endFill();
	}
}

function SimpleParticle(pDef) {
	this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(pDef.image));
	this.sprite.blendMode = (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY
	this.sprite.anchor = new PIXI.Point (0.5,0.5);

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.sprite);

	this.tick = function() {}

	this.setTint = function (color) {
		this.sprite.tint = color;
	}
}


function DoubleParticle(pDef) {
	this.sprite1 				= new PIXI.Sprite(PIXI.Texture.fromImage(pDef.image));
	this.sprite2 				= new PIXI.Sprite(PIXI.Texture.fromImage(pDef.image));
	this.sprite1.blendMode 		= 
	this.sprite2.blendMode 		= (pDef.blendMode !== null) ? pDef.blendMode : PIXI.blendModes.MULTIPLY
	this.sprite1.anchor 		=
	this.sprite2.anchor 		= new PIXI.Point (0.5,0.5);

	this.doc = new PIXI.DisplayObjectContainer();
	this.doc.addChild (this.sprite1);
	this.doc.addChild (this.sprite2);

	var _step = 0;
	var _wobbleSpeed = 0;

	this.tick = function() { 
		
		var d = this.doc, s = this.sprite;

		_step += this.speed*0.01;

		// make the two sprites move up and down on a diagonal
		var stepS = Math.sin(_step) ;
		var stepC = Math.cos(_step) ;

		this.sprite2.y = stepC * 60;
		this.sprite2.x = 12 + stepC * -60;

		this.sprite1.y = stepS * 60;
		this.sprite1.x = -12 + stepS * -60;
	}

	this.setTint = function (color) {
		this.sprite1.tint = this.sprite2.tint = color;
	}
}