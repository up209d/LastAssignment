TVNoise = function() {

    this.noiseTexture = document.createElement('canvas');

    this.noiseTexture.width = Math.floor(window.innerWidth/10);
    this.noiseTexture.height = Math.floor(window.innerHeight/10);

    this.context2d = this.noiseTexture.getContext('2d');

    this.noisetextures = new Array();

    // Rendering 15 frame of noise to play

    for (i=0;i<15;i++) {

        idata = this.context2d.createImageData(this.noiseTexture.width,this.noiseTexture.height),
            buffer32 = new Uint32Array(idata.data.buffer),
            j = 0;

        for(; j < buffer32.length;)
            buffer32[j++] = ((35 * Math.random())|0) << 24;

        this.context2d.putImageData(idata, 0, 0);

        this.noiseData = this.context2d.canvas.toDataURL();

        texture = new PIXI.Texture.fromImage(this.noiseData);

        this.noisetextures.push(texture);

    }

    this.noiseAnimations = [];

    for (i=0;i<=10;i++) {
        this.noiseAnimations[i] = [];
        for(j=0;j<=10;j++) {
            this.noiseAnimations[i][j] = new PIXI.extras.MovieClip(this.noisetextures);
            this.noiseAnimations[i][j].anchor.set(0);
            this.noiseAnimations[i][j].position.set(this.noiseTexture.width*i,this.noiseTexture.height*j);
        }
    }

    TVNoise.prototype.update = function() {

        this.noisetextures = new Array();
        console.log();

        this.noiseTexture.width = Math.floor(window.innerWidth/10);
        this.noiseTexture.height = Math.floor(window.innerHeight/10);

        // Rendering 15 frame of noise to play

        for (i=0;i<15;i++) {

            idata = this.context2d.createImageData(this.noiseTexture.width,this.noiseTexture.height),
                buffer32 = new Uint32Array(idata.data.buffer),
                j = 0;

            for(; j < buffer32.length;)
                buffer32[j++] = ((35 * Math.random())|0) << 24;

            this.context2d.putImageData(idata, 0, 0);

            this.noiseData = this.context2d.canvas.toDataURL();

            texture = new PIXI.Texture.fromImage(this.noiseData);

            this.noisetextures.push(texture);

        }



        for (i=0;i<=10;i++) {
            for(j=0;j<=10;j++) {
                this.noiseAnimations[i][j].textures = this.noisetextures;
                this.noiseAnimations[i][j].anchor.set(0);
                this.noiseAnimations[i][j].position.set(this.noiseTexture.width*i,this.noiseTexture.height*j);
            }
        }

    }


    TVNoise.prototype.noising = function() {

        // gotoAndPlay is go for specific frame and play from that
        for (i=0;i<=10;i++) {
            for(j=0;j<=10;j++) {
                this.noiseAnimations[i][j].gotoAndPlay(Math.ceil(Math.random() * 15));
            }
        }


    }

    TVNoise.prototype.pause = function() {

        // gotoAndPlay is go for specific frame and play from that
        for (i=0;i<=10;i++) {
            for(j=0;j<=10;j++) {
                this.noiseAnimations[i][j].stop();
            }
        }


    }



}
