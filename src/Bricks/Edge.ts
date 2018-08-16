import { Vector2 } from "../Core/Vector"

class Edge {
    center: Vector2;
    hw: number;
    hh: number;
    visible: boolean;
    bounce: number;

    constructor(x, y, w, h) {
        this.hw = w / 2;
        this.hh = h / 2;
        this.center = new Vector2(x, y);
        this.visible = true;
        this.bounce = 0.97;
    }

    onHit() {

    }

    onDestroy(ball: any) {
        //console.log( this.center.toString() + " " + this.hw + " " + this.hh);
    }
}

export { Edge };