import { Vector2 } from "./Vector"

class Rect extends PIXI.Graphics {
    game: any;
    center: Vector2;
    hw: number;
    hh: number;
    angle: number;
    bounce: number;


    constructor(game, x, y, w, h, borderColor, fillColor) {
        super();
        this.game = game;
        this.center = new Vector2(x, y);
        this.hw = w / 2;
        this.hh = h / 2;
        this.angle = 0;
        this.bounce = 1;

        this.beginFill(fillColor);
        this.lineStyle(2, borderColor);
        this.drawRoundedRect(x - this.hw, y - this.hh, w, h, 8);
        //this.drawRoundedRect (x,y, w, h, 8 );
        this.endFill();

        this.game.game.stage.addChild(this);
    }

    update() {

    }

    onHit() {

    }

    onDestroy(ball: any) {
        this.visible = false;
    }
}

class Circle extends PIXI.Graphics {
    game: any;
    velocity: Vector2;
    direction: Vector2;
    gravity: Vector2;
    pos: Vector2;
    new: Vector2;
    newVelocity: Vector2;
    radius: any;
    bounce: number;

    constructor(game, x, y, r, velocity) {
        super();
        this.game = game;
        this.gravity = new Vector2(0, 0.2);
        this.pos = new Vector2(x, y);
        this.new = new Vector2(x, y);
        this.velocity = velocity;
        this.radius = r;
        this.beginFill(0x9966FF);
        this.drawCircle(0, 0, r);
        this.endFill();
        this.game.game.stage.addChild(this);
    }

    update() {
        this.velocity = this.newVelocity;
        this.pos = this.new;
        this.x = this.pos.x;
        this.y = this.pos.y;
    }
}



export { Rect };