// forked from tonkotsuboy's "荒ぶる男心" http://jsdo.it/tonkotsuboy/66dI
// forked from nyamogera's "揺れる乙女心" http://jsdo.it/nyamogera/wPWDm
// forked from nyamogera's "光るトゲトゲ" http://jsdo.it/nyamogera/EDOu
"use strict";

var emitter = new particlejs.ParticleSystem();
var stage = new createjs.Stage("myCanvas");

window.addEventListener("load", function () {

    stage.addChild(emitter.container);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    emitter.importFromJson({
        "emitFrequency": "10",
        "startX": 400,
        "startXVariance": 0,
        "startY": 400,
        "startYVariance": 0,
        "initialDirection": 0,
        "initialDirectionVariance": "90",
        "initialSpeed": 10.0,
        "initialSpeedVariance": 0.1,
        "friction": "0.063",
        "accelerationSpeed": 0,
        "accelerationDirection": "275.8",
        "startScale": 1,
        "startScaleVariance": 5,
        "finishScale": "5",
        "finishScaleVariance": "5",
        "lifeSpan": 100,
        "lifeSpanVariance": "50",
        "startAlpha": "1",
        "startAlphaVariance": "0",
        "finishAlpha": "0",
        "finishAlphaVariance": "0",
        "shapeIdList": ["heart"],
        "startColor": {
            "hue": 0,
            "hueVariance": 90,
            "saturation": "91",
            "saturationVariance": 0,
            "luminance": "56",
            "luminanceVariance": "16"
        },
        "blendMode": true,
        "alphaCurveType": "0"
    });

    emitter.startX = 465 / 2;
    emitter.startY = 465 / 2;
});

function handleTick() {
    emitter.update();
    stage.update();
}

