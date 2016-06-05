TilingTVNoise = function(DisplayContainer,alpha,NoiseTotalWidth,NoiseTotalHeight) {

    var self = this;

    NoiseTotalWidth = typeof NoiseTotalWidth !== 'undefined' ? NoiseTotalWidth : DisplayContainer.width;
    NoiseTotalHeight = typeof NoiseTotalHeight !== 'undefined' ? NoiseTotalHeight : DisplayContainer.height;

    alpha = typeof alpha !== 'undefined' ? alpha : 35;

    this.alpha = alpha;

    this.noiseTexture = document.createElement('canvas');

    this.noiseTexture.width = Math.floor(NoiseTotalWidth/10);
    this.noiseTexture.height = Math.floor(NoiseTotalHeight/10);

    this.context2d = this.noiseTexture.getContext('2d');

    this.noisetextures = new Array();

    // Rendering 15 frame of noise to play

    for (i=0;i<15;i++) {

        var idata = this.context2d.createImageData(this.noiseTexture.width,this.noiseTexture.height);
        var buf = new ArrayBuffer(idata.data.length);
        var buf8 = new Uint8ClampedArray(buf);
        var data = new Uint32Array(buf);

        for (var y = 0; y < this.noiseTexture.height; ++y) {
            for (var x = 0; x < this.noiseTexture.width; ++x) {
                var value = x * y & 0xff;

                data[y * this.noiseTexture.width + x] =
                    ((Math.random()*this.alpha)   << 24) |    // alpha
                    (0 << 16) |    // blue
                    (50 <<  8) |    // green
                    50;            // red
            }
        }

        idata.data.set(buf8);


        //     buffer32 = new Uint32Array(idata.data.buffer),
        //     j = 0;
        //
        // for(; j < buffer32.length;) {
        //     buffer32[j++] = ((Math.random()*this.alpha) << 24) |
        //                     (0 << 16) |
        //                     (0 << 8) |
        //                     (0);
        //    }

        //((this.alpha * Math.random())|0) << 24

        //(255   << 24) |	// alpha
        //(value << 16) |	// blue
        //(value <<  8) |	// green
        //value;		// red


        this.context2d.putImageData(idata, 0, 0);

        this.noiseData = this.context2d.canvas.toDataURL();

        texture = new PIXI.Texture.fromImage(this.noiseData);

        this.noisetextures.push(texture);

    }

    // console.log(this.noisetextures);

    this.noiseAnimations = [];

    for (i=0;i<=10;i++) {
        this.noiseAnimations[i] = [];
        for(j=0;j<=10;j++) {
            this.noiseAnimations[i][j] = new PIXI.extras.MovieClip(this.noisetextures);
            this.noiseAnimations[i][j].anchor.set(0);
            this.noiseAnimations[i][j].position.set(this.noiseTexture.width*i,this.noiseTexture.height*j);
            this.noiseAnimations[i][j].gotoAndPlay(Math.ceil(Math.random() * 15));
        }
    }

    this.Container = new PIXI.Container();

    for (i=0;i<=10;i++) {
        for(j=0;j<=10;j++) {
            this.Container.addChild(this.noiseAnimations[i][j]);
        }
    }

    DisplayContainer.addChild(this.Container);

    self.update = function(NewNoiseTotalWidth,NewNoiseTotalHeight) {

        this.noisetextures = new Array();
        console.log();

        NewNoiseTotalWidth = typeof NewNoiseTotalWidth !== 'undefined' ? NewNoiseTotalWidth : NoiseTotalWidth;
        NewNoiseTotalHeight = typeof NewNoiseTotalHeight !== 'undefined' ? NewNoiseTotalHeight : NoiseTotalHeight;


        this.noiseTexture.width = Math.floor(NewNoiseTotalWidth/10);
        this.noiseTexture.height = Math.floor(NewNoiseTotalHeight/10);

        // Rendering 15 frame of noise to play

        for (i=0;i<15;i++) {

            idata = this.context2d.createImageData(this.noiseTexture.width,this.noiseTexture.height),
                buffer32 = new Uint32Array(idata.data.buffer),
                j = 0;

            for(; j < buffer32.length;)
                buffer32[j++] = ((this.alpha * Math.random())|0) << 24;

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


    self.noising = function() {

        // gotoAndPlay is go for specific frame and play from that
        for (i=0;i<=10;i++) {
            for(j=0;j<=10;j++) {
                this.noiseAnimations[i][j].gotoAndPlay(Math.ceil(Math.random() * 15));
            }
        }


    }

    self.pause = function() {

        // gotoAndPlay is go for specific frame and play from that
        for (i=0;i<=10;i++) {
            for(j=0;j<=10;j++) {
                this.noiseAnimations[i][j].stop();
            }
        }


    }



}



TVNoise = function(DisplayContainer,alpha,NoiseTotalWidth,NoiseTotalHeight) {

    var self = this;

    NoiseTotalWidth = typeof NoiseTotalWidth !== 'undefined' ? NoiseTotalWidth : DisplayContainer.width;
    NoiseTotalHeight = typeof NoiseTotalHeight !== 'undefined' ? NoiseTotalHeight : DisplayContainer.height;

    alpha = typeof alpha !== 'undefined' ? alpha : 35;

    this.alpha = alpha;

    this.noiseTexture = document.createElement('canvas');

    this.noiseTexture.width = NoiseTotalWidth;
    this.noiseTexture.height = NoiseTotalHeight;

    this.context2d = this.noiseTexture.getContext('2d');

    this.noisetextures = new Array();

    // Rendering 15 frame of noise to play

    for (i=0;i<60;i++) {

        var idata = this.context2d.createImageData(this.noiseTexture.width,this.noiseTexture.height);
        var buf = new ArrayBuffer(idata.data.length);
        var buf8 = new Uint8ClampedArray(buf);
        var data = new Uint32Array(buf);

        for (var y = 0; y < this.noiseTexture.height; ++y) {
            for (var x = 0; x < this.noiseTexture.width; ++x) {
                var value = x * y & 0xff;

                data[y * this.noiseTexture.width + x] =
                    ((Math.random()*this.alpha)   << 24) |    // alpha
                    (255 << 16) |    // blue
                    (255 <<  8) |    // green
                     255;            // red
            }
        }

        idata.data.set(buf8);

        this.context2d.putImageData(idata, 0, 0);

        this.noiseData = this.context2d.canvas.toDataURL();

        texture = new PIXI.Texture.fromImage(this.noiseData);

        this.noisetextures.push(texture);

    }

    this.noiseAnimations = new PIXI.extras.MovieClip(this.noisetextures);
    this.noiseAnimations.anchor.set(0.5);
    this.noiseAnimations.position.set(0,0);
    this.noiseAnimations.gotoAndPlay(Math.ceil(Math.random() * 15));

    this.Container = new PIXI.Container();
    this.Container.addChild(this.noiseAnimations);
    DisplayContainer.addChild(this.Container);

    self.noising = function() {

        this.noiseAnimations.gotoAndPlay(Math.ceil(Math.random() * 15));
    }

    self.pause = function() {
        this.noiseAnimations.stop();
    }
}
