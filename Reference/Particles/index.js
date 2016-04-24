// forked from tonkotsuboy's "荒ぶる男心" http://jsdo.it/tonkotsuboy/66dI
// forked from nyamogera's "揺れる乙女心" http://jsdo.it/nyamogera/wPWDm
// forked from nyamogera's "光るトゲトゲ" http://jsdo.it/nyamogera/EDOu

// http://jsdo.it/tonkotsuboy/66dI


"use strict";

var emitter = new effects.ParticleEmitter();
var stage = new createjs.Stage("myCanvas");

window.addEventListener("load", function () {

    stage.addChild(emitter.container);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    emitter.importFromJson({
        "emitFrequency": "100",
        "startX": 400,
        "startXVariance": 0,
        "startY": 400,
        "startYVariance": 0,
        "initialDirection": 0,
        "initialDirectionVariance": "360",
        "initialSpeed": 15.0,
        "initialSpeedVariance": 0.1,
        "friction": "0.063",
        "accelerationSpeed": 0,
        "accelerationDirection": "275.8",
        "startScale": 2.4,
        "startScaleVariance": 0,
        "finishScale": "0.4",
        "finishScaleVariance": "0",
        "lifeSpan": 49,
        "lifeSpanVariance": "27",
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

