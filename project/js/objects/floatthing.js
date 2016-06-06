var FloatThing = function(
    DisplayContainer,
    Textures
) {
    this.Container = new PIXI.Container();
    
    for (i=0;i<30;i++) {
        var eachSprite = new PIXI.Sprite(Textures[Math.floor(Math.random()*2)]);
        eachSprite.position.set(Math.random()*window.innerWidth,Math.random()*window.innerHeight);
        eachSprite.scale.set(Math.random()*0.2+0.2);
        eachSprite.alpha = Math.random()*0.5+0.2;
        var eachFilter = new PIXI.filters.BlurFilter();
        eachSprite.filters = [eachFilter];
        this.Container.addChild(eachSprite);
    }

    this.Stage = new PIXI.Container();
    this.Stage.addChild(this.Container);

    DisplayContainer.addChild(this.Stage);
}
