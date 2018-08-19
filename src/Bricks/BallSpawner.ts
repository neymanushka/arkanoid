import { Rect } from "../Core/Rect"
import { Circle } from "../Core/Circle"
import { Vector2 } from "../Core/Vector"
import { DropBallSpawner } from "../Drops/DropBallSpawner"

class BallSpawner extends Rect {
    constructor(game, x, y) {
        super(game, x, y, 64, 64, 0x9966FF, 0xFF3064);
    }

    onHit() {

    }

    onDestroy(ball: any) {
        super.onDestroy(ball);
        //this.game.balls.push(new Circle(this.game, this.center.x, this.center.y, 8, new Vector2(3, 5)));
        this.game.drops.push( new DropBallSpawner(this.game,this.center.x,this.center.y));
    }
}

export { BallSpawner };