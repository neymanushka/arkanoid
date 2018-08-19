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
        this.drawRoundedRect(0,0, w, h, 8);
        this.endFill();

        this.position.x = this.center.x - this.hw;
        this.position.y = this.center.y - this.hh;

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

export { Rect };