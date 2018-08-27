import { Vector2 } from "./Vector"
import { State } from "./State"

class Rect extends PIXI.Sprite {
    state: State;
    center: Vector2;
    hw: number;
    hh: number;
    angle: number;
    bounce: number;


    constructor( x, y, tex ) {
        super( tex );
        this.hw = this.width / 2;
        this.hh = this.height / 2;
        this.center = new Vector2(x + this.hw, y + this.hh );
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.bounce = 1;
        this.state = State.getInstance();
        this.state.app.stage.addChild(this);
    }

    update( data ) {

    }

    onHit() {

    }

    onDestroy() {
        this.visible = false;
    }
}

export { Rect };