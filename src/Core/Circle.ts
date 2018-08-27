import { Vector2 } from "./Vector"

class Circle extends PIXI.Sprite {
    velocity: Vector2;
    direction: Vector2;
    gravity: Vector2;
    pos: Vector2;
    new: Vector2;
    newVelocity: Vector2;
    radius: any;
    bounce: number;

    constructor(x, y, r, velocity) {
        super( PIXI.loader.resources["ball"].texture );
        this.gravity = new Vector2(0, 0.2);
        this.pos = new Vector2(x, y);
        this.new = new Vector2(x, y);
        this.velocity = velocity;
        this.newVelocity = velocity;
        this.radius = r;
        this.update();
    }

    update() {
        this.velocity = this.newVelocity;
        this.pos = this.new;

        this.x = this.pos.x - this.radius;
        this.y = this.pos.y - this.radius;
    }
}

export { Circle };