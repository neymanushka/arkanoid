import { Rect } from "../Core/Rect"
import { DropBallSpawner } from "../Drops/DropBallSpawner"
import { ScoreLine } from "../Core/ScoreLine";

class Brick extends Rect {
    constructor(x, y, tex) {
        super(x, y, tex);
    }

    onHit() {

    }

    onDestroy() {
        super.onDestroy();
        let chance = Math.random();
        //console.log(data);
        this.state.addDrop( new DropBallSpawner( this.center.x, this.center.y) );
        //if( chance <= 0.1 ) this.game.drops.push( new DropBallSpawner(this.game,this.center.x,this.center.y));
        //else if( chance <= 0.2 ) console.log("drop2");
        //else if( chance >= 0.3 ) console.log("drop3");
        new ScoreLine(this.x, this.y, "400", "font");
    }
}

export { Brick };