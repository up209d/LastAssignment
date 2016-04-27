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
    this.object.maxLife = Math.random()*300+300;
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

Mini3d = function() {
    this.view = new PIXI.DisplayObjectContainer,
        this.children = [],
        this.focalLength = 400,
        this.position3d = {
            x: 0,
            y: 0,
            z: 0
        },
        this.rotation3d = {
            x: 0,
            y: 0,
            z: 0
        }
},

Mini3d.constructor = Mini3d,

Mini3d.prototype.addChild = function(t) {
    t.position3d || (t.position3d = {
        x: 0,
        y: 0,
        z: 0
    }),
        t.anchor.set(.5),
        this.view.addChild(t),
        this.children.push(t)
},

Mini3d.prototype.update = function() {
    for (var t, e, i, n, o, s, a, h, l, u, c = Math.sin(this.rotation3d.x), d = Math.cos(this.rotation3d.x), p = Math.sin(this.rotation3d.y), f = Math.cos(this.rotation3d.y), m = Math.sin(this.rotation3d.z), v = Math.cos(this.rotation3d.z), g = 0; g < this.children.length; g++) {
        var y = this.children[g];
        t = y.position3d.x - this.position3d.x,
            e = y.position3d.y - this.position3d.y,
            i = y.position3d.z - this.position3d.z,
            n = d * e - c * i,
            o = c * e + d * i,
            a = f * o - p * t,
            s = p * o + f * t,
            h = v * s - m * n,
            l = m * s + v * n,
            u = this.focalLength / (this.focalLength + a),
            t = h * u,
            e = l * u,
            i = a,
            y.scale.x = y.scale.y = u * y.scaleRatio,
            y.scale.x *= y.scaleOffset.x,
            y.scale.y *= y.scaleOffset.y,
            y.depth = -y.position3d.z,
            y.position.x = t,
            y.position.y = e
    }
    this.view.children.sort(r)
}




function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    
    if ((frameCount%30) == 0) {
        
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

