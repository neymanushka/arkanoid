import { MathHelper } from "./MathHelper";

class StarDropBackground extends PIXI.Container {
    stars: Star[];
    constructor(width, height) {
        super();
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = width;
        bg.height = height;
        bg.tint = 0x00000;
        this.addChild(bg);
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(width, height));
            this.addChild(this.stars[i]);
        }
    }
    update(){
        this.stars.forEach( star => star.update() );
    }
}

class Star extends PIXI.Sprite {
    speed: number;
    heightMax: number;
    constructor(w, h) {
        super(PIXI.Texture.WHITE);
        this.width = 1;
        this.height = 1;
        this.heightMax = h;
        this.tint = 0xFFFFFF;
        this.speed = MathHelper.random(1, 5);
        this.x = MathHelper.random(0, w);
        this.y = MathHelper.random(0, h);
    }
    update() {
        this.y < this.heightMax ? this.y += this.speed : this.y = 0;
    }
}

export { StarDropBackground };