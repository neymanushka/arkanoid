import { Drop } from "../Core/Drop";
import { Vector2 } from "../Core/Vector";
import { Circle } from "../Core/Circle";

class DropBallSpawner extends Drop {
    constructor(game, x, y) {        
        super(game, x, y, PIXI.loader.resources["drop"].texture );
    }


    onTouch()
    {
        super.onTouch();
        let i = this.game.balls.find( (e)=>{ return e.visible; } );
        if( i != undefined )
        {   
            this.game.balls.push(new Circle(this.game, i.pos.x, i.pos.y, 8, new Vector2(1,3)));
            this.game.balls.push(new Circle(this.game, i.pos.x, i.pos.y, 8, new Vector2(3,1)));
            this.game.balls.push(new Circle(this.game, i.pos.x, i.pos.y, 8, new Vector2(3,3)));
        }
    } 

}


export { DropBallSpawner };