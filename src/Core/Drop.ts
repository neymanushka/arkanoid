import { Vector2 } from "./Vector"
import { Rect } from "../Core/Rect"

class Drop extends PIXI.Sprite{
    game: any;
    c: Vector2;
    hw: number;
    hh: number;
    center: Vector2;
    velocity: Vector2;
    gravity: Vector2;
    touched: boolean;    

    constructor(game, x, y, tex ) {
        super( tex );
        this.game = game;
        this.center = new Vector2(x, y);
        this.hw = 64 / 2;
        this.hh = 32 / 2;

        this.x = this.center.x - this.hw;
        this.y = this.center.y - this.hh;

        this.game.game.stage.addChild(this);
        this.velocity = new Vector2(0,2);
        this.gravity = new Vector2(0,0.1);
        this.touched = false;
    }

    onDestroy() {
        this.visible = false;
    }

    onTouch()
    {
        this.touched = true;
        this.gravity = new Vector2(0,0.5);
    }

    update() {
        this.x = this.center.x - this.hw;
        this.y = this.center.y - this.hh;
    }

}

export { Drop };