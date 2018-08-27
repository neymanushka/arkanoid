import { Drop } from "../Core/Drop";
import { Vector2 } from "../Core/Vector";
import { Circle } from "../Core/Circle";

class DropBallSpawner extends Drop {
    constructor(x, y) {
        super(x, y, PIXI.loader.resources["drop"].texture);
    }


    onTouch() {
        super.onTouch();
        let i = this.state.balls.find( (e)=>{ return e.visible; } );
        if (i != undefined) {
            this.state.addBall( new Circle( i.pos.x, i.pos.y, 12, new Vector2(1,3)));
            this.state.addBall( new Circle( i.pos.x, i.pos.y, 12, new Vector2(3,1)));
            this.state.addBall( new Circle( i.pos.x, i.pos.y, 12, new Vector2(3,3)));
        }
    }

}


export { DropBallSpawner };