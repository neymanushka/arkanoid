import { Vector2 } from "./Vector"

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

export { Circle };