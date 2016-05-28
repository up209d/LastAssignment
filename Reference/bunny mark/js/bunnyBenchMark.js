

$(document).ready(onReady)

$(window).resize(resize)
window.onorientationchange = resize;

var width = 480;
var height = 320;

var wabbitTexture;
var pirateTexture;

var bunnys = [];
var gravity = 0.75//1.5 ;

var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

var startBunnyCount = 10;
var isAdding = false;
var count = 0;
var container;
var pixiLogo;
var clickImage;

var amount = 10;

var canvas = document.createElement( 'canvas' ); 
canvas.width = this.width;
canvas.height = this.height;  

PIXI.Texture.fromCanvas = function(canvas)
{
	// give the canvas an id?
	var texture = PIXI.TextureCache[canvas];
	
	if(!texture)
	{
		var baseTexture = PIXI.BaseTextureCache[canvas];
		if(!baseTexture) baseTexture = new PIXI.BaseTexture(canvas);
		texture = new PIXI.Texture(baseTexture);
		PIXI.TextureCache[canvas] = texture;
	}
	
	return texture;
}

function onReady()
{
	
	renderer = PIXI.autoDetectRenderer(800, 600);
	stage = new PIXI.Stage(0xFFFFFF);
	
	amount = (renderer instanceof PIXI.WebGLRenderer) ? 10 : 5;
	
	if(amount == 5)
	{
		renderer.context.mozImageSmoothingEnabled = false
		renderer.context.webkitImageSmoothingEnabled = false;
		
	}
	
	renderer.view.style["transform"] = "translatez(0)";
	//alert(amount)
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
	stats = new Stats();
	
	
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	requestAnimFrame(update);
	
	wabbitTexture = new PIXI.Texture.fromImage("bunny.png")

	counter = document.createElement("div");
	counter.className = "counter";
	document.body.appendChild( counter);
	
	pixiLogo = document.getElementById("pixi");
	clickImage = document.getElementById("clickImage");
	
	count = startBunnyCount;
	counter.innerHTML = count + " BUNNIES";
	
	
	container = new PIXI.DisplayObjectContainer();
	stage.addChild(container);
	
	for (var i = 0; i < startBunnyCount; i++) 
	{
		//var bunny = new PIXI.Sprite(wabbitTexture, {x:0, y:0, width:26, height:37});
        var bunny = new PIXI.Text('Bunny',{font:'30px "kg_summer_sunshineregular"'});
		bunny.speedX = Math.random() * 10;
		bunny.speedY = (Math.random() * 10) - 5;
		
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 1;
		bunnys.push(bunny);
		
		container.addChild(bunny);
	}
	
	
	$(renderer.view).mousedown(function(){
		isAdding = true;
	});
	
	$(renderer.view).mouseup(function(){
		isAdding = false;
	})
	
	document.addEventListener("touchstart", onTouchStart, true);
	document.addEventListener("touchend", onTouchEnd, true);
	
	renderer.view.touchstart = function(){
		
		isAdding = true;
	}
	
	renderer.view.touchend = function(){
		isAdding = false;
	}
	resize();
}

function onTouchStart(event)
{
	isAdding = true;
}

function onTouchEnd(event)
{
	isAdding = false;
}

function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	if(width > 800)width  = 800;
	if(height > 600)height = 600;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	stats.domElement.style.left = w + "px";
	stats.domElement.style.top = h + "px";
	
	counter.style.left = w + "px";
	counter.style.top = h + 49 + "px";
	
	pixiLogo.style.right = w  + "px";
	pixiLogo.style.bottom = h + 8  + "px";
	
	clickImage.style.right = w + 108 + "px";
	clickImage.style.bottom = h + 17  + "px";
	
	renderer.resize(width, height);
}

function update()
{
	stats.begin();
	if(isAdding)
	{
		// add 10 at a time :)
		
		for (var i = 0; i < amount; i++) 
		{
			//var bunny = new PIXI.Sprite(wabbitTexture, {x:0, y:0, width:26, height:37});
            var bunny = new PIXI.Text('Bunny',{font:'30px "kg_summer_sunshineregular"'});
			bunny.speedX = Math.random() * 10;
			bunny.speedY = (Math.random() * 10) - 5;
			bunny.anchor.y = 1;
			//bunny.alpha = 0.3 + Math.random() * 0.7;
			bunnys.push(bunny);
			bunny.scale.y = 1;
			
			//bunny.rotation = Math.random() - 0.5;
			var random = Math2.randomInt(0, container.children.length-2);
			container.addChild(bunny)//, random);
			
			count++;
		}
		
		if(count >= 16500)amount = 0;
		/*if(count < 200)
		{
			var random = Math2.randomInt(0, bunnys.length-2);
			console.log(random + "  " + bunnys.length)
			var bunnyRandom = bunnys[random];
				bunnyRandom.setTexture(pirateTexture);
		}
		else if(count == 2000)
		{
			count ++;
			for (var i = 0; i < bunnys.length; i++) 
			{
				var bunny = bunnys[i];
				bunny.setTexture(wabbitTexture)
			}
			
		}*/
		
	
		counter.innerHTML = count + " BUNNIES";
	}
	
	for (var i = 0; i < bunnys.length; i++) 
	{
		var bunny = bunnys[i];
		
		bunny.position.x += bunny.speedX;
		bunny.position.y += bunny.speedY;
		bunny.speedY += gravity;
		
		if (bunny.position.x > maxX)
		{
			bunny.speedX *= -1;
			bunny.position.x = maxX;
		}
		else if (bunny.position.x < minX)
		{
			bunny.speedX *= -1;
			bunny.position.x = minX;
		}
		
		if (bunny.position.y > maxY)
		{
			bunny.speedY *= -0.85;
			bunny.position.y = maxY;
			bunny.spin = (Math.random()-0.5) * 0.2
			if (Math.random() > 0.5)
			{
				bunny.speedY -= Math.random() * 6;
			}
		} 
		else if (bunny.position.y < minY)
		{
			bunny.speedY = 0;
			bunny.position.y = minY;
		}
		
	}

	renderer.render(stage);
	requestAnimFrame(update);
	stats.end();
}
