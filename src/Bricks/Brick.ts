import { Rect } from "../Core/Rect"

class Brick extends Rect {
    constructor(game, x, y) {
        super(game, x, y, 64, 64, 0x9966FF, 0xFFFFFFFF);
    }

    onHit() {

    }

    onDestroy(ball: any) {
        //super.onDestroy(ball);
    }
}

export { Brick };