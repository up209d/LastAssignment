var viewPort = document.getElementById('view-port');
var cloudContainer = document.getElementById('cloud-way');

var renderer = PIXI.autoDetectRenderer(cloudContainer.width,cloudContainer.height,{view: cloudContainer, transparent:true, backgroundColor : 0x1099bb });

var stage = new PIXI.Container();

/* call this function whenever you added a new layer/container */
stage.updateLayersOrder = function () {
    stage.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

var cloudTextures = ['assets/images/cloud.png','assets/images/cloud2.png'];


// Clouds object

var clouds = [];
var cloudIndex = 0;
var cloudCount = 3;
var frameCount = 0;

function Cloud() {
    this.object = new PIXI.Sprite.fromImage(cloudTextures[Math.floor(Math.random()*10)%2]);
    
    this.random = Math.random();
    
    //Init the transform of cloud

    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0;

    this.object.position.x = Math.random()*800;
    this.object.position.y = 300;
    
    this.object.velocityX = 0;
    this.object.velocityY = 0.01;

    this.object.scale.x = this.random*0.5+0.5;
    this.object.scale.y = this.random*0.5+0.5;

    this.object.alpha = 0.0;
    
    this.object.life= 0;
    this.object.maxLife = Math.random()*200+200;
    this.object.dieing= false;
    
    
    // Add to object collection
    clouds[cloudIndex] = this;
    
    this.object.id = cloudIndex;
    cloudIndex++;
    
    stage.addChild(this.object);
    
    stage.children.sort(function(a, b){return b.id - a.id});
    
}

Cloud.prototype.move = function() {
    
    //Check Life
    this.object.life++;
    
    if (this.object.life >= this.object.maxLife) {
//        stage.removeChild(this.object);
//        delete clouds[this.object.id];
//        delete this;
    }
    
    
    time = new Date();
    
    //Animation here
    this.object.position.x += this.object.velocityX;
    this.object.position.y += this.object.velocityY;
    this.object.scale.x += 0.01;
    this.object.scale.y += 0.01;
    
    if (this.object.dieing) {
        
            //Check Life
            this.object.life++;

            if (this.object.life >= this.object.maxLife) {
                
                this.object.alpha -= 0.05;

                if (this.object.alpha < 0) {

                    stage.removeChild(this.object);
                    delete clouds[this.object.id];
                    delete this;


                }
                
            }
        

        
    } else {
        
        this.object.alpha += 0.05;
        
        if (this.object.alpha > 0.9) {
            
             this.object.dieing = true;
            
        }

        
    }

}




function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    
    if ((frameCount%60) == 0) {
        
        for (var i=0;i<cloudCount;i++) {
            new Cloud();        
        }
        
    }
    
    for (var index in clouds) {
        clouds[index].move();
    }
    
    renderer.render(stage);
}


animate();

