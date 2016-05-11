var stageCloud = new PIXI.Container();
stageCloud.pivot.x = stageCloud.pivot.y = 0.5;

/* call this function whenever you added a new layer/container */
stageCloud.updateLayersOrder = function () {
    stageCloud.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

var cloudTextures = ['assets/images/cloud.png','assets/images/cloud2.png'];

// Clouds object

var clouds = [];
var cloudIndex = 0;
var cloudCount = 2;

function Cloud(cloudPlace) {

    switch (cloudPlace) {

        case 'left': {

            this.object = new PIXI.Sprite.fromImage(cloudTextures[Math.floor(Math.random()*10) % cloudTextures.length]);

            this.random = Math.random();

            //Init the transform of cloud

            this.object.anchor.x = 1;
            this.object.anchor.y = 0.5;

            this.object.position.x = (window.innerWidth/2)-(Math.random()*window.innerWidth/2);
            this.object.position.y = window.innerHeight/2;

            // this.object.velocityX = 0;
            // this.object.velocityY = 0.01;

            this.object.scale.x = this.random*0.3+0.8;
            this.object.scale.y = this.random*0.3+0.8;

            // this.object.alpha = 0.0;
            //
            // this.object.life= 0;
            // this.object.maxLife = 100;
            // this.object.dieing= false;


            // Add to object collection
            // clouds[cloudIndex] = this;
            //
            // this.object.id = cloudIndex;
            // cloudIndex++;

            // stageCloud.addChild(this.object);
            //
            // stageCloud.children.sort(function(a, b){return b.id - a.id});

            break;

        }

        case 'right': {

            this.object = new PIXI.Sprite.fromImage(cloudTextures[Math.floor(Math.random()*10) % cloudTextures.length]);

            this.random = Math.random();

            //Init the transform of cloud

            this.object.anchor.x = 0;
            this.object.anchor.y = 0.5;

            this.object.position.x = (Math.random()*window.innerWidth/2)+(window.innerWidth/2);
            this.object.position.y = window.innerHeight/2;

            // this.object.velocityX = 0;
            // this.object.velocityY = 0.01;

            this.object.scale.x = this.random*0.3+0.8;
            this.object.scale.y = this.random*0.3+0.8;

            // this.object.alpha = 0.0;
            //
            // this.object.life= 0;
            // this.object.maxLife = 100;
            // this.object.dieing= false;


            // Add to object collection
            // clouds[cloudIndex] = this;
            //
            // this.object.id = cloudIndex;
            // cloudIndex++;

            // stageCloud.addChild(this.object);
            //
            // stageCloud.children.sort(function(a, b){return b.id - a.id});

            break;

        }

        case 'middle': {

            this.object = new PIXI.Sprite.fromImage(cloudTextures[Math.floor(Math.random()*10) % cloudTextures.length]);

            this.random = Math.random();

            //Init the transform of cloud

            this.object.anchor.x = 0.5;
            this.object.anchor.y = 0.5;

            this.object.position.x = window.innerWidth/2;

            this.object.position.y = window.innerHeight/2;

            // this.object.velocityX = 0;
            // this.object.velocityY = 0.01;

            this.object.scale.x = this.random*1.0+.5;
            this.object.scale.y = this.random*1.0+.5;

            // this.object.alpha = 0.0;
            //
            // this.object.life= 0;
            // this.object.maxLife = 100;
            // this.object.dieing= false;


            // Add to object collection
            // clouds[cloudIndex] = this;
            //
            // this.object.id = cloudIndex;
            // cloudIndex++;

            // stageCloud.addChild(this.object);
            //
            // stageCloud.children.sort(function(a, b){return b.id - a.id});

            break;

        }

    }



}

Cloud.prototype.move = function() {

//     //Check Life
//     this.object.life++;
//
//     if (this.object.life >= this.object.maxLife) {
// //        stage.removeChild(this.object);
// //        delete clouds[this.object.id];
// //        delete this;
//     }


    time = new Date();

    //Animation here
    if (this.object.position.x > window.innerWidth/2) {

        this.object.position.x += this.object.velocityX;
        this.object.position.y += this.object.velocityY;

    } else if (this.object.position.x < window.innerWidth/2) {

        this.object.position.x += this.object.velocityX*-1;
        this.object.position.y += this.object.velocityY;

    } else {

        this.object.position.y += this.object.velocityY;

    }



    this.object.velocityX += 0.005;
    this.object.velocityY += 0.001;
    this.object.scale.x += 0.005;
    this.object.scale.y += 0.005;

    if (this.object.dieing) {

        //Check Life
        this.object.life++;

        if (this.object.life >= this.object.maxLife) {

            this.object.alpha -= 0.05;

            if (this.object.alpha < 0) {

                // stage.removeChild(this.object);
                delete clouds[this.object.id];
                delete this;


            }

        }



    } else {

        this.object.alpha += 0.0075;

        if (this.object.alpha > 0.9) {

            this.object.dieing = true;

        }


    }

}


function GroupCloud(stage) {

    this.containerObject = new PIXI.Container();

    this.leftObject = new Cloud('left').object;
    this.rightObject = new Cloud('right').object;
    this.middleObject = new Cloud('middle').object;


    this.containerObject.addChild(this.middleObject);
    this.containerObject.addChild(this.leftObject);
    this.containerObject.addChild(this.rightObject);

    clouds[cloudIndex] = this;

    this.containerObject.id = cloudIndex;
    cloudIndex++;

    stageCloud.addChild(this.containerObject);
    stageCloud.children.sort(function(a, b){return b.id - a.id});

    this.containerObject.pivot.x = window.innerWidth/2;
    this.containerObject.pivot.y = window.innerHeight/4;

    this.containerObject.position.x = window.innerWidth/2;
    this.containerObject.position.y = window.innerHeight/2-window.innerHeight/4;

    this.containerObject.rotation = 0;

    this.containerObject.scale.x = 1;
    this.containerObject.scale.y = 1;

    this.containerObject.velocityX = 0;
    this.containerObject.velocityY = Math.random();

    this.containerObject.scaleVelocityX = 0;
    this.containerObject.scaleVelocityY = 0;

    this.containerObject.alpha = 0.0;

    this.containerObject.life= 0;
    this.containerObject.maxLife = 100;
    this.containerObject.dieing= false;

    stage.addChild(stageCloud);
    // console.log (this.containerObject.width+'---'+this.containerObject.height)
    // console.log (stageCloud.width+'---'+stageCloud.height)
}

GroupCloud.prototype.move = function() {

    this.containerObject.position.x += this.containerObject.velocityX;
    this.containerObject.position.y += this.containerObject.velocityY;

    this.containerObject.scale.x += 0.005;
    this.containerObject.scale.y += 0.005;

    this.containerObject.velocityX += 0;
    this.containerObject.velocityY += 0.001;

    this.containerObject.scaleVelocityX += 0;
    this.containerObject.scaleVelocityY += 0;

    if (this.containerObject.dieing) {

        //Check Life
        this.containerObject.life++;

        if (this.containerObject.life >= this.containerObject.maxLife) {

            this.containerObject.alpha -= 0.05;

            if (this.containerObject.alpha < 0) {

                stageCloud.removeChild(this.containerObject);
                delete clouds[this.containerObject.id];
                delete this;


            }

        }



    } else {

        this.containerObject.alpha += 0.02;

        if (this.containerObject.alpha > 0.9) {

            this.containerObject.dieing = true;

        }


    }

}

function animateCloud() {

    requestAnimationFrame(animateCloud);
    
    if ((frameCount%60) == 0) {
        for (var i=0;i<cloudCount;i++) {
            new GroupCloud(stage);
        }
    }

    for (var index in clouds) {
        clouds[index].move();
        stageCloud.rotation = Math.sin(frameCount*0.01)*0.1;
        // console.log(Math.sin(frameCount*0.01)*0.1);
    }

}