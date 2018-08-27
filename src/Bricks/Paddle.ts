import { Rect } from "../Core/Rect"

class Paddle extends Rect {
    constructor( x, y) {
        super( x, y, PIXI.loader.resources["paddle"].texture );
        this.bounce = 1.1;
    }
    update( data ) {
        this.center.x = data;
        //this.position.x = this.center.x - this.hw;
        this.x = this.center.x - this.hw;
    }

    onHit() { }
    onDestroy() {}
}

export { Paddle };