import { Rect } from "../Core/Rect"

class UnbreakableBrick extends Rect {
    constructor( x, y, tex) {
        super( x, y, tex );
    }
    onHit() { }
    onDestroy(){ }
}

export { UnbreakableBrick };