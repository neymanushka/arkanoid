import { Rect } from "../Core/Rect"

class Paddle extends Rect {
    constructor(game, x, y) {
        super(game, x, y, 256, 32, 0x9966FF, 0xFFFFFFFF);
        this.bounce = 1.1;
    }
    update() {
        this.center.x = this.game.mousePos;
        this.position.x = this.center.x - this.hw;
    }

    onHit() {

    }

    onDestroy(ball: any) {
        //super.onBrickDestroy();
    }
}

export { Paddle };