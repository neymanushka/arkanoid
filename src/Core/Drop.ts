import { Vector2 } from "./Vector"
import { collisionRectRect } from "../Core/Collision"
import { State } from "./State"

class Drop extends PIXI.Sprite{
    state: State;
    c: Vector2;
    hw: number;
    hh: number;
    center: Vector2;
    velocity: Vector2;
    gravity: Vector2;
    touched: boolean;    

    constructor( x, y, tex ) {
        super( tex );
        this.hw = 64 / 2;
        this.hh = 32 / 2;

        this.center = new Vector2(x + this.hw, y + this.hh );
        this.x = x;
        this.y = y;

        this.state = State.getInstance();
        this.velocity = new Vector2(0,0.1);
        this.gravity = new Vector2(0,0.1);
        this.touched = false;
    }

    onDestroy() {
        this.parent.removeChild(this);
        return false;
    }

    onTouch()
    {
        this.touched = true;
        this.gravity = new Vector2(0,1);
    }

    update() {

        this.velocity = Vector2.add(this.velocity,this.gravity);
        this.center = Vector2.add(this.center,this.velocity);

        if( this.center.y > this.state.app.renderer.height ) return this.onDestroy();

        if( !this.touched && collisionRectRect( this,this.state.paddle ) )
        {
            this.center.y = this.state.paddle.center.y - this.state.paddle.hh - this.hh;
            this.velocity = Vector2.reflect(this.velocity,new Vector2(0,-1));
            this.onTouch();
        }

        this.x = this.center.x - this.hw;
        this.y = this.center.y - this.hh;
        return true;
    }

}

export { Drop };